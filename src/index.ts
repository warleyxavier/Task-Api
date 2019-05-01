import "reflect-metadata";
import { createConnection, useContainer as useContainerORM } from "typeorm";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import { UsuarioController } from "./controller/UsuarioController";
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware";

useContainer(Container);
useContainerORM(Container);

const app = createExpressServer({
    cors: true,
    controllers: [UsuarioController],
    middlewares: [AuthenticationMiddleware],
    
});
/*
app.use(cors({
    origin: "*",
})); */

app.use(bodyParser.json());

const connect = async () => {

    await createConnection().then(async connection => {

        app.listen(3000);

        console.log("Funcionando na porta 3000 ;) ");

    }).catch(error => console.log(error));

};

connect();