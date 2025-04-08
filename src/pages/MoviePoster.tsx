import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByCategory } from "../lib/api";

import MoviePosters from "../components/Movie/MoviePosters";
import PosterCarousel from "../components/collection/PosterCarousel";
import Footer from "../components/home/Footer";

import PosterSalon from "../components/Movie/PosterSalon.tsx";
import { Button } from "../components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MetaTags from "../components/MetaTags";

interface ProductData {
  id: string;
  product_name: string;
  product_src: string;
}

interface CategoryResponse {
  banner?: { banner: string };
  meta?: {
    title: string;
    category_meta?: string;
    cat_description?: string;
  };
  products: ProductData[];
  pagination?: {
    total: number;
    current_page: number;
    per_page: number;
    last_page: number;
  };
  bottom_html?: string;
}


export default function MoviePoster() {
  const { category } = useParams<{ category: string }>();
  const [data, setData] = useState<CategoryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!category) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        setData(null)
        const response = await fetchProductsByCategory(category, 12, page, "az");

        if (response && typeof response === "object" && "products" in response) {
          setData(response as CategoryResponse);
        } else {
          throw new Error("Invalid API response format.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, page]);

  const categoryName: string = category?.replace(/-/g, ' ')?.replace(/\b\w/g, char => char.toUpperCase()) || "";
  // Function to generate dynamic pagination numbers
  const getPageNumbers = () => {
    const totalPages = data?.pagination?.last_page ?? 1;
    const pages: (number | string)[] = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2);

      if (page > 4) pages.push("...");

      const start = Math.max(3, page - 1);
      const end = Math.min(totalPages - 2, page + 1);
      for (let i = start; i <= end; i++) pages.push(i);

      if (page < totalPages - 3) pages.push("...");

      pages.push(totalPages - 1, totalPages);
    }

    return pages;
  };

  return (
    <div className="w-screen min-h-screen bg-black">
      <PosterCarousel banner={data?.banner?.banner} />

      {/* Loading & Error Handling */}
      {loading && <p className="text-white text-center py-10">Loading...</p>}
      {error && <p className="text-red-500 text-center py-10">{error}</p>}

      {/* Render products */}
      {!loading && !error && data?.products?.length ? (
      <MoviePosters products={data.products} categoryName={categoryName || ""} />
      ) : (
        !loading && !error && <p className="text-white text-center py-10">No products found.</p>
      )}

      {data?.meta && (
        <MetaTags
          title={data.meta.title}
          description={data.meta.category_meta}
        />
      )}

      {/* Pagination UI */}
      {data?.pagination && data.pagination.total > data.pagination.per_page && (
        <div className="flex flex-col sm:flex-row items-center justify-between mt-6 w-full">
          {/* Centered Arrows */}
          <div className="flex justify-center sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 space-x-4 mb-4 sm:mb-0">
            <Button
              className="bg-[#F8C900] text-black rounded-full p-3 disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
            >
              <ChevronLeft size={20} />
            </Button>
            <Button
              className="bg-[#F8C900] text-black rounded-full p-3 disabled:opacity-50"
              disabled={page >= (data?.pagination?.last_page ?? 1)}
              onClick={() => setPage((prev) => Math.min(data?.pagination?.last_page ?? 1, prev + 1))}
            >
              <ChevronRight size={20} />
            </Button>
          </div>

          {/* Page Numbers */}
          <div className="flex justify-center sm:ml-auto space-x-2 pr-4">
            {getPageNumbers().map((pageNumber, index) =>
              typeof pageNumber === "number" ? (
                <Button
                  key={index}
                  className={`px-3 py-2 ${
                    page === pageNumber ? "bg-[#F8C900] text-black" : "bg-black text-[#F8C900] hover:bg-[#F8C900] hover:text-black"
                  } rounded-none`}
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </Button>
              ) : (
                <span key={index} className="px-3 py-2 bg-black text-[#F8C900] rounded-none">
                  {pageNumber}
                </span>
              )
            )}
          </div>
        </div>
      )}

      <PosterSalon bottom_html={data?.meta?.cat_description ?? ""} />
      <Footer />
    </div>
  );
}
