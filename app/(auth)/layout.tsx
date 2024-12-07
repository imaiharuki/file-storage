"use client";

import CatImage from "@/components/CatImage";
import { getCatImage } from "@/lib/getCatImage";
import Image from "next/image";
import React, { useEffect, useState } from "react";

// export const revalidate = 0;

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [catImageUrl, setCatImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchCatImage = async () => {
      try {
        const imageUrl = await getCatImage();
        setCatImageUrl(imageUrl);
      } catch (error) {
        console.error("Error fetching cat image", error);
      }
    };

    fetchCatImage();
  }, []);

  return (
    <div className="flex min-h-screen">
      <section className="bg-brand p-10 hidden w-1/2 items-center justify-center lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <div className="flex items-center font-semibold gap-4">
            <Image
              src={"/favicon_io/favicon.ico"}
              alt="logo"
              width={40}
              height={40}
              className="h-auto"
            />
            <h1 className="text-2xl text-white"> FILE Storage</h1>
          </div>

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is place where you can store your file
            </p>
          </div>
          <Image
            src={"/storage_illust.png"}
            alt="illust"
            width={100}
            height={100}
            className="rounded-lg transition-all hover:rotate-2 hover:scale-110"
          />
          {catImageUrl ? (
            <CatImage
              initialImageUrl={catImageUrl}
              imageProps={{
                className: "h-auto w-[200px] rounded-lg lg:w-[250px]",
              }}
            />
          ) : (
            <p>loading...</p>
          )}
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          {catImageUrl && <CatImage initialImageUrl={catImageUrl} />}
        </div>
        {children}
      </section>
    </div>
  );
};

export default Layout;
