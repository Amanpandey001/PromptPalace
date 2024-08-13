import Link from "next/link"
const Form = ({
  type,
  post,
  setPost,
  submitting,
  handleSubmit
}) => {
  return (
    <div className=" p-5 sm:min-h-[80vh] sm:w-[80%] mx-auto flex flex-col sm:items-center">
      <h1 className="text-4xl font-bold text-start sm:text-center">{type} Post</h1>
      <p className=" sm:w-[50%] mt-3 sm:text-center">{type} and share amazing prompts with the world, and let your imagination run wild with any AI-powered platform</p>
      <form onSubmit={handleSubmit} className="w-full mt-5 max-w-2xl flex flex-col gap-7 p-4 rounded-xl bg-zinc-300" >
        <label className="flex flex-col" htmlFor="">
          <span className="font-serif text-base font-semibold text-gray-800">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="border border-gray-400 my-2 h-[30vh] rounded-md p-2 w-full"
          />
        </label>
        <label className="flex flex-col" htmlFor="">
          <span className="font-serif text-base font-semibold text-gray-800">Tags <span className="text-gray-600">(#webdev , #nextjs , etc)</span></span>
          <input
            type="text"
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="Enter tags here..."
            required
            className="border border-gray-400 my-2 rounded-md px-2 py-1 w-full"
          />
        </label>
        <div className="flex mx-3 mb-4 justify-between gap-4">
          <button className="border sm:rounded-full px-2 py-2 hover:bg-slate-200 hover:text-black transition-all duration-150 text-center bg-gray-500 text-white font-bold w-[40%]"
            type="submit"
            disabled={submitting}
          >
            {submitting ? `${type}ing...` : `${type}`}
          </button>
          <Link className="border px-2 py-2 sm:rounded-full hover:bg-slate-200 hover:text-black transition-all duration-150 text-center bg-gray-500 text-white font-bold w-[40%]" href="">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default Form
