import connectDB from "@/utils/dbconn";
import Prompt from "@/models/prompt";

export async function GET(req) {
    try {
        await connectDB();
        
        // Extract query parameters from the URL
        const url = new URL(req.url);
        const searchQuery = url.searchParams.get('searchQuery');
        
        // Log the query for debugging
        console.log('Search Query:', searchQuery);

        // Check if searchQuery is provided
        if (!searchQuery) {
            return new Response(JSON.stringify({ message: 'Missing searchQuery parameter' }), { status: 400 });
        }

        const prompts = await Prompt.find({
            tag: { $regex: searchQuery, $options: "i" },
        }).populate("creator");

        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: error.message }), { status: 500 });
    }
}
