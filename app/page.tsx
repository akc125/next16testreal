import Image from "next/image";

export const metadata = {
  title: "All Products",
  description: "Browse all products from FakeStore API",
};

export const dynamic = "force-dynamic";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default async function ProductsPage() {
  let products: Product[] = [];

  try {
    const res = await fetch("https://fakestoreapi.com/products", {
      cache: "no-store", // important for Vercel
    });

    if (!res.ok) {
      console.error("Failed to fetch products, status:", res.status);
    } else {
      products = await res.json();
    }
  } catch (err) {
    console.error("Error fetching products:", err);
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🛒 Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-danger">
          No products available at the moment. Please try again later.
        </p>
      ) : (
        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
              <div className="card h-100 shadow-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  width={300}
                  height={300}
                  className="card-img-top p-3"
                  style={{ objectFit: "contain", height: "200px" }}
                  unoptimized // optional: bypass Next.js image optimization for external images
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
