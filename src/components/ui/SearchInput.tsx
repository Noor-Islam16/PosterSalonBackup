import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { fetchSearchResults, SearchResult } from "../../lib/api";

// Format product name for clean URLs
const formatProductName = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const SearchInput: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<SearchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced API call
  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setLoading(true);
    const delayDebounceFn = setTimeout(() => {
      fetchResults(query);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedProduct(null);
      setQuery("");
      navigate(`/product/${formatProductName(selectedProduct.product_name)}/${selectedProduct.id}`);
    }
  }, [selectedProduct, navigate]);

  // Fetch search results from API
  const fetchResults = async (searchText: string) => {
    setError(null);
    try {
      const data = await fetchSearchResults(searchText);
      setResults(data);
      setShowDropdown(true);
    } catch {
      setError("Error fetching results");
    } finally {
      setLoading(false);
    }
  };

  // Handle item selection
  const handleSelect = (product: SearchResult) => {
    setQuery(product.product_name);
    setShowDropdown(false);
    setResults([]);
    setSelectedProduct(product);
  };

  // Handle input clear
  const handleClear = () => {
    setQuery("");
    setResults([]);
    setShowDropdown(false);
    inputRef.current?.focus();
  };

  return (
    <div className="relative w-full">
      {/* Search Input Field */}
      <input
        ref={inputRef}
        type="text"
        className={cn(
          "flex h-10 w-full rounded-md border border-gray-400 bg-white text-black px-3 pr-10 py-2 text-base placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
        )}
        placeholder="Search: Star Wars, Post 1945 Movies, Action Comics..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          if (e.target.value.length >= 2) setShowDropdown(true);
        }}
        onFocus={() => {
          if (results.length > 0) setShowDropdown(true);
        }}
        onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
      />

      {/* Search Icon */}
      {!query && <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
        <Search className="w-5 h-5 text-gray-500" />
      </div>}

      {/* Clear (X) Icon */}
      {query && (
        <span
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 cursor-pointer"
          onClick={handleClear}
        >
          <X className="w-4 h-4" />
        </span>
      )}

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 shadow-lg rounded-md z-10 max-h-60 overflow-y-auto">
          {loading ? (
            <div className="p-3 text-gray-600">Loading...</div>
          ) : error ? (
            <div className="p-3 text-red-500">{error}</div>
          ) : results.length === 0 ? (
            <div className="p-3 text-gray-500">No results found</div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {results.map((product) => (
                <li
                  key={product.id}
                  className="p-3 cursor-pointer flex items-center hover:bg-yellow-100 transition-all"
                  onClick={() => handleSelect(product)}
                >
                  <img src={product.product_src} alt={product.product_name} className="w-10 h-10 mr-3 rounded-md" />
                  <span className="text-black text-sm font-medium">{product.product_name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
