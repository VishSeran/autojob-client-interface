

interface UserAvatarProp {
    username: string
}

const UserAvatar = ({username}:UserAvatarProp) => {

    const getInitials = (name:string) => {

        return name
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .slice(0,2)
        .map((word)=> word.charAt(0).toUpperCase())
        .join("");
    }

    return (

        <div className="w-10 h-10 rounded-full bg-linear-to-r from-blue-700 to-purple-700 px-4 py-1 
            text-white hover:bg-blue-700 shadow-xl flex items-center justify-center font-semibold text-xl">
            {getInitials(username)}
        </div>
    )
}

export default UserAvatar