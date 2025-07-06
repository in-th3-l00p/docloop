import { useState } from "react";
import ImageContainer from "../components/image-container";
import Button from "../components/ui/button";
import useDocMaker from "../hooks/useDocMaker";

export default function Home() {
  const docMaker = useDocMaker();
  const [images, setImages] = useState<string[]>([]);

  const handleGeneratePdf = () => {
    try {
      const base64Pdf = docMaker.toPdf(images);
      
      if (base64Pdf) {
        const binaryString = atob(base64Pdf);
        const bytes = new Uint8Array(binaryString.length);
        
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Download the PDF file
        const a = document.createElement('a');
        a.href = url;
        a.download = 'generated-document.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        setTimeout(() => {
          URL.revokeObjectURL(url);
        }, 1000);
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

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
              onClick={handleGeneratePdf}
            >generate</Button>
            <Button variant="secondary" onClick={() => setImages([])}>reset</Button>
        </div>
    </div>
  );
}