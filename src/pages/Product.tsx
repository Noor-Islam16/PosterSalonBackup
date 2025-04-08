import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Footer from "../components/home/Footer";
import CitizenKanePage from "../components/product/CitizenKanePage";
import PosterDescriptionPage from "../components/product/PosterDescriptionPage";
import { fetchProductDetails, ProductResponse } from "../lib/api";

function Product() {
  const { productName, id } = useParams<{ productName: string; id: string }>();
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setProduct(null);
        setLoading(true);
        setError(null);

        const data = await fetchProductDetails(productName!, id!);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    if (productName && id) fetchData();
  }, [productName, id]);

  if (loading)
    return <div className="w-screen min-h-screen bg-black flex justify-center items-center text-white">Loading...</div>;

  if (error)
    return <div className="w-screen min-h-screen bg-black flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="w-screen min-h-screen bg-black">
      {product ? (
        <>
          <CitizenKanePage product={product.product} />
          <PosterDescriptionPage tabs={product.tabs} />
        </>
      ) : (
        <div className="text-white text-center mt-10">Product not found</div>
      )}
      <Footer />
    </div>
  );
}

export default Product;
