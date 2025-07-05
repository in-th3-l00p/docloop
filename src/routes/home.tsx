import ImageContainer from "../components/image-container";
import Button from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 px-8 w-full max-w-2xl">
        <ImageContainer />

        <div className="flex gap-4">
            <Button>generate</Button>
            <Button variant="secondary">reset</Button>
        </div>
    </div>
  );
}