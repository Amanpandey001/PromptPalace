import connectDB from "@/utils/dbconn";
import Prompt from "@/models/prompt";
export const POST = async (req) => {
    const { prompt, userId, tag } = await req.json();
    try {
        await connectDB();
        const newPrompt = new Prompt({ 
            prompt, 
            creator : userId, 
            tag 
        });
        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to create a new prompt"},{ status: 500 });
    }
}