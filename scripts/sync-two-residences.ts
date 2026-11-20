import { asc, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { PROJECTS } from "../src/data/projects";
import { PROJECT_DETAILS } from "../src/data/project-details";
import { projects } from "../src/lib/db/schema";

const slugs = ["23", "24"] as const;

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");

  const db = drizzle(neon(url));
  const current = await db.select({ id: projects.id }).from(projects).limit(1);
  if (current.length === 0) {
    console.log("Project database is empty; the static catalog already contains both residences.");
    return;
  }

  for (const slug of slugs) {
    const project = PROJECTS.find((item) => item.href === `/project/${slug}`);
    const detail = PROJECT_DETAILS[slug];
    if (!project || !detail) throw new Error(`Project data for ${slug} is missing.`);

    await db
      .insert(projects)
      .values({
        slug,
        title: project.title,
        category: project.category,
        year: project.year,
        description: project.description,
        details: detail.details,
        location: detail.location,
        siteArea: detail.siteArea,
        projectArea: detail.projectArea,
        projectType: detail.projectType,
        projectLanguage: detail.projectLanguage,
        projectScope: detail.projectScope,
        heroImage: detail.image2,
        images: detail.images,
        sortOrder: 0,
        published: true,
      })
      .onConflictDoUpdate({
        target: projects.slug,
        set: {
          title: project.title,
          category: project.category,
          year: project.year,
          description: project.description,
          details: detail.details,
          location: detail.location,
          siteArea: detail.siteArea,
          projectArea: detail.projectArea,
          projectType: detail.projectType,
          projectLanguage: detail.projectLanguage,
          projectScope: detail.projectScope,
          heroImage: detail.image2,
          images: detail.images,
          published: true,
          updatedAt: new Date(),
        },
      });
  }

  const ordered = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));

  const nextOrder = ordered.filter((project) => !slugs.includes(project.slug as (typeof slugs)[number]));
  const amberIndex = nextOrder.findIndex((project) => project.slug === "22");
  const firstPublished = await db
    .select({ slug: projects.slug })
    .from(projects)
    .where(eq(projects.published, true))
    .orderBy(asc(projects.sortOrder), asc(projects.id))
    .limit(1);
  const firstIndex = nextOrder.findIndex((project) => project.slug === firstPublished[0]?.slug);
  const insertAt = amberIndex >= 0 ? amberIndex + 1 : Math.max(firstIndex + 1, 0);
  nextOrder.splice(insertAt, 0, ...ordered.filter((project) => slugs.includes(project.slug as (typeof slugs)[number])));

  await Promise.all(
    nextOrder.map((project, sortOrder) =>
      db.update(projects).set({ sortOrder }).where(eq(projects.id, project.id))
    )
  );

  console.log("Luxesoft Residences and Aurelia Residence are published in positions three and four.");
}

main().catch((error: unknown) => {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? ` (${error.code})`
      : "";
  console.error(`Could not sync the two residences${code}. Check the database connection and try again.`);
  process.exitCode = 1;
});
