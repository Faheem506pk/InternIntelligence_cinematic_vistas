import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

const FeaturedMovies = ({ 
  title, 
  subtitle, 
  movies, 
  loading = false, 
  error = false, 
  className 
}: FeaturedMoviesProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [scrollState, setScrollState] = useState({
    canScrollLeft: false,
    canScrollRight: false
  });

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

  // Update scroll state
  const updateScrollState = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setScrollState({
      canScrollLeft: container.scrollLeft > 0,
      canScrollRight: container.scrollLeft < container.scrollWidth - container.clientWidth - 10
    });
  };

  // Add scroll event listener
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', updateScrollState);
    updateScrollState(); // Initial check

    return () => {
      container.removeEventListener('scroll', updateScrollState);
    };
  }, [movies]);

  return (
    <section 
      className={cn('relative group py-8', className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="relative">
        <div className="pl-6 md:pl-12 mb-6">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {subtitle && (
            <p className="text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>

        <div className="relative">
          {/* Left Navigation */}
          {isHovering && scrollState.canScrollLeft && (
            <div 
              className="absolute left-0 top-4 bottom-0 w-[50px] h-[91%] z-20 flex items-center 
                         bg-[radial-gradient(ellipse_at_left,_rgba(0,0,0,0.8),_rgba(0,0,0,0.2),_transparent)]"
            >
              <button 
                onClick={() => scroll('left')}
                className="ml-[-10px]  hover:scale-110 rounded-full p-2 
                           transition-all duration-300 ease-in-out"
              >
                <ChevronLeft className="w-[50px] h-[50px] text-white" />
              </button>
            </div>
          )}

          {/* Movie List */}
          <div 
            ref={scrollContainerRef}
            className="pl-6 md:pl-12 flex overflow-x-auto space-x-4 hide-scrollbar hover:overflow-y-hidden "
          >
            {movies.map((movie) => (
             <div 
             key={movie.id} 
             className="flex-shrink-0 w-[180px] md:w-[220px] group transition-transform duration-300 hover:scale-110 rounded-[.5vw] py-4 "
           >
             <MovieCard movie={movie} />
           </div>
           
            ))}
          </div>

          {/* Right Navigation */}
          {isHovering && scrollState.canScrollRight && (
            <div 
              className="absolute right-0 top-4 bottom-0 w-[50px] h-[91%] z-20 flex items-center justify-end 
                         bg-[radial-gradient(ellipse_at_right,_rgba(0,0,0,0.8),_rgba(0,0,0,0.2),_transparent)]"
            >
              <button 
                onClick={() => scroll('right')}
                className="mr-[-10px] hover:scale-110 rounded-full p-2 
                           transition-all duration-300 ease-in-out"
              >
                <ChevronRight className="w-[50px] h-[50px] text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMovies;