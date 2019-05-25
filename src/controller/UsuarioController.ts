import { JsonController, Post, Body, Get, BodyParam, Param } from "routing-controllers";
import { Service } from "typedi";
import { OrmRepository } from "typeorm-typedi-extensions";

import { UsuarioRepository } from "../repository/UsuarioRepository";
import LoginService from "../service/LoginService";
import Usuario from "../entity/impl/Usuario";

@Service()
@JsonController('/usuarios')
export class UsuarioController {

    @OrmRepository()
    private repository: UsuarioRepository;

    @Post("/")
    public insertUsuario(@Body() usuario: Usuario) {
        usuario.Email = usuario.Email.toLowerCase();
        return this.repository.insert(usuario);
    }

    @Get("/")
    public getAll() {
        return this.repository.getAll();
    }

    @Get("/find")
    public find (@BodyParam('email') email: string, @BodyParam('senha') senha: string) {
        return this.repository.findUser(email, senha);
    }

    @Get('/findById/:id')
    public findById (@Param('id') id: number) {
        return this.repository.findUserById(id);
    }

    @Get("/login/:email/:senha")
    public login (@Param('email') email: string, @Param('senha') senha: string) {
        return LoginService.login(email, senha);
    }

}