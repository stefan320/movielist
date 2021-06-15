import React from "react";

const MoviePreview = (props) => {
  console.log(props);
  return (
    <div>
      <iframe
        width="1280"
        height="720"
        src={props.videoUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MoviePreview;
