import { Criteria } from "../shared/criteria/Criteria"
import { Group } from "./Group"

export interface IGroupRepository {
	create(userId: string, group: Group): Promise<void>
	update(groupId: string, group: Partial<Group>): Promise<void>
	delete(groupId: string): Promise<void>
	get(groupId: string): Promise<Group | null>
	matchingWithUserId(userId: string, criteria?: Criteria): Promise<Group[]>
	matching(criteria: Criteria): Promise<Group[]>
}