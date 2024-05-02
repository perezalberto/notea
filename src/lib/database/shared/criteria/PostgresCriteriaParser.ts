import { Criteria } from "./Criteria";
import { Field } from "./Field";
import { Filter } from "./Filter";
import { Filters } from "./Filters";
import { ICriteriaParser } from "./ICriteriaParser";
import { LogicalOperator } from "./LogicalOperator";
import { Operator } from "./Operator";
import { Order } from "./Order";
import { OrderDirection } from "./OrderDirection";
import { Value } from "./Value";

export class PostgresCriteriaParser implements ICriteriaParser<string> {
	private readonly table: string
	constructor(table: string,criteria: Criteria) {
		this.table = table
		this.parse(criteria)
	}
	parse(criteria: Criteria): string {
		let query = ""
		if(criteria.filters) {
			if(criteria.filters.filters) {
				query += ` ${this.parseFilters(criteria.filters)}`
			}
			if(criteria.filters.subFilters) {
				query += ` ${this.parseLogicalOperator(criteria.filters.LogicalOperator)} ( ${this.parseSubFilters(criteria.filters.subFilters).join(" " + this.parseLogicalOperator(criteria.filters.LogicalOperator) + " ")} )`
			}
		}
		if(criteria.order) {
			query += ` ${this.parseOrder(criteria.order)}`
		}
		if(criteria.limit !== undefined	&& criteria.offset !== undefined) {
			query += ` ${this.parsePagination(criteria.limit, criteria.offset)}`
		}
		return query
	}

	private parseOperator(operator: Operator): string {
		switch (operator) {
			case Operator.Equal:
				return "="
			case Operator.NotEqual:
				return "!="
			case Operator.GreaterThan:
				return ">"
			case Operator.GreaterThanOrEqual:
				return ">="
			case Operator.LessThan:
				return "<"
			case Operator.LessThanOrEqual:
				return "<="
		}
	}

	private parseLogicalOperator(logicalOperator: LogicalOperator): string {
		switch (logicalOperator) {
			case LogicalOperator.And:
				return "AND"
			case LogicalOperator.Or:
				return "OR"
		}
	}

	private parseValue(value: Value): string {
		switch (value.type()) {
			case "string":
				return `'${value}'`
			case "number":
				return `${value}`
			case "boolean":
				return `${value}`
			case "date":
				return `'${value}'`
			default:
				return `'${value}'`
		}
	}

	private parseSubFilters(filters: Filters[]): string[] {
		return filters.map(subFilters => this.parseFilters(subFilters))
	}

	private parseFilters(filters: Filters): string {
		return filters.filters.map(filter => this.parseFilter(filter)).join(` ${this.parseLogicalOperator(filters.LogicalOperator)} `)
	}

	private parseField(field: Field): string {
		return this.table + "." + field.map(field => `"${field}"`).join(".")
	}

	private parseFilter(filter: Filter): string {
		return `${this.parseField(filter.field)} ${this.parseOperator(filter.operator)} ${this.parseValue(filter.value)}`
	}

	private parseOrder(order: Order): string {
		return `ORDER BY "${order.field}" ${order.direction === OrderDirection.Desc ? "DESC" : "ASC"}`
	}

	private parsePagination(limit: number, offset: number): string {
		return `LIMIT ${limit} OFFSET ${offset}`
	}
}