"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/journeys", label: "Journeys" },
  { href: "/destinations", label: "Destinations" },
  { href: "/experiences", label: "Experiences" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || open
          ? "bg-ivory/95 shadow-[0_1px_0_0_rgba(29,33,30,0.08)] backdrop-blur-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 sm:px-10">
        <Link
          href="/"
          className={cn(
            "font-serif text-xl tracking-wide transition-colors",
            scrolled || open ? "text-charcoal" : "text-ivory"
          )}
          onClick={() => setOpen(false)}
        >
          The Kashmir Travels
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-[13px] font-medium tracking-[0.08em] uppercase transition-colors hover:opacity-70",
                scrolled ? "text-charcoal" : "text-ivory"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={cn(
              "border px-6 py-2.5 text-[13px] font-medium tracking-[0.08em] uppercase transition-colors",
              scrolled
                ? "border-deep-green text-deep-green hover:bg-deep-green hover:text-ivory"
                : "border-ivory text-ivory hover:bg-ivory hover:text-deep-green"
            )}
          >
            Plan Your Trip
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className={cn(
            "md:hidden",
            scrolled || open ? "text-charcoal" : "text-ivory"
          )}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      <div
        className={cn(
          "grid overflow-hidden bg-ivory transition-[grid-template-rows] duration-300 ease-out md:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-1 px-6 pb-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-charcoal/10 py-4 font-serif text-2xl text-charcoal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 border border-deep-green px-6 py-3 text-center text-[13px] font-medium tracking-[0.08em] text-deep-green uppercase"
            >
              Plan Your Trip
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
