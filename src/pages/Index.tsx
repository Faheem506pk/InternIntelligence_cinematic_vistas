
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getTrendingMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies, type Movie } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedMovies from "@/components/FeaturedMovies";
import LoadingSpinner from "@/components/LoadingSpinner";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [apiError, setApiError] = useState(false);
  
  const { data: trendingMovies, isLoading: trendingLoading, isError: trendingError } = useQuery({
    queryKey: ["trendingMovies"],
    queryFn: getTrendingMovies,
    meta: {
      onError: () => {
        setApiError(true);
        toast({
          title: "API Error",
          description: "Unable to load movie data. Please check your API key.",
          variant: "destructive",
        });
      }
    }
  });

  const { data: nowPlayingMovies, isLoading: nowPlayingLoading, isError: nowPlayingError } = useQuery({
    queryKey: ["nowPlayingMovies"],
    queryFn: getNowPlayingMovies,
  });

  const { data: topRatedMovies, isLoading: topRatedLoading, isError: topRatedError } = useQuery({
    queryKey: ["topRatedMovies"],
    queryFn: getTopRatedMovies,
  });

  const { data: upcomingMovies, isLoading: upcomingLoading, isError: upcomingError } = useQuery({
    queryKey: ["upcomingMovies"],
    queryFn: getUpcomingMovies,
  });

  useEffect(() => {
    if (nowPlayingMovies?.results && nowPlayingMovies.results.length > 0) {
      // Find a movie with a backdrop and at least 6.5 rating for hero
      const potentialHeroes = nowPlayingMovies.results
        .filter(movie => movie.backdrop_path && movie.vote_average >= 6.5)
        .slice(0, 5);
      
      if (potentialHeroes.length) {
        const randomIndex = Math.floor(Math.random() * potentialHeroes.length);
        setFeaturedMovie(potentialHeroes[randomIndex]);
      } else {
        setFeaturedMovie(nowPlayingMovies.results[0]);
      }
    }
  }, [nowPlayingMovies]);

  const isLoading = trendingLoading || nowPlayingLoading || topRatedLoading || upcomingLoading;
  const isError = trendingError || nowPlayingError || topRatedError || upcomingError;

  // If there's an error but we're still loading, show loading spinner
  if (isLoading && !featuredMovie && !apiError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  // If there's a critical API error, show fallback UI
  if (apiError && !featuredMovie) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-lg px-4">
            <h1 className="text-3xl font-bold mb-4">Unable to Connect</h1>
            <p className="text-muted-foreground mb-8">
              We're having trouble connecting to our movie database. This might be due to an invalid API key or 
              temporary service unavailability. Please try again later.
            </p>
            <div className="p-4 bg-muted/30 rounded-lg text-sm text-muted-foreground">
              <p className="font-mono">Error: Invalid API key or API service unavailable</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Default render with fallback for hero if needed
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {featuredMovie ? (
          <Hero movie={featuredMovie} />
        ) : (
          <div className="h-[70vh] md:h-[85vh] bg-muted/30 flex items-center justify-center">
            <div className="text-center px-4">
              <h1 className="text-4xl font-bold mb-4">Cinematic Vistas</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your premiere destination for exploring the world of cinema.
              </p>
            </div>
          </div>
        )}

        <div className="space-y-1 md:space-y-1 pb-16 pt-5">
          <FeaturedMovies
            title="Trending This Week"
            subtitle="The most popular movies right now"
            movies={trendingMovies?.results || []}
            loading={trendingLoading}
            error={trendingError}
          />

          <FeaturedMovies
            title="Now Playing"
            subtitle="In theaters now"
            movies={nowPlayingMovies?.results || []}
            loading={nowPlayingLoading}
            error={nowPlayingError}
            className="bg-muted/30 "
          />

          <FeaturedMovies
            title="Top Rated"
            subtitle="Movies that stood the test of time"
            movies={topRatedMovies?.results || []}
            loading={topRatedLoading}
            error={topRatedError}
          />

          <FeaturedMovies
            title="Coming Soon"
            subtitle="Movies to look forward to"
            movies={upcomingMovies?.results || []}
            loading={upcomingLoading}
            error={upcomingError}
            className="bg-muted/30 "
          />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
