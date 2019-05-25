import { EntityRepository, EntityManager, getManager } from "typeorm";
import { HttpError } from "routing-controllers";
import { Service } from "typedi";

import Usuario from "../entity/impl/Usuario";
import IUsuario from "../entity/IUsuario";
@Service()
@EntityRepository(Usuario)
export class UsuarioRepository {

    private manager: EntityManager

    constructor() {
        this.manager = getManager();
    }

    private exists(usuario: IUsuario): Promise<Boolean> {

        return new Promise<Boolean>(async resolve => {

            const resp = await this.manager.createQueryBuilder(Usuario, 'users').select('count(id)', 'quantidade').where('name = :name', { name: usuario.Nome }).getRawOne();

            resolve(resp.quantidade > 0);

        });

    };

    public insert(usuario: IUsuario): Promise<IUsuario> {

        return new Promise<IUsuario>(async (resolve, reject) => {

            const exists = await this.exists(usuario);

            if (exists)
                return reject(new HttpError(400, 'Já existe um usuário cadastrado no sistema com este nome!'));

            this.manager.save(usuario).then(entity =>
                resolve(entity)
            ).catch(error => reject(error));

        });

    };

    public getAll(): Promise<IUsuario[]> {

        return this.manager.find(Usuario);
    };

    public findUser(email: string, password: string): Promise<IUsuario> {

        return new Promise<IUsuario>(async resolve => {

            let user = await this.manager.createQueryBuilder(Usuario, 'users')
                .where('LOWER(email) = LOWER(:email) and password = :password', { email, password })
                .getOne();

            resolve(user || null);

        });

    }

    public async findUserById(userId: number): Promise<IUsuario> {

        return await this.manager.findOne(Usuario, userId);

    }

}