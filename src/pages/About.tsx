
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20 md:pt-24">
        {/* Header */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">About Cinematic Vistas</h1>
            <div className="max-w-2xl mx-auto">
              <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }}>
                Your premier destination for exploring the world of cinema, with the latest films, insightful reviews, and cinematic stories.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 order-2 md:order-1 animate-fade-in">
                <div className="inline-block bg-primary/10 px-3 py-1 rounded text-xs font-medium uppercase tracking-wider text-primary">
                  Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl font-bold">Celebrating the Art of Storytelling</h2>
                <p className="text-muted-foreground leading-relaxed">
                  At Cinematic Vistas, we believe that cinema is one of the most powerful mediums for storytelling. Our mission is to celebrate this art form by providing a platform where movie enthusiasts can discover, explore, and appreciate the magic of filmmaking.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We are dedicated to curating a diverse selection of films from around the world, spanning different genres, eras, and cultures. Whether you're a casual moviegoer or a devoted cinephile, we aim to enhance your cinematic journey with thoughtful content and a user-friendly experience.
                </p>
              </div>
              <div className="order-1 md:order-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                    alt="Group of people viewing screens"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* What We Offer */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in">
              <div className="inline-block bg-primary/10 px-3 py-1 rounded text-xs font-medium uppercase tracking-wider text-primary mb-4">
                What We Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-bold">Your Complete Movie Experience</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-background rounded-lg p-6 shadow-sm animate-fade-in" style={{ animationDelay: "0.1s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Extensive Movie Library</h3>
                <p className="text-muted-foreground">
                  Access information about thousands of movies from the latest blockbusters to timeless classics, all in one place.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Curated Collections</h3>
                <p className="text-muted-foreground">
                  Discover films through our thoughtfully curated collections based on genres, themes, directors, and more.
                </p>
              </div>
              
              <div className="bg-background rounded-lg p-6 shadow-sm animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Advanced Search</h3>
                <p className="text-muted-foreground">
                  Find exactly what you're looking for with our powerful search and filtering tools, designed to help you explore cinema your way.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="bg-muted rounded-lg p-8 md:p-12 text-center shadow-sm animate-fade-in">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Explore?</h2>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Dive into our extensive collection of movies and start discovering new favorites today.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/movies">
                  <Button size="lg">Browse Movies</Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
