import MongoDbStrategy from '../mongoDbStrategy';
import ClienteSchema from '../schemas/ClienteSchema';
import ConnectionStateEnum from '../enums/ConnectionState';
import { Cliente } from '../../../../types/types';

const mongoDbContext = new MongoDbStrategy(ClienteSchema);

let mockCliente: Cliente = gerarNovoCliente();
let mockClienteId: String;

function gerarNovoCliente(): Cliente {
	return {
	}
}

function retornarCliente(res: Cliente): Cliente {
	return {
	}
}

describe.skip('MongoDb Tests Suite', () => {

	beforeAll(async () => {
		await mongoDbContext.connect();
		mockClienteId = await mongoDbContext.create(mockCliente).then(res => res._id);
	});

	afterAll(async () => {
		await mongoDbContext.disconnect();
	});

	describe('Testes de conexão', () => {
		test('Deve retornar status de conexão', async () => {
			const isConnected = await mongoDbContext.isConnect();

			expect(isConnected).toEqual(ConnectionStateEnum.Connected);
		});
	});

	describe('CRUD Testes', () => {
		test('Deve cadastrar e retornar o novo cliente', async () => {
			const novoClienteMock = gerarNovoCliente();
			let clienteCadastrado = await mongoDbContext.create(novoClienteMock).then(res => retornarCliente(res));

			expect(clienteCadastrado).toEqual(novoClienteMock);
		});

		test('Deve retornar todos os clientes', async () => {
			let clientesListados = await mongoDbContext.read({});

			expect(clientesListados).toHaveLength;
		});

		test('Deve retornar um cliente específico', async () => {
			let clienteEncontrado = await mongoDbContext.read({ _id: mockClienteId }).then(res => retornarCliente(res.shift()));

			expect(clienteEncontrado).toEqual(mockCliente);
		});

		test('Deve atualizar os dados do cliente e retornar o status da ação', async () => {
			let resultado = await mongoDbContext.update(mockClienteId, { email: `${new Date().getTime()}@gmail.com` });

			expect(resultado.nModified).toEqual(1);
		});

		test('Deve excluir retornar o status da ação', async () => {
			let resultado = await mongoDbContext.delete(mockClienteId);

			expect(resultado.deletedCount).toEqual(1)
		});
	});
})
