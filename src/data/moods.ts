
import { BookHeart, CloudMoon, Frown, Heart, Smile, Star, SunMedium, BookOpenText, Battery, CloudRain, Milestone, BadgeHelp, Timer, Cake } from "lucide-react";

export interface Mood {
  id: string;
  name: string;
  icon: typeof BookHeart;
  description: string;
}

export const moods: Mood[] = [
  {
    id: "joy",
    name: "Joy & Happiness",
    icon: Smile,
    description: "Finding delight and celebration"
  },
  {
    id: "peace",
    name: "Peace & Calm",
    icon: CloudMoon,
    description: "Seeking tranquility and stillness"
  },
  {
    id: "love",
    name: "Love & Compassion",
    icon: Heart,
    description: "Experiencing and sharing love"
  },
  {
    id: "worry",
    name: "Worry & Anxiety",
    icon: CloudRain,
    description: "Dealing with fear and uncertainty"
  },
  {
    id: "sadness",
    name: "Sadness & Grief",
    icon: Frown,
    description: "Finding comfort in sorrow"
  },
  {
    id: "faith",
    name: "Faith & Trust",
    icon: Star,
    description: "Building and strengthening faith"
  },
  {
    id: "guidance",
    name: "Guidance & Direction",
    icon: Milestone,
    description: "Seeking wisdom for decisions"
  },
  {
    id: "gratitude",
    name: "Gratitude & Thanksgiving",
    icon: SunMedium,
    description: "Expressing thankfulness"
  },
  {
    id: "purpose",
    name: "Purpose & Meaning",
    icon: BookOpenText,
    description: "Understanding life's purpose"
  },
  {
    id: "tired",
    name: "Tired & Weary",
    icon: Battery,
    description: "Finding rest and renewal"
  },
  {
    id: "doubt",
    name: "Doubt & Questions",
    icon: BadgeHelp,
    description: "Wrestling with uncertainty"
  },
  {
    id: "patience",
    name: "Patience & Waiting",
    icon: Timer,
    description: "Enduring through waiting seasons"
  },
  {
    id: "celebration",
    name: "Celebration & Joy",
    icon: Cake,
    description: "Marking special occasions"
  }
];
