import { AppData } from '../models/App';

const ImageCard: React.FC<AppData> = (props: AppData) => {
  return (
    <div>
      <img
        src={`${process.env.NEXT_PUBLIC_IMG_URL}${props.img.url}`}
        style={{
          userSelect: 'none', // Prevent text/image selection
          pointerEvents: 'none', // Disable interaction
          WebkitUserSelect: 'none', // Prevent dragging on WebKit browsers
        }}
      />
    </div>
  );
};

export default ImageCard;
