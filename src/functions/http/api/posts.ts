import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

export default async function posts(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { method, body } = request;

  console.log("body", body);

  switch (method) {
    case "GET":
      const postsResp = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      const posts = await postsResp.json();

      return {
        body: JSON.stringify(posts),
        headers: {
          contentType: "application/json",
        },
        statusCode: 200,
      };
    case "POST":
      if (!body.title || !body.body) {
        return {
          body: "Title and body are required",
          headers: {},
          statusCode: 400,
        };
      }

      const createdPostResp = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify({
            title: body.title,
            body: body.body,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      const createdPost = await createdPostResp.json();

      return {
        body: JSON.stringify(createdPost),
        headers: {
          contentType: "application/json",
        },
        statusCode: 200,
      };
    default:
      return { body, headers: {}, statusCode: 405 };
  }
}
