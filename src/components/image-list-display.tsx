import Button from "./ui/button";
import cn from "classnames";

interface ImageListDisplayProps {
    image: string;
    onImageClick: () => void;
    index: number;
    isDragging?: boolean;
    isDragOver?: boolean;
    onDragStart?: (e: React.DragEvent, index: number) => void;
    onDragEnd?: () => void;
    onDragOver?: (e: React.DragEvent) => void;
    onDrop?: (e: React.DragEvent, index: number) => void;
    draggedIndex?: number | null;
}

export default function ImageListDisplay({ 
    image, 
    onImageClick, 
    index, 
    isDragging = false,
    isDragOver = false,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    draggedIndex
}: ImageListDisplayProps) {
    const handleDragStart = (e: React.DragEvent) => {
        e.stopPropagation();
        onDragStart?.(e, index);
    };

    const handleDragEnd = (e: React.DragEvent) => {
        e.stopPropagation();
        onDragEnd?.();
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDragOver?.(e);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onDrop?.(e, index);
    };

    const handleClick = () => {
        onImageClick();
    };

    return (
        <div
            className={cn(
                "relative transition-all duration-200 ease-out",
                isDragging && "opacity-50 scale-95 rotate-2 z-20",
                isDragOver && "scale-105",
                "group w-32 h-32 mx-auto"
            )}
            draggable={true}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            {isDragOver && draggedIndex !== null && draggedIndex !== index && (
                <div className={cn(
                    "absolute inset-0 rounded-md border-2 border-dashed border-secondary/60",
                    "bg-secondary/10 backdrop-blur-sm z-10",
                    "flex items-center justify-center"
                )}>
                </div>
            )}

            <Button 
                variant="secondary"
                className={cn(
                    "w-32 h-32 rounded-md relative group/btn justify-self-center",
                    "transition-all duration-200 cursor-pointer",
                    isDragging && "cursor-grabbing",
                )}
                onClick={handleClick}
            >
                <div className={cn(
                    "text-[0.6rem] rounded-full w-4 h-4 bg-secondary border border-primary/40 opacity-50 group-hover/btn:opacity-100 transition-opacity",
                    "flex items-center justify-center text-white font-medium",
                    "absolute top-2 left-2 z-10"
                )}>
                    {index + 1}
                </div>

                <img 
                    src={image} 
                    alt="uploaded" 
                    className={cn(
                        "w-full h-full object-contain select-none pointer-events-none transition-all duration-200",
                        isDragging && "opacity-80"
                    )}
                    draggable={false}
                />

                {isDragging && (
                    <div className="absolute inset-0 bg-secondary/20 rounded-md border border-secondary/40" />
                )}
            </Button>
        </div>
    );
}