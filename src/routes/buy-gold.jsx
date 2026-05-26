import { useState } from "react";
import { Coins, ShieldCheck, TrendingUp } from "lucide-react";
import { GoldTicker } from "../components/ui/GoldTicker";

export default function BuyGold() {
    const [metal, setMetal] = useState("Gold");
    const [karat, setKarat] = useState("24K");
    const [weight, setWeight] = useState(10);

    const rate = metal === "Gold" ? (karat === "24K" ? 7842 : karat === "22K" ? 7188 : 5884) : 94.2;
    const total = Math.round(rate * weight);

    return (
        <div>
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 cinematic-bg" />
                <div className="relative mx-auto max-w-5xl px-4 py-20 text-center">
                    <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Digital Vault</div>
                    <h1 className="mt-3 font-display text-4xl md:text-6xl">
                        Buy <span className="gold-gradient">Gold & Silver</span>
                    </h1>
                    <p className="mx-auto mt-4 max-w-xl text-sm md:text-base text-muted-foreground">
                        Invest in 24K certified gold and 999 silver. Stored insured in our vaults, redeemable for jewellery anytime.
                    </p>
                </div>
            </section>

            <GoldTicker />

            <section className="mx-auto max-w-5xl px-4 py-16">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="rounded-2xl glass-strong p-8">
                        <h2 className="font-display text-2xl">Calculate your purchase</h2>
                        <div className="mt-6 grid gap-5">
                            <div>
                                <label className="text-xs uppercase tracking-widest text-muted-foreground">Metal</label>
                                <div className="mt-2 grid grid-cols-2 gap-2">
                                    {(["Gold", "Silver"]).map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => setMetal(m)}
                                            className={`rounded-full border py-2 text-sm ${metal === m ? "gold-bg-gradient text-black border-transparent" : "border-gold/30"}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {metal === "Gold" && (
                                <div>
                                    <label className="text-xs uppercase tracking-widest text-muted-foreground">Purity</label>
                                    <div className="mt-2 grid grid-cols-3 gap-2">
                                        {["24K", "22K", "18K"].map((k) => (
                                            <button
                                                key={k}
                                                onClick={() => setKarat(k)}
                                                className={`rounded-full border py-2 text-sm ${karat === k ? "gold-bg-gradient text-black border-transparent" : "border-gold/30"}`}
                                            >
                                                {k}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="text-xs uppercase tracking-widest text-muted-foreground">Weight (grams): {weight}g</label>
                                <input
                                    type="range"
                                    min={1}
                                    max={100}
                                    value={weight}
                                    onChange={(e) => setWeight(+e.target.value)}
                                    className="mt-2 w-full accent-[var(--gold)]"
                                />
                            </div>

                            <div className="rounded-xl border border-gold/30 bg-card/40 p-5">
                                <div className="text-xs uppercase tracking-widest text-muted-foreground">Estimated Total</div>
                                <div className="mt-1 font-display text-4xl gold-gradient">₹{total.toLocaleString("en-IN")}</div>
                                <div className="mt-1 text-xs text-muted-foreground">Live rate: ₹{rate.toLocaleString("en-IN")} / g</div>
                            </div>

                            <button className="rounded-full gold-bg-gradient py-3 text-sm font-semibold uppercase tracking-widest text-black gold-glow">
                                Buy Now
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {[
                            { I: ShieldCheck, t: "100% Insured Storage", d: "Stored in IBJA-certified vaults with full insurance." },
                            { I: TrendingUp, t: "Live Market Rates", d: "Updated every minute from BSE & MCX." },
                            { I: Coins, t: "Convert to Jewellery", d: "Redeem your digital gold for any RHOMB piece, anytime." },
                        ].map((f) => (
                            <div key={f.t} className="rounded-2xl glass p-6">
                                <f.I className="h-7 w-7 text-gold" />
                                <div className="mt-3 font-display text-xl">{f.t}</div>
                                <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}