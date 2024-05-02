export class User {
	readonly userId: string
	readonly name: string
	readonly email: string
	readonly image: string
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date

	constructor({userId, name, email, image, active, createdAt, updatedAt}: User) {
		this.userId = userId
		this.name = name
		this.email = email
		this.image = image
		this.active = active
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}