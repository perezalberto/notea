import { Group } from "./Group";
import { PostgresGroup } from "./PostgresGroup";

export class PostgresGroupAdapter extends Group {
	constructor({group_id, name, description, icon, active, created_at, updated_at}: PostgresGroup) {
		super({groupId: group_id, name, description, icon, active, createdAt: created_at, updatedAt: updated_at})
	}
}