import { asc, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { PROJECTS } from "../src/data/projects";
import { PROJECT_DETAILS } from "../src/data/project-details";
import { projects } from "../src/lib/db/schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  const project = PROJECTS.find((item) => item.href === "/project/22");
  const detail = PROJECT_DETAILS["22"];
  if (!project || !detail) {
    throw new Error("The Amber House project data is missing.");
  }

  const db = drizzle(neon(url));
  const current = await db
    .select({ id: projects.id })
    .from(projects)
    .limit(1);

  // With no database rows, the site already uses the updated static catalog.
  // Avoid making a one-row database that would hide the other fallback projects.
  if (current.length === 0) {
    console.log("Project database is empty; the static catalog already includes The Amber House in second position.");
    return;
  }

  await db
    .insert(projects)
    .values({
      slug: "22",
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
      sortOrder: 1,
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
        sortOrder: 1,
        published: true,
        updatedAt: new Date(),
      },
    });

  const ordered = await db
    .select({ id: projects.id, slug: projects.slug, published: projects.published })
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));

  const amberHouse = ordered.find((item) => item.slug === "22");
  if (!amberHouse) {
    throw new Error("The Amber House was not returned after saving.");
  }

  const remaining = ordered.filter((item) => item.slug !== "22");
  const firstPublishedIndex = remaining.findIndex((item) => item.published);
  const insertAt = firstPublishedIndex === -1 ? 0 : firstPublishedIndex + 1;
  remaining.splice(insertAt, 0, amberHouse);

  await Promise.all(
    remaining.map((item, index) =>
      db.update(projects).set({ sortOrder: index }).where(eq(projects.id, item.id))
    )
  );

  console.log("The Amber House is published in second position.");
}

main().catch((error: unknown) => {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? ` (${error.code})`
      : "";
  console.error(`Could not sync The Amber House to the project database${code}. Check the database connection and try again.`);
  process.exitCode = 1;
});
