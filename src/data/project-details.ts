// Fallback/seed source for the long-form fields shown on /project/[id] (gallery,
// location, site area, etc). Keyed by the numeric id used in each project's href
// (e.g. "/project/6" -> "6"), NOT the zero-padded `id` field in `projects.ts`.
// Used only by `projects-repo.ts` (no-DB fallback) and `scripts/seed.ts`.
export interface ProjectDetail {
  details: string;
  location: string;
  siteArea: string;
  projectArea: string;
  projectType: string;
  projectLanguage: string;
  projectScope: string;
  images: string[];
  image2: string;
}

export const PROJECT_DETAILS: Record<string, ProjectDetail> = {
  "1": {
    details: "Spanning across thoughtfully planned layouts, Dynamic Business Hubs brings together contemporary design principles with timeless elegance. Every unit is crafted to maximise natural light, ventilation, and spatial flow — creating homes that feel expansive and inviting.",
    location: "Gurugram, India",
    siteArea: "2.5 Acres",
    projectArea: "85,000 sq.ft",
    projectType: "Business Hub",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_28_46_PM_ybvhq4.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_26_19_PM_o7j9xh.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_17_12_PM_rget7w.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_18_55_PM_swccj8.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782731450/ChatGPT_Image_Jun_29_2026_at_04_27_30_PM_kevqsp.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782731449/ChatGPT_Image_Jun_29_2026_at_04_18_55_PM_swccj8.png",
  }, 
  "2": {
    details: "Set in a prime location, Contemporary Commercials offers a curated living experience with premium amenities, landscaped surroundings, and interiors that reflect a modern yet rooted lifestyle. Built for families who value both form and function.",
    location: "Mumbai, India",
    siteArea: "1.8 Acres",
    projectArea: "62,000 sq.ft",
    projectType: "Commercial Complex",
    projectLanguage: "Contemporary",
    projectScope: "Interior Design, FF&E",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799515/ChatGPT_Image_Jun_30_2026_at_01_16_59_AM_pdc7tq.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799515/ChatGPT_Image_Jun_30_2026_at_01_13_03_AM_piz4q4.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799488/ChatGPT_Image_Jun_30_2026_at_12_53_13_AM_zbmd9i.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799488/ChatGPT_Image_Jun_30_2026_at_12_50_13_AM_ecwqlw.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799516/ChatGPT_Image_Jun_30_2026_at_01_18_09_AM_zwxp14.png",
  }, 
  "5": {
    details: "Rising with quiet authority, Iconic Developments brings together bold architectural form and restrained interior elegance. Each residence is a study in proportion and light, with curated materials and bespoke finishes that speak of permanence and prestige.",
    location: "Mumbai, India",
    siteArea: "NA",
    projectArea: "95,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Interior Design, FF&E Design & Supply",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799870/ChatGPT_Image_Jun_30_2026_at_01_23_56_AM_fvnd0t.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799849/ChatGPT_Image_Jun_30_2026_at_01_35_58_AM_u8onhf.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799849/ChatGPT_Image_Jun_30_2026_at_01_27_56_AM_uaxomm.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799871/ChatGPT_Image_Jun_30_2026_at_01_25_07_AM_y5k5su.png",
  }, 
  "4": {
    details: "Situated in one of Delhi's most sought-after addresses, this development offers meticulously planned residences with premium finishes, curated amenities, and thoughtful spatial design — redefining what modern capital living can feel like.",
    location: "New Delhi, India",
    siteArea: "4 Acres",
    projectArea: "1,45,000 sq.ft",
    projectType: "Residential Development",
    projectLanguage: "Contemporary Classic",
    projectScope: "Architecture, Interior Design, FF&E",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799749/ChatGPT_Image_Jun_30_2026_at_01_04_55_AM_xnwlvw.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799749/ChatGPT_Image_Jun_30_2026_at_01_03_57_AM_d1x6r6.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799717/ChatGPT_Image_Jun_30_2026_at_01_09_39_AM_yqkjav.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799715/ChatGPT_Image_Jun_30_2026_at_01_08_24_AM_lhrlq4.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799750/ChatGPT_Image_Jun_30_2026_at_12_55_25_AM_1_xx8bn7.png",
  }, 
  "3": {
    details: "From high-street retail spaces to modern office complexes, our Raipur projects are envisioned to meet the growing demands of a rapidly developing city. Each project is planned with strategic location advantages and world-class construction standards.",
    location: "Raipur, India",
    siteArea: "3.2 Acres",
    projectArea: "1,10,000 sq.ft",
    projectType: "Mixed-Use Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799364/ChatGPT_Image_Jun_30_2026_at_01_09_39_AM_s90pxr.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799363/ChatGPT_Image_Jun_30_2026_at_01_08_24_AM_esjkdm.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799326/ChatGPT_Image_Jun_30_2026_at_12_50_13_AM_krr2nj.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782799326/ChatGPT_Image_Jun_30_2026_at_12_53_13_AM_rfkyuc.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782799365/ChatGPT_Image_Jun_30_2026_at_01_10_56_AM_rfz3wg.png",
  }, 
  "6": {
    details: "Nestled in a serene environment, Prime Living provides a perfect blend of nature and urban convenience. The residences are crafted with premium materials and thoughtful layouts to ensure a vibrant and fulfilling lifestyle for all its residents.",
    location: "Pune, India",
    siteArea: "2 Acres",
    projectArea: "48,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Interior Design",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_14_16_PM_1_jrgplw.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_17_17_PM_qtpdcq.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971825/ChatGPT_Image_Jul_1_2026_at_05_10_48_PM_1_ps8ute.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971826/ChatGPT_Image_Jul_1_2026_at_05_15_56_PM_1_sntyol.png",
  }, 
  "7": {
    details: "Designed as an urban sanctuary, Timeless Residences offers panoramic views, open-concept layouts, and exclusive amenities that elevate the everyday experience. Every corner reflects an uncompromising commitment to quality and elegance.",
    location: "Bengaluru, India",
    siteArea: "NA",
    projectArea: "36,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Interior Design, FF&E",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_12_22_PM_fo1is9.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_09_55_PM_sxk4vi.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971887/ChatGPT_Image_Jul_1_2026_at_06_08_38_PM_wlpirl.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971888/ChatGPT_Image_Jul_1_2026_at_06_11_09_PM_mcuxi0.png",
  }, 
  "8": {
    details: "Meticulously designed to capture abundant natural light, Bespoke Homes features expansive windows, premium materials, and lushly landscaped terraces. It is the epitome of sophisticated modern living crafted for discerning individuals.",
    location: "Hyderabad, India",
    siteArea: "1.2 Acres",
    projectArea: "28,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Interior Design, FF&E Design & Supply",
    images: [
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_20_32_PM_rufoen.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_19_18_PM_wjtady.png",
      "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_18_13_PM_imradj.png"
    ],
    image2: "https://res.cloudinary.com/de4pazo51/image/upload/v1782971960/ChatGPT_Image_Jul_1_2026_at_06_22_20_PM_fgdd8g.png",
  }, 
  "9": {
    details: "Azure Heights is designed to redefine luxury living, combining sleek architecture with serene open spaces. Residents enjoy panoramic views, state-of-the-art facilities, and beautifully curated interiors.",
    location: "Mumbai, India",
    siteArea: "3 Acres",
    projectArea: "100,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093952/ChatGPT_Image_Aug_7_2026_at_02_36_37_AM_aglkgl.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png",
  },
  "10": {
    details: "Lumina Residences brings an unparalleled aesthetic to urban living. With expansive windows allowing an abundance of natural light, each residence feels vibrant, welcoming, and beautifully harmonious with its surroundings.",
    location: "Pune, India",
    siteArea: "2.5 Acres",
    projectArea: "75,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093952/ChatGPT_Image_Aug_7_2026_at_02_36_37_AM_aglkgl.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png",
  },
  "11": {
    details: "Nestled within lush landscaping, The Verdant Collection is an oasis in the city. The architecture embraces its natural surroundings, featuring terraced gardens, natural materials, and an enduring sense of peace.",
    location: "Bengaluru, India",
    siteArea: "4.2 Acres",
    projectArea: "120,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png",
  },
  "12": {
    details: "Elysian Suites is the epitome of elegance. Every detail, from the grand entrance to the exquisite finishes in each suite, has been carefully selected to provide residents with a sophisticated and truly remarkable home.",
    location: "New Delhi, India",
    siteArea: "1.8 Acres",
    projectArea: "60,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093952/ChatGPT_Image_Aug_7_2026_at_02_36_37_AM_aglkgl.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093954/ChatGPT_Image_Aug_7_2026_at_02_40_20_AM_x3uxbz.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_37_52_AM_snyimh.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093953/ChatGPT_Image_Aug_7_2026_at_02_39_07_AM_zwwadw.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786093952/ChatGPT_Image_Aug_7_2026_at_02_36_37_AM_aglkgl.png",
  },
  "13": {
    details: "Nexus Corporate Park offers flexible office spaces, premium amenities, and a strategic location to elevate your business operations.",
    location: "Gurugram, India",
    siteArea: "5 Acres",
    projectArea: "200,000 sq.ft",
    projectType: "Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
  },
  "14": {
    details: "The Pinnacle Tower provides high-end commercial spaces with advanced infrastructure, ensuring a seamless and efficient workspace.",
    location: "Mumbai, India",
    siteArea: "3.5 Acres",
    projectArea: "150,000 sq.ft",
    projectType: "Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
  },
  "15": {
    details: "Zenith Business Center is designed to accommodate dynamic businesses, featuring open layouts, collaborative zones, and cutting-edge technology.",
    location: "Bengaluru, India",
    siteArea: "4.2 Acres",
    projectArea: "180,000 sq.ft",
    projectType: "Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
  },
  "16": {
    details: "Meridian Plaza integrates high-end retail with premium office floors, creating a bustling hub for commerce and connectivity.",
    location: "Pune, India",
    siteArea: "6 Acres",
    projectArea: "250,000 sq.ft",
    projectType: "Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png",
  },
  "17": {
    details: "Apex Commercial Hub offers uncompromised luxury and world-class facilities, catering to the needs of the most demanding corporate tenants.",
    location: "New Delhi, India",
    siteArea: "2.8 Acres",
    projectArea: "120,000 sq.ft",
    projectType: "Commercial",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094272/ChatGPT_Image_Aug_7_2026_at_02_30_48_AM_dfjfoe.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094271/ChatGPT_Image_Aug_7_2026_at_02_32_42_AM_aklrrw.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094270/ChatGPT_Image_Aug_7_2026_at_02_29_07_AM_gttp2w.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_26_31_AM_uecukt.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786094269/ChatGPT_Image_Aug_7_2026_at_02_27_55_AM_noncmf.png",
  },
  "18": {
    details: "Serenity Gardens offers an unparalleled lifestyle, blending organic materials with contemporary layouts to foster a deep connection to nature.",
    location: "Kochi, India",
    siteArea: "3.5 Acres",
    projectArea: "90,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png",
  },
  "19": {
    details: "The Grand Manor represents the zenith of residential architecture, featuring soaring ceilings, expansive indoor-outdoor transitions, and the finest curated materials.",
    location: "Hyderabad, India",
    siteArea: "5 Acres",
    projectArea: "140,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png",
  },
  "20": {
    details: "Aria Residences maximizes natural light and spatial flow, utilizing expansive glazing and sustainable design practices to create bright, welcoming sanctuaries.",
    location: "Pune, India",
    siteArea: "2.8 Acres",
    projectArea: "85,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png",
  },
  "21": {
    details: "Oasis Villas offers secluded, high-end retreats with private pools, lush landscaping, and bespoke interiors tailored for the ultimate in relaxation and exclusivity.",
    location: "Goa, India",
    siteArea: "4.5 Acres",
    projectArea: "110,000 sq.ft",
    projectType: "Residential",
    projectLanguage: "Contemporary",
    projectScope: "Architecture, Interior Design",
    images: [
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096376/ChatGPT_Image_Aug_7_2026_at_02_18_46_AM_zthbas.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096375/ChatGPT_Image_Aug_7_2026_at_02_16_14_AM_lslny2.png",
      "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_14_46_AM_dnyrol.png"
    ],
    image2: "https://res.cloudinary.com/djicxkd9u/image/upload/v1786096373/ChatGPT_Image_Aug_7_2026_at_02_13_37_AM_vt2bgj.png",
  },
  "22": {
    details: "The Amber House brings together warm walnut joinery, softly veined stone, and layered lighting to give each room its own character while keeping the home visually connected. A sculptural staircase and generous openings add a sense of height and movement, while carefully composed living, dining, and family spaces make the residence feel both considered and welcoming.",
    location: "Not specified",
    siteArea: "Not specified",
    projectArea: "Not specified",
    projectType: "Residential Interior",
    projectLanguage: "Contemporary Classic",
    projectScope: "Interior Design",
    images: [
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.58%20(1).jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.57%20(3).jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.57.jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.58.jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.57%20(2).jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.57%20(1).jpeg",
      "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.56.jpeg"
    ],
    image2: "/newproject/WhatsApp%20Image%202026-11-09%20at%2010.57.58%20(1).jpeg",
  }
};
