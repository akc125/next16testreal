import Image from "next/image";

export const metadata = {
  title: "All Products",
  description: "Browse all products from DummyJSON API",
};

export const dynamic = "force-dynamic";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
};

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    const res = await fetch("https://dummyjson.com/products", {
      cache: "no-store", // always fetch fresh data
    });

    if (res.ok) {
      const data = await res.json();
      products = data.products; // DummyJSON wraps products in "products" field
    } else {
      console.error("Failed to fetch products, status:", res.status);
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🛒 Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-danger">
          No products available at the moment.
        </p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="card-img-top p-3"
                  style={{ objectFit: "contain", height: "200px" }}
                  unoptimized // because images are external
                />
                <div className="card-body">
                  <h6 className="card-title">{product.title}</h6>
                  <p className="fw-bold mb-1">₹ {product.price}</p>
                  <small className="text-muted">{product.category}</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
