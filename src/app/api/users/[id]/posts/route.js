import connectDB from "@/utils/dbconn";
import Prompt from "@/models/prompt";

export const GET = async (res, { params }) => {
    try {
        await connectDB();

        const prompts = await Prompt.find({
            creator: params.id
        }).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to fetch all prompts"}, { status: 500 });
    }
}