# Problem 1 - `lazy_loading`

Your task is to implement a component displaying a lazily loaded image gallery.

## Requirements

1. Your component should accept an `images` property, which is an array of image URLs for the gallery.

2. Use the `img` element to display the images. Ensure that you also use `img` for images that aren't loaded yet (`img` with empty `src` attribute).

3. Arrange the images in a three column grid with `200px` by `200px` cells.

4. Implement lazy loading so that an image in the gallery should be loaded once the image is `100px` or less below the visible viewport (below the fold).

   Assumptions:

   - The `images` property always contains an array of working image URLs.
   - All images in the `images` property have dimensions of `200px` width and `200px` height.

## Hints

- intersectionObserver might be useful
- Do NOT use `React.lazy` this task is about lazy loading images not code splitting.
- You can create multiple components in one file if you want to, but remember to export the gallery component.
- Your solution will be evaluated based on its correctness, performance and coding style will not be assessed.
- Do not edit the default export.

## Available tools/packages

- React 17.0.1
- JavaScript ES2020

Examples
(gif file)

## Boilerplate code

```js
import React from "react";

function ImageGallery({ images }) {
  return <div></div>;
}

export default ImageGallery;
```
