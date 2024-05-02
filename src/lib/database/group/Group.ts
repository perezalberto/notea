export class Group {
	readonly groupId: string
	readonly name: string
	readonly description: string
	readonly icon: string
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date
	constructor({groupId, name, description, icon, active, createdAt, updatedAt}: Group) {
		this.groupId = groupId
		this.name = name
		this.description = description
		this.icon = icon
		this.active = active
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}