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
        console.log("data", data);
        if (!response.ok) {
          throw new Error(data.message || "something went wrong....");
        }
        // example of fetching various data for user
        const username =
          data?.com_psddev_cms_db_ToolUserQuery?.items[0]?.username;
        const role =
          data?.com_psddev_cms_db_ToolUserQuery?.items[0]?.getRoleName;
        const avatar =
          data?.com_psddev_cms_db_ToolUserQuery?.items[0]?.avatar?.publicUrl;
        if (!username) {
          throw new Error("no user found");
        }

        return { username, role, avatar };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: async ({ session, token }) => {
      if (session && session.user) {
        session.user.name = token.user as string;
      }
      return session;
    },
  },
});
