import { PostgresConnection } from "../connections/PostgresConnection"
import { Criteria } from "../shared/criteria/Criteria"
import { PostgresCriteriaParser } from "../shared/criteria/PostgresCriteriaParser"
import { ISubscriptionRepository } from "./ISubscriptionRepository"
import { PostgresSubscriptionAdapter } from "./PostgresSubscriptionAdapter"
import { Subscription } from "./Subscription"

export class PostgresSubscriptionRepository implements ISubscriptionRepository {
	async create(subscription: Subscription): Promise<void> {
		await PostgresConnection.getInstance().query(`
			INSERT INTO "subscription" (
				"subscription_id", "user_id", "service_name"
			) VALUES (
				$1, $2, $3
			)`, [
				subscription.subscriptionId,
				subscription.userId,
				subscription.serviceName
			]
		)
	}
	async update(userId: string, subscription: Subscription): Promise<void> {
		let updateSets = []
		if(subscription.subscriptionId){
			updateSets.push(`"subscription_id" = '${subscription.subscriptionId}'`)
		}
		if(subscription.userId) {
			updateSets.push(`"user_id" = '${subscription.userId}'`)
		}
		if(subscription.serviceName) {
			updateSets.push(`"service_name" = '${subscription.serviceName}'`)
		}
		await PostgresConnection.getInstance().query(
			`UPDATE "subscription" SET ${updateSets.join(", ")} WHERE "user_id" = '$1'`,
			[userId]
		)
	}
	async delete(subscriptionId: string): Promise<void> {
		await PostgresConnection.getInstance().query(`DELETE FROM "subscription" WHERE "subscription_id" = '$1'`, 
			[subscriptionId]
		)
	}
	async get(userId: string): Promise<Subscription | null> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "subscription" WHERE "user_id" = '$1'`, 
			[userId]
		)
		if(result.rows.length === 0) {
			return null
		}
		return new PostgresSubscriptionAdapter(result.rows[0])
	}
	async matching(criteria: Criteria): Promise<Subscription[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "subscription" WHERE ${new PostgresCriteriaParser("subscription", criteria)}`)
		return result.rows.map(row => new PostgresSubscriptionAdapter(row))
	}
}