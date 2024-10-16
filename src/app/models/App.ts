export interface AppData {
  id: number;
  type: 'img' | 'video' | 'message' | 'playlist';
  img: {
    title?: string;
    url?: string;
  };
  message?: {
    title: string;
    description: string;
  };
  playlist?: {
    title: string;
  };
}
