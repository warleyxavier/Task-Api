import IUsuario from "./IUsuario";

export default interface ITask {

    Id: number;
    Description: string;
    EstimateDate: Date;
    DoneAt: Date;
    UserId: number;

}