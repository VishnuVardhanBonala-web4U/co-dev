import User from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
providers: [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "text", placeholder: "jsmith@gmail.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials, req) {
      // Add logic here to look up the user from the credentials supplied
      const email = credentials.email
      try {
        await dbConnect();
        const user = await User.findOne({email});
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
],
pages:"/signin",
secret:process.env.NEXTAUTH_SECRET
};