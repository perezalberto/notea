import { AuthProvider } from "./AuthProvider";
import { PostgresAuchProvider } from "./PostgresAuthProvider";

export class PostgresAuthProviderAdapter extends AuthProvider {
	constructor({user_id, provider_id, provider_name}: PostgresAuchProvider) {
		super({userId: user_id, providerId: provider_id, providerName: provider_name})
	}
}