import { images } from "./images";
// TEMPORARY UI DATA — see addData.ts. Replace with real backend/admin data later.
import { dummyExperiences } from "./addData";

export type Experience = {
  title: string;
  description: string;
  image: (typeof images)[keyof typeof images];
};

// ADMIN: experiences are meant to be managed by the admin (see ADMIN_DATA_GUIDE.md).
// Temporary fictional content from addData.ts, shown until real experiences are
// added here or loaded from the backend. Set this back to [] to show the
// "New experiences are coming soon." empty state.
export const experiences: Experience[] = dummyExperiences; // TEMPORARY UI DATA
