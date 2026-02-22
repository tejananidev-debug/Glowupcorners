import ReactGA from "react-ga4";

function ProductCard({ product, toggleWishlist, wishlist }) {
  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>

      <button
        className="wishlist-btn"
        onClick={() => toggleWishlist(product.id)}
      >
        {isWishlisted ? "❤️ Remove" : "🤍 Wishlist"}
      </button>

      <a
        href={product.link}
        target="_blank"
        rel="noreferrer"
        onClick={() => {
          ReactGA.event({
            category: "Amazon Click",
            action: product.name,
            label: product.category,
          });
        }}
      >
        Buy on Amazon
      </a>
    </div>
  );
}

export default ProductCard;