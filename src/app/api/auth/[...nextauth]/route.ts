import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
		})
	],
	callbacks: {
		session: async ({ session, token }: { session: any; token: any }) => {
		  if (session?.user) {
			session.user.id = token.uid;
		  }
		  return session;
		},
		signIn: async ({ profile }) => {
			return true
		},
		jwt: async ({ user, token }) => {
		  if (user) {
			token.uid = user.id;
		  }
		  return token;
		},
	  },
	  session: {
		strategy: 'jwt',
	  },
})

export { handler as GET, handler as POST }