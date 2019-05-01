import { isNullOrUndefined } from "util";
import { HttpError } from "routing-controllers";
import * as jwt from "jwt-simple";

import Config  from "../../config/env";
import IUsuario from "../entity/IUsuario";
import { UsuarioRepository } from "../repository/UsuarioRepository";

export default abstract class LoginService {

    public static async login(email, senha: string): Promise<any> {        

        let usuarioRepository: UsuarioRepository = new UsuarioRepository();

        const user: IUsuario = await usuarioRepository.findUser(email, senha);

        if (isNullOrUndefined(user))
            return new HttpError(400, 'Usuário não cadastrado!');

        const payload = user.Id;

        const token = jwt.encode(payload, Config.secretKey);

        return {
            name: user.Nome,
            email: user.Email,
            token,
        };

    }

}