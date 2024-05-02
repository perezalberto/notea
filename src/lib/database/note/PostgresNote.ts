export class PostgresNote {
	readonly note_id: string
	readonly name: string
	readonly description: string
	readonly template: string
	readonly encrypted: boolean
	readonly content: string
	readonly favorite: boolean
	readonly is_public: boolean
	readonly active: boolean
	readonly created_at: Date
	readonly updated_at: Date
	constructor({note_id, name, description, template, encrypted, content, favorite, is_public, active, created_at, updated_at}: PostgresNote) {
		this.note_id = note_id
		this.name = name
		this.description = description
		this.template = template
		this.encrypted = encrypted
		this.content = content
		this.favorite = favorite
		this.is_public = is_public
		this.active = active
		this.created_at = created_at
		this.updated_at = updated_at	
	}
}