/**
 * Media Library — Customer videos, training videos, team photos, and client photos.
 *
 * HOW TO USE:
 * 1. Customer Site Videos: Upload to YouTube, then paste the video ID here
 *    (the part after "v=" in the URL, e.g. https://youtube.com/watch?v=ABC123 → "ABC123")
 * 2. Training Videos: Same as above — upload to YouTube, paste the ID
 * 3. Team Photos: Put image files in /public/images/company/team/ and update the src path
 * 4. Client Photos: Put image files in /public/images/company/clients/ and update the src path
 *
 * All fields with "TODO" are placeholders — replace them with real data.
 */

export interface CustomerVideo {
  id: string;
  /** YouTube video ID (e.g. "dQw4w9WgXcQ") — from https://youtube.com/watch?v=XXXXX */
  youtubeId: string;
  /** Related packaging solution ID (optional): candy, self-adhesive, four-sides, banding, heat-shrink, three-dimensional */
  solutionId?: string;
  /** Related machine ID (optional): fkj-100sl, zs-220x, etc. */
  machineId?: string;
  /** Display title (English) */
  title: string;
  /** Short description (English) */
  description: string;
  /** Video orientation */
  orientation: "landscape" | "portrait";
}

export interface TrainingVideo {
  id: string;
  youtubeId: string;
  /** Related machine ID (optional) */
  machineId?: string;
  title: string;
  description: string;
}

export interface TeamPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface ClientPhoto {
  src: string;
  alt: string;
  caption?: string;
  /** Client or company name shown under the photo */
  clientName?: string;
}

/**
 * Customer Site Videos — Equipment running at real customer facilities.
 * Mix of landscape (横版) and portrait (竖版) videos.
 * These appear on solution detail pages and the homepage.
 */
export const customerVideos: CustomerVideo[] = [
  // === LANDSCAPE VIDEOS (横版) ===
  // Featured on homepage "Equipment in Action" section
  {
    id: "customer-landscape-1",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "Card Packaging Line in Operation — Customer Site",
    description:
      "Full production line running at a trading card manufacturer's facility, showcasing candy packaging with automatic feeding, wrapping, and cartoning.",
    orientation: "landscape",
    solutionId: "candy",
  },
  {
    id: "customer-landscape-2",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "Four-Side Sealing Machine — Field Operation",
    description:
      "Four-side sealing packaging machine operating at a collectible card producer, demonstrating precise sealing at high speed.",
    orientation: "landscape",
    solutionId: "four-sides",
  },
  {
    id: "customer-landscape-3",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "Heat Shrink Packaging — Customer Production Floor",
    description:
      "Heat shrink wrapping line at a board game card factory, showing seamless integration with upstream feeding and downstream cartoning.",
    orientation: "landscape",
    solutionId: "heat-shrink",
  },

  // === PORTRAIT VIDEOS (竖版) — for social media style display ===
  {
    id: "customer-portrait-1",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "Quick Tour: Card Packaging Facility",
    description: "Vertical video walkthrough of a customer's card packaging production line.",
    orientation: "portrait",
    solutionId: "candy",
  },
  {
    id: "customer-portrait-2",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "Machine Close-Up: Servo Packaging in Action",
    description: "Vertical close-up of the ZS-220X servo packaging machine at a customer site.",
    orientation: "portrait",
    machineId: "zs-220x",
  },
  {
    id: "customer-portrait-3",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "AI Visual Inspection — Real-Time Detection",
    description: "Vertical video showing the AI visual inspection system catching card errors in real-time.",
    orientation: "portrait",
    machineId: "ai-visual",
  },
];

/**
 * Equipment Operation Training Videos (横版).
 * These appear on machine detail pages in the "Operation & Training" section.
 */
export const trainingVideos: TrainingVideo[] = [
  {
    id: "training-1",
    youtubeId: "", // TODO: Paste YouTube video ID
    machineId: "fkj-100sl",
    title: "Friction Feeder FKJ-100SL — Setup & Operation Guide",
    description:
      "Step-by-step training video covering installation, calibration, daily operation, and maintenance of the FKJ-100SL friction feeder.",
  },
  {
    id: "training-2",
    youtubeId: "", // TODO: Paste YouTube video ID
    machineId: "zs-220x",
    title: "Servo Packaging Machine ZS-220X — Operation Training",
    description:
      "Complete operation training for the ZS-220X high-speed servo packaging machine, including parameter setup, film loading, and troubleshooting.",
  },
  {
    id: "training-3",
    youtubeId: "", // TODO: Paste YouTube video ID
    machineId: "sbf-250",
    title: "Four-Side Sealing Machine SBF-250 — Training Video",
    description:
      "Operator training for the SBF-250 four-side sealing machine, covering servo motor adjustment, sealing temperature, and maintenance procedures.",
  },
  {
    id: "training-4",
    youtubeId: "", // TODO: Paste YouTube video ID
    machineId: "qdzd-2130",
    title: "Bagging Machine QDZD-2130 — Operation & Maintenance",
    description:
      "Full training video for the QDZD-2130 automatic bagging machine, including sealing method selection, film changeover, and daily care.",
  },
  {
    id: "training-5",
    youtubeId: "", // TODO: Paste YouTube video ID
    title: "General Safety & Daily Maintenance Training",
    description:
      "General training applicable to all CHANFER packaging equipment — safety protocols, daily inspection checklist, and preventive maintenance schedule.",
  },
];

/**
 * Team Building Photos.
 * Put images in /public/images/company/team/ and update paths below.
 * These appear on the About page "Team Culture" section.
 */
export const teamPhotos: TeamPhoto[] = [
  {
    src: "/images/company/team/team-1.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team building activity — group photo",
    caption: "Company Team Building",
  },
  {
    src: "/images/company/team/team-2.jpg", // TODO: Replace with actual photo
    alt: "CHANFER staff outdoor activity",
    caption: "Annual Outing",
  },
  {
    src: "/images/company/team/team-3.jpg", // TODO: Replace with actual photo
    alt: "CHANFER engineering team in the factory",
    caption: "Engineering Team",
  },
  {
    src: "/images/company/team/team-4.jpg", // TODO: Replace with actual photo
    alt: "CHANFER company dinner and celebration",
    caption: "Company Dinner",
  },
  {
    src: "/images/company/team/team-5.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team training session",
    caption: "Staff Training",
  },
  {
    src: "/images/company/team/team-6.jpg", // TODO: Replace with actual photo
    alt: "CHANFER annual meeting and awards",
    caption: "Annual Meeting",
  },
];

/**
 * Client Photos — Photos with clients at customer sites, trade shows, or factory visits.
 * Put images in /public/images/company/clients/ and update paths below.
 * These appear on the homepage "Global Customers" section and the About page.
 */
export const clientPhotos: ClientPhoto[] = [
  {
    src: "/images/company/clients/client-1.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team with international client at factory visit",
    caption: "Factory Visit",
    clientName: "European Client",
  },
  {
    src: "/images/company/clients/client-2.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team with customer at trade show booth",
    caption: "Trade Show Meeting",
    clientName: "Asian Partner",
  },
  {
    src: "/images/company/clients/client-3.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team with overseas customer reviewing equipment",
    caption: "Equipment Handover",
    clientName: "North American Client",
  },
  {
    src: "/images/company/clients/client-4.jpg", // TODO: Replace with actual photo
    alt: "CHANFER management with international business partners",
    caption: "Business Partnership",
    clientName: "Middle East Partner",
  },
  {
    src: "/images/company/clients/client-5.jpg", // TODO: Replace with actual photo
    alt: "CHANFER team photo with European delegation",
    caption: "Delegation Visit",
    clientName: "European Delegation",
  },
  {
    src: "/images/company/clients/client-6.jpg", // TODO: Replace with actual photo
    alt: "CHANFER engineers with client during machine installation",
    caption: "On-Site Installation",
    clientName: "Southeast Asian Client",
  },
];

/**
 * Helper: Get customer videos for a specific solution.
 */
export function getVideosBySolution(solutionId: string): CustomerVideo[] {
  return customerVideos.filter(
    (v) => v.solutionId === solutionId && v.youtubeId !== ""
  );
}

/**
 * Helper: Get customer videos for a specific machine.
 */
export function getVideosByMachine(machineId: string): CustomerVideo[] {
  return customerVideos.filter(
    (v) => v.machineId === machineId && v.youtubeId !== ""
  );
}

/**
 * Helper: Get training videos for a specific machine.
 */
export function getTrainingVideosByMachine(machineId: string): TrainingVideo[] {
  return trainingVideos.filter(
    (v) => (v.machineId === machineId || !v.machineId) && v.youtubeId !== ""
  );
}

/**
 * Media readiness flags.
 * Videos auto-detect based on YouTube IDs being filled in.
 * Photos require manual flag flip after uploading image files.
 */
export const mediaReady = {
  customerVideos: customerVideos.some((v) => v.youtubeId !== ""),
  trainingVideos: trainingVideos.some((v) => v.youtubeId !== ""),
  /** Set to true after uploading team photos to /public/images/company/team/ */
  teamPhotos: false,
  /** Set to true after uploading client photos to /public/images/company/clients/ */
  clientPhotos: false,
};

/**
 * Helper: Get featured landscape customer videos for homepage.
 */
export function getFeaturedVideos(): CustomerVideo[] {
  return customerVideos.filter(
    (v) => v.orientation === "landscape" && v.youtubeId !== ""
  );
}

/**
 * Helper: Get portrait customer videos for homepage social-style display.
 */
export function getPortraitVideos(): CustomerVideo[] {
  return customerVideos.filter(
    (v) => v.orientation === "portrait" && v.youtubeId !== ""
  );
}
