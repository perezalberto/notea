export class Note {
	readonly noteId: string
	readonly name: string
	readonly description: string
	readonly template: string
	readonly encrypted: boolean
	readonly content: string
	readonly favorite: boolean
	readonly isPublic: boolean
	readonly active: boolean
	readonly createdAt: Date
	readonly updatedAt: Date

	constructor({ noteId, name, description, template, encrypted, content, favorite, isPublic, active, createdAt, updatedAt }: Note) {
		this.noteId = noteId
		this.name = name
		this.description = description
		this.template = template
		this.encrypted = encrypted
		this.content = content
		this.favorite = favorite
		this.isPublic = isPublic
		this.active = active
		this.createdAt = createdAt
		this.updatedAt = updatedAt
	}
}