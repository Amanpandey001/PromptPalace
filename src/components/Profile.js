import PromptCard from "./PromptCard"
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
    return (
        <div className="sm:w-[70%] mt-5 p-4 mx-auto">
            <h1 className="text-3xl font-bold text-center"><span>{name} Profile</span></h1>
            <p className="text-center text-xl">{desc}</p>
            <div className="mt-10 flex flex-col justify-center items-center flex-wrap">
                {data.map((post) => (
                    <PromptCard
                        key={post._id}
                        post={post}
                        handleEdit={() => handleEdit && handleEdit(post)}
                        handleDelete={() => handleDelete && handleDelete(post)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Profile
