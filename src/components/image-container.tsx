import { type Dispatch, type SetStateAction, useRef } from "react";
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

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

  const handleContainerClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn(
        "flex-grow border border-primary/20 rounded-lg", 
        "relative max-w-2xl w-full h-110", 
        "overflow-x-hidden overflow-y-scroll"
    )}>
      {images.length > 0 && (
        <div className={cn(
          "grid xxs:grid-cols-2 xs:grid-cols-3 sm:grid-cols-4", 
          "mx-auto gap-4 p-4 overflow-y-scroll overflow-x-hidden"
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
            className="w-32 h-32 flex justify-center items-center !text-4xl"
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
            "h-full flex justify-center items-center cursor-pointer", 
            "hover:bg-primary/5 transition-colors"
          )}
          onClick={handleContainerClick}
        >
          {images.length === 0 && (
            <p className="text-primary/20 text-sm text-center">
              Drop your image here, or click to upload
            </p>
          )}
        </div>
      )}
    </div>
  );
}