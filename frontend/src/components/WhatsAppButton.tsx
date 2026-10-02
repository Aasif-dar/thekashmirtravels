"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import { whatsappLink } from "@/data/contact";

type TopicContext = { setTopic: (topic: string | null) => void };

const Context = createContext<TopicContext>({ setTopic: () => {} });

export const useWhatsAppTopic = () => useContext(Context).setTopic;

/**
 * Wraps the public site: renders the floating WhatsApp button (never on
 * /admin) and lets journey/destination pages name themselves in the message.
 */
export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [topic, setTopic] = useState<string | null>(null);
  const pathname = usePathname();
  const value = useMemo(() => ({ setTopic }), []);

  const message = topic
    ? `Hi, I'm interested in your Kashmir tours. I was looking at "${topic}".`
    : "Hi, I'm interested in your Kashmir tours.";

  return (
    <Context.Provider value={value}>
      {children}
      {!pathname.startsWith("/admin") && (
        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed right-5 bottom-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
        >
          <svg
            viewBox="0 0 32 32"
            width="30"
            height="30"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M16.003 3C8.83 3 3 8.83 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.72A12.94 12.94 0 0 0 16 29c7.17 0 13-5.83 13-13S23.17 3 16.003 3Zm0 23.7a10.7 10.7 0 0 1-5.46-1.5l-.39-.23-3.98 1.02 1.06-3.88-.25-.4A10.7 10.7 0 1 1 16 26.7Zm5.87-8c-.32-.16-1.9-.94-2.2-1.05-.29-.1-.5-.16-.71.16-.21.32-.82 1.05-1.01 1.27-.18.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.6-.95-.85-1.6-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.18.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.64s1.14 3.06 1.3 3.27c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.82.67.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37Z" />
          </svg>
        </a>
      )}
    </Context.Provider>
  );
}
