import { AppData } from '../models/App';

const VideoCard: React.FC<AppData> = (props: AppData) => {
  return <div>VideoCard {props.img.url} </div>;
};

export default VideoCard;
