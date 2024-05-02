export class PostgresGroup {
	readonly group_id: string
	readonly name: string
	readonly description: string
	readonly icon: string
	readonly active: boolean
	readonly created_at: Date
	readonly updated_at: Date
	constructor({group_id, name, description, icon, active, created_at, updated_at}: PostgresGroup) {
		this.group_id = group_id
		this.name = name
		this.description = description
		this.icon = icon
		this.active = active
		this.created_at = created_at
		this.updated_at = updated_at
	}
}