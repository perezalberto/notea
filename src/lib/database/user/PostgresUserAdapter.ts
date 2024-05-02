import { PostgresUser } from "./PostgresUser";
import { User } from "./User";

export class PostgresUserAdapter extends User {
	constructor({user_id, name, email, image, active, created_at, updated_at}: PostgresUser) {
		super({userId: user_id, name, email, image, active, createdAt: created_at, updatedAt: updated_at})
	}
}