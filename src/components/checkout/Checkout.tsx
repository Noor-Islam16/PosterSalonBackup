import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent } from "../ui/card";
import { ShieldCheck } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Link, useLocation } from "react-router-dom";

interface OrderDetails {
  productName: string;
  productImage: string;
  productId?: string;
  productType: "poster" | "canvas";
  size: string;
  dimensions: string;
  price: number;
  quantity: number;
}

// Interface for country and state data
interface State {
  name: string;
  value: string;
}

interface Country {
  name: string;
  value: string;
  states: State[];
}

function Checkout() {
  // Get order details from location state
  const location = useLocation();
  const orderDetails = location.state?.orderDetails as OrderDetails | undefined;

  // State for tracking selected country and available states
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch countries and states data
  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        setLoading(true);

        // This would typically be a real API call
        // For now, we'll simulate loading the data
        const data = getCountriesData();
        setCountries(data);
      } catch (error) {
        console.error("Failed to load countries data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountriesData();
  }, []);

  // Get states for the selected country
  const getStatesForCountry = () => {
    const country = countries.find((c) => c.value === selectedCountry);
    return country ? country.states : [];
  };

  // Handle country selection with proper type
  const handleCountryChange = (value: string) => {
    setSelectedCountry(value);
  };

  // Calculate order total - using orderDetails if available, or fallback to default
  const orderTotal = orderDetails
    ? orderDetails.price * orderDetails.quantity
    : 19.99;
  const savePercentage = 48; // Default percentage saved

  return (
    <div className="min-h-screen bg-black p-4 md:p-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-[2fr,1fr] gap-6">
        {/* Left Column - Checkout Steps */}
        <div className="space-y-6">
          {/* Delivery Section */}
          <div className="bg-yellow-300 rounded-t-lg p-4 flex items-center gap-4">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              1
            </div>
            <h2 className="text-xl font-semibold">Delivery</h2>
          </div>

          <div className="bg-white p-6 rounded-b-lg shadow-sm">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  type="text"
                  placeholder="First Name"
                  className="w-full"
                />
              </div>
              <div>
                <Input type="text" placeholder="Last Name" className="w-full" />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <Input
                  type="email"
                  placeholder="Email Address"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <Input
                  type="text"
                  placeholder="1234 Main St"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Apartment or suite"
                  className="w-full"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <Select onValueChange={handleCountryChange} disabled={loading}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loading ? "Loading countries..." : "Choose Country..."
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select disabled={!selectedCountry || loading}>
                  <SelectTrigger className="w-full">
                    <SelectValue
                      placeholder={
                        loading
                          ? "Loading..."
                          : selectedCountry
                          ? "Choose State/Province..."
                          : "Select a country first"
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {getStatesForCountry().map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div>
                <Input
                  type="text"
                  placeholder="Enter City"
                  className="w-full"
                />
              </div>
              <div>
                <Input
                  type="text"
                  placeholder="Enter Zip code"
                  className="w-full"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="bg-yellow-300 rounded-t-lg p-4 flex items-center gap-4">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              2
            </div>
            <h2 className="text-xl font-semibold">Order Summary</h2>
          </div>

          <div className="bg-white p-6 rounded-b-lg shadow-sm">
            <div className="border-b pb-4">
              <div className="flex justify-between items-center">
                <div>
                  {orderDetails ? (
                    <div>
                      <p>
                        {orderDetails.quantity}) {orderDetails.productName} -{" "}
                        {orderDetails.productType} ({orderDetails.size})
                      </p>
                      <p className="text-sm text-gray-500">
                        {orderDetails.dimensions}
                      </p>
                    </div>
                  ) : (
                    <p>1) 1964 Marnie - Alfred Hitchcock</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">
                    ${orderDetails ? orderDetails.price.toFixed(2) : "19.99"}
                  </span>
                  <span className="text-gray-500 cursor-pointer">✕</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Total (USD)</h3>
              <span className="text-xl font-bold">
                ${orderTotal.toFixed(2)}
              </span>
            </div>
          </div>

          {/* CAPTCHA Section */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Checkbox id="robot" />
              <label htmlFor="robot" className="text-sm font-medium">
                I'm not a robot
              </label>
              <div className="ml-auto">
                <img
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                  alt="reCAPTCHA"
                  className="h-8"
                />
              </div>
            </div>
          </div>

          {/* Place Order Section */}
          <div className="bg-yellow-300 rounded-t-lg p-4 flex items-center gap-4">
            <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center font-semibold">
              3
            </div>
            <h2 className="text-xl font-semibold">Place Order</h2>
            <div className="ml-auto">
              <Link to="/order-confirmation" className="no-underline">
                <Button className="bg-white text-black hover:bg-gray-100">
                  Continue
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column - Price Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h2 className="text-xl font-bold mb-4">Price details</h2>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Price ({orderDetails?.quantity || 1} item)</span>
                  <span className="font-medium">${orderTotal.toFixed(2)}</span>
                </div>
                <div className="text-xs text-gray-500">
                  (inclusive of all taxes*)
                </div>

                <div className="flex justify-between items-center">
                  <span>Delivery Charges</span>
                  <span>-</span>
                </div>

                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center font-medium">
                    <span>Total Payable</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>

                <div className="text-green-600 font-medium text-sm mt-2">
                  You are saving {savePercentage}% on this order
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-black p-4 rounded-lg shadow-sm flex items-center gap-4">
            <div className="text-white">
              <ShieldCheck size={32} />
            </div>
            <div>
              <p className="font-medium text-white">
                Safe and Secure Payments. Easy returns.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Function to provide country and state/province data
function getCountriesData(): Country[] {
  return [
    {
      name: "United States",
      value: "us",
      states: [
        { name: "Alabama", value: "al" },
        { name: "Alaska", value: "ak" },
        { name: "Arizona", value: "az" },
        { name: "Arkansas", value: "ar" },
        { name: "California", value: "ca" },
        { name: "Colorado", value: "co" },
        { name: "Connecticut", value: "ct" },
        { name: "Delaware", value: "de" },
        { name: "Florida", value: "fl" },
        { name: "Georgia", value: "ga" },
        { name: "Hawaii", value: "hi" },
        { name: "Idaho", value: "id" },
        { name: "Illinois", value: "il" },
        { name: "Indiana", value: "in" },
        { name: "Iowa", value: "ia" },
        { name: "Kansas", value: "ks" },
        { name: "Kentucky", value: "ky" },
        { name: "Louisiana", value: "la" },
        { name: "Maine", value: "me" },
        { name: "Maryland", value: "md" },
        { name: "Massachusetts", value: "ma" },
        { name: "Michigan", value: "mi" },
        { name: "Minnesota", value: "mn" },
        { name: "Mississippi", value: "ms" },
        { name: "Missouri", value: "mo" },
        { name: "Montana", value: "mt" },
        { name: "Nebraska", value: "ne" },
        { name: "Nevada", value: "nv" },
        { name: "New Hampshire", value: "nh" },
        { name: "New Jersey", value: "nj" },
        { name: "New Mexico", value: "nm" },
        { name: "New York", value: "ny" },
        { name: "North Carolina", value: "nc" },
        { name: "North Dakota", value: "nd" },
        { name: "Ohio", value: "oh" },
        { name: "Oklahoma", value: "ok" },
        { name: "Oregon", value: "or" },
        { name: "Pennsylvania", value: "pa" },
        { name: "Rhode Island", value: "ri" },
        { name: "South Carolina", value: "sc" },
        { name: "South Dakota", value: "sd" },
        { name: "Tennessee", value: "tn" },
        { name: "Texas", value: "tx" },
        { name: "Utah", value: "ut" },
        { name: "Vermont", value: "vt" },
        { name: "Virginia", value: "va" },
        { name: "Washington", value: "wa" },
        { name: "West Virginia", value: "wv" },
        { name: "Wisconsin", value: "wi" },
        { name: "Wyoming", value: "wy" },
        { name: "District of Columbia", value: "dc" },
      ],
    },
    {
      name: "Canada",
      value: "ca",
      states: [
        { name: "Alberta", value: "ab" },
        { name: "British Columbia", value: "bc" },
        { name: "Manitoba", value: "mb" },
        { name: "New Brunswick", value: "nb" },
        { name: "Newfoundland and Labrador", value: "nl" },
        { name: "Northwest Territories", value: "nt" },
        { name: "Nova Scotia", value: "ns" },
        { name: "Nunavut", value: "nu" },
        { name: "Ontario", value: "on" },
        { name: "Prince Edward Island", value: "pe" },
        { name: "Quebec", value: "qc" },
        { name: "Saskatchewan", value: "sk" },
        { name: "Yukon", value: "yt" },
      ],
    },
    {
      name: "United Kingdom",
      value: "uk",
      states: [
        { name: "England", value: "eng" },
        { name: "Scotland", value: "sco" },
        { name: "Wales", value: "wal" },
        { name: "Northern Ireland", value: "ni" },
      ],
    },
    {
      name: "Australia",
      value: "au",
      states: [
        { name: "Australian Capital Territory", value: "act" },
        { name: "New South Wales", value: "nsw" },
        { name: "Northern Territory", value: "nt" },
        { name: "Queensland", value: "qld" },
        { name: "South Australia", value: "sa" },
        { name: "Tasmania", value: "tas" },
        { name: "Victoria", value: "vic" },
        { name: "Western Australia", value: "wa" },
      ],
    },
    {
      name: "Germany",
      value: "de",
      states: [
        { name: "Baden-Württemberg", value: "bw" },
        { name: "Bavaria", value: "by" },
        { name: "Berlin", value: "be" },
        { name: "Brandenburg", value: "bb" },
        { name: "Bremen", value: "hb" },
        { name: "Hamburg", value: "hh" },
        { name: "Hesse", value: "he" },
        { name: "Lower Saxony", value: "ni" },
        { name: "Mecklenburg-Vorpommern", value: "mv" },
        { name: "North Rhine-Westphalia", value: "nw" },
        { name: "Rhineland-Palatinate", value: "rp" },
        { name: "Saarland", value: "sl" },
        { name: "Saxony", value: "sn" },
        { name: "Saxony-Anhalt", value: "st" },
        { name: "Schleswig-Holstein", value: "sh" },
        { name: "Thuringia", value: "th" },
      ],
    },
    {
      name: "France",
      value: "fr",
      states: [
        { name: "Auvergne-Rhône-Alpes", value: "ara" },
        { name: "Bourgogne-Franche-Comté", value: "bfc" },
        { name: "Brittany", value: "bre" },
        { name: "Centre-Val de Loire", value: "cvl" },
        { name: "Corsica", value: "cor" },
        { name: "Grand Est", value: "ges" },
        { name: "Hauts-de-France", value: "hdf" },
        { name: "Île-de-France", value: "idf" },
        { name: "Normandy", value: "nor" },
        { name: "Nouvelle-Aquitaine", value: "naq" },
        { name: "Occitanie", value: "occ" },
        { name: "Pays de la Loire", value: "pdl" },
        { name: "Provence-Alpes-Côte d'Azur", value: "pac" },
      ],
    },
    {
      name: "India",
      value: "in",
      states: [
        { name: "Andhra Pradesh", value: "ap" },
        { name: "Arunachal Pradesh", value: "ar" },
        { name: "Assam", value: "as" },
        { name: "Bihar", value: "br" },
        { name: "Chhattisgarh", value: "cg" },
        { name: "Goa", value: "ga" },
        { name: "Gujarat", value: "gj" },
        { name: "Haryana", value: "hr" },
        { name: "Himachal Pradesh", value: "hp" },
        { name: "Jharkhand", value: "jh" },
        { name: "Karnataka", value: "ka" },
        { name: "Kerala", value: "kl" },
        { name: "Madhya Pradesh", value: "mp" },
        { name: "Maharashtra", value: "mh" },
        { name: "Manipur", value: "mn" },
        { name: "Meghalaya", value: "ml" },
        { name: "Mizoram", value: "mz" },
        { name: "Nagaland", value: "nl" },
        { name: "Odisha", value: "od" },
        { name: "Punjab", value: "pb" },
        { name: "Rajasthan", value: "rj" },
        { name: "Sikkim", value: "sk" },
        { name: "Tamil Nadu", value: "tn" },
        { name: "Telangana", value: "tg" },
        { name: "Tripura", value: "tr" },
        { name: "Uttar Pradesh", value: "up" },
        { name: "Uttarakhand", value: "uk" },
        { name: "West Bengal", value: "wb" },
      ],
    },
    {
      name: "Japan",
      value: "jp",
      states: [
        { name: "Hokkaido", value: "hok" },
        { name: "Aomori", value: "aom" },
        { name: "Iwate", value: "iwt" },
        { name: "Miyagi", value: "myg" },
        { name: "Akita", value: "akt" },
        { name: "Yamagata", value: "ymg" },
        { name: "Fukushima", value: "fks" },
        { name: "Ibaraki", value: "ibr" },
        { name: "Tochigi", value: "tcg" },
        { name: "Gunma", value: "gnm" },
        { name: "Saitama", value: "stm" },
        { name: "Chiba", value: "chb" },
        { name: "Tokyo", value: "tky" },
        { name: "Kanagawa", value: "kng" },
        { name: "Niigata", value: "ngt" },
        { name: "Toyama", value: "tym" },
        { name: "Ishikawa", value: "isk" },
        { name: "Fukui", value: "fki" },
        { name: "Yamanashi", value: "ymn" },
        { name: "Nagano", value: "ngn" },
        { name: "Gifu", value: "gif" },
        { name: "Shizuoka", value: "szk" },
        { name: "Aichi", value: "aic" },
        { name: "Mie", value: "mie" },
        { name: "Shiga", value: "shg" },
        { name: "Kyoto", value: "kyt" },
        { name: "Osaka", value: "osk" },
        { name: "Hyogo", value: "hyg" },
        { name: "Nara", value: "nar" },
        { name: "Wakayama", value: "wky" },
        { name: "Tottori", value: "ttr" },
        { name: "Shimane", value: "smn" },
        { name: "Okayama", value: "oky" },
        { name: "Hiroshima", value: "hrs" },
        { name: "Yamaguchi", value: "ymg" },
        { name: "Tokushima", value: "tks" },
        { name: "Kagawa", value: "kgw" },
        { name: "Ehime", value: "ehm" },
        { name: "Kochi", value: "kch" },
        { name: "Fukuoka", value: "fko" },
        { name: "Saga", value: "sag" },
        { name: "Nagasaki", value: "ngs" },
        { name: "Kumamoto", value: "kmt" },
        { name: "Oita", value: "oit" },
        { name: "Miyazaki", value: "myz" },
        { name: "Kagoshima", value: "kgs" },
        { name: "Okinawa", value: "okn" },
      ],
    },
    {
      name: "Brazil",
      value: "br",
      states: [
        { name: "Acre", value: "ac" },
        { name: "Alagoas", value: "al" },
        { name: "Amapá", value: "ap" },
        { name: "Amazonas", value: "am" },
        { name: "Bahia", value: "ba" },
        { name: "Ceará", value: "ce" },
        { name: "Distrito Federal", value: "df" },
        { name: "Espírito Santo", value: "es" },
        { name: "Goiás", value: "go" },
        { name: "Maranhão", value: "ma" },
        { name: "Mato Grosso", value: "mt" },
        { name: "Mato Grosso do Sul", value: "ms" },
        { name: "Minas Gerais", value: "mg" },
        { name: "Pará", value: "pa" },
        { name: "Paraíba", value: "pb" },
        { name: "Paraná", value: "pr" },
        { name: "Pernambuco", value: "pe" },
        { name: "Piauí", value: "pi" },
        { name: "Rio de Janeiro", value: "rj" },
        { name: "Rio Grande do Norte", value: "rn" },
        { name: "Rio Grande do Sul", value: "rs" },
        { name: "Rondônia", value: "ro" },
        { name: "Roraima", value: "rr" },
        { name: "Santa Catarina", value: "sc" },
        { name: "São Paulo", value: "sp" },
        { name: "Sergipe", value: "se" },
        { name: "Tocantins", value: "to" },
      ],
    },
    // Add more countries as needed
  ];
}

export default Checkout;
