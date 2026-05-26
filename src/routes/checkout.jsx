import { useNavigate } from "react-router-dom";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "../lib/products";
import { useCart } from "../lib/store";

function Section({ title, children }) {
    return (
        <div className="rounded-2xl glass p-6">
            <h3 className="font-display text-xl">{title}</h3>
            <div className="mt-4">{children}</div>
        </div>
    );
}

function Input(props) {
    return (
        <input
            {...props}
            className={`w-full rounded-md border border-gold/30 bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-gold ${props.className ?? ""}`}
        />
    );
}

export default function Checkout() {
    const { items, total, clear } = useCart();
    const tax = Math.round(total * 0.03);
    const navigate = useNavigate();

    const submit = (e) => {
        e.preventDefault();
        toast.success("Order placed! Tracking number: RHB-" + Math.random().toString(36).slice(2, 8).toUpperCase());
        clear();
        navigate("/");
    };

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <h1 className="font-display text-4xl md:text-5xl">
                Secure <span className="gold-gradient">Checkout</span>
            </h1>
            <p className="mt-1 inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 text-gold" /> 256-bit SSL encrypted · PCI-DSS compliant
            </p>

            <form onSubmit={submit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_400px]">
                <div className="space-y-6">
                    <Section title="Contact">
                        <div className="grid gap-3 md:grid-cols-2">
                            <Input placeholder="Full name" required />
                            <Input placeholder="Email" type="email" required />
                            <Input placeholder="Phone" required />
                        </div>
                    </Section>

                    <Section title="Shipping address">
                        <div className="grid gap-3 md:grid-cols-2">
                            <Input placeholder="Address line 1" className="md:col-span-2" required />
                            <Input placeholder="Address line 2" className="md:col-span-2" />
                            <Input placeholder="City" required />
                            <Input placeholder="State" required />
                            <Input placeholder="Postal code" required />
                            <Input placeholder="Country" defaultValue="India" required />
                        </div>
                    </Section>

                    <Section title="Payment">
                        <div className="rounded-xl border border-gold/30 bg-card p-4">
                            <div className="flex items-center justify-between">
                                <div className="inline-flex items-center gap-2 text-sm font-medium">
                                    <CreditCard className="h-4 w-4 text-gold" /> Credit / Debit Card
                                </div>
                                <ShieldCheck className="h-4 w-4 text-gold" />
                            </div>
                            <div className="mt-3 grid gap-3">
                                <Input placeholder="Card number" required />
                                <div className="grid grid-cols-3 gap-3">
                                    <Input placeholder="MM / YY" required />
                                    <Input placeholder="CVC" required />
                                    <Input placeholder="Name on card" className="col-span-1" />
                                </div>
                            </div>
                        </div>
                    </Section>

                    <button className="w-full rounded-full gold-bg-gradient py-4 text-sm font-semibold uppercase tracking-widest text-black gold-glow">
                        Pay {formatINR(total + tax)} Securely
                    </button>
                </div>

                <aside className="h-fit rounded-2xl glass-strong p-6 lg:sticky lg:top-32">
                    <h3 className="font-display text-xl">Order Summary</h3>
                    <div className="mt-4 space-y-3 max-h-64 overflow-y-auto">
                        {items.map((i) => (
                            <div key={i.product.id} className="flex items-center gap-3 text-sm">
                                <img src={i.product.image} className="h-14 w-14 rounded-md object-cover" alt="" />
                                <div className="flex-1">
                                    <div className="line-clamp-1">{i.product.name}</div>
                                    <div className="text-xs text-muted-foreground">Qty {i.qty}</div>
                                </div>
                                <div>{formatINR(i.product.price * i.qty)}</div>
                            </div>
                        ))}
                        {items.length === 0 && <div className="text-sm text-muted-foreground">Bag is empty.</div>}
                    </div>
                    <div className="my-4 h-px bg-gold/20" />
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>{formatINR(total)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>Complimentary</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Tax (3%)</span>
                            <span>{formatINR(tax)}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-sm">Total</span>
                        <span className="font-display text-2xl gold-gradient">{formatINR(total + tax)}</span>
                    </div>
                </aside>
            </form>
        </div>
    );
}