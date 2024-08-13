import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth/next";
import connectDB from "@/utils/dbconn";
import User from "@/models/user";
const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email });
                if (!sessionUser) {
                    throw new Error("User not found");
                }
                session.user.id = sessionUser.id.toString();
            } catch (error) {
                console.error("Error in session callback:", error.message);
            }
            return session;
        },
        async signIn({ profile }) {
            try {
                await connectDB();
                const userExists = await User.findOne({ email: profile.email });
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture,
                    });
                }
                return true;  // Return true to indicate the sign-in was successful
            } catch (error) {
                console.error("Error in sign-in callback:", error.message);
                return false; // Return false to indicate the sign-in failed
            }
        },
    },
})

export { handler as GET, handler as POST }