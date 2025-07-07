import { useState } from "react";
import Button from "./ui/button";
import ImageModal from "./ui/image-modal";
import cn from "classnames";

interface ImageListDisplayProps {
    image: string;
    onRemove: () => void;
    onReplace: (newImage: string) => void;
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
    onRemove, 
    onReplace,
    index, 
    isDragging = false,
    isDragOver = false,
    onDragStart,
    onDragEnd,
    onDragOver,
    onDrop,
    draggedIndex
}: ImageListDisplayProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div
                className={cn(
                    "relative transition-all duration-200 ease-out",
                    isDragging && "opacity-50 scale-95 rotate-2 z-20",
                    isDragOver && "scale-105 ring-2 ring-secondary/50 ring-offset-2 ring-offset-base",
                    "group cursor-move"
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
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                    </div>
                )}

                <Button 
                    variant="secondary"
                    className={cn(
                        "w-32 h-32 rounded-md relative group/btn justify-self-center",
                        "transition-all duration-200",
                        isDragging && "cursor-grabbing",
                        !isDragging && "cursor-pointer hover:shadow-lg hover:shadow-secondary/20"
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

                    <div className={cn(
                        "absolute top-2 right-2 opacity-0 group-hover:opacity-60 transition-opacity z-10",
                        "text-primary/60 text-xs"
                    )}>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                            <circle cx="3" cy="3" r="1"/>
                            <circle cx="9" cy="3" r="1"/>
                            <circle cx="3" cy="6" r="1"/>
                            <circle cx="9" cy="6" r="1"/>
                            <circle cx="3" cy="9" r="1"/>
                            <circle cx="9" cy="9" r="1"/>
                        </svg>
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

            <ImageModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                image={image}
                index={index}
                onDelete={onRemove}
                onReplace={onReplace}
            />
        </>
    );
}