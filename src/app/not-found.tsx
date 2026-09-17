import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import Annotation from "@/components/Annotation";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center px-5 py-24 sm:px-8">
        <Eyebrow tone="accent">404</Eyebrow>
        <h1 className="font-display mt-4 text-5xl font-semibold leading-none sm:text-6xl">
          Page not found.
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
          That link doesn&apos;t point anywhere. The work is all on the home page.
        </p>
        <div className="mt-8 flex items-center gap-6">
          <Button href="/" variant="coral" size="lg">
            Back to home
          </Button>
          <Annotation arrow="curveLeft" arrowClassName="h-8 w-11" className="hidden sm:flex">
            this way
          </Annotation>
        </div>
      </main>
      <Footer />
    </>
  );
}
