
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Movie, getImageUrl } from "@/services/api";

interface HeroProps {
  movie: Movie;
}

const Hero = ({ movie }: HeroProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const img = new Image();
    img.src = getImageUrl(movie.backdrop_path, "original");
    img.onload = () => setIsLoaded(true);
  }, [movie.backdrop_path]);

  return (
    <div className="relative h-[70vh] md:h-[calc(85vh+69px)] w-full overflow-hidden">
      {/* Background Image with Overlay Gradient */}
      <div 
        className={`absolute inset-0 bg-muted/50 transition-opacity duration-700 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />
      <div className="absolute inset-0">
        <img
          src={getImageUrl(movie.backdrop_path, "original")}
          alt={movie.title}
          className={`h-full w-full object-cover object-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/10" />
      </div>
      
      {/* Content */}
      <div className="absolute inset-0 flex items-end md:items-center justify-start">
        <div className="container mx-auto px-4 pb-16 md:pb-0 animate-fade-in">
          <div className="max-w-2xl space-y-4">
            <div className="inline-block bg-primary/80 backdrop-blur-sm px-3 py-1 rounded text-xs text-white font-medium uppercase tracking-wider animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Featured Film
            </div>
            <h1 
              className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-sm animate-fade-in" 
              style={{ animationDelay: "0.4s" }}
            >
              {movie.title}
            </h1>
            <p 
              className="text-white/80 text-sm md:text-base max-w-xl animate-fade-in" 
              style={{ animationDelay: "0.5s" }}
            >
              {movie.overview.length > 200 
                ? `${movie.overview.substring(0, 200)}...` 
                : movie.overview}
            </p>
            <div 
              className="flex flex-wrap gap-3 pt-2 animate-fade-in" 
              style={{ animationDelay: "0.6s" }}
            >
              <Button 
                onClick={() => navigate(`/movie/${movie.id}`)}
                className="bg-white text-black hover:bg-white/90 font-medium"
                size="lg"
              >
                More Details
              </Button>
              <Button 
                variant="outline" 
                className="bg-black/30 backdrop-blur-sm border-white/30 text-white hover:bg-black/40 hover:text-white"
                size="lg"
              >
                <Play className="mr-2 h-4 w-4 fill-current" /> Watch Trailer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
