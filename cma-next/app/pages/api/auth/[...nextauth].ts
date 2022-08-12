import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
console.log("you are here", CredentialProvider, NextAuth);
export default NextAuth({
  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log({ credentials, req });
        // Add logic here to look up the user from the credentials supplied
        const user = { name: "mandi" };
        console.log({ user });
        if (user) {
          console.log("Congratulations! You are a verified user!!", user);
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
});
