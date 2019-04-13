import "reflect-metadata";
import { createConnection } from "typeorm";
import { createExpressServer } from "routing-controllers";
import * as cors from "cors";
import * as bodyParser from "body-parser";

const app = createExpressServer({
    controllers: [],
    middlewares: [],
});

app.use(cors({
    origin: "*",
}));

app.use(bodyParser.json());

const connect = async () => {

    await createConnection().then(async connection => {

        app.listen(3000);

        console.log("Funcionando na porta 3000 ;) ");

    }).catch(error => console.log(error));

};

connect();