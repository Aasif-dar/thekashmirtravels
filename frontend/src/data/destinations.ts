import { images } from "./images";

export type Destination = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: (typeof images)[keyof typeof images];
  size: "large" | "medium" | "small";
};

// ADMIN: destinations now come from the backend (see ADMIN_DATA_GUIDE.md).
// No sample records ship with the project.
export const destinations: Destination[] = [];
