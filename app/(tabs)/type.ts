export interface User {
  id: string;
  name: string;
  profile_picture: string;
  email: string;
  location: {
    type: string;
    coordinates: number[];
  };
  address: string;
  interests: string[];
  bio: string;
}
