import cn from "classnames";

interface ButtonProps {
    variant?: "primary" | "secondary";
    className?: string;
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({ 
    variant = "primary",
    className,
    children,
    onClick,
    disabled
}: ButtonProps) {
    return (
        <button 
            type="button" 
            className={cn(
                "cursor-pointer px-4 py-2 rounded-lg transition-all text-xs", 
                variant === "primary" && "bg-secondary hover:bg-secondary/60 border border-primary/40",
                variant === "secondary" && "bg-primary/10 hover:bg-primary/20 border border-primary/20",
                className
            )}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}