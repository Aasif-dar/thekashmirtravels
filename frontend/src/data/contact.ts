export interface ContactInfo {
  email: string;
  phone: string;
  whatsappNumber: string; // digits only, country code first, no plus sign
  instagram: string; // handle, e.g. "@thekashmirtravels"
  instagramUrl: string;
  facebookUrl: string;
  location: string; // short, e.g. footer line
  address: string;
  mapsUrl: string;
}

// Placeholder contact details — replace with the real business details before launch.
export const contact: ContactInfo = {
  email: "hello@thekashmirtravels.com",
  phone: "+91 00000 00000",
  whatsappNumber: "910000000000",
  instagram: "@thekashmirtravels",
  instagramUrl: "https://instagram.com/thekashmirtravels",
  facebookUrl: "https://facebook.com/thekashmirtravels",
  location: "Srinagar, Kashmir, India",
  address: "Srinagar, Jammu & Kashmir, India",
  mapsUrl: "https://maps.google.com/?q=Srinagar,Kashmir",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
