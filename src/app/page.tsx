// import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
// import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

const mockUrls = [
  "https://utfs.io/f/0a804ecf-0f8f-4bf1-b058-bcb78849c149-qky2u1.jpg",
  "https://utfs.io/f/43ffe360-3221-4a81-8b30-e4aa4d4488b6-qomxnb.webp",
  "https://utfs.io/f/5cf261d7-b32b-4399-b31e-c982d0edcece-lnf40k.avif",
  "https://utfs.io/f/7bde11f0-86dc-4a61-b932-fb074d2705fb-mwu2c2.jpg"
];

const mockImages = mockUrls.map((url, index)=>({
  id: index + 1,
  url
}))

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();
  const posts = await db.query.posts.findMany(); 
  console.log("posts: ", posts)

  return (
    // <HydrateClient>
      <main className="">
        <div className="flex flex-wrap gap 4">
          {posts.map((post) => (
            <div key={post.id}>{post.name}</div>
          ))}
          {[...mockImages, ...mockImages, ...mockImages].map((image, index) => (
            <div key={image.id + "-" + index} className="w-48 p-4">
              <img src={image.url}/>
            </div>
          ))}
        </div>
      </main>
    // </HydrateClient>
  );
}
