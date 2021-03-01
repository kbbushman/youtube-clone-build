import React from "react";
import Wrapper from "../styles/ChannelTabVideo";
import VideoCard from "./VideoCard";

function ChannelTabVideo({ videos }) {
  if (!videos.length) {
    return <p>This channel has not posted any videos yet</p>
  }
  return (
    <Wrapper>
      <div className="videos">
        {videos.map((video) => <VideoCard key={video.id} video={video} noUsername hideAvatar />)}
      </div>
    </Wrapper>
  );
}

export default ChannelTabVideo;
