import { useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { AppData } from '../models/App';
import ImageCard from '../molecules/ImageCard';
import AudioCard from '../molecules/AudioCard';

// import jsonData from '@/app/data.json';

export default function Dashboard() {
  const breakpointColumnsObj = {
    default: 5,
    1024: 6,
    768: 5,
    640: 4,
    500: 3,
    300: 2,
  };

  const [data, setData] = useState<AppData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://melvicgomez.xyz/static/ab-data.json')
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
        <p className="py-4 px-2 text-3xl bg-blue-800 mb-4">
          {`Hello MK, I'm congratulating you for accessing this page. 👏👏 no more brain rot 😁. You'll be fine, I'm sure about it because you are a strong being.`}
        </p>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="grid"
          columnClassName="gridColumn"
        >
          {data.map((item: AppData, index: number) => (
            <div key={index} className="card">
              {item.type === 'img' && <ImageCard {...item} />}
              {item.type === 'audio' && <AudioCard {...item} />}
            </div>
          ))}
        </Masonry>

        <div className="flex justify-between bg-blue-800 py-4 px-2 mt-4">
          <a
            className="text-3xl underline"
            href="https://open.spotify.com/playlist/4D4goVmF7UQCbKMOx46LRi?si=0544c9834a6c44f5"
          >
            Spotify playlist
          </a>
          <p className="text-3xl ">End.</p>
        </div>
      </div>
    )
  );
}
