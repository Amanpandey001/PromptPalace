
import connectDB from "@/utils/dbconn";
import Prompt from "@/models/prompt";

//GET (to read)
export const GET = async (req, { params }) => {
    try {
        await connectDB();
        const prompt = await Prompt.findById(params.id).populate("creator");
        if (!prompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
        }
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to fetch all prompts"}, { status: 500 });
    }
}
 
//PATCH (to update)
export const PATCH = async (req, { params }) => {
    const { prompt, tag } = await req.json();
    try {
        await connectDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) {
            return new Response(JSON.stringify({ message: "Prompt not found" }), { status: 404 });
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to update prompt"}, { status: 500 });
    }
}

//DELETE (to delete)
export const DELETE = async (req, { params }) => {
    try {
        await connectDB();
        await Prompt.findByIdAndDelete(params.id);
        return new Response(JSON.stringify({ message: "Prompt deleted successfully" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify(error),{message: "Failed to delete prompt"}, { status: 500 });
    }
}