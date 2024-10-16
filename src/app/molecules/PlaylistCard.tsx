import { AppData } from '../models/App';

const PlaylistCard: React.FC<AppData> = (props: AppData) => {
  return <div>PlaylistCard {props.message?.title} </div>;
};

export default PlaylistCard;
