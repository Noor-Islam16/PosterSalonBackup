import ConcertPosters from "../components/collection/ConcertPosters";
import FineArtPosters from "../components/collection/FineArtPosters";
import MoviePosters from "../components/collection/MoviePosters";
import PopCulturePosters from "../components/collection/PopCulturePosters";
import PosterCarousel from "../components/collection/PosterCarousel";
import PostersPage from "../components/collection/PostersPage";
import Footer from "../components/home/Footer";
import PosterSalon from "../components/home/PosterSalon";

export default function Collection() {
  return (
    <div className="w-screen min-h-screen bg-black">
      <PosterCarousel />
      <ConcertPosters />
      <FineArtPosters />
      <MoviePosters />
      <PopCulturePosters />
      <PostersPage />
      <PosterSalon />
      <Footer />
    </div>
  );
}
