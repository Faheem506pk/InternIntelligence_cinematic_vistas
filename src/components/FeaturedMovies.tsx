
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import MovieCard from './MovieCard';
import { Movie } from '@/services/api';
import { cn } from '@/lib/utils';

interface FeaturedMoviesProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  loading?: boolean;
  error?: boolean;
  className?: string;
}

const FeaturedMovies = ({ title, subtitle, movies, loading = false, error = false, className }: FeaturedMoviesProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.clientWidth * 0.75;
    const scrollTo = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;
    
    container.scrollTo({
      left: scrollTo,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex overflow-x-auto pb-4 gap-4 snap-x-mandatory hide-scrollbar">
          {Array.from({ length: 6 }).map((_, index) => (
            <div 
              key={index} 
              className="w-[180px] md:w-[220px] flex-shrink-0 snap-start aspect-[2/3] rounded-lg bg-muted/50 shimmer"
            />
          ))}
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center py-12 text-center text-muted-foreground">
          <AlertTriangle className="h-5 w-5 mr-2 text-amber-500" />
          <span>Unable to load movies at this time.</span>
        </div>
      );
    }

    if (movies.length === 0) {
      return (
        <div className="flex items-center justify-center py-12 text-center text-muted-foreground">
          No movies available.
        </div>
      );
    }

    return (
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto pb-4 gap-4 snap-x-mandatory hide-scrollbar"
        onScroll={handleScroll}
      >
        {movies.map((movie) => (
          <div key={movie.id} className="w-[180px] md:w-[220px] flex-shrink-0 snap-start">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className={cn('py-8 md:py-5', className)}>
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-end mb-6 md:mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
            {subtitle && (
              <p className="text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          {!loading && !error && movies.length > 0 && (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'rounded-full transition-opacity',
                  !showLeftArrow && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => scroll('left')}
                disabled={!showLeftArrow}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  'rounded-full transition-opacity',
                  !showRightArrow && 'opacity-50 cursor-not-allowed'
                )}
                onClick={() => scroll('right')}
                disabled={!showRightArrow}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>

        <div className="relative">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;
