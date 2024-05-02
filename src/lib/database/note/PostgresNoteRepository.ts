import { PostgresConnection } from "../connections/PostgresConnection";
import { Criteria } from "../shared/criteria/Criteria";
import { PostgresCriteriaParser } from "../shared/criteria/PostgresCriteriaParser";
import { INoteRepository } from "./INoteRepository";
import { Note } from "./Note";
import { PostgresNoteAdapter } from "./PostgresNoteAdapter";

export class PostgresNoteRepository implements INoteRepository {
	async create(groupId: string, note: Note): Promise<void> {
		const noteInsert = `INSERT INTO "note" (
			"note_id", "name", "description", "template", "encrypted", "content", "favorite", "is_public", "active", "created_at", "updated_at"
		) VALUES (
			${note.noteId},
			${note.name},
			${note.description},
			${note.template},
			${note.encrypted},
			${note.content},
			${note.favorite},
			${note.isPublic},
			${note.active},
			CURRENT_TIMESTAMP,
			CURRENT_TIMESTAMP
		)`
		const groupInsert = `INSERT INTO "group_note" (
			"note_id", "group_id", "owner"
		) VALUES (
			${note.noteId},
			${groupId},
			TRUE
		)`
		await PostgresConnection.getInstance().query(`${noteInsert}; ${groupInsert};`)
	}
	async addNoteToGroup(noteId: string, groupId: string): Promise<void> {
		await PostgresConnection.getInstance().query(`
			INSERT INTO "group_note" (
				"note_id", "group_id", "owner"
			) VALUES (
				$1, $2, $3
			)`, [
				noteId,
				groupId,
				"FALSE"
			]
		)
	}
	async update(noteId: string, note: Partial<Note>): Promise<void> {
		let updateSets = []
		if(note.noteId) {
			updateSets.push(`"note_id" = '${note.noteId}'`)
		}
		if(note.name) {
			updateSets.push(`"name" = '${note.name}'`)
		}
		if(note.description) {
			updateSets.push(`"description" = '${note.description}'`)
		}
		if(note.template) {
			updateSets.push(`"template" = '${note.template}'`)
		}
		if(note.encrypted) {
			updateSets.push(`"encrypted" = ${note.encrypted ? "true" : "false"}`)
		}
		if(note.content) {
			updateSets.push(`"content" = '${note.content}'`)
		}
		if(note.favorite) {
			updateSets.push(`"favorite" = ${note.favorite ? "true" : "false"}`)
		}
		if(note.isPublic) {
			updateSets.push(`"is_public" = ${note.isPublic ? "true" : "false"}`)
		}
		updateSets.push(`"updated_at" = CURRENT_TIMESTAMP`)
		await PostgresConnection.getInstance().query(
			`UPDATE "note" SET ${updateSets.join(", ")} WHERE "note_id" = '${noteId}' ON CONFLICT ("note_id") DO NOTHING`
		)
	}
	async delete(noteId: string): Promise<void> {
		await PostgresConnection.getInstance().query(`DELETE FROM "note" WHERE "note_id" = '${noteId}'`)
	}
	async get(noteId: string): Promise<Note | null> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "note" WHERE "note_id" = '${noteId}'`)
		if(result.rows.length === 0) {
			return null
		}
		return new PostgresNoteAdapter(result.rows[0])
	}
	async matchingWithGroupId(groupId: string, criteria?: Criteria): Promise<Note[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "note", "group_note" WHERE "note"."note_id" = "group_note"."note_id" AND "group_note"."group_id" = '${groupId}'${criteria ? " AND " + new PostgresCriteriaParser("note", criteria) : ""}`)
		return result.rows.map(note => new PostgresNoteAdapter(note))
	}
	async matchingWithUserId(userId: string, criteria?: Criteria): Promise<Note[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "note", "group_note", "user_group" WHERE "note"."note_id" = "group_note"."note_id" AND "group_note"."group_id" = "user_group"."group_id" AND "user_group"."user_id" = '${userId}'${criteria ? " AND " + new PostgresCriteriaParser("note", criteria) : ""}`)
		return result.rows.map(note => new PostgresNoteAdapter(note))
	}
	async matching(criteria: Criteria): Promise<Note[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "note" WHERE ${new PostgresCriteriaParser("note", criteria)}`)
		return result.rows.map(note => new PostgresNoteAdapter(note))
	}
}