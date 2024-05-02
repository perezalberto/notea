import { Criteria } from "../shared/criteria/Criteria";
import { User } from "./User";

export interface IUserRepository {
	create(user: User): Promise<void>
	update(userId: string, user: Partial<User>): Promise<void>
	delete(userId: string): Promise<void>
	get(userId: string): Promise<User | null>
	getByEmail(email: string): Promise<User | null>
	matching(criteria: Criteria): Promise<User[]>
}