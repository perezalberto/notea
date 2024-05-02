export class PostgresAuchProvider {
	readonly user_id: string
	readonly provider_id: string
	readonly provider_name: string
	constructor({user_id, provider_id, provider_name}: PostgresAuchProvider) {
		this.user_id = user_id
		this.provider_id = provider_id
		this.provider_name = provider_name
	}
}