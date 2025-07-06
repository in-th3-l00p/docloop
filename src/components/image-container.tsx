import { type Dispatch, type SetStateAction, useRef, useState } from "react";
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
  const [dragCounter, setDragCounter] = useState(0);

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
    setDragCounter(prev => prev + 1);
    
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    
    if (dragCounter <= 1) {
      setIsDragOver(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
          ? "border-blue-400 bg-blue-50/50 shadow-lg" 
          : "border-primary/20 hover:border-primary/30"
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragOver && (
        <div className={cn(
          "absolute inset-0 z-10 bg-blue-500/10 rounded-lg",
          "flex items-center justify-center backdrop-blur-sm"
        )}>
          <div className="text-center">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-blue-600 font-semibold text-lg">
              Drop your images here
            </p>
            <p className="text-blue-500 text-sm mt-1">
              Release to upload
            </p>
          </div>
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
            "hover:bg-primary/5 transition-all duration-200",
            "text-center p-8"
          )}
          onClick={handleContainerClick}
        >
          <div className="text-8xl mb-6 opacity-20">🖼️</div>
          <p className="text-primary/60 text-lg font-medium mb-2">
            Drag & drop your images here
          </p>
          <p className="text-primary/40 text-sm mb-4">
            or click to browse and upload
          </p>
          <div className="text-xs text-primary/30 bg-primary/5 px-3 py-1 rounded-full">
            Supports: JPG, PNG, GIF, WEBP
          </div>
        </div>
      )}
    </div>
  );
}