import { ExpressMiddlewareInterface, Middleware, HttpError } from "routing-controllers";
import * as webToken from "jsonwebtoken";
import { isNullOrUndefined } from "util";
import Container from "typedi";

import Config from "../../config/env";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import IUsuario from "../entity/IUsuario";
@Middleware({ type: "before" })
export class AuthenticationMiddleware implements ExpressMiddlewareInterface {

    public use(request: any, response: any, next: () => any): any {

        const method: string = request.method;
        const URL: string = request.originalUrl; 

        if ((URL.endsWith('login')) || (method == 'POST' && URL == '/usuarios/'))  
            return next();

        let usuarioRepository: UsuarioRepository = new UsuarioRepository();

        const token = request.headers['authorization'];

        if (isNullOrUndefined(token))
        return response.status(400).send(new HttpError(400, 'Informe um Web Token!'));

        webToken.verify(token, Config.secretKey, async (err, userId) => {

             if (isNullOrUndefined(userId))
                return response.status(400).send(new HttpError(400, 'Web token inválido!'));

            const user: IUsuario = await usuarioRepository.findUserById(userId);

            if (isNullOrUndefined(user)) 
                return response.status(400).send(new HttpError(400, 'Este usuário não possui acesso!'));

            Container.set('current-user', user);

            next();

        });

    }

}