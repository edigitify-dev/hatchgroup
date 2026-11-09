export interface Project {
  id: string;
  href: string;
  title: string;
  category: string;
  year: string;
  image: string;
  description: string;
}

export const PROJECTS: Project[] = [
  // Residential
  { id: "06", href: "/project/6", title: "Prime Living",          category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png", description: "An exquisite new residential project offering unparalleled luxury and comfort for modern living." },
  { id: "22", href: "/project/22", title: "The Amber House",      category: "Residential", year: "2026", image: "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.58%20(1).jpeg", description: "A warm, contemporary home where walnut detailing, pale stone, and softly layered light create an inviting sense of calm." },
  { id: "07", href: "/project/7", title: "Timeless Residences",   category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png", description: "Timeless Residences redefines the standard of premium living, merging breathtaking architectural vision with serene interiors." },
  { id: "08", href: "/project/8", title: "Bespoke Homes",         category: "Residential", year: "2026", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png", description: "A brilliant synthesis of refined architecture and warm, inviting living spaces in the heart of the city." },
  { id: "09", href: "/project/9", title: "Azure Heights",         category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png", description: "A contemporary haven with expansive views and world-class amenities." },
  { id: "10", href: "/project/10", title: "Lumina Residences",    category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png", description: "Embrace modern living in these bright, thoughtfully designed spaces." },
  { id: "11", href: "/project/11", title: "The Verdant Collection", category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png", description: "Where luxury meets nature in a beautifully landscaped setting." },
  { id: "12", href: "/project/12", title: "Elysian Suites",       category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093952/ChatGPT_Image_Aug_7_2026_at_02_36_37_AM_aglkgl.png", description: "Sophisticated homes offering unparalleled comfort and elegance." },
  { id: "18", href: "/project/18", title: "Serenity Gardens",       category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png", description: "A tranquil residential retreat surrounded by lush greenery and modern comforts." },
  { id: "19", href: "/project/19", title: "The Grand Manor",        category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png", description: "Exquisite architectural design meeting unparalleled luxury in a pristine setting." },
  { id: "20", href: "/project/20", title: "Aria Residences",        category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png", description: "Modern, open-concept homes crafted to elevate the everyday living experience." },
  { id: "21", href: "/project/21", title: "Oasis Villas",           category: "Residential", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png", description: "Exclusive luxury villas offering privacy, elegance, and premium amenities." },

  // Commercial
  { id: "01", href: "/project/1", title: "Dynamic Business Hubs",  category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_28_46_PM_ybvhq4.png", description: "A premium residential development designed to elevate everyday living through thoughtful architecture and refined interiors." },
  { id: "02", href: "/project/2", title: "Contemporary Commercials", category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png", description: "Meticulously designed spaces that balance sophistication with warmth — where every detail speaks of quality craftsmanship." },
  { id: "03", href: "/project/3", title: "Signature Commercials", category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png", description: "Upcoming commercial and mixed-use developments designed to shape the city's evolving skyline." },
  { id: "04", href: "/project/4", title: "Landmark Spaces",       category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png", description: "A landmark residential development in the capital, merging contemporary elegance with the cultural richness of New Delhi." },
  { id: "05", href: "/project/5", title: "Iconic Developments",   category: "Commercial",  year: "2025", image: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png", description: "A defining statement in luxury residential architecture — a landmark address conceived for those who demand the finest in design." },
  { id: "13", href: "/project/13", title: "Nexus Corporate Park",   category: "Commercial", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png", description: "A state-of-the-art commercial park designed for modern enterprises." },
  { id: "14", href: "/project/14", title: "The Pinnacle Tower",     category: "Commercial", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png", description: "A towering achievement in commercial architecture offering panoramic city views." },
  { id: "15", href: "/project/15", title: "Zenith Business Center", category: "Commercial", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png", description: "Fostering innovation with premium amenities and flexible workspaces." },
  { id: "16", href: "/project/16", title: "Meridian Plaza",         category: "Commercial", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png", description: "A vibrant commercial plaza combining retail and premium office spaces." },
  { id: "17", href: "/project/17", title: "Apex Commercial Hub",    category: "Commercial", year: "2026", image: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png", description: "Where business meets luxury in a seamlessly designed corporate environment." },
];

export function findProjectByCategory(category: string): Project | undefined {
  return PROJECTS.find((p) => p.category.toLowerCase() === category.toLowerCase());
}
