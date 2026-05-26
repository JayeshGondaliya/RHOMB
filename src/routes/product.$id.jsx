import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ChevronLeft, Heart, ShieldCheck, ShoppingBag, Star, Truck } from "lucide-react";
import { motion } from "framer-motion";
import { formatINR, products } from "../lib/products";
import { useCart, useWishlist } from "../lib/store";

export default function ProductPage() {
    const { id } = useParams();
    const product = products.find((p) => p.id === id) ?? products[0];
    const [qty, setQty] = useState(1);
    const [zoom, setZoom] = useState({ x: 50, y: 50, active: false });
    const { add } = useCart();
    const { toggle, has } = useWishlist();
    const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <Link to="/shop" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-gold">
                <ChevronLeft className="h-4 w-4" /> Back to shop
            </Link>

            <div className="mt-6 grid gap-10 lg:grid-cols-2">
                <div className="space-y-3">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="relative aspect-square overflow-hidden rounded-2xl border border-gold/20 bg-muted cursor-zoom-in"
                        onMouseMove={(e) => {
                            const r = e.currentTarget.getBoundingClientRect();
                            setZoom({
                                x: ((e.clientX - r.left) / r.width) * 100,
                                y: ((e.clientY - r.top) / r.height) * 100,
                                active: true
                            });
                        }}
                        onMouseLeave={() => setZoom((z) => ({ ...z, active: false }))}
                    >
                        <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover transition-transform duration-300"
                            style={zoom.active ? { transform: `scale(2)`, transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
                        />
                    </motion.div>

                    <div className="grid grid-cols-4 gap-2">
                        {[product.image, ...related.slice(0, 3).map((r) => r.image)].map((src, i) => (
                            <div key={i} className="aspect-square overflow-hidden rounded-md border border-gold/20">
                                <img src={src} className="h-full w-full object-cover" alt="" />
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-gold">
                        {product.category} · {product.metal}
                    </div>
                    <h1 className="mt-2 font-display text-3xl md:text-5xl">{product.name}</h1>

                    <div className="mt-3 flex items-center gap-2 text-sm">
                        <div className="inline-flex items-center gap-1 text-gold">
                            <Star className="h-4 w-4 fill-current" /> {product.rating}
                        </div>
                        <span className="text-muted-foreground">(248 reviews)</span>
                    </div>

                    <div className="mt-5 flex items-baseline gap-3">
                        <span className="font-display text-4xl gold-gradient">{formatINR(product.price)}</span>
                        {product.oldPrice && (
                            <span className="text-base text-muted-foreground line-through">
                                {formatINR(product.oldPrice)}
                            </span>
                        )}
                    </div>

                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{product.description}</p>

                    <div className="mt-7 flex items-center gap-3">
                        <div className="inline-flex items-center rounded-full border border-gold/30">
                            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-4 py-2">−</button>
                            <span className="w-8 text-center text-sm">{qty}</span>
                            <button onClick={() => setQty((q) => q + 1)} className="px-4 py-2">+</button>
                        </div>

                        <button
                            onClick={() => add(product, qty)}
                            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full gold-bg-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black gold-glow"
                        >
                            <ShoppingBag className="h-4 w-4" /> Add to Bag
                        </button>

                        <button
                            onClick={() => toggle(product.id)}
                            className="grid h-12 w-12 place-items-center rounded-full border border-gold/40 text-gold"
                        >
                            <Heart className={`h-4 w-4 ${has(product.id) ? "fill-gold" : ""}`} />
                        </button>
                    </div>

                    <div className="mt-8 grid gap-3 sm:grid-cols-2">
                        <div className="flex items-center gap-3 rounded-xl glass p-4 text-sm">
                            <Truck className="h-5 w-5 text-gold" />Insured delivery in 5-7 days
                        </div>
                        <div className="flex items-center gap-3 rounded-xl glass p-4 text-sm">
                            <ShieldCheck className="h-5 w-5 text-gold" />Lifetime warranty included
                        </div>
                    </div>

                    <div className="mt-8 rounded-xl border border-gold/20 p-5">
                        <h3 className="font-display text-xl">Specifications</h3>
                        <dl className="mt-3 grid grid-cols-2 gap-3 text-sm">
                            {[
                                ["Metal", product.metal],
                                ["Category", product.category],
                                ["Purity", "BIS Hallmarked"],
                                ["Certification", "GIA Certified"],
                                ["Made in", "India"],
                                ["SKU", product.id.toUpperCase()],
                            ].map(([k, v]) => (
                                <div key={k}>
                                    <dt className="text-muted-foreground text-xs uppercase tracking-widest">{k}</dt>
                                    <dd className="mt-1">{v}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            <section className="mt-20">
                <h2 className="font-display text-2xl">You may also love</h2>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {related.map((p) => (
                        <Link
                            key={p.id}
                            to={`/product/${p.id}`}
                            className="group block overflow-hidden rounded-xl border border-gold/20"
                        >
                            <div className="aspect-[4/5] overflow-hidden">
                                <img
                                    src={p.image}
                                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                                    alt={p.name}
                                />
                            </div>
                            <div className="p-3">
                                <div className="line-clamp-1 text-sm">{p.name}</div>
                                <div className="mt-1 text-sm gold-gradient font-semibold">{formatINR(p.price)}</div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}