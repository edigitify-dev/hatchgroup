import { unstable_cache } from "next/cache";
import { asc } from "drizzle-orm";
import { getDb } from "./db";
import { projects, type ProjectRow } from "./db/schema";
import { PROJECTS as STATIC_PROJECTS, type Project } from "@/data/projects";
import { PROJECT_DETAILS } from "@/data/project-details";

export interface ProjectRecord {
  id: number;
  slug: string;
  title: string;
  category: string;
  year: string;
  description: string;
  details: string;
  location: string;
  siteArea: string;
  projectArea: string;
  projectType: string;
  projectLanguage: string;
  projectScope: string;
  heroImage: string;
  images: string[];
  imageAlts: Record<string, string>;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  noIndex: boolean;
  sortOrder: number;
  published: boolean;
  updatedAt: Date | undefined;
}

function slugFromHref(href: string): string {
  const match = href.match(/(\d+)\s*$/);
  return match ? match[1] : href;
}

function rowToRecord(row: ProjectRow): ProjectRecord {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    category: row.category,
    year: row.year,
    description: row.description,
    details: row.details,
    location: row.location,
    siteArea: row.siteArea,
    projectArea: row.projectArea,
    projectType: row.projectType,
    projectLanguage: row.projectLanguage,
    projectScope: row.projectScope,
    heroImage: row.heroImage,
    images: row.images ?? [],
    imageAlts: row.imageAlts ?? {},
    metaTitle: row.metaTitle,
    metaDescription: row.metaDescription,
    ogImage: row.ogImage,
    noIndex: row.noIndex,
    sortOrder: row.sortOrder,
    published: row.published,
    updatedAt: row.updatedAt,
  };
}

/** No-DB / seed fallback, built from the original static data files so the
 *  site renders identically before DATABASE_URL is configured. */
function fallbackProjects(): ProjectRecord[] {
  return STATIC_PROJECTS.map((p, index) => {
    const slug = slugFromHref(p.href);
    const detail = PROJECT_DETAILS[slug];
    return {
      id: index + 1,
      slug,
      title: p.title,
      category: p.category,
      year: p.year,
      description: p.description,
      details: detail?.details ?? p.description,
      location: detail?.location ?? "",
      siteArea: detail?.siteArea ?? "",
      projectArea: detail?.projectArea ?? "",
      projectType: detail?.projectType ?? p.category,
      projectLanguage: detail?.projectLanguage ?? "",
      projectScope: detail?.projectScope ?? "",
      heroImage: detail?.image2 ?? p.image,
      images: detail?.images?.length ? detail.images : [p.image],
      imageAlts: {},
      metaTitle: "",
      metaDescription: "",
      ogImage: "",
      noIndex: false,
      sortOrder: index,
      published: true,
      updatedAt: undefined,
    } satisfies ProjectRecord;
  });
}

async function fetchAllProjects(): Promise<ProjectRecord[]> {
  const db = getDb();
  if (!db) return fallbackProjects();

  try {
    const rows = await db.select().from(projects).orderBy(asc(projects.sortOrder), asc(projects.id));
    if (rows.length === 0) return fallbackProjects();
    return rows.map(rowToRecord);
  } catch (err) {
    console.error("[projects-repo] DB query failed, falling back to static data:", err);
    return fallbackProjects();
  }
}

/** Cached (tag "projects") read of every project, published or not — used by
 *  the admin panel. Admin mutations call revalidateTag("projects") to bust it. */
export const getAllProjects = unstable_cache(fetchAllProjects, ["projects:all:v2"], {
  tags: ["projects"],
  revalidate: 60,
});

/** What the public site should render. */
export async function getPublishedProjects(): Promise<ProjectRecord[]> {
  const all = await getAllProjects();
  return all.filter((p) => p.published);
}

export async function getProjectBySlug(slug: string): Promise<ProjectRecord | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.slug === slug);
}

export async function getProjectById(id: number): Promise<ProjectRecord | undefined> {
  const all = await getAllProjects();
  return all.find((p) => p.id === id);
}

/** Adapts a ProjectRecord to the legacy `Project` shape (`@/data/projects`) that
 *  the listing/grid client components were built around, so those components
 *  don't need their JSX rewritten — only their data source. */
export function toLegacyProject(p: ProjectRecord): Project {
  return {
    id: p.slug,
    href: `/project/${p.slug}`,
    title: p.title,
    category: p.category,
    year: p.year,
    image: p.heroImage,
    description: p.description,
  };
}
