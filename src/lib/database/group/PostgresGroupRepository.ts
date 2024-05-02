import { PostgresConnection } from "../connections/PostgresConnection";
import { Criteria } from "../shared/criteria/Criteria";
import { PostgresCriteriaParser } from "../shared/criteria/PostgresCriteriaParser";
import { Group } from "./Group";
import { IGroupRepository } from "./IGroupRepository";
import { PostgresGroupAdapter } from "./PostgresGroupAdapter";

export class PostgresGroupRepository implements IGroupRepository {

	async create(userId: string, group: Group): Promise<void> {
		const groupInsert = `INSERT INTO "group" (
			"group_id", "name", "description", "icon", "active", "created_at", "updated_at"
		) VALUES (
			${group.groupId},
			${group.name},
			${group.description},
			${group.icon},
			${group.active},
			CURRENT_TIMESTAMP,
			CURRENT_TIMESTAMP
		)`
		const groupUserInsert = `INSERT INTO "user_group" (
			"user_id", "group_id"
		) VALUES (
			${userId},
			${group.groupId}
		)`
		await PostgresConnection.getInstance().query(`${groupInsert}; ${groupUserInsert};`)
	}
	async update(userId: string, group: Group): Promise<void> {
		let updateSets = []
		if(group.groupId) {
			updateSets.push(`"group_id" = '${group.groupId}'`)
		}
		if(group.name) {
			updateSets.push(`"name" = '${group.name}'`)
		}
		if(group.description) {
			updateSets.push(`"description" = '${group.description}'`)
		}
		if(group.icon) {
			updateSets.push(`"icon" = '${group.icon}'`)
		}
		if(group.active) {
			updateSets.push(`"active" = ${group.active ? "true" : "false"}`)
		}
		await PostgresConnection.getInstance().query(`UPDATE "group" SET ${updateSets.join(", ")} WHERE "group_id" = ${group.groupId};`)
	}
	async delete(groupId: string): Promise<void> {
		await PostgresConnection.getInstance().query(`DELETE FROM "group" WHERE "group_id" = ${groupId};`)
	}
	async get(groupId: string): Promise<Group | null> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "group" WHERE "group_id" = ${groupId};`)
		if(result.rows.length === 0) {
			return null
		}
		return new PostgresGroupAdapter(result.rows[0])
	}
	async matchingWithUserId(userId: string, criteria?: Criteria): Promise<Group[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "group", "user_group" WHERE "group"."group_id" = "user_group"."group_id" AND "user_group"."user_id" = ${userId}${criteria ? " AND " + new PostgresCriteriaParser("group", criteria) : ""};`)
		return result.rows.map(group => new PostgresGroupAdapter(group))
	}
	async matching(criteria: Criteria): Promise<Group[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "group" WHERE ${new PostgresCriteriaParser("group", criteria)}`)
		return result.rows.map(group => new PostgresGroupAdapter(group))
	}
}