import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "dark" | "light";
  className?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "dark",
  className,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-4 text-[11px] font-medium tracking-[0.3em] uppercase",
            tone === "dark" ? "text-deep-green/70" : "text-ivory/70"
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-serif text-4xl leading-[1.15] font-normal sm:text-5xl",
          tone === "dark" ? "text-charcoal" : "text-ivory"
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            tone === "dark" ? "text-charcoal/70" : "text-ivory/75"
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
