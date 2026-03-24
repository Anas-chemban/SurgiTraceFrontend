import { getVideoStreamUrl } from "./api";

type Props = {
  videoId: number;
};

const VideoPlayer = ({ videoId }: Props) => {
  const videoUrl = getVideoStreamUrl(videoId);

  return (
    <div className="bg-black rounded-lg overflow-hidden">
      <video
        controls
        width="100%"
        src={videoUrl}
        onContextMenu={(e) => e.preventDefault()} // optional
      />
    </div>
  );
};

export default VideoPlayer;