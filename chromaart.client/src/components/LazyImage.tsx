import { useEffect, useRef } from "react";

type LazyImageProps = {
  src: string;
  alt: string;
  containerClassName?: string;
  imageClassName?: string;
};
export default function LazyImage({
  src,
  alt,
  containerClassName,
  imageClassName,
}: LazyImageProps) {
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const loaded = () => {
    if (!imageContainerRef.current) return;
    imageContainerRef.current.classList.add("loaded");
  };

  useEffect(() => {
    if (!imageContainerRef.current) return;

    const img =
      imageContainerRef.current.querySelector<HTMLImageElement>("img");
    if (!img) return;

    if (img.complete) {
      loaded();
    } else {
      img.addEventListener("load", loaded);
    }

    return () => {
      img.removeEventListener("load", loaded);
    };
  }, [imageContainerRef]);
  return (
    <div
      className={`blur-load${" " + containerClassName || ""}`}
      ref={imageContainerRef}
    >
      <img src={src} alt={alt} className={imageClassName} loading="lazy" />
    </div>
  );
}
