import { IconType } from "react-icons";

interface AuthSocialButtonProps {
    icon: IconType;
    name: string;
    onClick: () => void;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
    icon: Icon,
    name,
    onClick,
}) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="
        inline-flex
        w-full 
        justify-center 
        rounded-md 
        bg-white
        px-4 
        py-2 
        text-gray-500 
        shadow-sm 
        ring-1 
        ring-inset 
        ring-theme
        hover:bg-gray-50 
        focus:outline-offset-0
        items-center gap-[0.2px]
      "
        >
            <Icon size={25} /> <span className="font-bold text-lg">{name}</span>
        </button>
    );
}

export default AuthSocialButton;