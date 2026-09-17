import Link from "next/link";

type Variant = "primary" | "coral" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-sans text-sm font-medium transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-ink";

const sizes = {
  sm: "px-4 py-2",
  md: "px-5 py-2.5",
  lg: "px-6 py-3 text-[0.95rem]",
} as const;

const variants: Record<Variant, string> = {
  // Deep navy pill -- the nav's "Let's build".
  primary: "bg-fg text-bg hover:bg-accent hover:text-on-accent",
  // Bright coral. on-accent stays navy in both themes; text-fg would be
  // cream in dark mode, which is only 2.09:1 on coral.
  coral: "bg-accent text-on-accent hover:brightness-95",
  outline: "border border-fg/25 text-fg hover:border-accent hover:text-accent-ink",
  ghost: "text-muted hover:text-fg",
};

type CommonProps = {
  children: React.ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
};

export default function Button({
  href,
  external,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...rest
}: CommonProps & {
  href: string;
  external?: boolean;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}
