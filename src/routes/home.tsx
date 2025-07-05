import { useState } from "react";
import ImageContainer from "../components/image-container";
import Button from "../components/ui/button";
import useDocMaker from "../hooks/useDocMaker";

export default function Home() {
  const docMaker = useDocMaker();
  const [images, setImages] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-4 px-8 w-full max-w-2xl">
        <ImageContainer 
            docMaker={docMaker}
            images={images} 
            setImages={setImages} 
        />

        <div className="flex gap-4">
            <Button 
              disabled={docMaker.loading} 
              onClick={() => docMaker.toPdf(images)}
            >generate</Button>
            <Button variant="secondary" onClick={() => setImages([])}>reset</Button>
        </div>
    </div>
  );
}