import { Field } from "./Field"
import { Operator } from "./Operator"
import { Value } from "./Value"

export class Filter {
	readonly field: Field
	readonly operator: Operator
	readonly value: Value
	constructor({field, operator, value}: Filter) {
		this.field = field
		this.operator = operator
		this.value = value
	}
}