const API_BASE_URL = "https://postersalon.com/site/api";
const HOMEPAGE_CATEGORIES_WITH_CONTENT = `${API_BASE_URL}/categories-with-banner`;

export const POSTERSALON_URL = "https://postersalon.com/site";

export const URLS = {
  cancellation: `${POSTERSALON_URL}/cancellation`,
  tracking: `${POSTERSALON_URL}/tracking`,
  policy: `${POSTERSALON_URL}/policy`,
  happiness: `${POSTERSALON_URL}/happiness`,
  refund: `${POSTERSALON_URL}/refund`,
  faqs: `${POSTERSALON_URL}/faqs`,
  about: `${POSTERSALON_URL}/about`,
  poster: `${POSTERSALON_URL}/poster`,
  canvas: `${POSTERSALON_URL}/canvas`,
  service: `${POSTERSALON_URL}/service`,
  privacy: `${POSTERSALON_URL}/privacy`,
  intellectual: `${POSTERSALON_URL}/intellectual`,
  contact: `${POSTERSALON_URL}/Contact-us`,
  login: `${POSTERSALON_URL}/signin`,
  checkout: `${POSTERSALON_URL}/checkout`,
};

// Define the expected structure for category data
interface CategoryData {
  id: number;
  name: string;
  image_url: string;
  [key: string]: unknown;
}

// Define the expected structure for product data
interface ProductData {
  id: number;
  product_src: string;
  product_name: string;
  price?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ProductDetails {
  id: number;
  product_src: string;
  product_name: string;
  price?: string;
  description?: string;
  [key: string]: unknown;
}

export interface ProductResponse {
  product: ProductDetails;
  tabs: { [key: string]: string };
}

export interface SearchResult {
  id: string;
  product_name: string;
  product_src: string;
}

export const fetchCategoriesAndContent = async (): Promise<CategoryData[]> => {
  try {
    const response = await fetch(HOMEPAGE_CATEGORIES_WITH_CONTENT, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: CategoryData[] = await response.json(); // Type-safe JSON parsing
    return data;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

export const fetchProductsByCategory = async (
  category: string,
  limit = 10,
  page = 1,
  sort_by = "az"
): Promise<ProductData[]> => {
  try {
    const url = `${API_BASE_URL}/products/category/${category}?limit=${limit}&page=${page}&sort_by=${sort_by}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: ProductData[] = await response.json(); // Type-safe JSON parsing
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw new Error("Failed to fetch products");
  }
};

export const fetchProductDetails = async (
  productName: string,
  id: string
): Promise<ProductResponse> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/detail/${productName}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }

    const data: ProductResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch product details:", error);
    throw new Error("Failed to fetch product details");
  }
};

export const fetchSearchResults = async (
  searchText: string,
  limit = 10,
  page = 1
): Promise<SearchResult[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/search?search_text=${searchText}&limit=${limit}&page=${page}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) throw new Error("Failed to fetch results");

    const data = await response.json();
    return data.products || [];
  } catch (error) {
    console.error("Search fetch error:", error);
    throw new Error("Error fetching search results");
  }
};

export const subscribeToNewsletter = async (
  email: string
): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/subscribe`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    return res.ok;
  } catch (err) {
    console.error("Subscription error", err);
    throw new Error("Subscription failed");
  }
};
