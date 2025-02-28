import { Link } from "react-router-dom";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const currentYear = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Logo & Social Media */}
          <div className="space-y-4">
            <Link to="/" className="text-xl font-display font-semibold tracking-tight inline-block">
              <span className="pr-1">CINEMATIC</span>
              <span className="text-muted-foreground">VISTAS</span>
            </Link>
            <ul className="flex space-x-4">
              <li>
                <a href="https://www.instagram.com/faheem506pk_" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/faheem506pk/" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Linkedin className="w-5 h-5" />
                  
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@faheem506pk" className="text-muted-foreground hover:text-foreground transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </li>
            </ul>
          </div>

          {/* Movie Genres */}
          <div className="space-y-4">
            <ul className="space-y-2">
              <li><Link to="/movies?genre=28" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Action</Link></li>
              <li><Link to="/movies?genre=12" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Adventure</Link></li>
              <li><Link to="/movies?genre=35" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Comedy</Link></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Jobs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Preferences</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-1 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Cinematic Vistas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
