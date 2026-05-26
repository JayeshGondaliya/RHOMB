import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    Diamond,
    Gem,
    Shield,
    Sparkles,
    Truck,
} from "lucide-react";

import { GoldTicker } from "../components/ui/GoldTicker";
import { ProductCard } from "../components/ui/ProductCard";
import { SectionTitle } from "../components/ui/SectionTitle";
import { products } from "../lib/products";

export default function Home() {
    const featured = products.filter((p) => p.featured).slice(0, 4);
    const best = products.filter((p) => p.bestseller).slice(0, 8);

    return (
        <div>
            {/* HERO */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=2000&q=80"
                        alt="Luxury jewellery"
                        className="h-full w-full object-cover opacity-40 dark:opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--background)_85%)]" />
                </div>
                <div className="relative mx-auto flex min-h-[88vh] max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                        <div className="mb-5 inline-flex items-center gap-2 rounded-full glass-badge px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-gold">
                            <Sparkles className="h-3 w-3" /> Maison RHOMB · Est. 1972
                        </div>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[1.05]">
                            Worn by <span className="gold-gradient">royalty</span>,
                            <br /> made for <span className="italic">today</span>.
                        </h1>
                        <p className="mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground">
                            Heirloom diamond, gold and platinum jewellery — hand-finished by master artisans across Mumbai, Dubai and London.
                        </p>
                        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                            <Link to="/shop" className="group inline-flex items-center gap-2 rounded-full gold-bg-gradient px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-black gold-glow transition hover:scale-[1.02]">
                                Explore Collection <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                            </Link>
                            <Link to="/custom" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-widest text-foreground transition hover:bg-gold/10">
                                Design Custom
                            </Link>
                        </div>
                        <div className="mt-14 grid grid-cols-3 gap-4 md:gap-10 max-w-2xl mx-auto">
                            {[
                                { k: "50+", v: "Years of craft" },
                                { k: "200k", v: "Heirlooms made" },
                                { k: "BIS", v: "Hallmarked" },
                            ].map((s) => (
                                <div key={s.v} className="text-center">
                                    <div className="font-display text-2xl md:text-4xl gold-gradient">{s.k}</div>
                                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.v}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <GoldTicker />

            {/* FEATURED COLLECTIONS */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="Curated" title="Featured Collections" subtitle="Signature pieces our atelier is most known for." />
                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { title: "Bridal", img: "photo-1605100804763-247f67b3557e" },
                        { title: "Heritage Gold", img: "photo-1611591437281-460bfbe1220a" },
                        { title: "Solitaires", img: "photo-1518049362265-d5b2a6467637" },
                        { title: "Everyday Luxe", img: "photo-1535632787350-4e68ef0ac584" },
                    ].map((c, i) => (
                        <motion.div
                            key={c.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.08 }}
                            className="group relative overflow-hidden rounded-xl border border-gold/20"
                        >
                            <Link to="/shop">
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img src={`https://images.unsplash.com/${c.img}?auto=format&fit=crop&w=700&q=80`} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" alt={c.title} />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    <div className="font-display text-2xl text-white">{c.title}</div>
                                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-gold opacity-80 group-hover:opacity-100">
                                        Discover <ArrowRight className="h-3 w-3" />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* BESTSELLERS */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="Most Loved" title="Bestselling Pieces" subtitle="The pieces our clients have chosen most this season." />
                <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {best.map((p, i) => (
                        <ProductCard key={p.id} product={p} index={i} />
                    ))}
                </div>
            </section>

            {/* WHY CHOOSE */}
            <section className="relative mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="The RHOMB Promise" title="Why choose us" />
                <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
                    {[
                        { I: Diamond, t: "GIA Certified", d: "Every diamond independently graded for cut, clarity, colour & carat." },
                        { I: Award, t: "BIS Hallmarked", d: "100% transparent purity for gold, silver and platinum." },
                        { I: Shield, t: "Lifetime Warranty", d: "Free polishing, replating and re-tipping for life." },
                        { I: Truck, t: "Insured Delivery", d: "White-glove, fully insured shipping in 80+ countries." },
                    ].map((f) => (
                        <div key={f.t} className="rounded-xl glass p-6 transition hover:gold-glow">
                            <f.I className="h-7 w-7 text-gold" />
                            <div className="mt-4 font-display text-xl">{f.t}</div>
                            <p className="mt-1.5 text-sm text-muted-foreground">{f.d}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FEATURED PRODUCTS BIG */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="Atelier Picks" title="Editor's Selection" />
                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
                </div>
            </section>

            {/* TESTIMONIALS */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="Whispers" title="What our clients say" />
                <div className="mt-12 grid gap-5 md:grid-cols-3">
                    {[
                        { n: "Aisha K.", c: "Dubai", t: "My engagement ring is an absolute dream. The craft, the detail, the service — peerless." },
                        { n: "Rohan M.", c: "Mumbai", t: "Custom designed a pendant for my mother. RHOMB's team treated us like family." },
                        { n: "Priya S.", c: "London", t: "I've bought from Cartier and Tiffany — RHOMB matches them on quality, beats them on soul." },
                    ].map((q, i) => (
                        <motion.div key={q.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="rounded-xl glass p-7">
                            <Gem className="h-6 w-6 text-gold" />
                            <p className="mt-3 text-sm leading-relaxed italic">"{q.t}"</p>
                            <div className="mt-5 font-display text-lg gold-gradient">{q.n}</div>
                            <div className="text-[11px] uppercase tracking-widest text-muted-foreground">{q.c}</div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* INSTAGRAM */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <SectionTitle eyebrow="@rhomb.gems" title="From our Instagram" />
                <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-6">
                    {[
                        "photo-1605100804763-247f67b3557e", "photo-1599643478518-a784e5dc4c8f", "photo-1535632787350-4e68ef0ac584",
                        "photo-1611591437281-460bfbe1220a", "photo-1602173574767-37ac01994b2a", "photo-1515562141207-7a88fb7ce338",
                    ].map((s, i) => (
                        <a key={i} href="/contact" className="group relative aspect-square overflow-hidden rounded-md">
                            <img src={`https://images.unsplash.com/${s}?auto=format&fit=crop&w=400&q=80`} alt="" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/40" />
                        </a>
                    ))}
                </div>
            </section>

            {/* NEWSLETTER */}
            <section className="mx-auto max-w-7xl px-4 py-20">
                <div className="overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center relative">
                    <div className="pointer-events-none absolute inset-0 shimmer opacity-20" />
                    <Sparkles className="mx-auto h-7 w-7 text-gold" />
                    <h3 className="mt-4 font-display text-3xl md:text-5xl">Join the <span className="gold-gradient">Inner Circle</span></h3>
                    <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">Private previews, gold market insights, atelier invitations.</p>
                    <form className="mx-auto mt-7 flex max-w-md flex-col gap-2 sm:flex-row">
                        <input type="email" required placeholder="Your email address" className="flex-1 rounded-full border border-gold/30 bg-background/60 px-5 py-3 text-sm outline-none focus:border-gold" />
                        <button className="rounded-full gold-bg-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black gold-glow">Subscribe</button>
                    </form>
                </div>
            </section>
        </div>
    );
}