import { createExpressServer } from "routing-controllers";

const app = createExpressServer({});

const connect = () => {
    app.listen(3000);
    console.log('Executing :)')
};

connect();