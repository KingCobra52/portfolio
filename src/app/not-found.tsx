import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-start justify-center px-5 py-24 sm:px-8">
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <Link href="/" className="mt-6 text-sm font-medium text-accent hover:underline">
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
