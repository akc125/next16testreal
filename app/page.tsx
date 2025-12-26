"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;
  if (products.length === 0) return <p className="text-center text-danger">No products found</p>;

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">🛒 Products</h1>
      <div className="row g-4">
        {products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-4 col-sm-6">
            <div className="card h-100 shadow-sm">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={300}
                style={{ objectFit: "contain", height: "200px" }}
                unoptimized
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
    </div>
  );
}
