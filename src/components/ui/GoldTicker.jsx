import { useEffect, useState } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
const seed= [
    { metal: "Gold", karat: "24K / 10g", price: 78420, change: 0.42 },
    { metal: "Gold", karat: "22K / 10g", price: 71880, change: 0.38 },
    { metal: "Gold", karat: "18K / 10g", price: 58840, change: 0.31 },
    { metal: "Silver", karat: "999 / 1kg", price: 94210, change: -0.18 },
    { metal: "Platinum", karat: "950 / 10g", price: 32500, change: 0.12 },
    { metal: "Diamond", karat: "Avg /ct", price: 145000, change: 0.05 },
];
export function GoldTicker() {
    const [rates, setRates] = useState(seed);
    useEffect(() => {
        const i = setInterval(() => {
            setRates((rs) =>
                rs.map((r) => {
                    const delta = (Math.random() - 0.5) * 0.8;
                    return { ...r, price: Math.round(r.price * (1 + delta / 1000)), change: +(r.change + delta / 10).toFixed(2) };
                }),
            );
        }, 2500);
        return () => clearInterval(i);
    }, []);
    const row = [...rates, ...rates];
    return (
        <div className="relative overflow-hidden border-y border-gold/30 bg-black text-white">
            <div className="pointer-events-none absolute inset-0 shimmer opacity-30" />
            <div className="flex w-max marquee gap-12 py-3 px-6">
                {row.map((r, i) => (
                    <div key={i} className="flex items-center gap-3 whitespace-nowrap text-sm">
                        <span className="text-gold font-display tracking-wider">{r.metal}</span>
                        <span className="opacity-70 text-xs">{r.karat}</span>
                        <span className="font-semibold">₹{r.price.toLocaleString("en-IN")}</span>
                        <span className={`inline-flex items-center gap-1 text-xs ${r.change >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                            {r.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                            {Math.abs(r.change).toFixed(2)}%
                        </span>
                        <span className="text-gold/40">◆</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
