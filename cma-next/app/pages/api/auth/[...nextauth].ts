import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Username",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "exampleuser",
        },
      },
      async authorize(credentials) {
          // Add logic here to look up the user from the credentials supplied
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
        const user =
          data?.com_psddev_cms_db_ToolUserQuery?.items[0]?.username;

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // user will be defined upon initial login
      if (user) {
        token.brightspotUser = user as unknown as string
      }
      return token;
    },
    session: async ({ session, token}) => {
      if (session.user) {
          token.brightspotUser
          session.user.name = token.brightspotUser
          }
      return session;
    },
  },
});
