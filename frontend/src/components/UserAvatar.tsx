

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

        <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold text-sm">
            {getInitials(username)}
        </div>
    )
}