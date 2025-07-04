import cn from "classnames";

interface ButtonProps {
    variant?: "primary" | "secondary";
    children: React.ReactNode;
}

export default function Button({ 
    variant = "primary",
    children 
}: ButtonProps) {
    return (
        <button 
            type="button" 
            className={cn(
                "cursor-pointer px-4 py-2 rounded-lg transition-all text-xs", 
                variant === "primary" && "bg-secondary hover:bg-secondary/60",
                variant === "secondary" && "bg-primary/20 hover:bg-primary/30"
            )}
        >
            {children}
        </button>
    );
}