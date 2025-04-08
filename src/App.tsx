import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchCategoriesAndContent } from "./lib/api";
import "./index.css";

// Layout Components
import Header from "./components/Header";

// Public Pages
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import MoviePoster from "./pages/MoviePoster";
import BuyNow from "./pages/BuyNow";

// Define Type for API Response
interface ProductData {
  id?: string;
  product_src: string;
  product_name?: string;
  title?: string;
}

interface HomeData {
  topBanner?: string;
  navCategories?: {
    [key: string]: Record<string, string>;
  };
  trendingNow?: ProductData[];
  elvisBanner?: string;
  seeOurNewPosters?: ProductData[];
  artNouveauBanner?: string;
  exploreYourOptions?: ProductData[];
  bestSeller?: ProductData[];
}

function App() {
  const [data, setData] = useState<HomeData | undefined>();

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchCategoriesAndContent();

        if (Array.isArray(response)) {
          throw new Error(
            "Invalid API response: Expected an object but got an array."
          );
        }

        setData(response as HomeData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return <div className="text-white text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <Router>
      <div className="w-screen min-h-screen flex flex-col">
        <Header navCategories={data?.navCategories ?? {}} />

        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/product-categories" element={<Collection />} />
          <Route path="/product/:productName/:id" element={<Product />} />
          <Route path="/products/:category" element={<MoviePoster />} />
          <Route path="/checkout" element={<BuyNow />} />{" "}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
