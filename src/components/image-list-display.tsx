import Button from "./ui/button";
import cn from "classnames";

interface ImageListDisplayProps {
    image: string;
    onRemove: () => void;
    index: number;
}

export default function ImageListDisplay({ image, onRemove, index }: ImageListDisplayProps) {
    return (
        <Button 
            variant="secondary"
            className="w-32 h-32 rounded-md relative group justify-self-center"
            onClick={onRemove}
        >
            <div className={cn(
                "text-[0.6rem] rounded-full w-4 h-4 bg-secondary border border-primary/40 opacity-50 group-hover:opacity-100 transition-opacity",
                "flex items-center justify-center",
                "absolute top-2 left-2"
            )}>
                {index + 1}
            </div>

            <img 
                src={image} 
                alt="uploaded" 
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        </Button>
    );
}