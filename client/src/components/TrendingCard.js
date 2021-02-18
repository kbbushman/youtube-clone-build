import React from "react";
import { Link } from "react-router-dom";
import { formatCreatedAt } from "utils/date";
import Wrapper from "../styles/TrendingCard";

function TrendingCard({ video }) {
  return (
    <Wrapper>
      <Link to={`/watch/${video.id}`}>
        <img
          className="thumb"
          src={video.thumbnail}
          alt={video.title}
        />
      </Link>
      <div className="video-info-container">
        <Link to={`/watch/${video.id}`}>
          <h3>{video.title}</h3>
        </Link>
        <p className="secondary">
          <span>{video.user.username}</span>
          <span>•</span>
          <span>{video.views} views</span>
          <span>•</span> <span>{formatCreatedAt(video.createdAt)}</span>
        </p>
        <p className="secondary">{video.description}</p>
      </div>
    </Wrapper>
  );
}

export default TrendingCard;
