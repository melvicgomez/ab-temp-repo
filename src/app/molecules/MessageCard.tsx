import { AppData } from '../models/App';

const MessageCard: React.FC<AppData> = (props: AppData) => {
  return <div>MessageCard {props.message?.title} </div>;
};

export default MessageCard;
