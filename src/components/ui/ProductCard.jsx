import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { motion } from "framer-motion";

import { formatINR } from "../../lib/products";
import { useCart, useWishlist } from "../../lib/store";

export function ProductCard({ product, index = 0 }) {
    const { add } = useCart();
    const { toggle, has } = useWishlist();

    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 8) * 0.05 }}
            className="group relative overflow-hidden rounded-xl border border-gold/20 bg-card transition hover:shadow-lg hover:shadow-gold/10"
        >
            {/* IMAGE */}
            <Link to={`/product/${product.id}`}>
                <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />

                    {product.bestseller && (
                        <span className="absolute left-3 top-3 rounded-full gold-bg-gradient px-2 py-1 text-[10px] font-bold uppercase text-black">
                            Bestseller
                        </span>
                    )}

                    {product.oldPrice && (
                        <span className="absolute right-3 top-3 rounded-full bg-black/80 px-2 py-1 text-[10px] font-bold text-gold">
                            -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </span>
                    )}
                </div>
            </Link>

            {/* WISHLIST */}
            <button
                onClick={() => toggle(product.id)}
                className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur-md transition hover:text-gold"
            >
                <Heart
                    className={`h-4 w-4 ${has(product.id) ? "fill-gold text-gold" : ""}`}
                />
            </button>

            {/* CONTENT */}
            <div className="p-4">
                <div className="flex items-center gap-1 text-[11px] text-gold">
                    <Star className="h-3 w-3 fill-gold" />
                    {product.rating?.toFixed(1)}
                    <span className="ml-auto text-muted-foreground uppercase">
                        {product.metal}
                    </span>
                </div>

                <h3 className="mt-2 line-clamp-1 text-base font-semibold text-foreground">
                    {product.name}
                </h3>

                <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-lg font-bold text-gold">
                        {formatINR(product.price)}
                    </span>

                    {product.oldPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                            {formatINR(product.oldPrice)}
                        </span>
                    )}
                </div>

                <button
                    onClick={() => add(product)}
                    className="mt-3 flex w-full items-center justify-center gap-2 rounded-md border border-gold/30 bg-transparent px-3 py-2 text-xs font-medium uppercase tracking-widest text-foreground transition hover:gold-bg-gradient hover:text-black"
                >
                    <ShoppingBag className="h-3.5 w-3.5" />
                    Add to Bag
                </button>
            </div>
        </motion.div>
    );
}