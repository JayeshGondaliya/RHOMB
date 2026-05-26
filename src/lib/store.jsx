import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

// =====================
// THEME CONTEXT
// =====================

const ThemeCtx = createContext({
    theme: "light",  // ← "dark" thi badlavi "light" karo
    toggle: () => { },
});

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState("light");  // ← "dark" thi badlavi "light" karo

    useEffect(() => {
        const saved = localStorage.getItem("rhomb-theme") || "light";  // ← "dark" thi badlavi "light" karo
        setTheme(saved);
    }, []);

    useEffect(() => {
        document.documentElement.classList.toggle(
            "dark",
            theme === "dark"
        );
        localStorage.setItem("rhomb-theme", theme);
    }, [theme]);

    const toggle = () => {
        setTheme((t) => (t === "dark" ? "light" : "dark"));
    };

    return (
        <ThemeCtx.Provider value={{ theme, toggle }}>
            {children}
        </ThemeCtx.Provider>
    );
}

export const useTheme = () => useContext(ThemeCtx);

// =====================
// CART CONTEXT
// =====================

const CartCtx = createContext({
    items: [],
    add: () => { },
    remove: () => { },
    setQty: () => { },
    clear: () => { },
    total: 0,
    count: 0,
});

// =====================
// WISHLIST CONTEXT
// =====================

const WishCtx = createContext({
    ids: [],
    toggle: () => { },
    has: () => false,
});

// =====================
// STORE PROVIDER
// =====================

export function StoreProvider({ children }) {
    const [items, setItems] = useState([]);
    const [ids, setIds] = useState([]);

    // load from localStorage
    useEffect(() => {
        try {
            const c = localStorage.getItem("rhomb-cart");
            const w = localStorage.getItem("rhomb-wish");

            if (c) setItems(JSON.parse(c));
            if (w) setIds(JSON.parse(w));
        } catch (err) {
            console.log(err);
        }
    }, []);

    // save cart
    useEffect(() => {
        localStorage.setItem(
            "rhomb-cart",
            JSON.stringify(items)
        );
    }, [items]);

    // save wishlist
    useEffect(() => {
        localStorage.setItem(
            "rhomb-wish",
            JSON.stringify(ids)
        );
    }, [ids]);

    // CART FUNCTIONS
    const add = (product, qty = 1) => {
        setItems((prev) => {
            const exists = prev.find(
                (i) => i.product.id === product.id
            );

            if (exists) {
                return prev.map((i) =>
                    i.product.id === product.id
                        ? { ...i, qty: i.qty + qty }
                        : i
                );
            }

            return [...prev, { product, qty }];
        });
    };

    const remove = (id) => {
        setItems((prev) =>
            prev.filter((i) => i.product.id !== id)
        );
    };

    const setQty = (id, qty) => {
        setItems((prev) =>
            prev.map((i) =>
                i.product.id === id
                    ? { ...i, qty: Math.max(1, qty) }
                    : i
            )
        );
    };

    const clear = () => setItems([]);

    const total = items.reduce(
        (sum, i) => sum + i.product.price * i.qty,
        0
    );

    const count = items.reduce(
        (sum, i) => sum + i.qty,
        0
    );

    // WISHLIST FUNCTIONS
    const toggle = (id) => {
        setIds((prev) =>
            prev.includes(id)
                ? prev.filter((x) => x !== id)
                : [...prev, id]
        );
    };

    const has = (id) => ids.includes(id);

    return (
        <CartCtx.Provider
            value={{
                items,
                add,
                remove,
                setQty,
                clear,
                total,
                count,
            }}
        >
            <WishCtx.Provider
                value={{ ids, toggle, has }}
            >
                {children}
            </WishCtx.Provider>
        </CartCtx.Provider>
    );
}

// =====================
// HOOKS
// =====================

export const useCart = () =>
    useContext(CartCtx);

export const useWishlist = () =>
    useContext(WishCtx);