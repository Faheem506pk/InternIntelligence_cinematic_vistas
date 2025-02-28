# Cinematic Vistas - Movie Discovery App

A modern web application for discovering movies using The Movie Database (TMDB) API.

## Features

- Browse trending, now playing, upcoming, and top-rated movies
- Search for movies by title
- Filter movies by genre
- View detailed information about each movie
- Responsive design for all devices

## Technologies Used

- React with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- shadcn/ui for UI components
- React Query for data fetching and caching
- React Router for navigation

## Getting Started

### Prerequisites

- Node.js (v14.0 or higher)
- NPM or Yarn
- TMDB API key (get one at https://www.themoviedb.org/settings/api)

### Installation

1. Clone the repository:
git clone https://github.com/Faheem506pk/InternIntelligence_cinematic_vistas 

cd cinematic-vistas


2. Install dependencies:
npm install


3. Create a `.env.local` file in the root directory and add your TMDB API key:
VITE_TMDB_API_KEY=your_api_key_here


4. Update the API key in `src/services/api.ts`:
```typescript
const API_KEY = "your_api_key_here";
Start the development server:

npm run dev
Open http://localhost:8080 to view the app in your browser.

Project Structure
/src: Source code
/components: Reusable UI components
/hooks: Custom React hooks
/pages: Page components
/services: API services
/lib: Utility functions
Deployment
Build the project for production:

npm run build
The built files will be in the dist directory, which you can deploy to your preferred hosting service.

License
MIT

Acknowledgments
The Movie Database (TMDB) for providing the API
shadcn/ui for the beautiful UI components
Tailwind CSS for the styling framework

You can use this README file for your GitHub repository. It provides a comprehensive overview of your project, including features, technologies used, installation instructions, and project structure.