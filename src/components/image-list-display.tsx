import Button from "./ui/button";

interface ImageListDisplayProps {
    image: string;
    onRemove: () => void;
}

export default function ImageListDisplay({ image, onRemove }: ImageListDisplayProps) {
    return (
        <Button 
            variant="secondary"
            className="w-32 h-32 rounded-md"
            onClick={onRemove}
        >
            <img 
                src={image} 
                alt="uploaded" 
                className="w-full h-full object-contain select-none pointer-events-none"
                draggable={false}
            />
        </Button>
    );
}