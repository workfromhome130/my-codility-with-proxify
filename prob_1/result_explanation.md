# Explanation

## `LazyImage` component

- Uses `IntersectionObserver` to detect when the image enters the viewport (with `rootMargin: "100px"` for early loading).
- Starts with `src=""` until it becomes visible, per the requirement.
- Once visible, sets the real image `src` and unobserves it.

## `ImageGallery`

- Displays images in a 3-column grid.
- Each cell is 200×200px, matching the requirement.

## Performance

- Each image only loads when needed.
- Observer disconnects once loaded.
