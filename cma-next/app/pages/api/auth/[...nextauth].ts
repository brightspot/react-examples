import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
console.log("you are here", CredentialProvider, NextAuth);
export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log("CREDENTIALS: ", credentials?.username);
        const enteredUser = { name: credentials?.username };
        console.log("ENTEREDUSER: ", enteredUser);
        async function login(url = "", data = {}) {
          const response = await fetch(url, {
            method: "POST",
            mode: "no-cors",
            cache: "no-cache",
            credentials: "same-origin",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });
          return response.json();
        }

        const finalResult = await login(
          `${process.env.NEXT_PUBLIC_HOST}/api/login`,
          enteredUser
        ).then((data) => {
          console.log("DATA RETURNED FROM LOGIN FUNCTION", data);
          if (data === enteredUser.name) {
            console.log(
              "Congratulations! You are a verified user!!",
              data,
              enteredUser.name
            );
            return data;
          } else {
            return null;
          }
        });
        if (finalResult) {
          return finalResult;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      // user will be defined upon initial login
      console.log("TOKEN: ", token, "USER: ", user);
      if (user) {
        token.brightspotUser = user as unknown as string;
      }
      return token;
    },
    session: async ({ session, token }) => {
      console.log("SESSION: ", session, "TOKEN: ", token);
      if (session.user) {
        console.log("YOU have a user", session.user);
        token.brightspotUser;
        session.user.name = token.brightspotUser;
        console.log("AFTER SETTING session.user.name: ", session.user.name);
      }
      return session;
    },
  },
});
