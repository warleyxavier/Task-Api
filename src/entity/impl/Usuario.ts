import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

import IUsuario from "../IUsuario";

@Entity("users")
export default class Usuario implements IUsuario {

    @PrimaryGeneratedColumn({name: "id"})
    private id: number;

    @Column({name: "name"})
    private nome: string;

    @Column({name: "email"})
    private email: string;

    @Column({name: "password"})
    private senha: string;

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get Nome(): string {
        return this.nome;
    }

    set Nome(value: string) {
        this.nome = value;
    }

    get Email(): string {
        return this.email;
    }

    set Email(value: string) {
        this.email = value;
    }
    
    get Senha(): string {
        return this.senha;
    }

    set Senha(value: string) {
        this.senha = value;
    }

}
