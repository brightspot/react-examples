import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Username",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "exampleuser",
        },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOST}/api/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "something went wrong....");
        }
        const username =
          data?.com_psddev_cms_db_ToolUserQuery?.items[0]?.username;

        if (!username) {
          throw new Error("no user found");
        }

        return { username };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // user will be defined upon initial login
      if (user) {
        token.user = user.username
      }
      return token;
    },
    session: async ({ session, token}) => {
      if (session && session.user && token) {
            session.user.name = token.name
          }
      return session;
    },
  },
});
