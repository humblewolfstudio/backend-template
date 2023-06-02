import { Request, Response } from "express";
import { assignNotificationToken, changeRadarDistance, getProfile, userExists } from "../db/users";
import { APIException } from "../types";
import { authenticate, logInUser, registerUser } from "../db/auth";
import { generateVerifyEmail, verifyEmail } from "../db/verifyEmail";
import { changePassword, generateChangePassowrd } from "../db/changePassword";
import { saveImage } from "../db/images";
import { createTrash, getNearestTrashes } from "../db/trash";

const controller: any = {};

controller.login = async (req: Request, res: Response) => {
    const username = String(req.body.username);
    const password = String(req.body.password);

    const login = await logInUser(username, password);
    if (login instanceof APIException) return res.status(login.status).send(login.message);
    return res.status(200).json(login);
}

controller.register = async (req: Request, res: Response) => {
    const username = String(req.body.username);
    const password = String(req.body.password);
    const email = String(req.body.email);

    const register = await registerUser(username, password, email);
    if (register instanceof APIException) return res.status(register.status).send(register.message);
    return res.status(200).json(register);
}

controller.authenticate = async (req: Request, res: Response) => {
    const token = req.query.token ? String(req.query.token) : '';

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);
    return res.status(200).json(auth);
}

controller.getProfile = async (req: Request, res: Response) => {
    const token = req.query.token ? String(req.query.token) : '';

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);
    const profile = await getProfile(auth.id);
    if (profile instanceof APIException) return res.status(profile.status).send(profile.message);
    return res.status(200).json(profile);
}

controller.generateVerify = async (req: Request, res: Response) => {
    const token = req.query.token ? String(req.query.token) : '';
    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);

    const email = await generateVerifyEmail(auth.id);

    if (email instanceof APIException) return res.status(email.status).send(email.message);
    return res.status(200).send(email);
}

controller.verifyEmail = async (req: Request, res: Response) => {
    const urlToken = req.query.urlToken ? String(req.query.urlToken) : '';
    if (urlToken === '') return res.status(400).send('urlToken is required');
    const verified = await verifyEmail(urlToken);

    if (verified instanceof APIException) return res.status(verified.status).send(verified.message);
    return res.status(200).send(verified);
}

controller.generateChangePassowrd = async (req: Request, res: Response) => {
    const token = req.headers.token ? String(req.headers.token) : '';
    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);

    const email = await generateChangePassowrd(auth.id);

    if (email instanceof APIException) return res.status(email.status).send(email.message);
    return res.status(200).send(email);
}

controller.changePassword = async (req: Request, res: Response) => {
    const urlToken = req.headers.urltoken ? String(req.headers.urltoken) : '';
    const newPassword = req.body.newPassword ? String(req.body.newPassword) : '';
    if (urlToken === '') return res.status(400).send('urlToken is required');

    const changed = await changePassword(urlToken, newPassword);
    if (changed instanceof APIException) return res.status(changed.status).send(changed.message);
    return res.status(200).send(true);
}

controller.upload = async (req: Request, res: Response) => {
    const token = req.headers.token ? String(req.headers.token) : "";

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);

    if (!req.file) return res.status(400).send('There has to be an image with the post');
    const image_id = await saveImage(req.file.filename);
    if (image_id instanceof APIException) return res.status(image_id.status).send(image_id.message);

    try {
        const trash = await createTrash(auth.id, req.body.location, image_id, req.file.filename, req.body.tags, req.body.desc);
        if (trash instanceof APIException) return res.status(trash.status).send(trash.message);
        return res.status(200).send(trash);
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
}

controller.getTrash = async (req: Request, res: Response) => {
    const token = req.headers.token ? String(req.headers.token) : "";

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);

    try {
        const nearestTrashes = await getNearestTrashes(req.body.location, req.body.distance, req.body.tag);
        if (nearestTrashes instanceof APIException) return res.status(nearestTrashes.status).send(nearestTrashes.message);
        return res.status(200).json(nearestTrashes);
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
}

controller.changeRadarDistance = async (req: Request, res: Response) => {
    const token = req.headers.token ? String(req.headers.token) : "";

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);
    const dist = Number(req.query.dist);
    try {
        if (dist === undefined || Number.isNaN(dist)) {
            return res.status(400).send('Input a distance please');
        } else if (dist < 25) {
            return res.status(400).send('Minimum distance is 25');
        } else if (dist > 5000) {
            return res.status(400).send('Maximum distance is 5000');
        }
        const response = await changeRadarDistance(auth.id, dist);
        if (response instanceof APIException) return res.status(response.status).send(response.message);

        return res.status(200).send(response);
    } catch (e) {
        return res.status(500).send('Internal server error');
    }
}

controller.addNotificationToken = async (req: Request, res: Response) => {
    const notification_token = req.body.notification_token;
    const token = req.headers.token ? String(req.headers.token) : "";

    if (token === '') return res.status(400).send('Token is required');
    const auth = await authenticate(token);
    if (auth instanceof APIException) return res.status(auth.status).send(auth.message);

    const notification = await assignNotificationToken(auth.id, notification_token);
    if (notification instanceof APIException) return res.status(notification.status).send(notification.message);
    return res.status(200).send(true);
}

export default controller;