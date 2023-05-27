import { Request, Response } from "express";
import { getProfile, userExists } from "../db/users";
import { APIException } from "../types";
import { authenticate, logInUser, registerUser } from "../db/auth";
import { generateVerifyEmail, verifyEmail } from "../db/verifyEmail";
import { changePassword, generateChangePassowrd } from "../db/changePassword";

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
    console.log(req.headers);
    console.log(req.headers.urltoken);
    const urlToken = req.headers.urltoken ? String(req.headers.urltoken) : '';
    const newPassword = req.body.newPassword ? String(req.body.newPassword) : '';
    if (urlToken === '') return res.status(400).send('urlToken is required');

    const changed = await changePassword(urlToken, newPassword);
    if (changed instanceof APIException) return res.status(changed.status).send(changed.message);
    return res.status(200).send(true);
}

export default controller;