import ChannelInfo from "components/ChannelInfo";
import ErrorMessage from "components/ErrorMessage";
import TrendingCard from "components/TrendingCard";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { client } from "utils/api-client";
import NoResults from "../components/NoResults";
import Skeleton from '../skeletons/TrendingSkeleton';
import Wrapper from "../styles/Trending";

const StyledChannels = styled.div`
  margin-top: 1rem;
`;

function SearchResults() {
  const { searchQuery } = useParams();
  const { data, isLoading, isError, error, isSuccess } = useQuery(['SearchResults', searchQuery], async () => {
    const users = await client.get(`/users/search?query=${searchQuery}`)
      .then((res) => res.data.users);
    const videos = await client.get(`/videos/search/?query=${searchQuery}`)
      .then((res) => res.data.videos);
    return { users, videos };
  });

  if (isLoading) return <Skeleton />;
  if (isError) return <ErrorMessage error={error} />

  if (isSuccess && !data.videos?.length && !data.users?.length) {
    return (
      <NoResults
        title="No results found"
        text="Try different keywords or remove search filters"
      />
    );
  }

  return (
    <Wrapper>
      <h2>Search Results</h2>
      <StyledChannels>
        {isSuccess && data.users.map((channel) => (
          <ChannelInfo key={channel.id} channel={channel} />
        ))}
      </StyledChannels>
      {isSuccess && data.videos.map((video) => (
        <TrendingCard key={video.id} video={video} />
      ))}
    </Wrapper>
  );
}

export default SearchResults;
