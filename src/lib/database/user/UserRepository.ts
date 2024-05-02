import { IUserRepository } from "./IUserRepository";
import { User } from "./User";

export class UserRepository implements IUserRepository {
	private repository: IUserRepository
	constructor(userRepository: IUserRepository) {
		this.repository = userRepository
	}
	async create(user: User): Promise<void> {
		await this.repository.create(user)
	}
	async update(userId: string, user: Partial<User>): Promise<void> {
		await this.repository.update(userId, user)
	}
	async delete(userId: string): Promise<void> {
		await this.repository.delete(userId)
	}
	async get(userId: string): Promise<User | null> {
		return await this.repository.get(userId)
	}
	async getByEmail(email: string): Promise<User | null> {
		return await this.repository.getByEmail(email)
	}
}