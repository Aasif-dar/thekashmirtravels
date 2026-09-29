// Placeholder contact details — replace with the real business details before launch.
export const contact = {
  whatsappNumber: "910000000000", // digits only, country code first, no plus sign
  email: "hello@thekashmirtravels.com",
  instagram: "@thekashmirtravels",
  location: "Srinagar, Kashmir, India",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
