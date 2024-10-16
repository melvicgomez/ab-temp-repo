import { AppData } from '../models/App';

const ImageCard: React.FC<AppData> = (props: AppData) => {
  return (
    <div>
      <img src={`${process.env.NEXT_PUBLIC_IMG_URL}${props.img.url}`} />
    </div>
  );
};

export default ImageCard;
