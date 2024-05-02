export class PostgresSubscription {
	readonly subscription_id: string
	readonly user_id: string
	readonly service_name: string
	constructor({subscription_id, user_id, service_name}: PostgresSubscription) {
		this.subscription_id = subscription_id
		this.user_id = user_id
		this.service_name = service_name
	}
}