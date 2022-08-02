import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import { IoConstructOutline } from "react-icons/io5";


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
        console.log({ data })
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
      console.log('USER!!!!!!!!!!!!', user)
      console.log('TOKEN!!!!', token)
      // user will be defined upon initial login
      if (user) {
        token.user = user.username
      }
      return token;
    },
    session: async ({ session, token}) => {
      if (session && session.user && token) {
          console.log('TOKEN!!!', token)
            session.user.name = token.user
            console.log('SESSION.USER.NAME', session.user.name)
          }
      return session;
    },
  },
});
