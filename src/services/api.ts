
import { toast } from "@/hooks/use-toast";

// Replace this with your valid TMDB API key
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;// TMDB API key - Get from https://www.themoviedb.org/settings/api
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
  popularity: number;
}

export interface MovieDetails extends Movie {
  genres: { id: number; name: string }[];
  runtime: number;
  tagline: string;
  status: string;
  budget: number;
  revenue: number;
  homepage: string;
  production_companies: { id: number; name: string; logo_path: string }[];
  credits: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string;
    }[];
    crew: {
      id: number;
      name: string;
      job: string;
      department: string;
    }[];
  };
  videos: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}

export const getImageUrl = (path: string | null, size: string = "original"): string => {
  if (!path) return "/placeholder.svg";
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

const fetchAPI = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API fetch error:", error);
    toast({
      title: "Error fetching data",
      description: error instanceof Error ? error.message : "Unknown error occurred",
      variant: "destructive",
    });
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/trending/movie/week?api_key=${API_KEY}`);
};

export const getNowPlayingMovies = async (): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/movie/now_playing?api_key=${API_KEY}`);
};

export const getUpcomingMovies = async (): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/movie/upcoming?api_key=${API_KEY}`);
};

export const getTopRatedMovies = async (): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/movie/top_rated?api_key=${API_KEY}`);
};

export const getMovieDetails = async (id: string): Promise<MovieDetails> => {
  return fetchAPI<MovieDetails>(`/movie/${id}?api_key=${API_KEY}&append_to_response=credits,videos`);
};

export const searchMovies = async (query: string): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
};

export const getMoviesByGenre = async (genreId: number): Promise<MovieResponse> => {
  return fetchAPI<MovieResponse>(`/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`);
};

export const getGenres = async (): Promise<{ genres: { id: number; name: string }[] }> => {
  return fetchAPI<{ genres: { id: number; name: string }[] }>(`/genre/movie/list?api_key=${API_KEY}`);
};
