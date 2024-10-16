import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await dbConnect();

          // Find the user by email
          const user = await UserModel.findOne({ email });
          if (!user) {
            throw new Error("No user found with the provided email.");
          }

          // Check if the password is correct
          const isPasswordValid = await bcrypt.compare(password, user.password);
          if (!isPasswordValid) {
            throw new Error("Incorrect password.");
          }

          // Return the user object if authentication is successful
          return { id: user._id, email: user.email };
        } catch (error) {
          console.error("Authorization error:", error.message);
          throw new Error("Authorization failed. Please try again.");
        }
      },
    }),
  ],
  // Using JWT for session management
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Attach user ID to the token
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id; // Attach user ID to the session
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
