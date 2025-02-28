
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="text-xl font-display font-semibold tracking-tight inline-block">
              <span className="pr-1">CINEMATIC</span>
              <span className="text-muted-foreground">VISTAS</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Your premier destination for exploring the world of cinema, with the latest films, insightful reviews, and cinematic stories.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Home</Link></li>
              <li><Link to="/movies" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Movies</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Categories</h3>
            <ul className="space-y-2">
              <li><Link to="/movies?genre=28" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Action</Link></li>
              <li><Link to="/movies?genre=12" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Adventure</Link></li>
              <li><Link to="/movies?genre=35" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Comedy</Link></li>
              <li><Link to="/movies?genre=18" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Drama</Link></li>
              <li><Link to="/movies?genre=27" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Horror</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider">Connect</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Instagram</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Twitter</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Cinematic Vistas. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Terms of Service</a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-xs transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
