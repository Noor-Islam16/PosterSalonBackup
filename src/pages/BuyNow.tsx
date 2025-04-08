import Checkout from "../components/checkout/Checkout";
import Footer from "../components/home/Footer";

function BuyNow() {
  return (
    <div className="w-screen min-h-screen bg-black">
      <Checkout />
      <Footer />
    </div>
  );
}

export default BuyNow;
