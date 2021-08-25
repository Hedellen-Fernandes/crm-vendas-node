import { Request, Response } from 'express';
import ICliente from './ICliente';

import mongoDbStrategy from '@mongoDbStrategies/mongoDbStrategy';
import ClienteSchema from '@mongoDbSchemas/ClienteSchema';
import ClienteStatusEnum from './enums/ClienteStatusEnum';

const clienteSchema = new mongoDbStrategy(ClienteSchema);

class ClienteController {
    async create(req: Request, res: Response) {
        await clienteSchema.connect();

        const clienteCadastrar: ICliente = req.body;

        let cliente: ICliente = await clienteSchema.create(clienteCadastrar);

        clienteSchema.disconnect();
        res.json(cliente);
    }

    async read(req: Request, res: Response) {
        await clienteSchema.connect();

        const clientes = await clienteSchema.read({});

        clienteSchema.disconnect();
        res.send(clientes);
    }
}

export default new ClienteController();