import { Criteria } from "../shared/criteria/Criteria"
import { INoteRepository } from "./INoteRepository"
import { Note } from "./Note"

export class NoteRepository implements INoteRepository {
	private repository: INoteRepository
	constructor(noteRepository: INoteRepository) {
		this.repository = noteRepository
	}
	create(groupId: string, note: Note): Promise<void> {
		return this.repository.create(groupId, note)
	}
	addNoteToGroup(noteId: string, groupId: string): Promise<void> {
		return this.repository.addNoteToGroup(noteId, groupId)
	}
	update(noteId: string, note: Partial<Note>): Promise<void> {
		return this.repository.update(noteId, note)
	}
	delete(noteId: string): Promise<void> {
		return this.repository.delete(noteId)
	}
	get(noteId: string): Promise<Note | null> {
		return this.repository.get(noteId)
	}
	matchingWithGroupId(groupId: string, criteria?: Criteria): Promise<Note[]> {
		return this.repository.matchingWithGroupId(groupId, criteria)
	}
	matchingWithUserId(userId: string, criteria?: Criteria): Promise<Note[]> {
		return this.repository.matchingWithUserId(userId, criteria)
	}
	matching(criteria: Criteria): Promise<Note[]> {
		return this.repository.matching(criteria)
	}
}