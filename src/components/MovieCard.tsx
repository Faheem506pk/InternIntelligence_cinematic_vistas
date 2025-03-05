
import { useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl, type Movie } from "@/services/api";

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

const MovieCard = ({ movie, className }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
  to={`/movie/${movie.id}`}
  className={cn(
    "relative overflow-hidden rounded-lg bg-muted/30 transition-all duration-300",
    className
  )}
>

      <div className="aspect-[2/3] w-full overflow-hidden rounded-[.5vw]">
        <div className={cn("relative h-full w-full", !imageLoaded && "shimmer bg-muted/50")}>
          <img
            src={getImageUrl(movie.poster_path, "w500")}
            alt={movie.title}
            className={cn(
              "h-full w-full object-cover transition-all duration-500 hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-[.5vw]">

        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center space-x-1 text-amber-400 mb-2">
            <Star className="h-3.5 w-3.5 fill-current" />
            <span className="text-xs font-medium">{movie.vote_average.toFixed(1)}</span>
          </div>
          <h3 className="text-white font-medium text-sm md:text-base line-clamp-2">
            {movie.title}
          </h3>
          <p className="text-white/70 text-xs mt-1">
            {new Date(movie.release_date).getFullYear()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
