import { Criteria } from "../shared/criteria/Criteria"
import { Group } from "./Group"
import { IGroupRepository } from "./IGroupRepository"

export class GroupRepository implements IGroupRepository {
	private repository: IGroupRepository
	constructor(groupRepository: IGroupRepository) {
		this.repository = groupRepository
	}
	create(userId: string, group: Group): Promise<void> {
		return this.repository.create(userId, group)
	}
	update(groupId: string, group: Group): Promise<void> {
		return this.repository.update(groupId, group)
	}
	delete(groupId: string): Promise<void> {
		return this.repository.delete(groupId)
	}
	get(groupId: string): Promise<Group | null> {
		return this.repository.get(groupId)
	}
	matchingWithUserId(userId: string, criteria?: Criteria): Promise<Group[]> {
		return this.repository.matchingWithUserId(userId, criteria)
	}
	matching(criteria: Criteria): Promise<Group[]> {
		return this.repository.matching(criteria)
	}
}