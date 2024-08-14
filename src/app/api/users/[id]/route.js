import connectDB from "@/utils/dbconn";
import User from "@/models/user";
export const GET = async (res, { params }) => {
    try {
        await connectDB();

        const user = await User.findById(params.id);
        if (!user) {
            return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
        }

        return new Response(JSON.stringify(user), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to fetch all prompts"}, { status: 500 });
    }
}