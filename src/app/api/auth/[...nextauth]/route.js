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
        
                const email = profile.email;
                const existingUser = await User.findOne({ email });
        
                if (!existingUser) {
                    // Generate a unique username
                    const baseUsername = profile.name.replace(" ", "").toLowerCase();
                    let username = baseUsername;
                    let count = 1;
        
                    // Ensure the username is unique
                    while (await User.findOne({ username })) {
                        username = `${baseUsername}${count}`;
                        count++;
                    }
        
                    await User.create({
                        email,
                        username,
                        image: profile.picture,
                    });
                }
        
                return true;
            } catch (error) {
                console.error("Error in sign-in callback:", error.message);
                return false;
            }
        }        
    },
})

export { handler as GET, handler as POST }