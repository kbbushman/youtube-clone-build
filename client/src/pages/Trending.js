import ErrorMessage from "components/ErrorMessage";
import TrendingCard from "components/TrendingCard";
import React from "react";
import { useQuery } from "react-query";
import TrendingSkeleton from "skeletons/TrendingSkeleton";
import { client } from "utils/api-client";
import Wrapper from "../styles/Trending";

function Trending() {
  const { data: videos, isLoading, isError, isSuccess, error }  = useQuery("TrendingVideos", () => client.get('/videos/trending').then((res) => res.data.videos));

  if (isLoading) return <TrendingSkeleton />;
  if (isError) return <ErrorMessage error={error} />

  return (
    <Wrapper>
      <h2>Trending</h2>

      <div className="trending">
        {isSuccess && (
          videos.map((video) => (
            <TrendingCard key={video.id} video={video} />
          ))
        )}
      </div>
    </Wrapper>
  );
}

export default Trending;
