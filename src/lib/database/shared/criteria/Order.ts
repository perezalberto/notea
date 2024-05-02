import { OrderDirection } from "./OrderDirection"

export class Order {
	readonly field: string
	readonly direction: OrderDirection
	constructor({field, direction}: Order) {
		this.field = field
		this.direction = direction
	}
}