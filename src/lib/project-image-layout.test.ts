import assert from "node:assert/strict";
import test from "node:test";
import { groupProjectPhotos, selectProjectPhoto, type ProjectPhoto } from "./project-image-layout";

const photos: ProjectPhoto[] = [
  { src: "portrait-hero.jpg", width: 1600, height: 2000 },
  { src: "landscape.jpg", width: 2560, height: 1600 },
  { src: "second-portrait.jpg", width: 1200, height: 1600 },
  { src: "second-landscape.jpg", width: 2400, height: 1500 },
  { src: "square.jpg", width: 1600, height: 1600 },
];

test("wide cards choose a matching gallery photo and mobile keeps a portrait", () => {
  assert.equal(selectProjectPhoto(photos, 8 / 5).src, "landscape.jpg");
  assert.equal(selectProjectPhoto(photos, 4 / 5).src, "portrait-hero.jpg");
});

test("gallery matches wide and split rows without losing, duplicating, or mutating photos", () => {
  const original = structuredClone(photos);
  const rows = groupProjectPhotos(photos);
  assert.deepEqual(rows.map((row) => row.map((photo) => photo.src)), [
    ["landscape.jpg"],
    ["portrait-hero.jpg", "second-portrait.jpg"],
    ["second-landscape.jpg"],
    ["square.jpg"],
  ]);
  assert.deepEqual(photos, original);
  assert.equal(new Set(rows.flat().map((photo) => photo.src)).size, photos.length);
});

test("unavailable dimensions preserve the curated fallback and do not hide gallery photos", () => {
  const unknown = photos.map((photo) => ({ ...photo, width: 0, height: 0 }));
  assert.equal(selectProjectPhoto(unknown, 8 / 5).src, unknown[0].src);
  assert.equal(groupProjectPhotos(unknown).flat().length, unknown.length);
  assert.equal(selectProjectPhoto([unknown[0], photos[1]], 8 / 5).src, "landscape.jpg");
  assert.deepEqual(groupProjectPhotos([]), []);
});
