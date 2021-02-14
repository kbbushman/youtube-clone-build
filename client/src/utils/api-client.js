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

export async function toggleSubscribeUser(channelId) {
  await client.get(`/users/${channelId}/toggle-subscribe`);
  await queryCache.invalidateQueries("Channel");
  await queryCache.invalidateQueries("Channels");
  await queryCache.invalidateQueries("Subscriptions");
  await queryCache.invalidateQueries("AuthProvider");
  await queryCache.invalidateQueries("WatchVideo");
  await queryCache.invalidateQueries("SearchResults");
}

export async function likeVideo(videoId) {
  await client.get(`/videos/${videoId}/like`);
  await queryCache.invalidateQueries(["WatchVideo", videoId]);
}

export async function dislikeVideo(videoId) {
  await client.get(`/videos/${videoId}/dislike`);
  await queryCache.invalidateQueries(["WatchVideo", videoId]);
}

export async function deleteVideo() {}

export async function deleteComment() {}
