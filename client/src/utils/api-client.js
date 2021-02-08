import axios from "axios";
import { queryCache } from "react-query";

export const client = axios.create({
  baseURL: "/api/v1",
});

export function authenticate(response) {
  client({
    method: "POST",
    url: "/auth/google-login",
    data: { idToken: response.tokenId },
  })
    .then((res) => {
      console.log("Sign in Success: ", res);
      window.location.assign(window.location.href);
    })
    .catch((err) => {
      console.log("Sign in error: ", err.response);
    });
}

export async function signoutUser() {
  await client.get("/auth/signout");
  window.location.pathname = "/";
}

export async function updateUser() {}

export async function addVideoView(videoId) {
  await client.get(`/videos/${videoId}/view`);
  await queryCache.invalidateQueries("History");
}

export async function addComment() {}

export async function addVideo(video) {
  await client.post("/videos", video);
  await queryCache.invalidateQueries("Channel");
}

export async function subscribeUser() {}

export async function unsubscribeUser() {}

export async function likeVideo() {}

export async function dislikeVideo() {}

export async function deleteVideo() {}

export async function deleteComment() {}
