import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, User } from "lucide-react";
import { FaApple, FaGoogle } from "react-icons/fa";
import { toast } from "sonner";

function Input({ I, ...props }) {
    return (
        <div className="relative">
            <I className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
                {...props}
                className="w-full rounded-full border border-gold/30 bg-background/60 py-3 pl-11 pr-4 text-sm outline-none focus:border-gold"
            />
        </div>
    );
}

export default function Login() {
    const [mode, setMode] = useState("login");

    return (
        <div className="mx-auto grid min-h-[80vh] max-w-md place-items-center px-4 py-12">
            <div className="w-full rounded-3xl glass-strong p-8 md:p-10">
                {/* HEADER */}
                <div className="text-center">
                    <div className="mx-auto grid h-12 w-12 place-items-center rounded-full gold-bg-gradient text-black font-display text-xl font-bold">
                        R
                    </div>

                    <h1 className="mt-3 font-display text-3xl">
                        {mode === "login" ? "Welcome back" : "Join the Inner Circle"}
                    </h1>

                    <p className="mt-1 text-xs text-muted-foreground">
                        {mode === "login"
                            ? "Sign in to your RHOMB account"
                            : "Create your RHOMB account"}
                    </p>
                </div>

                {/* FORM */}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.success(
                            mode === "login"
                                ? "Signed in successfully!"
                                : "Account created successfully!"
                        );
                    }}
                    className="mt-7 grid gap-3"
                >
                    {mode === "register" && (
                        <Input I={User} placeholder="Full name" />
                    )}

                    <Input I={Mail} placeholder="Email address" type="email" />
                    <Input I={Lock} placeholder="Password" type="password" />

                    {mode === "login" && (
                        <Link
                            to="/forgot-password"
                            className="text-right text-xs text-gold hover:underline"
                        >
                            Forgot password?
                        </Link>
                    )}

                    <button
                        type="submit"
                        className="mt-2 rounded-full gold-bg-gradient py-3 text-sm font-semibold uppercase tracking-widest text-black gold-glow"
                    >
                        {mode === "login" ? "Sign In" : "Create Account"}
                    </button>
                </form>

                {/* DIVIDER */}
                <div className="my-6 flex items-center gap-3 text-[11px] uppercase tracking-widest text-muted-foreground">
                    <div className="h-px flex-1 bg-gold/20" />
                    or continue with
                    <div className="h-px flex-1 bg-gold/20" />
                </div>

                {/* SOCIAL LOGIN */}
                <div className="grid grid-cols-2 gap-2">
                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 py-2.5 text-sm hover:border-gold"
                    >
                        <FaGoogle className="h-4 w-4" />
                        Google
                    </button>

                    <button
                        type="button"
                        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/30 py-2.5 text-sm hover:border-gold"
                    >
                        <FaApple className="h-4 w-4" />
                        Apple
                    </button>
                </div>

                {/* SWITCH MODE */}
                <div className="mt-7 text-center text-xs text-muted-foreground">
                    {mode === "login"
                        ? "New to RHOMB? "
                        : "Already have an account? "}

                    <button
                        type="button"
                        onClick={() =>
                            setMode(mode === "login" ? "register" : "login")
                        }
                        className="text-gold hover:underline"
                    >
                        {mode === "login" ? "Create an account" : "Sign in"}
                    </button>
                </div>
            </div>
        </div>
    );
}