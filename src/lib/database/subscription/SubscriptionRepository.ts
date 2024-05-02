import { Criteria } from "../shared/criteria/Criteria"
import { ISubscriptionRepository } from "./ISubscriptionRepository"
import { Subscription } from "./Subscription"

export class SubscriptionRepository implements ISubscriptionRepository {
	private repository: ISubscriptionRepository
	constructor(subscriptionRepository: ISubscriptionRepository) {
		this.repository = subscriptionRepository
	}
	async create(subscription: Subscription): Promise<void> {
		await this.repository.create(subscription)
	}
	async update(userId: string, subscription: Subscription): Promise<void> {
		await this.repository.update(userId, subscription)
	}
	async delete(subscriptionId: string): Promise<void> {
		await this.repository.delete(subscriptionId)
	}
	async get(userId: string): Promise<Subscription | null> {
		return await this.repository.get(userId)
	}
	async matching(criteria: Criteria): Promise<Subscription[]> {
		return await this.repository.matching(criteria)
	}
}