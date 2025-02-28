
import { Movie } from "@/services/api";
import MovieCard from "./MovieCard";
import LoadingSpinner from "./LoadingSpinner";

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  error?: boolean;
}

const MovieGrid = ({ movies, loading = false, error = false }: MovieGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Array.from({ length: 10 }).map((_, index) => (
          <div
            key={index}
            className="aspect-[2/3] rounded-lg bg-muted/50 shimmer"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <h3 className="text-xl font-medium mb-2">Error loading movies</h3>
        <p className="text-muted-foreground mb-4">
          We encountered an issue while loading the movie data. Please try again later.
        </p>
        <LoadingSpinner size="md" />
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-xl font-medium mb-2">No movies found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
