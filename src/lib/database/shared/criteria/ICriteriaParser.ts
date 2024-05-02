import { Criteria } from "./Criteria";

export interface ICriteriaParser<T> {
	parse(criteria: Criteria): T
}