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
  email: "packerfast149@gmail.com",
  phone: "+91 9103118128",
  whatsappNumber: "+91 9103118128",
  instagram: "@fastpacker",
  instagramUrl: "https://www.instagram.com/fastpackertourandtravels_?stkn=bGVkNmllcTIyOXpr&utm_source=qr",
  facebookUrl: "https://www.facebook.com/share/19aRKC6NDy/?mibextid=wwXIfr",
  location: "Srinagar, Kashmir, India",
  address: "Srinagar, Jammu & Kashmir, India",
  mapsUrl: "https://maps.google.com/?q=Srinagar,Kashmir",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;
