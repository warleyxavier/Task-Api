import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from "typeorm";
import Usuario from "./Usuario";

@Entity("tasks")
export default class Task {

    @PrimaryGeneratedColumn({name: "id"})
    private id: number;

    @Column({name: "description"})
    private description: string;

    @Column({name: "estimate_at", type: "date"})
    private estimatAt: Date;

    @Column({name: "done_at", type: "date"})
    private doneAt: Date;

    @Column({name: "user_id"})
    private userId: number;

    get Id(): number {
        return this.id;
    }

    set Id(value: number) {
        this.id = value;
    }

    get Description(): string {
        return this.description;
    }

    set Description(value: string) {
        this.description = value;
    }

    get EstimatAt(): Date {
        return this.estimatAt;
    }

    set EstimatAt(value: Date) {
        this.estimatAt = value;
    }

    get DoneAt(): Date {
        return this.doneAt;
    }

    set DoneAt(value: Date) {
        this.doneAt = value;
    }

    get UserId(): number {
        return this.userId;
    }

    set UserId(value: number) {
        this.userId = value;
    }

}