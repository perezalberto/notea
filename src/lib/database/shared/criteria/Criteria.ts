import { Filters } from "./Filters";
import { Order } from "./Order";

export abstract class Criteria {
	readonly filters: Filters
	readonly order: Order
	readonly limit?: number
	readonly offset?: number
	constructor({filters, order, limit, offset}: Criteria) {
		this.filters = filters
		this.order = order
		this.limit = limit
		this.offset = offset
	}
}