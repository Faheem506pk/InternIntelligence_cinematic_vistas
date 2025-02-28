
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { searchMovies, getMoviesByGenre, getTrendingMovies, getGenres } from "@/services/api";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MovieGrid from "@/components/MovieGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const genreId = searchParams.get("genre") ? parseInt(searchParams.get("genre")!) : null;
  
  const [searchInput, setSearchInput] = useState(searchQuery);
  
  const { data: genresData } = useQuery({
    queryKey: ["genres"],
    queryFn: getGenres,
  });
  
  const { data: moviesData, isLoading } = useQuery({
    queryKey: ["movies", searchQuery, genreId],
    queryFn: async () => {
      if (searchQuery) {
        return searchMovies(searchQuery);
      } else if (genreId) {
        return getMoviesByGenre(genreId);
      } else {
        return getTrendingMovies();
      }
    },
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchParams({ search: searchInput });
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setSearchParams({});
  };

  const handleGenreClick = (id: number) => {
    setSearchInput("");
    setSearchParams({ genre: id.toString() });
  };

  useEffect(() => {
    // Update search input when URL search param changes
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    } else if (genreId && genresData?.genres) {
      const genre = genresData.genres.find(g => g.id === genreId);
      return genre ? `${genre.name} Movies` : "Movies by Genre";
    } else {
      return "Explore Movies";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 md:pt-24">
        <div className=" px-6 md:px-12 py-8 md:py-12">
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">{getPageTitle()}</h1>
            
            <form onSubmit={handleSearch} className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for movies..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10 pr-12 py-6 text-base"
              />
              {searchInput && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-16 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={clearSearch}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2">
                Search
              </Button>
            </form>
            
            {genresData?.genres && (
              <div className="mb-8">
                <h2 className="text-lg font-medium mb-3">Browse by Genre</h2>
                <div className="flex flex-wrap gap-2">
                  {genresData.genres.map((genre) => (
                    <Button
                      key={genre.id}
                      variant={genreId === genre.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleGenreClick(genre.id)}
                      className="rounded-full"
                    >
                      {genre.name}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {isLoading ? (
            <div className="py-16 flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <MovieGrid movies={moviesData?.results || []} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Movies;
