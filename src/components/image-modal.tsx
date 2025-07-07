import { useRef } from "react";
import cn from "classnames";
import Modal from "./ui/modal";
import Button from "./ui/button";

interface ImageModalProps {
    isOpen: boolean;
    onClose: () => void;
    image: string;
    index: number;
    onDelete: () => void;
    onReplace: (newImage: string) => void;
}

export default function ImageModal({ 
    isOpen, 
    onClose, 
    image, 
    index, 
    onDelete,
    onReplace 
}: ImageModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleReplace = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result;
            if (result) {
                onReplace(result as string);
                onClose();
            }
        };
        reader.readAsDataURL(file);
    };

    const handleDelete = () => {
        onDelete();
        onClose();
    };

    const getImageInfo = () => {
        try {
            const [header, data] = image.split(',');
            const mimeMatch = header.match(/data:([^;]+)/);
            const mimeType = mimeMatch ? mimeMatch[1] : 'Unknown';
            
            const sizeInBytes = Math.round((data.length * 3) / 4);
            const sizeInKB = (sizeInBytes / 1024).toFixed(1);
            
            return {
                type: mimeType.split('/')[1]?.toUpperCase() || 'IMAGE',
                size: `${sizeInKB} KB`,
                format: mimeType
            };
        } catch {
            return {
                type: 'IMAGE',
                size: 'Unknown',
                format: 'Unknown'
            };
        }
    };

    const imageInfo = getImageInfo();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title={`Image ${index + 1}`}
                className="max-w-lg"
            >
                <div className="space-y-6">
                    <div className={cn(
                        "relative bg-primary/5 rounded-lg overflow-hidden",
                        "border border-primary/10 aspect-square"
                    )}>
                        <img 
                            src={image} 
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-contain"
                        />
                        
                        <div className={cn(
                            "absolute bottom-0 left-0 right-0",
                            "bg-gradient-to-t from-base/80 to-transparent",
                            "p-4 text-xs text-primary/70"
                        )}>
                            <div className="flex justify-between items-center">
                                <span className="font-medium">#{index + 1}</span>
                                <span>{imageInfo.type}</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-sm font-medium text-primary/80">Image Details</h3>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                            <div className="space-y-1">
                                <span className="text-primary/50">Position</span>
                                <p className="text-primary">{index + 1}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-primary/50">Type</span>
                                <p className="text-primary">{imageInfo.type}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-primary/50">Size</span>
                                <p className="text-primary">{imageInfo.size}</p>
                            </div>
                            <div className="space-y-1">
                                <span className="text-primary/50">Format</span>
                                <p className="text-primary truncate">{imageInfo.format}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-primary/10">
                        <Button
                            variant="secondary"
                            onClick={handleReplace}
                            className="flex-1 flex items-center justify-center gap-2"
                        >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8.5 3.5a.5.5 0 0 0-1 0V5H6a.5.5 0 0 0 0 1h1.5v1.5a.5.5 0 0 0 1 0V6H10a.5.5 0 0 0 0-1H8.5V3.5z"/>
                                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm10 1H3a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/>
                            </svg>
                            Replace
                        </Button>

                        <Button
                            variant="secondary"
                            onClick={handleDelete}
                            className={cn(
                                "flex-1 flex items-center justify-center gap-2",
                                "hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400",
                                "transition-all duration-200"
                            )}
                        >
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </>
    );
} 