export interface ContactInfo {
  email: string;
  phone: string;
  whatsappNumber: string; // digits only, country code first, no plus sign
  instagram: string; // handle, e.g. "@fastpacker"
  instagramUrl: string;
  facebookUrl: string;
  location: string;
  address: string;
  mapsUrl: string;
}

export const contact: ContactInfo = {
  email: "packerfast149@gmail.com",
  phone: "+919469518128",
  whatsappNumber: "919469518128",

  instagram: "@fastpacker",
  instagramUrl:
    "https://www.instagram.com/fastpackertourandtravels_?stkn=bGVkNmllcTIyOXpr&utm_source=qr",

  facebookUrl:
    "https://www.facebook.com/share/19aRKC6NDy/?mibextid=wwXIfr",

  location: " Budshah Nagar Natipora,Srinagar, Kashmir, India",
  address: " Budshah Nagar Natipora,Srinagar, Kashmir, India",

  mapsUrl: "https://maps.app.goo.gl/aUjiGLLTbMVUekWf6",
};

export const whatsappLink = (message?: string) =>
  `https://wa.me/${contact.whatsappNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;