import { useState } from "react";
import { Sparkles, ChevronRight, Diamond, Gem } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const inputClassName = "w-full rounded-md border border-gold/30 bg-background/60 px-4 py-2.5 text-sm outline-none focus:border-gold";

// Diamond Shape Options
const diamondShapes = [
    { name: "Round", value: "round", price: "+0%" },
    { name: "Princess", value: "princess", price: "+5%" },
    { name: "Emerald", value: "emerald", price: "+8%" },
    { name: "Oval", value: "oval", price: "+10%" },
    { name: "Pear", value: "pear", price: "+12%" },
    { name: "Marquise", value: "marquise", price: "+15%" },
    { name: "Cushion", value: "cushion", price: "+7%" },
    { name: "Radiant", value: "radiant", price: "+9%" },
    { name: "Asscher", value: "asscher", price: "+11%" },
    { name: "Heart", value: "heart", price: "+14%" },
];

// Carat Options
const caratOptions = [
    { value: "0.5", label: "0.5 ct", price: 50000 },
    { value: "0.75", label: "0.75 ct", price: 75000 },
    { value: "1", label: "1.0 ct", price: 100000 },
    { value: "1.5", label: "1.5 ct", price: 150000 },
    { value: "2", label: "2.0 ct", price: 200000 },
    { value: "2.5", label: "2.5 ct", price: 250000 },
    { value: "3", label: "3.0 ct", price: 300000 },
];

// Color Options
const colorOptions = [
    { value: "D", label: "D - Colorless", price: "+40%" },
    { value: "E", label: "E - Colorless", price: "+30%" },
    { value: "F", label: "F - Colorless", price: "+20%" },
    { value: "G", label: "G - Near Colorless", price: "+10%" },
    { value: "H", label: "H - Near Colorless", price: "+5%" },
    { value: "I", label: "I - Near Colorless", price: "0%" },
    { value: "J", label: "J - Faint Color", price: "-5%" },
];

// Clarity Options
const clarityOptions = [
    { value: "IF", label: "IF - Internally Flawless", price: "+50%" },
    { value: "VVS1", label: "VVS1 - Very Very Slightly Included", price: "+35%" },
    { value: "VVS2", label: "VVS2 - Very Very Slightly Included", price: "+25%" },
    { value: "VS1", label: "VS1 - Very Slightly Included", price: "+15%" },
    { value: "VS2", label: "VS2 - Very Slightly Included", price: "+10%" },
    { value: "SI1", label: "SI1 - Slightly Included", price: "0%" },
    { value: "SI2", label: "SI2 - Slightly Included", price: "-10%" },
];

// Metal Options
const metalOptions = [
    { name: "Platinum", color: "#E5E4E2", price: "+30%" },
    { name: "18K White Gold", color: "#C0C0C0", price: "+15%" },
    { name: "18K Yellow Gold", color: "#D4AF37", price: "0%" },
    { name: "18K Rose Gold", color: "#B76E79", price: "+5%" },
    { name: "14K White Gold", color: "#B8B8B8", price: "-10%" },
    { name: "14K Yellow Gold", color: "#C5A841", price: "-15%" },
    { name: "14K Rose Gold", color: "#A85864", price: "-12%" },
];

// Ring Sizes
const ringSizes = Array.from({ length: 20 }, (_, i) => ({
    value: (4 + i * 0.5).toFixed(1),
    label: `${(4 + i * 0.5).toFixed(1)}`
}));

export default function Custom() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        diamondShape: "round",
        carat: "1",
        color: "H",
        clarity: "SI1",
        metal: "18K Yellow Gold",
        ringSize: "7",
        name: "",
        email: "",
        phone: "",
        brief: ""
    });

    // Calculate price
    const basePrice = 85000;
    const caratPrice = caratOptions.find(c => c.value === form.carat)?.price || 100000;
    const colorMultiplier = colorOptions.find(c => c.value === form.color)?.price || "0%";
    const clarityMultiplier = clarityOptions.find(c => c.value === form.clarity)?.price || "0%";
    const metalPrice = metalOptions.find(m => m.name === form.metal)?.price || "0%";

    const calculateTotal = () => {
        let total = basePrice + caratPrice;
        const colorMul = parseFloat(colorMultiplier) || 0;
        total += total * (colorMul / 100);
        const clarityMul = parseFloat(clarityMultiplier) || 0;
        total += total * (clarityMul / 100);
        const metalMul = parseFloat(metalPrice) || 0;
        total += total * (metalMul / 100);
        return Math.round(total);
    };

    const totalPrice = calculateTotal();

    const submit = (e) => {
        e.preventDefault();
        toast.success("Design brief received. Our master craftsman will share sketches in 48 hours.");
    };

    const steps = [
        { number: 1, title: "Select Diamond Shape", description: "Choose from 10 iconic diamond shapes" },
        { number: 2, title: "Select Carat, Color & Clarity", description: "Fine-tune brilliance and purity" },
        { number: 3, title: "Select Metal", description: "Pick the perfect metal" },
        { number: 4, title: "Select Ring Size", description: "Ensure a flawless fit" }
    ];

    const currentShape = diamondShapes.find(s => s.value === form.diamondShape);

    // Handle shape selection - auto next step
    const handleShapeSelect = (shapeValue) => {
        setForm({ ...form, diamondShape: shapeValue });
        setTimeout(() => {
            setStep(2);
        }, 300);
    };

    // Next step handler
    const handleNext = () => {
        if (step < 4) {
            setStep(step + 1);
        }
    };

    return (
        <div>
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=2000&q=80"
                        className="h-full w-full object-cover opacity-30"
                        alt=""
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-background/60 to-background" />
                </div>
                <div className="relative mx-auto max-w-3xl px-4 py-20 text-center">
                    <Gem className="mx-auto h-8 w-8 text-gold" />
                    <h1 className="mt-3 font-display text-4xl md:text-6xl">
                        Design Your <span className="gold-gradient">Custom Engagement Ring</span>
                    </h1>
                    <p className="mt-4 text-muted-foreground">
                        Choose your diamond shape. Build your ring, your way.
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <section className="mx-auto max-w-7xl px-4 pb-20">
                {/* Steps Indicator */}
                <div className="mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {steps.map((s) => (
                            <button
                                key={s.number}
                                onClick={() => setStep(s.number)}
                                className={`text-left p-4 rounded-xl transition-all ${step === s.number ? "glass-strong border border-gold/50" : "glass hover:border-gold/30"}`}
                            >
                                <div className={`text-2xl font-display ${step === s.number ? "gold-gradient" : "text-muted-foreground"}`}>
                                    {s.number.toString().padStart(2, "0")}
                                </div>
                                <div className={`text-sm font-semibold mt-1 ${step === s.number ? "text-foreground" : "text-muted-foreground"}`}>
                                    {s.title}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5 hidden md:block">
                                    {s.description}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* LEFT SIDE - Simple Design Like Screenshot */}
                    <div className="flex items-center justify-center sticky top-32 h-fit">
                        <div className="rounded-3xl glass-strong p-8 w-full max-w-md text-center">
                            {/* Diamond Icon with Circle Border */}
                            <div className="flex justify-center mb-6">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-full border-4 border-gold/50 flex items-center justify-center">
                                        <Diamond className="h-12 w-12 text-gold" />
                                    </div>
                                </div>
                            </div>

                            {/* Title Section */}
                            <div className="text-center">
                                <div className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
                                    DESIGN CUSTOM
                                </div>
                                <h2 className="font-display text-4xl gold-gradient">
                                    SOLITAIRE
                                </h2>
                                <div className="text-sm text-muted-foreground mt-1">
                                    Ring
                                </div>
                            </div>

                            {/* Diamond Details - Shows selected shape */}
                            <div className="mt-6 pt-6 border-t border-gold/20">
                                <div className="text-gold font-display text-lg">
                                    {currentShape?.name || "Round"} Cut
                                </div>
                                <div className="text-sm text-muted-foreground mt-1">
                                    {form.carat} ct · {form.color} Color · {form.clarity} Clarity
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    {form.metal} · Size {form.ringSize}
                                </div>
                            </div>

                            {/* Price Display */}
                            <div className="mt-4 pt-4 border-t border-gold/20">
                                <div className="text-sm text-muted-foreground">Estimated Total</div>
                                <div className="font-display text-3xl gold-gradient">
                                    ₹{totalPrice.toLocaleString("en-IN")}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                    *Final price may vary
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE - Form Steps */}
                    <div className="rounded-3xl glass-strong p-6 sm:p-8 md:p-10">
                        <form onSubmit={submit}>
                            <AnimatePresence mode="wait">
                                {/* Step 1: Diamond Shape - Select karva par auto next */}
                                {step === 1 && (
                                    <motion.div
                                        key="step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="font-display text-2xl gold-gradient">Select Diamond Shape</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Choose from 10 iconic diamond shapes
                                            </p>
                                            <div className="text-xs text-gold/70 mt-2">
                                                ✨ Click on any shape to continue
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {diamondShapes.map((shape) => (
                                                <button
                                                    key={shape.value}
                                                    type="button"
                                                    onClick={() => handleShapeSelect(shape.value)}
                                                    className={`p-3 rounded-xl text-center transition-all ${form.diamondShape === shape.value ? "glass-strong border-gold" : "glass border-transparent hover:border-gold/30"}`}
                                                >
                                                    <div className="text-sm font-medium">{shape.name}</div>
                                                    <div className="text-xs text-muted-foreground">{shape.price}</div>
                                                    {form.diamondShape === shape.value && (
                                                        <div className="text-[10px] text-gold mt-1">✓ Selected</div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 2: Carat, Color, Clarity */}
                                {step === 2 && (
                                    <motion.div
                                        key="step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="font-display text-2xl gold-gradient">Select Carat, Color & Clarity</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Fine-tune brilliance, size, and purity
                                            </p>
                                            <div className="text-xs text-gold/70 mt-2">
                                                ✅ Selected: {diamondShapes.find(s => s.value === form.diamondShape)?.name} Cut
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Carat Weight</label>
                                            <div className="grid grid-cols-4 gap-2 mt-2">
                                                {caratOptions.map((carat) => (
                                                    <button
                                                        key={carat.value}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, carat: carat.value })}
                                                        className={`py-2 rounded-lg text-sm transition ${form.carat === carat.value ? "gold-bg-gradient text-black" : "glass hover:border-gold/30"}`}
                                                    >
                                                        {carat.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Color Grade</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                                {colorOptions.map((color) => (
                                                    <button
                                                        key={color.value}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, color: color.value })}
                                                        className={`p-2 rounded-lg text-sm transition ${form.color === color.value ? "gold-bg-gradient text-black" : "glass hover:border-gold/30"}`}
                                                    >
                                                        <div className="font-bold">{color.value}</div>
                                                        <div className="text-[10px]">{color.price}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Clarity Grade</label>
                                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
                                                {clarityOptions.map((clarity) => (
                                                    <button
                                                        key={clarity.value}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, clarity: clarity.value })}
                                                        className={`p-2 rounded-lg text-sm transition ${form.clarity === clarity.value ? "gold-bg-gradient text-black" : "glass hover:border-gold/30"}`}
                                                    >
                                                        <div className="font-bold">{clarity.value}</div>
                                                        <div className="text-[10px]">{clarity.price}</div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 3: Metal */}
                                {step === 3 && (
                                    <motion.div
                                        key="step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="font-display text-2xl gold-gradient">Select Metal</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Pick the perfect metal for your ring
                                            </p>
                                            <div className="text-xs text-gold/70 mt-2">
                                                ✅ Shape: {diamondShapes.find(s => s.value === form.diamondShape)?.name} Cut
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {metalOptions.map((metal) => (
                                                <button
                                                    key={metal.name}
                                                    type="button"
                                                    onClick={() => setForm({ ...form, metal: metal.name })}
                                                    className={`p-4 rounded-xl text-center transition ${form.metal === metal.name ? "glass-strong border-gold" : "glass border-transparent hover:border-gold/30"}`}
                                                >
                                                    <div className="w-8 h-8 rounded-full mx-auto" style={{ backgroundColor: metal.color }}></div>
                                                    <div className="text-sm font-medium mt-2">{metal.name}</div>
                                                    <div className="text-xs text-muted-foreground">{metal.price}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}

                                {/* Step 4: Ring Size + Contact Info */}
                                {step === 4 && (
                                    <motion.div
                                        key="step4"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="space-y-6"
                                    >
                                        <div>
                                            <h3 className="font-display text-2xl gold-gradient">Select Ring Size</h3>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                Ensure a flawless fit
                                            </p>
                                            <div className="text-xs text-gold/70 mt-2">
                                                ✅ Shape: {diamondShapes.find(s => s.value === form.diamondShape)?.name} Cut
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs uppercase tracking-widest text-muted-foreground">Ring Size (US)</label>
                                            <div className="grid grid-cols-5 gap-2 mt-2">
                                                {ringSizes.slice(0, 15).map((size) => (
                                                    <button
                                                        key={size.value}
                                                        type="button"
                                                        onClick={() => setForm({ ...form, ringSize: size.value })}
                                                        className={`py-2 rounded-lg text-sm transition ${form.ringSize === size.value ? "gold-bg-gradient text-black" : "glass hover:border-gold/30"}`}
                                                    >
                                                        {size.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gold/20">
                                            <h3 className="font-display text-xl gold-gradient mb-4">Your Information</h3>
                                            <div className="grid gap-4">
                                                <input
                                                    placeholder="Full name"
                                                    value={form.name}
                                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                                    className={inputClassName}
                                                    required
                                                />
                                                <input
                                                    type="email"
                                                    placeholder="Email address"
                                                    value={form.email}
                                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                                    className={inputClassName}
                                                    required
                                                />
                                                <input
                                                    placeholder="Phone number"
                                                    value={form.phone}
                                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                                    className={inputClassName}
                                                />
                                                <textarea
                                                    rows={3}
                                                    placeholder="Special requests or design preferences..."
                                                    value={form.brief}
                                                    onChange={(e) => setForm({ ...form, brief: e.target.value })}
                                                    className={inputClassName}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8 pt-6 border-t border-gold/20">
                                {step > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => setStep(step - 1)}
                                        className="px-6 py-2 rounded-full border border-gold/30 text-gold hover:bg-gold/10 transition"
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 4 && step !== 1 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="ml-auto px-6 py-2 rounded-full gold-bg-gradient text-black font-semibold flex items-center gap-2"
                                    >
                                        Continue <ChevronRight className="h-4 w-4" />
                                    </button>
                                ) : step === 4 ? (
                                    <button
                                        type="submit"
                                        className="ml-auto px-6 py-2 rounded-full gold-bg-gradient text-black font-semibold flex items-center gap-2"
                                    >
                                        <Sparkles className="h-4 w-4" /> Start Custom Ring
                                    </button>
                                ) : null}
                            </div>
                        </form>

                        <div className="mt-6 text-center text-xs text-muted-foreground">
                            Guided, simple, and fully customizable.
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}