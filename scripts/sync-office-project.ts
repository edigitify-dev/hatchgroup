import { asc, eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { PROJECTS } from "../src/data/projects";
import { PROJECT_DETAILS } from "../src/data/project-details";
import { projects } from "../src/lib/db/schema";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured.");

  const project = PROJECTS.find((item) => item.href === "/project/25");
  const detail = PROJECT_DETAILS["25"];
  if (!project || !detail) throw new Error("Aurum Business Centre project data is missing.");

  const db = drizzle(neon(url));
  const existing = await db.select({ id: projects.id }).from(projects).limit(1);
  if (existing.length === 0) {
    console.log("Project database is empty; the static catalog already includes Aurum Business Centre.");
    return;
  }

  await db
    .insert(projects)
    .values({
      slug: "25",
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

  const ordered = await db
    .select({ id: projects.id, slug: projects.slug })
    .from(projects)
    .orderBy(asc(projects.sortOrder), asc(projects.id));
  const nextOrder = ordered.filter((item) => item.slug !== "25");
  const aurum = ordered.find((item) => item.slug === "25");
  if (!aurum) throw new Error("Aurum Business Centre was not returned after saving.");
  nextOrder.push(aurum);

  await Promise.all(
    nextOrder.map((item, sortOrder) =>
      db.update(projects).set({ sortOrder }).where(eq(projects.id, item.id))
    )
  );

  console.log("Aurum Business Centre is published at the end of the project list.");
}

main().catch((error: unknown) => {
  const code =
    typeof error === "object" && error !== null && "code" in error && typeof error.code === "string"
      ? ` (${error.code})`
      : "";
  console.error(`Could not sync Aurum Business Centre${code}. Check the database connection and try again.`);
  process.exitCode = 1;
});
