import React, { useEffect, useRef, useState } from "react";

function LazyImage({ src, alt }) {
  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "100px", // Load when 100px below viewport
      }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => {
      if (imgRef.current) observer.unobserve(imgRef.current);
    };
  }, []);

  return (
    <img
      ref={imgRef}
      src={isVisible ? src : ""}
      alt={alt}
      width="200"
      height="200"
      style={{ objectFit: "cover", display: "block" }}
    />
  );
}

function ImageGallery({ images }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 200px)",
        gap: "10px",
        justifyContent: "center",
      }}
    >
      {images.map((url, index) => (
        <LazyImage key={index} src={url} alt={`Image ${index + 1}`} />
      ))}
    </div>
  );
}

export default ImageGallery;
