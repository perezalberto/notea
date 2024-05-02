import { Criteria } from "../shared/criteria/Criteria"
import { AuthProvider } from "./AuthProvider"

export interface IAuthProviderRepository {
	create(authProvider: AuthProvider): Promise<void>
	update(providerId: string, providerName: string, authProvider: AuthProvider): Promise<void>
	delete(providerId: string, providerName: string): Promise<void>
	get(providerId: string, providerName: string): Promise<AuthProvider>
	matching(criteria: Criteria): Promise<AuthProvider[]>
}