export async function GET(request: Request) {
  try {
    return new Response(JSON.stringify("hello"), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), { status: 500 });
  }
}
