import { createNextRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";
import { UTApi } from "uploadthing/server";

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});

export async function DELETE(request: Request) {
  const utapi = new UTApi();
  try {
    const { searchParams } = new URL(request.url);
    const fileKey = searchParams.get("fileKey");

    if (!fileKey) {
      return new Response(JSON.stringify("no fileKey"), { status: 400 });
    }
    console.log(fileKey, "its here");
    await utapi.deleteFiles(fileKey);
    return new Response(JSON.stringify("deleted"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
