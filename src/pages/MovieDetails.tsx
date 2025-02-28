
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getMovieDetails, getImageUrl } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Star, Calendar, Clock, Play, ArrowLeft } from "lucide-react";

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const [posterLoaded, setPosterLoaded] = useState(false);

  const { data: movie, isLoading } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => getMovieDetails(id!),
    enabled: !!id,
  });

  useEffect(() => {
    // Preload images
    if (movie) {
      if (movie.backdrop_path) {
        const backdropImg = new Image();
        backdropImg.src = getImageUrl(movie.backdrop_path, "original");
        backdropImg.onload = () => setBackdropLoaded(true);
      } else {
        setBackdropLoaded(true);
      }

      if (movie.poster_path) {
        const posterImg = new Image();
        posterImg.src = getImageUrl(movie.poster_path, "w500");
        posterImg.onload = () => setPosterLoaded(true);
      } else {
        setPosterLoaded(true);
      }
    }
  }, [movie]);

  const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getTrailerUrl = () => {
    if (!movie?.videos?.results) return null;
    
    const trailer = movie.videos.results.find(
      video => video.type === "Trailer" && video.site === "YouTube"
    );
    
    return trailer ? `https://www.youtube.com/watch?v=${trailer.key}` : null;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
            <Link to="/movies">
              <Button>Back to Movies</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const trailerUrl = getTrailerUrl();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Backdrop Image */}
        <div className="relative h-[50vh] md:h-[70vh]">
          <div className={`absolute inset-0 bg-muted/50 transition-opacity duration-700 ${
            backdropLoaded ? "opacity-0" : "opacity-100"
          }`} />
          <div className="absolute inset-0">
            <img
              src={getImageUrl(movie.backdrop_path, "original")}
              alt={movie.title}
              className={`h-full w-full object-cover object-center transition-opacity duration-1000 ${
                backdropLoaded ? "opacity-100" : "opacity-0"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
          </div>

          {/* Back Button */}
          <div className="absolute top-20 md:top-24 left-4 z-10">
            <Link to="/movies">
              <Button variant="ghost" size="sm" className="text-white hover:bg-black/20 hover:text-white">
                <ArrowLeft className="mr-1 h-4 w-4" /> Back
              </Button>
            </Link>
          </div>
        </div>

        {/* Movie Content */}
        <div className="container mx-auto px-4 relative -mt-40 md:-mt-60 z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {/* Poster */}
            <div className="hidden md:block">
              <div className={`relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg ${
                !posterLoaded && "shimmer bg-muted/50"
              }`}>
                <img
                  src={getImageUrl(movie.poster_path, "w500")}
                  alt={movie.title}
                  className={`h-full w-full object-cover transition-opacity duration-500 ${
                    posterLoaded ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:col-span-2 animate-fade-in">
              <div className="mb-4 md:mb-6 flex flex-wrap items-center gap-3">
                {movie.genres.map((genre) => (
                  <Link 
                    key={genre.id} 
                    to={`/movies?genre=${genre.id}`}
                    className="px-3 py-1 bg-muted/80 rounded-full text-xs font-medium hover:bg-muted transition-colors"
                  >
                    {genre.name}
                  </Link>
                ))}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
                {movie.title}
              </h1>

              {movie.tagline && (
                <p className="text-muted-foreground text-lg italic mb-6">
                  "{movie.tagline}"
                </p>
              )}

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
                <div className="flex items-center">
                  <Star className="mr-1 h-5 w-5 text-amber-400 fill-amber-400" />
                  <span className="font-medium">{movie.vote_average.toFixed(1)}</span>
                  <span className="text-muted-foreground ml-1">({movie.vote_count} votes)</span>
                </div>

                {movie.release_date && (
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="mr-1 h-4 w-4" />
                    <span>{new Date(movie.release_date).toLocaleDateString()}</span>
                  </div>
                )}

                {movie.runtime > 0 && (
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="mr-1 h-4 w-4" />
                    <span>{formatRuntime(movie.runtime)}</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-3">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {movie.overview || "No overview available."}
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mb-10">
                {trailerUrl && (
                  <a href={trailerUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="gap-2">
                      <Play className="h-4 w-4 fill-current" /> Watch Trailer
                    </Button>
                  </a>
                )}
                {movie.homepage && (
                  <a href={movie.homepage} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="lg">
                      Official Website
                    </Button>
                  </a>
                )}
              </div>

              {/* Additional Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6 border-t">
                {/* Cast */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Cast</h2>
                  <div className="space-y-4">
                    {movie.credits.cast.slice(0, 8).map((person) => (
                      <div key={person.id} className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-muted">
                          {person.profile_path ? (
                            <img
                              src={getImageUrl(person.profile_path, "w185")}
                              alt={person.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                              {person.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{person.name}</div>
                          <div className="text-sm text-muted-foreground">{person.character}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <h2 className="text-xl font-bold mb-4">Details</h2>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <div className="font-medium">{movie.status}</div>
                    </div>
                    
                    {movie.budget > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Budget:</span>
                        <div className="font-medium">{formatCurrency(movie.budget)}</div>
                      </div>
                    )}
                    
                    {movie.revenue > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Revenue:</span>
                        <div className="font-medium">{formatCurrency(movie.revenue)}</div>
                      </div>
                    )}
                    
                    {movie.production_companies.length > 0 && (
                      <div>
                        <span className="text-sm text-muted-foreground">Production:</span>
                        <div className="font-medium">
                          {movie.production_companies.map(c => c.name).join(', ')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MovieDetails;
