// import { getServerAuthSession } from "~/server/auth";
import { db } from "~/server/db";
// import { api, HydrateClient } from "~/trpc/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // const session = await getServerAuthSession();

  // void api.post.getLatest.prefetch();
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => [desc(model.id)],
  }); 
  console.log("images: ", images)

  return (
    // <HydrateClient>
      <main className="">
        <div className="flex flex-wrap gap 4">
          {[...images, ...images, ...images].map((image, index) => (
            <div key={image.id + "-" + index} className="flex w-48 p-4 flex-col">
              <img src={image.url}/>
              <div>{image.name}</div>
            </div>
          ))}
        </div>
      </main>
    // </HydrateClient>
  );
}
