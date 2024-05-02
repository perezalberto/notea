import pg from "pg";

const { Client } = pg;

export class PostgresConnection {
	private static instance: PostgresConnection
	private client: pg.Client
	private isConnected = false
	private constructor(connectionString: string) {
		this.client = new Client({
			connectionString,
		});
	}
	private async connect(): Promise<void> {
		await this.client.connect();
		this.isConnected = true;
	}
	static getInstance(): pg.Client {
		if (!PostgresConnection.instance) {
			const newInstance = new PostgresConnection(process.env.POSTGRES_URL as string);
			PostgresConnection.instance = newInstance;
			newInstance.connect();
			return newInstance.client;
		}else{
			if(!PostgresConnection.instance.isConnected){
				PostgresConnection.instance.connect();
			}
			return PostgresConnection.instance.client;
		}
	}
}