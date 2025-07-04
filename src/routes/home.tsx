import Button from "../components/button";
import { useRef } from "react";

function ImageContainer() {
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
            console.log('Image uploaded:', result);
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
    <div className="flex-grow border border-primary/20 rounded-lg relative overflow-hidden">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="hidden"
      />
      
      <div 
        className="h-full flex justify-center items-center cursor-pointer hover:bg-primary/5 transition-colors"
        onClick={handleContainerClick}
      >
        <p className="text-primary/20 text-sm text-center">
          Drop your image here, or click to upload
        </p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="w-full h-full max-w-2xl max-h-120 flex flex-col gap-4">
        <ImageContainer />

        <div className="flex gap-4">
            <Button>generate</Button>
            <Button variant="secondary">reset</Button>
        </div>
    </div>
  );
}