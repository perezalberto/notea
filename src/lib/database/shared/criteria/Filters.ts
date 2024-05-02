import { Filter } from "./Filter";
import { LogicalOperator } from "./LogicalOperator";

export class Filters {
	LogicalOperator: LogicalOperator = LogicalOperator.And
	filters: Filter[]
	subFilters: Filters[]

	private constructor(filters: Filter[]) {
		this.filters = filters
		this.subFilters = []
	}

	static and(filters: Filter[]): Filters {
		const filtersList = new Filters(filters)
		filtersList.LogicalOperator = LogicalOperator.And
		return filtersList
	}

	static or(filters: Filter[]): Filters {
		const filtersList = new Filters(filters)
		filtersList.LogicalOperator = LogicalOperator.Or
		return filtersList
	}

	and(filters: Filter[]): Filters {
		const filtersList = new Filters(filters)
		filtersList.LogicalOperator = LogicalOperator.And
		this.subFilters.push(filtersList)
		return this
	}

	or(filters: Filter[]): Filters {
		const filtersList = new Filters(filters)
		filtersList.LogicalOperator = LogicalOperator.Or
		this.subFilters.push(filtersList)
		return this
	}
}