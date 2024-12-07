"use client";

import { getCatImage } from "@/lib/getCatImage";
import { LoaderCircle } from "lucide-react";
import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

type CatImageProps = {
  initialImageUrl: string;
  imageProps?: Omit<ImageProps, "src" | "alt">;
};

const CatImage = ({ initialImageUrl, imageProps = {} }: CatImageProps) => {
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadNewImage = async () => {
    setIsLoading(true);
    try {
      const newImageUrl = await getCatImage();
      setImageUrl(newImageUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-64 h-64 cursor-pointer transition-opacity duration-300"
        onClick={loadNewImage}
        style={{ opacity: isLoading ? 0.5 : 1 }}
      >
        <Image
          src={imageUrl}
          alt="Random cat"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
          {...imageProps}
        />
      </div>
      {error && <p className="mt-4 text-red-500">{error.message}</p>}
    </div>
  );
};

export default CatImage;
