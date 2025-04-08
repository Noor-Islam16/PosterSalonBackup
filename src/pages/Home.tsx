import { FC } from "react";
import AdsCarousel from "../components/home/AdsCarousel";
import ArtCarousel from "../components/home/ArtCarousel";
import BestSeller from "../components/home/BestSeller";
import Collectible from "../components/home/Collectible";
import Explore from "../components/home/Explore";
import Footer from "../components/home/Footer";
import HomeDecor from "../components/home/HomeDecor";
import ImageCarousel from "../components/home/ImageCarousel";
import LiveConcertPosters from "../components/home/LiveConcertPosters";
import Man from "../components/home/man";
import MoviePosterCarousel from "../components/home/MoviePosterCarousel";
import PosterSalon from "../components/home/PosterSalon";
import ShopNow from "../components/home/ShopNow";
import TrendingNow from "../components/home/TrendingNow";

// **Define Type for ProductData**
interface ProductData {
  id?: string;
  product_src: string;
  product_name?: string;
  title?: string;
}

// **Define Type for Navigation Categories**
interface NavCategories {
  "Concert Posters"?: Record<string, string>;
  "Movie Posters"?: Record<string, string>;
  "Fine Art Prints"?: Record<string, string>;
  "Pop Culture"?: Record<string, string>;
}

// **Define Type for Home Data**
interface HomeData {
  topBanner?: string;
  navCategories?: NavCategories;
  trendingNow?: ProductData[];
  elvisBanner?: string;
  seeOurNewPosters?: ProductData[];
  artNouveauBanner?: string;
  exploreYourOptions?: ProductData[];
  bestSeller?: ProductData[];
}

// **Define Props Type for Home Component**
interface HomeProps {
  data?: HomeData; // 🔹 Making `data` optional to prevent strict prop validation issues.
}

// **Functional Component with TypeScript Compliance**
const Home: FC<HomeProps> = ({ data = {} }) => {
  return (
    <div className="w-screen min-h-screen bg-black">
      <ImageCarousel topBanner={data.topBanner ?? ""} />
      <LiveConcertPosters concertCategories={data.navCategories?.["Concert Posters"] ?? {}} />

      <TrendingNow
        data={data.trendingNow?.map((item) => ({
          product_src: item.product_src,
          product_name: item.product_name ?? "",
          id: item.id ?? "",
        })) ?? []}
      />

      <MoviePosterCarousel elvisBanner={data.elvisBanner ?? ""} />
      <Collectible moviePoster={data.navCategories?.["Movie Posters"] ?? {}} />

      <ShopNow
        data={data.seeOurNewPosters?.map((item) => ({
          product_src: item.product_src,
          product_name: item.product_name ?? "",
          id: item.id ?? "",
        })) ?? []}
      />

      <ArtCarousel artNouveauBanner={data.artNouveauBanner ?? ""} />
      <HomeDecor fineArtsPrints={data.navCategories?.["Fine Art Prints"] ?? {}} />

      <Explore
        data={data.exploreYourOptions?.map((item) => ({
          product_src: item.product_src,
          product_name: item.title ?? "",
          title: item.title ?? "",
          id: item.id ?? "",
        })) ?? []}
      />

      <AdsCarousel />
      <Man popCulture={data.navCategories?.["Pop Culture"] ?? {}} />

      <BestSeller
        data={data.bestSeller?.map((item) => ({
          product_src: item.product_src,
          product_name: item.product_name ?? "",
          id: item.id ?? "",
        })) ?? []}
      />

      <PosterSalon />
      <Footer />
    </div>
  );
};

export default Home;
