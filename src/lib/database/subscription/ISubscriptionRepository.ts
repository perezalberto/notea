import { Criteria } from "../shared/criteria/Criteria"
import { Subscription } from "./Subscription"

export interface ISubscriptionRepository {
	create(subscription: Subscription): Promise<void>
	update(userId: string, subscription: Subscription): Promise<void>
	delete(subscriptionId: string): Promise<void>
	get(userId: string): Promise<Subscription | null>
	matching(criteria: Criteria): Promise<Subscription[]>
}