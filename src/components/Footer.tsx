import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-5 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <a href={profile.repo} target="_blank" rel="noreferrer" className="hover:text-fg">
          Built with Next.js · View source
        </a>
      </div>
    </footer>
  );
}
