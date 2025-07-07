import { useRef } from "react";
import cn from "classnames";
import Modal from "./modal";
import Button from "./button";

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

  // Extract basic image info
  const getImageInfo = (dataUrl: string) => {
    try {
      const [header, data] = dataUrl.split(',');
      const mimeMatch = header.match(/data:([^;]+)/);
      const mimeType = mimeMatch?.[1] || 'unknown';
      
      // Rough size estimation (base64 encoding adds ~33% overhead)
      const sizeInBytes = Math.round((data.length * 3) / 4);
      const sizeInKB = (sizeInBytes / 1024).toFixed(1);
      
      return {
        type: mimeType.split('/')[1]?.toUpperCase() || 'Unknown',
        size: `${sizeInKB} KB`
      };
    } catch {
      return {
        type: 'Unknown',
        size: 'Unknown'
      };
    }
  };

  const imageInfo = getImageInfo(image);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title={`Image ${index + 1}`}
        className="max-w-2xl"
      >
        <div className="space-y-6">
          {/* Image Preview */}
          <div className={cn(
            "relative w-full h-64 bg-primary/5 rounded-lg overflow-hidden",
            "border border-primary/10"
          )}>
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Image Information */}
          <div className={cn(
            "grid grid-cols-3 gap-4 p-4 rounded-lg",
            "bg-primary/5 border border-primary/10"
          )}>
            <div className="text-center">
              <p className="text-xs text-primary/60 mb-1">Position</p>
              <p className="text-sm font-medium text-primary">#{index + 1}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-primary/60 mb-1">Format</p>
              <p className="text-sm font-medium text-primary">{imageInfo.type}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-primary/60 mb-1">Size</p>
              <p className="text-sm font-medium text-primary">{imageInfo.size}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              variant="primary"
              onClick={handleReplace}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 0 0 0-2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 0 0-1-1zM6 12.76V17a1 1 0 0 0 1 1h4.24a1 1 0 0 0 .71-.29l6.92-6.93L21.71 8a1 1 0 0 0 0-1.42l-4.24-4.29a1 1 0 0 0-1.42 0l-2.82 2.83-6.94 6.93a1 1 0 0 0-.29.71zm10.76-8.35l2.83 2.83-1.42 1.42-2.83-2.83z"/>
              </svg>
              Replace Image
            </Button>
            
            <Button
              variant="secondary"
              onClick={handleDelete}
              className={cn(
                "flex-1 flex items-center justify-center gap-2",
                "hover:bg-red-500/20 hover:border-red-500/40 hover:text-red-400",
                "transition-all duration-200"
              )}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 6h-5V4.33A2.42 2.42 0 0 0 13.5 2h-3A2.42 2.42 0 0 0 8 4.33V6H3a1 1 0 0 0 0 2h1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8h1a1 1 0 0 0 0-2zM10 4.33c0-.16.21-.33.5-.33h3c.29 0 .5.17.5.33V6h-4V4.33zM18 19a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V8h12v11z"/>
                <path d="M9 17v-4a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0zM15 17v-4a1 1 0 0 1-2 0v4a1 1 0 0 1 2 0z"/>
              </svg>
              Delete Image
            </Button>
          </div>

          {/* Close Button */}
          <div className="pt-2 border-t border-primary/10">
            <Button
              variant="secondary"
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>

      {/* Hidden file input for replacement */}
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