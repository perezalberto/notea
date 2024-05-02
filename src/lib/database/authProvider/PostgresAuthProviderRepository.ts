import { PostgresConnection } from "../connections/PostgresConnection";
import { Criteria } from "../shared/criteria/Criteria";
import { PostgresCriteriaParser } from "../shared/criteria/PostgresCriteriaParser";
import { AuthProvider } from "./AuthProvider";
import { IAuthProviderRepository } from "./IAuthProviderRepository";
import { PostgresAuthProviderAdapter } from "./PostgresAuthProviderAdapter";

export class PostgresAuthProviderRepository implements IAuthProviderRepository {
	async create(authProvider: AuthProvider): Promise<void> {
		const authProviderInsert = 
			`INSERT INTO "auth_provider" (
				user_id, "provider_id", "provider_name"
			) VALUES (
				${authProvider.userId},
				'${authProvider.providerId}',
				'${authProvider.providerName}'
			)`
		await PostgresConnection.getInstance().query(authProviderInsert)
	}
	async update(providerId: string, providerName: string, authProvider: AuthProvider): Promise<void> {
		let updateSets = []
		if(authProvider.userId){
			updateSets.push(`"user_id" = '${authProvider.userId}'`)
		}
		if(authProvider.providerId) {
			updateSets.push(`"provider_id" = '${authProvider.providerId}'`)
		}
		if(authProvider.providerName) {
			updateSets.push(`"provider_name" = '${authProvider.providerName}'`)
		}
		await PostgresConnection.getInstance().query(
			`UPDATE "auth_provider" SET ${updateSets.join(", ")} WHERE "provider_id" = '${providerId}' AND "provider_name" = '${providerName}'`
		)
	}
	async delete(providerId: string, providerName: string): Promise<void> {
		await PostgresConnection.getInstance().query(`DELETE FROM "auth_provider" WHERE "provider_id" = '${providerId}' AND "provider_name" = '${providerName}'`)
	}
	async get(providerId: string, providerName: string): Promise<AuthProvider> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "auth_provider" WHERE "provider_id" = '${providerId}' AND "provider_name" = '${providerName}'`)
		return new PostgresAuthProviderAdapter(result.rows[0])
	}
	async matching(criteria: Criteria): Promise<AuthProvider[]> {
		const result = await PostgresConnection.getInstance().query(`SELECT * FROM "auth_provider" WHERE ${new PostgresCriteriaParser("auth_provider", criteria)}`)
		return result.rows.map(row => new PostgresAuthProviderAdapter(row))
	}

}