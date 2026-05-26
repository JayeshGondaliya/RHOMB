import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const inputClassName = "w-full rounded-md border border-gold/30 bg-background/60 px-4 py-3 text-sm outline-none focus:border-gold";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

    return (
        <div className="mx-auto max-w-6xl px-4 py-16">
            <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.4em] text-gold">Get in touch</div>
                <h1 className="mt-2 font-display text-4xl md:text-6xl">
                    We'd love to <span className="gold-gradient">hear from you</span>
                </h1>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-[1fr_2fr]">
                <div className="space-y-4">
                    {[
                        { I: MapPin, t: "Flagship Atelier", d: "Zaveri Bazaar, Mumbai 400003 · India" },
                        { I: Phone, t: "Call us", d: "+91 98765 43210 · +971 4 123 4567" },
                        { I: Mail, t: "Email", d: "hello@rhomb.gems · concierge@rhomb.gems" },
                    ].map((c) => (
                        <div key={c.t} className="rounded-2xl glass p-6">
                            <c.I className="h-6 w-6 text-gold" />
                            <div className="mt-3 font-display text-lg">{c.t}</div>
                            <div className="text-sm text-muted-foreground">{c.d}</div>
                        </div>
                    ))}
                </div>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.success("Message sent — we'll reply within a few hours.");
                        setForm({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="rounded-3xl glass-strong p-8"
                >
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            placeholder="Your name"
                            required
                            className={inputClassName}
                        />
                        <input
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            type="email"
                            placeholder="Email address"
                            required
                            className={inputClassName}
                        />
                    </div>

                    <input
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        placeholder="Subject"
                        className={`${inputClassName} mt-4`}
                    />

                    <textarea
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        placeholder="Your message"
                        rows={6}
                        className={`${inputClassName} mt-4`}
                    />

                    <button className="mt-5 inline-flex items-center gap-2 rounded-full gold-bg-gradient px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black gold-glow">
                        <Send className="h-4 w-4" /> Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}