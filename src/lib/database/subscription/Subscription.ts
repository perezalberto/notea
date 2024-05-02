export class Subscription {
	readonly subscriptionId: string
	readonly userId: string
	readonly serviceName: string
	constructor({subscriptionId, userId, serviceName}: Subscription) {
		this.subscriptionId = subscriptionId
		this.userId = userId
		this.serviceName = serviceName
	}
}