import { Criteria } from "../shared/criteria/Criteria"
import { Note } from "./Note"

export interface INoteRepository {
	create(groupId: string, note: Note): Promise<void>
	addNoteToGroup(noteId: string, groupId: string): Promise<void>
	update(noteId: string, note: Partial<Note>): Promise<void>
	delete(noteId: string): Promise<void>
	get(noteId: string): Promise<Note | null>
	matchingWithGroupId(groupId: string, criteria?: Criteria): Promise<Note[]>
	matchingWithUserId(userId: string, criteria?: Criteria): Promise<Note[]>
	matching(criteria: Criteria): Promise<Note[]>
}