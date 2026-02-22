import { useState, useEffect } from "react";
import { products } from "./data";
import ProductCard from "./components/ProductCard";
import "./App.css";
import ReactGA from "react-ga4";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);

  // Load wishlist from localStorage
  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist"));
    if (savedWishlist) setWishlist(savedWishlist);
  }, []);

  // Save wishlist to localStorage
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
  ReactGA.initialize("G-YNC4K78BB8");
  ReactGA.send("pageview");
}, []);

  const toggleWishlist = (id) => {
    if (wishlist.includes(id)) {
      setWishlist(wishlist.filter(item => item !== id));
    } else {
      setWishlist([...wishlist, id]);
    }
  };

  // Filter by category
  const categoryFiltered =
    selectedCategory === "all"
      ? products
      : products.filter(p => p.category === selectedCategory);

  // Filter by search
  const searchFiltered = categoryFiltered.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filter by wishlist toggle
  const wishlistFiltered = showWishlist
    ? searchFiltered.filter(p => wishlist.includes(p.id))
    : searchFiltered;

  // Sort
  const finalProducts = [...wishlistFiltered].sort((a, b) => {
    if (sortOrder === "lowToHigh") return a.price - b.price;
    if (sortOrder === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <>
      <header className="hero">
        <h1>GlowUpCorners ✨</h1>
        <p>Cozy Small Bedroom Finds</p>
        <p>Wishlist: {wishlist.length} ❤️</p>
      </header>

      <section className="controls">
        <div>
          <button onClick={() => setSelectedCategory("all")}>All</button>
          <button onClick={() => setSelectedCategory("lighting")}>Lighting</button>
          <button onClick={() => setSelectedCategory("decor")}>Decor</button>
          <button onClick={() => setShowWishlist(!showWishlist)}>
            {showWishlist ? "Show All" : "Show Wishlist"}
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select onChange={(e) => setSortOrder(e.target.value)}>
            <option value="">Sort by Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
      </section>

      <section className="grid">
        {finalProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            toggleWishlist={toggleWishlist}
            wishlist={wishlist}
          />
        ))}
      </section>

      <footer>
        <p>As an Amazon Associate, I earn from qualifying purchases.</p>
      </footer>
    </>
  );
}

export default App;
