import { getCatImage } from "@/lib/getCatImage";
import CatImage from "@/components/CatImage";

export default async function Home() {
  try {
    const initialImageUrl = await getCatImage();
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Random Cat Image</h1>
        <p className="mb-4 text-center text-gray-600">
          Click the image to see a new cat!
        </p>
        <CatImage
          initialImageUrl={initialImageUrl}
          imageProps={{
            fill: false,
            width: 1000,
            height: 1000,
          }}
        />
      </main>
    );
  } catch (error) {
    console.error("Failed to fetch cat image:", error);
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">Random Cat Image</h1>
        <p className="text-red-500">
          Failed to load cat image. Please try refreshing the page.
        </p>
      </main>
    );
  }
}
