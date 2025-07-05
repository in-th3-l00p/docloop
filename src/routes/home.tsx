import ImageContainer from "../components/image-container";
import Button from "../components/ui/button";

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