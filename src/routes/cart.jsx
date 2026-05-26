import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatINR } from "../lib/products";
import { useCart } from "../lib/store";

function Row({ k, v }) {
    return (
        <div className="mt-3 flex justify-between text-sm">
            <span className="text-muted-foreground">{k}</span>
            <span>{v}</span>
        </div>
    );
}

export default function Cart() {
    const { items, setQty, remove, total } = useCart();
    const shipping = total > 0 ? 0 : 0;
    const tax = Math.round(total * 0.03);

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <h1 className="font-display text-4xl md:text-5xl">
                Shopping <span className="gold-gradient">Bag</span>
            </h1>

            {items.length === 0 ? (
                <div className="mt-12 rounded-2xl glass p-16 text-center">
                    <ShoppingBag className="mx-auto h-8 w-8 text-gold" />
                    <p className="mt-3 text-muted-foreground">Your bag is empty.</p>
                    <Link
                        to="/shop"
                        className="mt-5 inline-block rounded-full gold-bg-gradient px-6 py-3 text-xs font-semibold uppercase tracking-widest text-black"
                    >
                        Discover Jewellery
                    </Link>
                </div>
            ) : (
                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
                    <div className="space-y-3">
                        {items.map((i) => (
                            <div key={i.product.id} className="flex gap-4 rounded-xl border border-gold/20 bg-card p-4">
                                <img
                                    src={i.product.image}
                                    className="h-28 w-28 rounded-md object-cover"
                                    alt={i.product.name}
                                />
                                <div className="flex flex-1 flex-col">
                                    <div className="text-[11px] uppercase tracking-widest text-gold">
                                        {i.product.metal}
                                    </div>
                                    <div className="font-display text-lg">{i.product.name}</div>
                                    <div className="mt-1 text-sm gold-gradient font-semibold">
                                        {formatINR(i.product.price)}
                                    </div>
                                    <div className="mt-auto flex items-center justify-between">
                                        <div className="inline-flex items-center rounded-full border border-gold/30">
                                            <button
                                                onClick={() => setQty(i.product.id, i.qty - 1)}
                                                className="px-3 py-1.5"
                                            >
                                                <Minus className="h-3 w-3" />
                                            </button>
                                            <span className="w-6 text-center text-sm">{i.qty}</span>
                                            <button
                                                onClick={() => setQty(i.product.id, i.qty + 1)}
                                                className="px-3 py-1.5"
                                            >
                                                <Plus className="h-3 w-3" />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() => remove(i.product.id)}
                                            className="text-rose-400 hover:text-rose-500"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <aside className="h-fit rounded-2xl glass-strong p-6">
                        <h3 className="font-display text-xl">Order Summary</h3>
                        <Row k="Subtotal" v={formatINR(total)} />
                        <Row k="Shipping" v="Complimentary" />
                        <Row k="Estimated tax" v={formatINR(tax)} />
                        <div className="my-4 h-px bg-gold/20" />
                        <div className="flex items-baseline justify-between">
                            <span className="text-sm">Total</span>
                            <span className="font-display text-2xl gold-gradient">
                                {formatINR(total + shipping + tax)}
                            </span>
                        </div>
                        <Link
                            to="/checkout"
                            className="mt-5 block rounded-full gold-bg-gradient py-3 text-center text-sm font-semibold uppercase tracking-widest text-black gold-glow"
                        >
                            Secure Checkout
                        </Link>
                        <Link
                            to="/shop"
                            className="mt-3 block text-center text-xs text-muted-foreground hover:text-gold"
                        >
                            Continue Shopping
                        </Link>
                    </aside>
                </div>
            )}
        </div>
    );
}