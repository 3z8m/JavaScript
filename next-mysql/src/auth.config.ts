import type { NextAuthConfig } from 'next-auth'


export const authConfig = {
    pages: {
        signIn: '/login',
    },

    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            
            // ログインしているかどうか確認
            const isLoggedIn = !!auth?.user;

            // ログイン後のページ
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
            || nextUrl.pathname.startsWith('/manage')

            if (isOnDashboard) {
                if (isLoggedIn) return true;
                return Response.redirect(new URL('/login', nextUrl));
            }
            // ログインしている状態でログインページにアクセスした場合
            else if (isLoggedIn && nextUrl.pathname === '/login') {
                return Response.redirect(new URL('/dashboard', nextUrl));
            }
            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
