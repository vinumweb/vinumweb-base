import fs from 'fs';
import path from 'path';

// Function to get all image files from a directory
export function getImagesFromDirectory(dir) {

  let files: any = []
  let galleryPath = '.playground/public/gallery'

  if (dir == 'all') {
    const absolutePath = path.resolve(galleryPath)

    fs.readdirSync(absolutePath).forEach(item => {
      files.push({ dir: item, content: fs.readdirSync(galleryPath + '/' + item) })
    })

  } else {
    const absolutePath = path.resolve(galleryPath + '/' + dir)

    files.push({ dir, content: fs.readdirSync(absolutePath) })
  }

  if (files.length === 0) {
    throw createError({
      statusCode: 500,
      statusMessage: 'No files returned',
    })
  } else {
    return files
  }
  
  // // Filter out non-image files (adjust the extensions as needed)
  // const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];
  // const images = files.filter(file => imageExtensions.includes(path.extname(file).toLowerCase()))

  // // Return an array with the full path to each image
  // return images.map(file => path.join(file))
}
