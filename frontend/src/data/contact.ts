export interface ContactInfo {
  email: string;
  phone: string;
  whatsappNumber: string; // digits only, country code first, no plus sign
  instagram: string; // handle, e.g. "@fastpacker"
  instagramUrl: string;
  facebookUrl: string;
  location: string; // short, e.g. footer line
  address: string;
  mapsUrl: string;
}

// Placeholder contact details — replace with the real business details before launch.
export const contact: ContactInfo = {
  email: "hello@fastpacker.com",
  phone: "+91 00000 00000",
  whatsappNumber: "910000000000",
  instagram: "@fastpacker",
  instagramUrl: "https://instagram.com/fastpacker",
  facebookUrl: "https://facebook.com/fastpacker",
  location: "Srinagar, Kashmir, India",
  address: "Srinagar, Jammu & Kashmir, India",
  mapsUrl: "https://maps.google.com/?q=Srinagar,Kashmir",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
