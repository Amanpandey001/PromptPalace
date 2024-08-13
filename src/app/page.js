import Feed from "@/components/Feed";
export default function Home() {
  return (
    <main className="mt-16">
      <h1 className="font-bold flex items-center text-center flex-col">
        <div className="flex flex-col items-center leading-tight">
          <span className="text-4xl">Discover & Share</span>
          <span className="text-gray-600">AI-Powered Prompts</span>
        </div>
        <p className="text-center my-5 text-xs text-gray-700">
          PromptPalace is a collection of prompts created by the community.
        </p>
      </h1>
      <Feed />
    </main>
  );
}
