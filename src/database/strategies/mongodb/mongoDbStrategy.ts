import mongoose, { Connection, DocumentQuery, Model, Query } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import IDb from './interfaces/IDb';
import { ClienteSchema } from './schemas/ClienteSchema';

class mongoDb extends IDb {
	schema: Model<any>

	constructor(schema: Model<any>) {
		super();

		this.schema = schema;
	}

	async connect(): Promise<Connection> {
		const connectionParams = {
			useCreateIndex: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		};

		await mongoose.connect('mongodb://localhost:27017/crm-vendas', connectionParams, (error) => {
			if (!error) return;
			console.log('[DATABASE] Connection failed!');
		});

		const { connection } = mongoose;

		connection.once('open', () => console.log('[DATABASE] is running'));

		return connection;
	}

	isConnect(): Number {
		return mongoose.connection.readyState;
	}

	disconnect(): Promise<void> {
		return mongoose.connection.close().then(() => console.log('[DATABASE] Connection closed'));
	}

	create(item: Object): Promise<any> {
		if (this.schema.modelName === 'Accountability') {
			autoIncrement.initialize(mongoose.connection);

			ClienteSchema.plugin(autoIncrement.plugin, {
				model: 'Accountability',
				field: 'number',
				startAt: 1,
				incrementBy: 1
			});
		}
		return this.schema.create(item);
	}

	read(item: Object, skip: number = 0, limit: number = 10): Query<any> {
		return this.schema.find(item).skip(skip);
	}

	update(id: String, item: Object): DocumentQuery<any, any> {
		return this.schema.updateOne({ _id: id }, { $set: item });
	}

	delete(id: String): Query<any> {
		return this.schema.deleteOne({ _id: id });
	}
}

export default mongoDb;
