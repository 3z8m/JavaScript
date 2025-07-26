import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib/prisma';
import bcryptjs from 'bcryptjs';


// ユーザー取得関数
async function getUser(email: string) {  
	return await prisma.user.findUnique({ 
		where: { email: email }
	})
} 


export const { auth, signIn, signOut, handlers } = NextAuth({
	...authConfig,
	
	// セッションの有効期限
	session: {
		strategy: 'jwt',
		maxAge: 2 * 60 * 60, // 2時間
	},

	providers: [
		Credentials({
		async authorize(credentials) {
			const parsedCredentials = z
			.object({ email: z.string().email(), password: z.string().min(8) })
			.safeParse(credentials);

			if (parsedCredentials.success) { 
				const { email, password } = parsedCredentials.data; 
				const user = await getUser(email); // ユーザー取得 

				if (!user)
					return null; 

				// パスワード比較
				const passwordsMatch = await bcryptjs.compare(password, user.password); 
				
				if (passwordsMatch)
					return user; 
			} 
			return null; 
		},
    }),
	],
	// セッションにidも含める
	callbacks: {
		// JWTトークンにIDを含める
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
			}
			return token
		},
		async session({ session, token }) {
			if (session.user) { 
				session.user.id = (token.id || token.sub || '') as string; 
				session.user.name = token.name ?? ''; 
				session.user.email = token.email ?? ''; 
			} 
			return session; 
		} 
	}
});