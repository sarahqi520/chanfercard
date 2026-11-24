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
    description: "Vertical close-up of the ZS-230 top-film push-type packaging machine at a customer site.",
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
    title: "Friction Feeder FKJ-100KP — Setup & Operation Guide",
    description:
      "Step-by-step training video covering installation, calibration, daily operation, and maintenance of the FKJ-100KP friction feeder.",
  },
  {
    id: "training-2",
    youtubeId: "", // TODO: Paste YouTube video ID
    machineId: "zs-220x",
    title: "Top-Film Push-Type Packaging Machine ZS-230 — Operation Training",
    description:
      "Complete operation training for the ZS-230 top-film push-type packaging machine, including parameter setup, film loading, and troubleshooting.",
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
    src: "/images/company/team/team-01.jpg",
    alt: "CHANFER team group photo at an outdoor team building event",
    caption: "Team Building 2026",
  },
  {
    src: "/images/company/team/team-02.jpg",
    alt: "CHANFER team photo in front of a landmark during an outing",
    caption: "Team Outing",
  },
  {
    src: "/images/company/team/team-03.jpg",
    alt: "CHANFER team gathered at a landmark during a company trip",
    caption: "Company Trip",
  },
  {
    src: "/images/company/team/team-04.jpg",
    alt: "CHANFER team group photo at a scenic team building destination",
    caption: "Team Building",
  },
  {
    src: "/images/company/team/team-05.jpg",
    alt: "CHANFER team posing together at a historic site",
    caption: "Company Outing",
  },
  {
    src: "/images/company/team/team-06.jpg",
    alt: "Large CHANFER team group photo at an outdoor venue",
    caption: "Team Photo",
  },
  {
    src: "/images/company/team/team-07.jpg",
    alt: "CHANFER team group photo held in a large outdoor square",
    caption: "Group Photo",
  },
  {
    src: "/images/company/team/team-08.jpg",
    alt: "CHANFER staff working together in an outdoor team challenge",
    caption: "Team Challenge",
  },
  {
    src: "/images/company/team/team-09.jpg",
    alt: "CHANFER colleagues coordinating during an outdoor activity",
    caption: "Teamwork in Action",
  },
  {
    src: "/images/company/team/team-10.jpg",
    alt: "CHANFER team posing together after an outdoor activity",
    caption: "Team Moment",
  },
  {
    src: "/images/company/team/team-11.jpg",
    alt: "CHANFER team group photo on a garden lawn",
    caption: "Team Gathering",
  },
  {
    src: "/images/company/team/team-12.jpg",
    alt: "CHANFER team holding a banner at an outdoor event",
    caption: "Team Event",
  },
  {
    src: "/images/company/team/team-13.jpg",
    alt: "CHANFER colleagues playing a team game together",
    caption: "Team Game",
  },
  {
    src: "/images/company/team/team-14.jpg",
    alt: "CHANFER team group photo at a traditional archway",
    caption: "Team Trip",
  },
  {
    src: "/images/company/team/team-15.jpg",
    alt: "CHANFER team celebrating together with a banner by the sea",
    caption: "Team Celebration",
  },
  {
    src: "/images/company/team/team-16.jpg",
    alt: "CHANFER team group photo on a grass field",
    caption: "Outdoor Team Photo",
  },
  {
    src: "/images/company/team/team-17.jpg",
    alt: "CHANFER team sharing a meal together",
    caption: "Team Dinner",
  },
  {
    src: "/images/company/team/team-18.jpg",
    alt: "CHANFER team group photo in front of a historic gate",
    caption: "Company Visit",
  },
  {
    src: "/images/company/team/team-19.jpg",
    alt: "CHANFER team group photo at a historic street destination",
    caption: "Team Travel",
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
  teamPhotos: true,
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
