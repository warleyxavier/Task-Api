import "reflect-metadata";
import { createConnection } from "typeorm";
import { createExpressServer } from "routing-controllers";

const app = createExpressServer({
    controllers: [],
    middlewares: [],
});

const connect = async () => {

    await createConnection().then(async connection => {

        app.listen(3000);

        console.log("Funcionando na porta 3000 ;) ");

    }).catch(error => console.log(error));

};

connect();