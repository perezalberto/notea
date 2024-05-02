import { PostgresSubscription } from "./PostgresSubscription";
import { Subscription } from "./Subscription";

export class PostgresSubscriptionAdapter extends Subscription {
	constructor({subscription_id, user_id, service_name}: PostgresSubscription) {
		super({subscriptionId: subscription_id, userId: user_id, serviceName: service_name})
	}
}