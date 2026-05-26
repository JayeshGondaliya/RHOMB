import { useState } from "react";
import { BarChart3, Box, DollarSign, Package, Settings, ShoppingCart, Users } from "lucide-react";
import { formatINR, products } from "../lib/products";

const stats = [
    { I: DollarSign, label: "Revenue", value: "₹48.2L", change: "+12.4%" },
    { I: ShoppingCart, label: "Orders", value: "1,284", change: "+8.1%" },
    { I: Users, label: "Customers", value: "9,420", change: "+3.7%" },
    { I: Package, label: "Products", value: "412", change: "+2.0%" },
];

const orders = [
    { id: "RHB-A1B2C3", customer: "Aisha Khan", total: 184500, status: "Shipped", date: "2026-05-22" },
    { id: "RHB-D4E5F6", customer: "Rohan Mehta", total: 72500, status: "Processing", date: "2026-05-23" },
    { id: "RHB-G7H8I9", customer: "Priya Sharma", total: 268000, status: "Delivered", date: "2026-05-20" },
    { id: "RHB-J1K2L3", customer: "Arjun Patel", total: 32500, status: "Cancelled", date: "2026-05-18" },
    { id: "RHB-M4N5O6", customer: "Sara Iqbal", total: 96000, status: "Shipped", date: "2026-05-24" },
];

const tabs = ["Overview", "Orders", "Products", "Customers"];

function badgeFor(s) {
    if (s === "Delivered") return "bg-emerald-500/20 text-emerald-400";
    if (s === "Shipped") return "bg-sky-500/20 text-sky-400";
    if (s === "Processing") return "bg-amber-500/20 text-amber-400";
    return "bg-rose-500/20 text-rose-400";
}

export default function Admin() {
    const [tab, setTab] = useState("Overview");

    return (
        <div className="mx-auto max-w-7xl px-4 py-10">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-[11px] uppercase tracking-[0.4em] text-gold">RHOMB Maison</div>
                    <h1 className="mt-1 font-display text-4xl">Admin <span className="gold-gradient">Dashboard</span></h1>
                </div>
                <button className="inline-flex items-center gap-2 rounded-full border border-gold/30 px-4 py-2 text-xs uppercase tracking-widest hover:border-gold">
                    <Settings className="h-3.5 w-3.5" /> Settings
                </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-2xl glass p-5">
                        <div className="flex items-center justify-between">
                            <s.I className="h-5 w-5 text-gold" />
                            <span className="text-[11px] text-emerald-400">{s.change}</span>
                        </div>
                        <div className="mt-3 font-display text-2xl">{s.value}</div>
                        <div className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-8 flex gap-1 rounded-full border border-gold/20 bg-card/40 p-1 w-fit">
                {tabs.map((t) => (
                    <button 
                        key={t} 
                        onClick={() => setTab(t)} 
                        className={`px-4 py-2 text-xs uppercase tracking-widest rounded-full transition ${tab === t ? "gold-bg-gradient text-black" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="mt-6">
                {tab === "Overview" && (
                    <div className="grid gap-5 lg:grid-cols-2">
                        <div className="rounded-2xl glass p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="font-display text-xl">Sales overview</h3>
                                <BarChart3 className="h-5 w-5 text-gold" />
                            </div>
                            <div className="mt-5 flex h-48 items-end gap-2">
                                {[40, 65, 52, 78, 90, 72, 88, 95, 84, 92, 110, 124].map((v, i) => (
                                    <div key={i} className="flex-1 rounded-t gold-bg-gradient opacity-80 hover:opacity-100" style={{ height: `${v}%` }} title={`${v}k`} />
                                ))}
                            </div>
                            <div className="mt-3 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                                {["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"].map((m, i) => <span key={i}>{m}</span>)}
                            </div>
                        </div>

                        <div className="rounded-2xl glass p-6">
                            <h3 className="font-display text-xl">Top products</h3>
                            <div className="mt-4 space-y-3">
                                {products.slice(0, 5).map((p) => (
                                    <div key={p.id} className="flex items-center gap-3">
                                        <img src={p.image} className="h-10 w-10 rounded-md object-cover" alt="" />
                                        <div className="flex-1 min-w-0">
                                            <div className="truncate text-sm">{p.name}</div>
                                            <div className="text-xs text-muted-foreground">{p.category}</div>
                                        </div>
                                        <div className="text-sm gold-gradient font-semibold">{formatINR(p.price)}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {tab === "Orders" && (
                    <div className="overflow-hidden rounded-2xl glass">
                        <table className="w-full text-sm">
                            <thead className="bg-foreground/5">
                                <tr className="text-left text-[11px] uppercase tracking-widest text-muted-foreground">
                                    <th className="p-4">Order</th>
                                    <th className="p-4">Customer</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o.id} className="border-t border-gold/10">
                                        <td className="p-4 font-mono text-xs text-gold">{o.id}</td>
                                        <td className="p-4">{o.customer}</td>
                                        <td className="p-4">{formatINR(o.total)}</td>
                                        <td className="p-4">
                                            <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest ${badgeFor(o.status)}`}>
                                                {o.status}
                                            </span>
                                        </td>
                                        <td className="p-4 text-muted-foreground">{o.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {tab === "Products" && (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((p) => (
                            <div key={p.id} className="flex gap-3 rounded-xl glass p-3">
                                <img src={p.image} className="h-20 w-20 rounded-md object-cover" alt="" />
                                <div className="flex-1 min-w-0">
                                    <div className="line-clamp-1 text-sm">{p.name}</div>
                                    <div className="text-xs text-muted-foreground">{p.category} · {p.metal}</div>
                                    <div className="mt-1 text-sm gold-gradient font-semibold">{formatINR(p.price)}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {tab === "Customers" && (
                    <div className="rounded-2xl glass p-10 text-center text-muted-foreground">
                        <Box className="mx-auto h-8 w-8 text-gold" />
                        <p className="mt-3">Customer management coming soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}