import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { formatINR, products } from "../lib/products";
import { useCart, useWishlist } from "../lib/store";

export default function Wishlist() {
    const { ids, toggle } = useWishlist();
    const { add } = useCart();
    const items = products.filter((p) => ids.includes(p.id));

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
                <Heart className="mx-auto h-7 w-7 text-gold" />
                <h1 className="mt-2 font-display text-4xl md:text-5xl">
                    Your <span className="gold-gradient">Wishlist</span>
                </h1>
            </div>

            {items.length === 0 ? (
                <div className="mt-12 rounded-2xl glass p-16 text-center">
                    <p className="text-muted-foreground">Your wishlist is empty.</p>
                    <Link
                        to="/shop"
                        className="mt-5 inline-block rounded-full gold-bg-gradient px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black"
                    >
                        Discover Jewellery
                    </Link>
                </div>
            ) : (
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                        <div key={p.id} className="overflow-hidden rounded-xl border border-gold/20 bg-card">
                            <Link to={`/product/${p.id}`}>
                                <img
                                    src={p.image}
                                    alt={p.name}
                                    className="aspect-[4/5] w-full object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <div className="font-display text-lg">{p.name}</div>
                                <div className="mt-1 font-semibold gold-gradient">
                                    {formatINR(p.price)}
                                </div>
                                <div className="mt-3 flex gap-2">
                                    <button
                                        onClick={() => add(p)}
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md gold-bg-gradient px-3 py-2 text-xs font-semibold uppercase tracking-widest text-black"
                                    >
                                        <ShoppingBag className="h-3.5 w-3.5" /> Add
                                    </button>
                                    <button
                                        onClick={() => toggle(p.id)}
                                        className="grid h-9 w-9 place-items-center rounded-md border border-gold/30 text-rose-400"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}