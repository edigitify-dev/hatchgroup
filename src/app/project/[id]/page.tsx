import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectDetailContent from "./ProjectDetailContent";
import { getPublishedProjects } from "@/lib/projects-repo";
import { SITE_URL } from "@/lib/site";
import { getProjectPhotos } from "@/lib/project-photos";

type Params = Promise<{ id: string }>;

export async function generateMetadata(props: { params: Params }): Promise<Metadata> {
  const params = await props.params;
  const projects = await getPublishedProjects();
  const project = projects.find((p) => p.slug === params.id);
  if (!project) return {};

  const title = project.metaTitle || project.title;
  const description = project.metaDescription || project.description;
  const ogImage = project.ogImage || project.heroImage;
  const url = `/project/${project.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    robots: project.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

function ProjectJsonLd({
  project,
  url,
}: {
  project: { title: string; description: string; heroImage: string; year: string; category: string };
  url: string;
}) {
  const json = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: project.heroImage,
    url,
    dateCreated: project.year,
    about: project.category,
    creator: { "@type": "Organization", name: "Hatch Group" },
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output never contains unescaped "<", so this can't break out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json).replace(/</g, "\\u003c") }}
    />
  );
}

export default async function ProjectDetailPage(props: { params: Params }) {
  const params = await props.params;

  const projects = await getPublishedProjects();
  if (projects.length === 0) notFound();

  const project = projects.find((p) => p.slug === params.id) ?? projects[0];
  const currentIndex = projects.indexOf(project);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const photos = await getProjectPhotos(project);

  return (
    <>
      <ProjectJsonLd
        project={{
          title: project.title,
          description: project.description,
          heroImage: project.heroImage,
          year: project.year,
          category: project.category,
        }}
        url={`${SITE_URL}/project/${project.slug}`}
      />
      <ProjectDetailContent
        id={params.id}
        project={{
          title: project.title,
          category: project.category,
          year: project.year,
          description: project.description,
          details: project.details,
          location: project.location,
          siteArea: project.siteArea,
          projectArea: project.projectArea,
          projectType: project.projectType,
          projectLanguage: project.projectLanguage,
          projectScope: project.projectScope,
          images: project.images,
          image2: project.heroImage,
          imageAlts: project.imageAlts ?? {},
          photos,
        }}
        nextProjectId={nextProject.slug}
        nextProject={{ category: nextProject.category }}
      />
    </>
  );
}
