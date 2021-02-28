// @ts-nocheck
import ErrorMessage from "components/ErrorMessage";
import { useAuth } from "context/auth-context";
import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import ChannelSkeleton from "skeletons/WatchVideoSkeleton";
import { client } from "utils/api-client";
import { VidIcon } from "../components/Icons";
import SignUpCard from "../components/SignUpCard";
import Wrapper from "../styles/Channel";

const activeTabStyle = {
  borderBottom: "2px solid white",
  color: "white",
};

function Channel() {
  const user = useAuth();
  const { channelId } = useParams();
  const [tab, setTab] = React.useState("VIDEOS");

  const loggedInUser = user ? user.id : undefined;
  const userId = channelId || loggedInUser;

  const { data: channel, isLoading, isError, error } = useQuery(['Channel', userId], () => client.get(`/users/${userId}`).then((res) => res.data.user), {
    enabled: userId,
  });

  if (!user) {
    return (
      <SignUpCard
        icon={<VidIcon />}
        title="Manage your videos"
        description="Sign in to upload and manage your videos, pre-recorded or live"
      />
    );
  }

  if (isLoading) return <ChannelSkeleton />;
  if (isError) return <ErrorMessage error={error} />;

  return (
    <Wrapper editProfile={false}>
      <div className="cover">
        <img src="https://dummyimage.com/600x200" alt="channel-cover" />
      </div>

      <div className="header-tabs">
        <div className="header">
          <div className="flex-row">
            <img
              className="avatar lg"
              src="https://dummyimage.com/100x100"
              alt="channel avatar"
            />
            <div>
              <h3>username</h3>
              <span className="secondary">subscribersCount subscribers</span>
            </div>
          </div>
        </div>

        <div className="tabs">
          <ul className="secondary">
            <li
              style={tab === "VIDEOS" ? activeTabStyle : {}}
              onClick={() => setTab("VIDEOS")}
            >
              Videos
            </li>
            <li
              style={tab === "CHANNELS" ? activeTabStyle : {}}
              onClick={() => setTab("CHANNELS")}
            >
              Channels
            </li>
            <li
              style={tab === "ABOUT" ? activeTabStyle : {}}
              onClick={() => setTab("ABOUT")}
            >
              About
            </li>
          </ul>
        </div>
      </div>

      <div className="tab"></div>
    </Wrapper>
  );
}

export default Channel;
