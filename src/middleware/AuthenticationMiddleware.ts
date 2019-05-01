import { ExpressMiddlewareInterface, Middleware, HttpError } from "routing-controllers";

import * as webToken from "jsonwebtoken";

import Config from "../../config/env";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { isNullOrUndefined } from "util";

@Middleware({ type: "before" })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {

    public use(request: any, response: any, next: () => any): any {

        const URL: string = request.originalUrl; 

        if (URL.endsWith('login')) 
            return next();

        let usuarioRepository = new UsuarioRepository();

        const token = request.headers['authorization'];

        if (isNullOrUndefined(token))
        return response.status(400).send(new HttpError(400, 'Informe um Web Token!'));

        webToken.verify(token, Config.secretKey, async (err, userId) => {

             if (isNullOrUndefined(userId))
                return response.status(400).send(new HttpError(400, 'Web token inválido!'));

            const user = await usuarioRepository.findUserById(userId);

            if (isNullOrUndefined(user)) 
                return response.status(400).send(new HttpError(400, 'Este usuário não possui acesso!'));

            next();

        });

    }

}