import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Destination } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function DestinationCard({
  destination,
  className,
  imageSizes = "(min-width: 768px) 50vw, 100vw",
  priority = false,
}: {
  destination: Destination;
  className?: string;
  imageSizes?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${destination.slug}`}
      className={cn(
        "group relative block h-full w-full overflow-hidden",
        className
      )}
    >
      <Image
        src={destination.coverImage.src}
        alt={destination.coverImage.alt}
        fill
        sizes={imageSizes}
        priority={priority}
        className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h3 className="font-serif text-2xl text-ivory sm:text-3xl">
              {destination.title}
            </h3>
            <p className="mt-1 font-serif text-base text-ivory/80 italic">
              {destination.tagline}
            </p>
          </div>
          <span className="grid h-10 w-10 flex-none place-items-center rounded-full border border-ivory/40 text-ivory transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight size={18} />
          </span>
        </div>
      </div>
    </Link>
  );
}
