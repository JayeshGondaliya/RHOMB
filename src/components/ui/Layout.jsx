import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { LiveChat } from "./LiveChat";
import { Toaster } from "sonner";
import { StoreProvider, ThemeProvider } from "../../lib/store";

export function Layout() {
    return (
        <ThemeProvider>
            <StoreProvider>
                <div className="min-h-screen bg-background text-foreground transition-colors duration-500 cinematic-bg">
                    <Navbar />
                    <main className="relative">
                        <Outlet />
                    </main>
                    <Footer />
                    <LiveChat />
                    <Toaster position="bottom-center" />
                </div>
            </StoreProvider>
        </ThemeProvider>
    );
}