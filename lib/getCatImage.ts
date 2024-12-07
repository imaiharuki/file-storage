export async function getCatImage() {
  const timestamp = new Date().getTime();
  const res = await fetch("https://api.thecatapi.com/v1/images/search");

  if (!res.ok) {
    throw new Error("Failed to fetch cat image");
  }
  const data = await res.json();
  return data[0].url;
}
