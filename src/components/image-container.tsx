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
  const [_dragCounter, setDragCounter] = useState(0);
  
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

    setDragCounter(prev => prev + 1);
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      if (dragEnterTimeoutRef.current) {
        clearTimeout(dragEnterTimeoutRef.current);
      }
      
      dragEnterTimeoutRef.current = setTimeout(() => {
        setIsDragOver(true);
        dragEnterTimeoutRef.current = null;
      }, 50);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setDragCounter(prev => {
      const newCounter = prev - 1;
      
      if (newCounter <= 0) {
        if (dragEnterTimeoutRef.current) {
          clearTimeout(dragEnterTimeoutRef.current);
          dragEnterTimeoutRef.current = null;
        }
        
        if (dragLeaveTimeoutRef.current) {
          clearTimeout(dragLeaveTimeoutRef.current);
        }
        
        dragLeaveTimeoutRef.current = setTimeout(() => {
          setIsDragOver(false);
          setDragCounter(0);
          dragLeaveTimeoutRef.current = null;
        }, 100);
        
        return 0;
      }
      
      return newCounter;
    });
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
    setDragCounter(0);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFiles(files);
    }
  };

  return (
    <div 
      className={cn(
        "flex-grow border-2 border-dashed rounded-lg transition-all duration-200", 
        "relative max-w-2xl w-full h-113", 
        "overflow-x-hidden overflow-y-scroll",
        isDragOver 
          ? "border-primary/60 bg-base/50 shadow-lg" 
          : "border-primary/20 hover:border-primary/30"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {isDragOver && (
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
                key={index}
                image={image} 
                onRemove={() => {
                    setImages((prev) => prev.filter((i) => i !== image));
                }} 
                index={index}
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