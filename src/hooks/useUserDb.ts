import { PostgresUserRepository } from "@/lib/database/user/PostgresUserRepository";
import { User } from "@/lib/database/user/User";
import { UserRepository } from "@/lib/database/user/UserRepository";
import { useState } from "react";

export async function useUserDb(userId: string) {
	const [user, setUser] = useState({} as {error?: Error, data?: User})
	const repository = new UserRepository(new PostgresUserRepository())
	try {
		const userData = await repository.get(userId)
		if(userData !== null) {
			setUser({data: userData})
		}else{
			setUser({error: new Error("User not found")})
		}
	} catch (e) {
		setUser({error: e as Error})
	}
	return user
}