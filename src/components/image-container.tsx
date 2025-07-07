import { type Dispatch, type SetStateAction, useRef, useState, useEffect } from "react";
import cn from "classnames";
import Button from "./ui/button";
import ImageListDisplay from "./image-list-display";
import { type DocMaker } from "../hooks/useDocMaker";

interface ImageContainerProps {
  docMaker: DocMaker;
  images: string[];
  setImages: Dispatch<SetStateAction<string[]>>;
}

export default function ImageContainer({ docMaker, images, setImages }: ImageContainerProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  
  const dragEnterTimeoutRef = useRef<number | null>(null);
  const dragLeaveTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (dragEnterTimeoutRef.current) {
        clearTimeout(dragEnterTimeoutRef.current);
      }
      if (dragLeaveTimeoutRef.current) {
        clearTimeout(dragLeaveTimeoutRef.current);
      }
    };
  }, []);

  const processFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result;
          if (result) {
            setImages((prev) => [...prev, result as string]);
          }
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    processFiles(files);
  };

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }

    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const hasFiles = Array.from(e.dataTransfer.items).some(item => item.kind === 'file');
      
      if (hasFiles && draggedIndex === null) {
        setIsDraggingFile(true);
        
        if (dragEnterTimeoutRef.current) {
          clearTimeout(dragEnterTimeoutRef.current);
        }
        
        dragEnterTimeoutRef.current = setTimeout(() => {
          setIsDragOver(true);
          dragEnterTimeoutRef.current = null;
        }, 50);
      }
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragEnterTimeoutRef.current) {
      clearTimeout(dragEnterTimeoutRef.current);
      dragEnterTimeoutRef.current = null;
    }
    
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
    }
    
    dragLeaveTimeoutRef.current = setTimeout(() => {
      if (isDraggingFile) {
        setIsDragOver(false);
        setIsDraggingFile(false);
      }
      dragLeaveTimeoutRef.current = null;
    }, 100);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragEnterTimeoutRef.current) {
      clearTimeout(dragEnterTimeoutRef.current);
      dragEnterTimeoutRef.current = null;
    }
    if (dragLeaveTimeoutRef.current) {
      clearTimeout(dragLeaveTimeoutRef.current);
      dragLeaveTimeoutRef.current = null;
    }
    
    setIsDragOver(false);
    setIsDraggingFile(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  const handleImageDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleImageDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleImageDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleImageDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    
    newImages.splice(draggedIndex, 1);
    
    newImages.splice(dropIndex, 0, draggedImage);
    
    setImages(newImages);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleImageDragOverItem = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index) {
      setDragOverIndex(index);
    }
  };

  const handleImageReplace = (index: number, newImage: string) => {
    setImages((prev) => {
      const newImages = [...prev];
      newImages[index] = newImage;
      return newImages;
    });
  };

  return (
    <div 
      className={cn(
        "flex-grow border-2 border-dashed rounded-lg transition-all duration-200", 
        "relative max-w-2xl w-full h-113", 
        "overflow-x-hidden overflow-y-scroll",
        isDragOver && isDraggingFile
          ? "border-primary/60 bg-base/50 shadow-lg" 
          : "border-primary/20 hover:border-primary/30"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragOver && isDraggingFile && (
        <div className={cn(
          "absolute inset-0 z-10 bg-base/80 opacity- rounded-lg",
          "flex items-center justify-center backdrop-blur-sm"
        )}>
          <p className="text-primary/40 text-sm mt-1">
            release to upload
          </p>
        </div>
      )}

      {images.length > 0 && (
        <div className={cn(
          "grid xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4", 
          "gap-4 p-4 overflow-y-scroll overflow-x-hidden"
        )}>
          {images.map((image, index) => (
            <ImageListDisplay 
                key={`${image}-${index}`}
                image={image} 
                onRemove={() => {
                    setImages((prev) => prev.filter((i) => i !== image));
                }} 
                onReplace={(newImage) => handleImageReplace(index, newImage)}
                index={index}
                isDragging={draggedIndex === index}
                isDragOver={dragOverIndex === index}
                onDragStart={handleImageDragStart}
                onDragEnd={handleImageDragEnd}
                onDragOver={() => handleImageDragOverItem(index)}
                onDrop={handleImageDrop}
                draggedIndex={draggedIndex}
            />
          ))}
          <Button 
            variant="secondary"
            className={cn(
              "w-32 h-32 flex justify-center items-center !text-4xl justify-self-center",
              "border-2 border-dashed border-primary/30 hover:border-primary/50",
              "transition-all duration-200 hover:bg-primary/5"
            )}
            onClick={handleContainerClick}
            disabled={docMaker.loading}
          >+</Button>
        </div> 
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      
      {images.length === 0 && (
        <div 
          className={cn(
            "h-full flex flex-col justify-center items-center cursor-pointer", 
            "hover:bg-primary/5 transition-all",
            "text-center p-8"
          )}
          onClick={handleContainerClick}
        >
          <p className="text-primary/40 text-sm font-medium mb-2">
            drop your images here, or click to upload
          </p>
        </div>
      )}
    </div>
  );
}