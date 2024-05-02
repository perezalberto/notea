export class PostgresUser {
	readonly user_id: string
	readonly name: string
	readonly email: string
	readonly image: string
	readonly active: boolean
	readonly created_at: Date
	readonly updated_at: Date
	constructor({user_id, name, email, image, active, created_at, updated_at}: PostgresUser) {
		this.user_id = user_id
		this.name = name
		this.email = email
		this.image = image
		this.active = active
		this.created_at = created_at
		this.updated_at = updated_at
	}
}