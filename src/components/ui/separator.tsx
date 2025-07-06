import cn from "classnames";

export default function Separator({ className }: { className?: string }) {
    return (
        <div className={cn("w-full h-[1px] bg-primary/20", className)} />
    )
}
