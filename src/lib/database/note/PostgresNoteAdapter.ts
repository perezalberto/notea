import { Note } from "./Note";
import { PostgresNote } from "./PostgresNote";

export class PostgresNoteAdapter extends Note {
	constructor({note_id, name, description, template, encrypted, content, favorite, is_public, active, created_at, updated_at}: PostgresNote) {
		super({noteId: note_id, name, description, template, encrypted, content, favorite, isPublic: is_public, active, createdAt: created_at, updatedAt: updated_at})
	}
}