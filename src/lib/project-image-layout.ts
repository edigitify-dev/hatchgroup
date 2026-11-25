export interface ProjectPhoto {
  src: string;
  width: number;
  height: number;
}

// Minimize the crop needed to cover a card; ties preserve the curated order.
export function selectProjectPhoto(photos: ProjectPhoto[], ratio: number): ProjectPhoto {
  return photos.reduce((best, photo) => {
    const score = (image: ProjectPhoto) => image.width > 0 && image.height > 0
      ? Math.abs(Math.log(image.width / image.height / ratio))
      : Infinity;
    return score(photo) < score(best) ? photo : best;
  });
}

// Each gallery photo appears once. Match wide photos to wide rows and portraits
// to split rows rather than forcing a portrait into a landscape slot.
export function groupProjectPhotos(photos: ProjectPhoto[]): ProjectPhoto[][] {
  const remaining = [...photos];
  const rows: ProjectPhoto[][] = [];
  while (remaining.length) {
    const size = rows.length % 2 === 0 ? 1 : Math.min(2, remaining.length);
    const row: ProjectPhoto[] = [];
    for (let i = 0; i < size; i += 1) {
      const photo = selectProjectPhoto(remaining, size === 1 ? 8 / 5 : 4 / 5);
      row.push(photo);
      remaining.splice(remaining.indexOf(photo), 1);
    }
    rows.push(row);
  }
  return rows;
}
