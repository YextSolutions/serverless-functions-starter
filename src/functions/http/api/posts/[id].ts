import { SitesHttpRequest, SitesHttpResponse } from "@yext/pages/*";
import { fetch } from "@yext/pages/util";

export default async function post(
  request: SitesHttpRequest
): Promise<SitesHttpResponse> {
  const { method, pathParams, queryParams, body } = request;

  switch (method) {
    case "GET":
      if (!pathParams.id) {
        return {
          body: "Post ID is required",
          headers: {},
          statusCode: 400,
        };
      }

      const postResp = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${pathParams.id}`
      );
      const post = await postResp.json();

      return {
        body: JSON.stringify(post),
        headers: {
          contentType: "application/json",
        },
        statusCode: 200,
      };
    default:
      return { body: "Method not allowed", headers: {}, statusCode: 405 };
  }
}
