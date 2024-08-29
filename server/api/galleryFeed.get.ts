import { getImagesFromDirectory } from '../utils/galleryFeed';

export default defineEventHandler(async (event) => {
  const query = getQuery(event)

  const imagesDirectory = query.dir

  const images = getImagesFromDirectory(imagesDirectory)

  return images;
})
