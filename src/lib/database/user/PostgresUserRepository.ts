import { PostgresConnection } from "../connections/PostgresConnection";
import { Criteria } from "../shared/criteria/Criteria";
import { PostgresCriteriaParser } from "../shared/criteria/PostgresCriteriaParser";
import { IUserRepository } from "./IUserRepository";
import { PostgresUserAdapter } from "./PostgresUserAdapter";
import { User } from "./User";

export class PostgresUserRepository implements IUserRepository {
	async create(user: User): Promise<void> {
		await PostgresConnection.getInstance().query(`
			INSERT INTO "user" (
				"user_id", "name", "email", "image", "active", "created_at", "updated_at"
			) VALUES (
				$1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
			)`, [
				user.userId,
				user.name,
				user.email,
				user.image,
				user.active
			]
		)
	}
	async update(userId: string, user: Partial<User>): Promise<void> {
		let updateSets = []
		if(user.userId){
			updateSets.push(`"user_id" = '${user.userId}'`)
		}
		if(user.name) {
			updateSets.push(`"name" = '${user.name}'`)
		}
		if(user.email) {
			updateSets.push(`"email" = '${user.email}'`)
		}
		if(user.image) {
			updateSets.push(`"image" = '${user.image}'`)
		}
		if(user.active) {
			updateSets.push(`"active" = ${user.active ? "true" : "false"}`)
		}
		updateSets.push(`"updated_at" = CURRENT_TIMESTAMP`)
		await PostgresConnection.getInstance().query(
			`UPDATE "user" SET ${updateSets.join(", ")} WHERE "user_id" = '${userId} ON CONFLICT ("user_id") DO NOTHING`
		)
	}
	async delete(userId: string): Promise<void> {
		await PostgresConnection.getInstance().query(`DELETE FROM "user" WHERE "user_id" = '${userId}'`)
	}
	async get(userId: string): Promise<User | null> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "user" WHERE "user_id" = '${userId}'`)
		if(result.rows.length === 0) {
			return null
		}
		return new PostgresUserAdapter(result.rows[0])
	}
	async getByEmail(email: string): Promise<User | null> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "user" WHERE "email" = '${email}'`)
		if(result.rows.length === 0) {
			return null
		}
		return new PostgresUserAdapter(result.rows[0])
	}
	async matching(criteria: Criteria): Promise<User[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "user" WHERE ${new PostgresCriteriaParser("user", criteria)}`)
		return result.rows.map(row => new PostgresUserAdapter(row))
	}
}