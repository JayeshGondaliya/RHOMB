import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaYoutube,
} from "react-icons/fa";

export function Footer() {
    return (
        <footer className="relative mt-24 border-t border-gold/20 bg-foreground text-background">
            <div className="absolute inset-x-0 -top-px h-px gold-bg-gradient opacity-70" />

            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4">
                <div>
                    <div className="flex items-center gap-2">
                        <span className="grid h-10 w-10 place-items-center rounded-md gold-bg-gradient text-black font-display text-lg font-bold">
                            R
                        </span>

                        <div>
                            <div className="font-display text-2xl tracking-[0.25em] gold-gradient">
                                RHOMB
                            </div>

                            <div className="text-[10px] tracking-[0.4em] opacity-70">
                                ROYAL · GEMS
                            </div>
                        </div>
                    </div>

                    <p className="mt-4 text-sm opacity-70 leading-relaxed">
                        Heirloom jewellery, hand-finished by master artisans.
                        Crafted to be worn for generations.
                    </p>

                    <div className="mt-5 flex gap-3">
                        {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map(
                            (Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="grid h-9 w-9 place-items-center rounded-full border border-gold/40 text-gold hover:gold-glow"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            )
                        )}
                    </div>
                </div>

                <FCol title="Shop">
                    <FLink to="/shop">All Jewellery</FLink>
                    <FLink to="/shop">Bestsellers</FLink>
                    <FLink to="/buy-gold">Buy Gold & Silver</FLink>
                    <FLink to="/custom">Custom Orders</FLink>
                    <FLink to="/sell">Sell Your Jewellery</FLink>
                </FCol>

                <FCol title="Company">
                    <FLink to="/about">Our Story</FLink>
                    <FLink to="/contact">Contact</FLink>
                    <FLink to="/admin">Admin Dashboard</FLink>
                    <FLink to="/wishlist">Wishlist</FLink>
                    <FLink to="/cart">Cart</FLink>
                </FCol>

                <FCol title="Visit Us">
                    <div className="flex items-start gap-2 text-sm opacity-80">
                        <MapPin className="mt-0.5 h-4 w-4 text-gold" />
                        Mumbai · Dubai · London
                    </div>

                    <div className="flex items-center gap-2 text-sm opacity-80">
                        <Phone className="h-4 w-4 text-gold" />
                        +91 98765 43210
                    </div>

                    <div className="flex items-center gap-2 text-sm opacity-80">
                        <Mail className="h-4 w-4 text-gold" />
                        hello@rhomb.gems
                    </div>
                </FCol>
            </div>

            <div className="border-t border-white/10">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs opacity-70 md:flex-row">
                    <div>
                        © {new Date().getFullYear()} RHOMB · Royal Gems.
                        All rights reserved.
                    </div>

                    <div>
                        BIS Hallmarked · GIA Certified · Conflict-Free Diamonds
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FCol({ title, children }) {
    return (
        <div>
            <h4 className="font-display text-lg text-gold">{title}</h4>
            <div className="mt-4 grid gap-2">{children}</div>
        </div>
    );
}

function FLink({ to, children }) {
    return (
        <Link
            to={to}
            className="text-sm opacity-80 hover:text-gold hover:opacity-100"
        >
            {children}
        </Link>
    );
}