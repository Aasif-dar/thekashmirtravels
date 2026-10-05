import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

/**
 * Quiet placeholder for a section that has no real content yet. Deliberately
 * understated — a thin gold rule and one line of serif text — so an empty
 * section reads as "coming soon", not as an error.
 */
export default function EmptyState({
  message,
  tone = "dark",
  className,
}: {
  message: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "mx-auto flex max-w-md flex-col items-center py-16 text-center",
        className
      )}
    >
      <span className="h-px w-12 bg-gold" />
      <p
        className={cn(
          "mt-6 font-serif text-xl italic sm:text-2xl",
          tone === "dark" ? "text-charcoal/60" : "text-ivory/70"
        )}
      >
        {message}
      </p>
    </Reveal>
  );
}
