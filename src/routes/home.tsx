import Button from "../components/button";

function ImageContainer() {
  return (
    <div className="flex-grow border border-primary/20 rounded-lg flex justify-center items-center relative">
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/20 text-sm">
        Drop your image here, or click to upload
      </p>
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