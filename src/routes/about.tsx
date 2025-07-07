import Circle from "../components/ui/circle";
import Separator from "../components/ui/separator";
import Link from "../components/ui/link";

export default function About() {
  return (
    <div className="space-y-12 py-24">
      <section className="relative">
        <h1 className="text-5xl font-bold mb-2">pdfloop</h1>
        <p className="text-sm text-primary/80 mb-4">
          completely free to use, generate pdfs from images
        </p>

        <div className="flex gap-4 items-center mb-4 text-sm">
          <Link href="/" variant="light">home</Link>
          <Circle />
          <Link href="https://buymeacoffee.com/inth3l00p" variant="light">sponsor me</Link>
          <Circle />
          <Link href="https://tiscacatalin.com" variant="light">author</Link>
        </div>
      </section>

      <section className="space-y-12">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">what this does</h2>
          <div className="space-y-4 text-primary/90">
            <p>
              pdfloop is a simple tool that turns your images into pdf documents. drag and drop your images, 
              click generate, and get a clean pdf file. no registration, no limits, no bs.
            </p>
            <p>
              works with jpg, png, gif, and most image formats. keeps your original image quality and 
              fits everything nicely in the pdf pages.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">how it works</h2>
          <div className="space-y-4 text-primary/90">
            <p>
              built with react and typescript for the frontend, using a rust-based webassembly module 
              for the actual pdf generation. this combo gives you fast processing while keeping everything 
              running smoothly in your browser.
            </p>
            <p>
              everything happens locally in your browser - your images never leave your device. 
              the pdf generation is powered by wasm, so it's quick and reliable.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">why this exists</h2>
          <div className="space-y-4 text-primary/90">
            <p>
              i believe the web should have more simple, free tools that actually solve real problems. 
              too many services nowadays want your email, your credit card, or make you jump through hoops 
              for basic functionality.
            </p>
            <p>
              this is part of my ongoing mission to create straightforward online tools that provide genuine utility 
              without the bloat. no accounts, no tracking, no premium plans - just tools that work.
            </p>
          </div>
        </div>

        <Separator />

        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">about me</h2>
          <div className="space-y-4 text-primary/90">
            <p>
              i'm catalin, a developer who enjoys building useful web applications and experimenting with 
              different technologies. when i'm not coding, you can find me exploring new frameworks, 
              contributing to open source, or working on side projects like this one.
            </p>
            <p>
              if you find this tool helpful, consider{" "}
              <Link href="https://buymeacoffee.com/inth3l00p" variant="light">
                buying me a coffee
              </Link>
              {" "}to support future projects. you can also check out more of my work at{" "}
              <Link href="https://tiscacatalin.com" variant="light">
                my website
              </Link>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
} 