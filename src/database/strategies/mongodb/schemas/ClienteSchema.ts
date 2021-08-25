import * as mongoose from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import ICliente from '@mongoDbStrategies/interfaces/ICliente';

export const ClienteSchema = new mongoose.Schema({
});

const Cliente = mongoose.model<ICliente>('Cliente', ClienteSchema);

export default Cliente;
