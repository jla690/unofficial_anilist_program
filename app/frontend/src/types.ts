export interface User {
  about: string;
  id: number;
  bannerImage: string;
  name: string;
  avatar: {
    medium: string;
  };
}

export interface UserListItem {
  chapters?: number | null;
  episodes?: number | null;
  format?: string;
  score: number;
  progress: string;
  countryOfOrigin: string;
  status: string;
  media: {
    id: number;
    averageScore?: number;
    title: {
      english: string;
      romaji: string;
      native: string;
    };
  };
}

export interface SearchListItem {
  id: number;
  averageScore: number;
  chapters?: number | null;
  episodes?: number | null;
  format: string;
  countryOfOrigin: string;
  status: string;
  title: {
    english: string;
    romaji: string;
    native: string;
  };
}

export interface Media {
  media: {
    chapters?: number;
    coverImage: {
      extraLarge: string;
    };
    description: string;
    episodes?: number;
    format: string;
    genres: string[];
    meanScore: number;
    id: number;
    volumes: number;
    siteUrl: string;
    status: string;
    title: {
      english: string;
      romaji: string;
      native: string;
    };
    type: string;
  };
  user_data: {
    progress?: number;
    score?: number;
    status?: string;
  };
}
