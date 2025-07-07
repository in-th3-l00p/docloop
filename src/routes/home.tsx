import { useState } from "react";
import ImageContainer from "../components/image-container";
import Button from "../components/ui/button";
import useDocMaker from "../hooks/useDocMaker";
import Circle from "../components/ui/circle";
import Separator from "../components/ui/separator";
import Link from "../components/ui/link";

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
    <div className="space-y-12 py-24">
      <section className="relative">
        <h1 className="text-5xl font-bold mb-2">pdfloop</h1>
        <p className="text-sm text-primary/80 mb-4">
          completely free to use, generate pdfs from images
        </p>

        <div className="flex gap-4 items-center mb-4 text-sm">
          <Link href="/about" variant="light">about</Link>
          <Circle />
          <Link href="https://buymeacoffee.com/inth3l00p" variant="light">sponsor me</Link>
          <Circle />
          <Link href="https://tiscacatalin.com" variant="light">author</Link>
        </div>
      </section>

      <div className="flex flex-col gap-4 w-full">
        <ImageContainer
          docMaker={docMaker}
          images={images}
          setImages={setImages}
        />

        <div className="flex gap-4">
          <Button
            disabled={docMaker.loading || images.length === 0}
            onClick={handleGeneratePdf}
          >generate</Button>
          <Button
            variant="secondary"
            onClick={() => setImages([])}
            disabled={docMaker.loading || images.length === 0}
          >reset</Button>
        </div>
      </div>
    </div>

  );
}