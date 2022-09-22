import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user === undefined) return token;

      token = {
        id: user.id,
        email: user.email,
        name: user.name,
        rol: user.rol,
      };
      return token;
    },
    session({ session, token, user }) {
      session.user = {
        email: token.email,
        id: token.id,
        name: token.name,
        rol: token.rol,
      };
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      name: "Advertiser Credentials",
      type: "credentials",
      credentials: {
        name: { type: "text" },
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize(credentials, req) {
        if (
          credentials === undefined ||
          credentials.email === undefined ||
          credentials.name === undefined ||
          credentials.password === undefined
        ) {
          return null;
        }

        //TODO: LOGICA PARA VALIDAR DATOS USUARIO
        const randomiId: string = Math.floor(Math.random() * 1000).toString(16);

        const user: User = {
          id: randomiId,
          email: credentials.email,
          name: credentials.name,
          rol: "business",
        };

        return user;
      },
    }),
  ],
});
