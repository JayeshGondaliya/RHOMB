import { useMemo, useState, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ProductCard } from "../components/ui/ProductCard";
import { categories, metals, products } from "../lib/products";

function Group({ title, children }) {
    return (
        <div>
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">{title}</div>
            <div className="flex flex-wrap gap-2">{children}</div>
        </div>
    );
}

function Chip({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${active ? "gold-bg-gradient border-transparent text-black" : "border-gold/30 hover:border-gold"}`}
        >
            {children}
        </button>
    );
}

export default function Shop() {
    const [q, setQ] = useState("");
    const [cat, setCat] = useState([]);
    const [met, setMet] = useState([]);
    const [sort, setSort] = useState("featured");
    const [max, setMax] = useState(400000);
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (mobileFiltersOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileFiltersOpen]);

    const filtered = useMemo(() => {
        let list = products.filter(
            (p) =>
                p.name.toLowerCase().includes(q.toLowerCase()) &&
                (cat.length ? cat.includes(p.category) : true) &&
                (met.length ? met.includes(p.metal) : true) &&
                p.price <= max,
        );
        if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
        if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
        if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
        return list;
    }, [q, cat, met, max, sort]);

    const toggle = (arr, v, set) =>
        set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

    const activeFiltersCount = cat.length + met.length;

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:py-12">
            {/* Header */}
            <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Collection</div>
                <h1 className="mt-2 font-display text-3xl sm:text-4xl md:text-6xl">Shop the Maison</h1>
                <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground px-4">
                    Browse our complete archive of fine jewellery.
                </p>
            </div>

            {/* Search and Sort */}
            <div className="mt-8 sm:mt-10 flex flex-col gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        placeholder="Search jewellery…"
                        className="w-full rounded-full border border-gold/30 bg-card/40 py-3 pl-11 pr-4 text-sm outline-none focus:border-gold"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="lg:hidden inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 bg-card/40 px-4 py-3 text-sm font-medium text-foreground"
                    >
                        <SlidersHorizontal className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <span className="ml-1 rounded-full gold-bg-gradient px-2 py-0.5 text-xs text-black">
                                {activeFiltersCount}
                            </span>
                        )}
                    </button>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="flex-1 rounded-full border border-gold/30 bg-card/40 px-4 py-3 text-sm outline-none focus:border-gold"
                    >
                        <option value="featured">Featured</option>
                        <option value="low">Price: Low to High</option>
                        <option value="high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="mt-8 grid gap-8 lg:grid-cols-[280px_1fr]">
                <aside className="hidden lg:block space-y-6 rounded-2xl glass p-6 h-fit sticky top-32">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                        <SlidersHorizontal className="h-4 w-4" /> Filters
                    </div>

                    <Group title="Category">
                        {categories.map((c) => (
                            <Chip key={c} active={cat.includes(c)} onClick={() => toggle(cat, c, setCat)}>
                                {c}
                            </Chip>
                        ))}
                    </Group>

                    <Group title="Metal">
                        {metals.map((m) => (
                            <Chip key={m} active={met.includes(m)} onClick={() => toggle(met, m, setMet)}>
                                {m}
                            </Chip>
                        ))}
                    </Group>

                    <Group title={`Max price ₹${(max / 1000).toFixed(0)}k`}>
                        <input
                            type="range"
                            min={10000}
                            max={500000}
                            step={10000}
                            value={max}
                            onChange={(e) => setMax(+e.target.value)}
                            className="w-full accent-gold"
                        />
                    </Group>

                    {activeFiltersCount > 0 && (
                        <button
                            onClick={() => {
                                setCat([]);
                                setMet([]);
                                setMax(400000);
                            }}
                            className="mt-4 w-full rounded-full border border-gold/30 px-4 py-2 text-xs text-muted-foreground hover:border-gold hover:text-gold transition"
                        >
                            Clear all filters
                        </button>
                    )}
                </aside>

                {/* Products Grid */}
                <div>
                    <div className="mb-4 text-sm text-muted-foreground flex justify-between items-center flex-wrap gap-2">
                        <span>{filtered.length} pieces</span>
                        <div className="flex flex-wrap gap-2 lg:hidden">
                            {cat.map((c) => (
                                <span key={c} className="inline-flex items-center gap-1 rounded-full gold-bg-gradient px-2 py-1 text-[10px] text-black">
                                    {c}
                                    <button onClick={() => toggle(cat, c, setCat)}>
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                </span>
                            ))}
                            {met.map((m) => (
                                <span key={m} className="inline-flex items-center gap-1 rounded-full gold-bg-gradient px-2 py-1 text-[10px] text-black">
                                    {m}
                                    <button onClick={() => toggle(met, m, setMet)}>
                                        <X className="h-2.5 w-2.5" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="rounded-xl glass p-12 text-center text-muted-foreground">
                            No pieces match these filters.
                        </div>
                    ) : (
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filtered.map((p, i) => (
                                <ProductCard key={p.id} product={p} index={i} />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Filter Drawer - Smooth Open/Close with Framer Motion */}
            <AnimatePresence>
                {mobileFiltersOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 z-50 bg-black/50 lg:hidden"
                            onClick={() => setMobileFiltersOpen(false)}
                        />

                        {/* Drawer - Left Side */}
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed left-0 top-0 z-50 h-full w-80 max-w-[85%] glass-strong p-6 overflow-y-auto lg:hidden"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2 text-sm font-semibold text-gold">
                                    <SlidersHorizontal className="h-4 w-4" /> Filters
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="rounded-full p-1 hover:bg-gold/20 transition"
                                >
                                    <X className="h-5 w-5" />
                                </motion.button>
                            </div>

                            <Group title="Category">
                                {categories.map((c) => (
                                    <Chip key={c} active={cat.includes(c)} onClick={() => toggle(cat, c, setCat)}>
                                        {c}
                                    </Chip>
                                ))}
                            </Group>

                            <div className="mt-6">
                                <Group title="Metal">
                                    {metals.map((m) => (
                                        <Chip key={m} active={met.includes(m)} onClick={() => toggle(met, m, setMet)}>
                                            {m}
                                        </Chip>
                                    ))}
                                </Group>
                            </div>

                            <div className="mt-6">
                                <Group title={`Max price ₹${(max / 1000).toFixed(0)}k`}>
                                    <input
                                        type="range"
                                        min={10000}
                                        max={500000}
                                        step={10000}
                                        value={max}
                                        onChange={(e) => setMax(+e.target.value)}
                                        className="w-full accent-gold mt-2"
                                    />
                                </Group>
                            </div>

                            <div className="mt-8 flex gap-3">
                                {activeFiltersCount > 0 && (
                                    <motion.button
                                        whileTap={{ scale: 0.97 }}
                                        onClick={() => {
                                            setCat([]);
                                            setMet([]);
                                            setMax(400000);
                                        }}
                                        className="flex-1 rounded-full border border-gold/30 px-4 py-2.5 text-sm text-muted-foreground hover:border-gold hover:text-gold transition"
                                    >
                                        Clear all
                                    </motion.button>
                                )}
                                <motion.button
                                    whileTap={{ scale: 0.97 }}
                                    onClick={() => setMobileFiltersOpen(false)}
                                    className="flex-1 rounded-full gold-bg-gradient py-2.5 text-sm font-semibold text-black"
                                >
                                    Apply
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}