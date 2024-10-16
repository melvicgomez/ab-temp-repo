import Masonry from 'react-masonry-css';
import { AppData } from '../models/App';
import ImageCard from '../molecules/ImageCard';
import PlaylistCard from '../molecules/PlaylistCard';
import MessageCard from '../molecules/MessageCard';
import VideoCard from '../molecules/VideoCard';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const breakpointColumnsObj = {
    default: 4,
    1280: 4,
    1024: 3,
    768: 2,
    640: 1,
  };

  const [data, setData] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://melvicgomez.xyz/static/ab-data.php')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((jsonData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Fetch error:', error);
        setLoading(false);
      });
  }, []);

  return (
    !loading && (
      <div className="max-w-screen-xl mx-auto">
        <Masonry breakpointCols={breakpointColumnsObj} className="grid" columnClassName="gridColumn">
          {data.map((item, index) => (
            <div key={index} className="card">
              {item.type === 'img' && <ImageCard {...item} />}
              {item.type === 'video' && <VideoCard {...item} />}
              {item.type === 'message' && <MessageCard {...item} />}
              {item.type === 'playlist' && <PlaylistCard {...item} />}
            </div>
          ))}
        </Masonry>
      </div>
    )
  );
}
