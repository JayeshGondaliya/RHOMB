import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../lib/store";

export function ThemeToggle() {
    const { theme, toggle } = useTheme();

    return (
        <button
            aria-label="Toggle theme"
            onClick={toggle}
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 bg-card/40 backdrop-blur transition hover:gold-glow"
        >
            <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-gold"
            >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </motion.span>
        </button>
    );
}