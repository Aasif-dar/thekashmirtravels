"use client";

import { useEffect } from "react";
import { useWhatsAppTopic } from "./WhatsAppButton";

/** Renders nothing; tells the floating WhatsApp button which page this is. */
export default function WhatsAppTopic({ name }: { name: string }) {
  const setTopic = useWhatsAppTopic();

  useEffect(() => {
    setTopic(name);
    return () => setTopic(null);
  }, [name, setTopic]);

  return null;
}
