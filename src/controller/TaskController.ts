import { JsonController, Get, Param, Post, Body, HttpError, Delete, OnUndefined, Put } from "routing-controllers";
import { OrmRepository } from "typeorm-typedi-extensions";
import { TaskRepository } from "../repository/TaskRepository";
import IUsuario from "../entity/IUsuario";
import Container from "typedi";
import Task from "../entity/impl/Task";

@JsonController("/tasks")
export class TaskController {

    @OrmRepository()
    private repository: TaskRepository;

    @Get("/:estimatAt")
    public getAll(@Param('estimatAt') estimatAt: string) {

        const user: IUsuario = Container.get('current-user');

        return this.repository.getAll(user.Id, estimatAt);
    }

    @Post("/")
    public insert(@Body() task: Task) {

        if (task.Description == '')
            return new HttpError(400, 'Deve ser informada uma descrição para a tarefa!');

        const user: IUsuario = Container.get('current-user');

        task.UserId = user.Id;

        return this.repository.insert(task);

    }

    @OnUndefined(204)
    @Delete("/:id")
    public delete(@Param('id') id: number) {

        if (id <= 0)
            return new HttpError(400, 'Infome um id maior que zero!');

        return this.repository.delete(id);

    }

    @OnUndefined(204)
    @Put("/:id")
    public changeDoneAt(@Param('id') id: number) {

        if (id <= 0)
            return new HttpError(400, 'Infome um id maior que zero!');

        return this.repository.changeDoneAt(id);

    }

}