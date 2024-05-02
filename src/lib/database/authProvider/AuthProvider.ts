export class AuthProvider {
	readonly userId: string
	readonly providerId: string
	readonly providerName: string

	constructor({userId, providerId, providerName}: AuthProvider) {
		this.userId = userId
		this.providerId = providerId
		this.providerName = providerName
	}
}