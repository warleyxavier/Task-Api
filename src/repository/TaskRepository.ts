import { EntityManager, getManager, EntityRepository } from "typeorm";
import { HttpError } from "routing-controllers";
import Task from "../entity/impl/Task";
import { isNullOrUndefined } from "util";

@EntityRepository(Task)
export class TaskRepository {

    private manager: EntityManager;

    constructor() {
        this.manager = getManager();
    }

    public getAll(userId: number, estimatAt: string): Promise<Task[]> {

        return this.manager.createQueryBuilder(Task, 'tasks')
            .where('user_id = :userId and estimate_at <= :estimatAt', { userId, estimatAt })
            .orderBy('estimate_at')
            .getMany();

    }

    public insert(task: Task): Promise<Task> {

        return new Promise<Task>((resolve, reject) => {

            this.manager.save<Task>(task).then(entity => {
                resolve(entity);
            }).catch(error => reject(error));

        });

    }

    public delete(id: number): Promise<any> {

        return new Promise<any>((resolve, reject) => {

            this.manager.delete(Task, id)
                .then(() => resolve())
                .catch(error => reject(error));

        });

    }

    public changeDoneAt(id: number): Promise<Task> {

        return new Promise<Task>(async (resolve, reject) => {

            let task: Task = await this.manager.findOne(Task, id);

            if (isNullOrUndefined(task))
                return reject(new HttpError(400, 'Não foi encontrada uma tarefa com o id informado!'));

            task.DoneAt = task.DoneAt ? null : new Date();

            this.manager.save<Task>(task).then(entity => {
                resolve(entity);
            }).catch(error => reject(error));

        });

    }

}