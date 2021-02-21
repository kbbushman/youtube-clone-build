// @ts-nocheck
import ChannelSuggestions from "components/ChannelSuggestions";
import ErrorMessage from "components/ErrorMessage";
import VideoCard from "components/VideoCard";
import { useAuth } from "context/auth-context";
import React from "react";
import { useQuery } from "react-query";
import HomeSkeleton from "skeletons/HomeSkeleton";
import { client } from "utils/api-client";
import { SubIcon } from "../components/Icons";
import SignUpCard from "../components/SignUpCard";
import Wrapper from "../styles/Home";
import VideoGrid from "../styles/VideoGrid";

function Subscriptions() {
  const user = useAuth();
  const { data: feed, isLoading, isError, error, isSuccess } = useQuery("Subscriptions", () => client.get('/users/subscriptions').then((res) => res.data.feed), {
    enabled: user,
  });

  if (!user) {
    return (
      <SignUpCard
        icon={<SubIcon />}
        title="Don't miss new videos"
        description="Sign in to see updates from your favorite YouTube channels"
      />
    );
  }

  if (isLoading) return <HomeSkeleton />;
  if (isError) return <ErrorMessage error={error} />;
  if (!isLoading && !feed.length) return <ChannelSuggestions />;

  return (
    <Wrapper>
      <div style={{ marginTop: "1.5rem" }}></div>

      <VideoGrid>{isSuccess && feed.map((video) => (
        <VideoCard key={video.id} video={video} hideAvatar />
      ))}</VideoGrid>
    </Wrapper>
  );
}

export default Subscriptions;
