import { Link, useLocation } from "react-router-dom";
import { Heart, Menu, ShoppingBag, User, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useCart, useWishlist } from "../../lib/store";

const nav = [
    { to: "/", label: "HOME" },
    { to: "/shop", label: "SHOP" },
    { to: "/custom", label: "CUSTOM" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
];

function Badge({ children }) {
    return (
        <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full gold-bg-gradient px-1 text-[10px] font-bold text-black">
            {children}
        </span>
    );
}

export function Navbar() {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { count } = useCart();
    const { ids } = useWishlist();
    const location = useLocation();
    const path = location.pathname;

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    return (
        <header className="sticky top-0 z-50">
            {/* Top Banner - Hide on mobile */}
            {!isMobile && (
                <div className="bg-foreground/95 text-background text-[11px] tracking-widest uppercase">
                    <div className="mx-auto max-w-7xl px-4 py-2 text-center">
                        Complimentary shipping worldwide · Lifetime warranty on every RHOMB piece
                    </div>
                </div>
            )}

            {/* Main Navbar */}
            <div className="glass-strong border-b border-gold/20">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-3 py-3">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <span className="grid h-9 w-9 place-items-center rounded-md gold-bg-gradient text-black font-display text-lg font-bold">
                            R
                        </span>
                        <div className="leading-none">
                            <div className="font-display text-xl tracking-[0.25em] gold-gradient">RHOMB</div>
                            <div className="text-[9px] tracking-[0.4em] text-muted-foreground">ROYAL · GEMS</div>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-7">
                        {nav.map((n) => (
                            <Link
                                key={n.to}
                                to={n.to}
                                className={`text-sm tracking-wide transition-colors hover:text-gold ${path === n.to ? "text-gold" : "text-foreground/80"
                                    }`}
                            >
                                {n.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Right Icons */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />

                        <Link to="/wishlist" className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-foreground/80 hover:text-gold">
                            <Heart className="h-4 w-4" />
                            {ids.length > 0 && <Badge>{ids.length}</Badge>}
                        </Link>

                        <Link to="/cart" className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-foreground/80 hover:text-gold">
                            <ShoppingBag className="h-4 w-4" />
                            {count > 0 && <Badge>{count}</Badge>}
                        </Link>

                        <Link to="/login" className="hidden md:inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-foreground/80 hover:text-gold">
                            <User className="h-4 w-4" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setOpen((o) => !o)}
                            className="lg:hidden inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold"
                        >
                            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {open && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="lg:hidden overflow-hidden border-t border-gold/20"
                        >
                            <div className="mx-auto grid max-w-7xl gap-1 px-4 py-3">
                                {nav.map((n) => (
                                    <Link
                                        key={n.to}
                                        to={n.to}
                                        onClick={() => setOpen(false)}
                                        className="rounded-md px-3 py-2 text-sm hover:bg-gold/10 hover:text-gold"
                                    >
                                        {n.label}
                                    </Link>
                                ))}
                                <Link
                                    to="/login"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm hover:bg-gold/10 hover:text-gold"
                                >
                                    Login / Register
                                </Link>
                                <Link
                                    to="/admin"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-3 py-2 text-sm hover:bg-gold/10 hover:text-gold"
                                >
                                    Admin
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
}