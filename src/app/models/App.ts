export interface AppData {
  id: number;
  type: 'img' | 'audio' | 'message' | 'playlist';
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
  audio?: {
    color: string;
    btncolor: string;
    title: string;
    description: string;
    url: string;
  };
}
