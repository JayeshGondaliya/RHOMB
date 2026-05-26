import { useState } from "react";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";

const inputCls = "w-full rounded-md border border-yellow-400/30 bg-black/30 px-4 py-2.5 text-sm outline-none focus:border-yellow-400";

function Field({ label, children }) {
    return (
        <label className="block">
            <div className="mb-1.5 text-xs uppercase tracking-widest text-gray-400">
                {label}
            </div>
            {children}
        </label>
    );
}

export default function Sell() {
    const [files, setFiles] = useState([]);
    const [form, setForm] = useState({
        name: "",
        phone: "",
        metal: "Gold",
        weight: "",
        description: "",
    });

    const onUpload = (fs) => {
        if (!fs) return;

        const next = Array.from(fs)
            .slice(0, 5 - files.length)
            .map((f) => ({
                url: URL.createObjectURL(f),
                name: f.name,
            }));

        setFiles((prev) => [...prev, ...next]);
    };

    const submit = (e) => {
        e.preventDefault();

        if (!form.name || !form.phone) {
            return toast.error("Please fill name and phone.");
        }

        toast.success(
            "Request received. Our team will contact you within 24 hours."
        );

        setForm({
            name: "",
            phone: "",
            metal: "Gold",
            weight: "",
            description: "",
        });

        setFiles([]);
    };

    return (
        <div className="mx-auto max-w-5xl px-4 py-16 text-white">
            {/* HEADER */}
            <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.4em] text-yellow-400">
                    Trade-in
                </div>

                <h1 className="mt-2 text-4xl font-bold md:text-6xl">
                    Sell your{" "}
                    <span className="text-yellow-400">
                        jewellery
                    </span>
                </h1>

                <p className="mx-auto mt-3 max-w-xl text-sm text-gray-400">
                    Get the highest market value for your gold, silver,
                    diamond and platinum jewellery.
                </p>
            </div>

            {/* FORM */}
            <form
                onSubmit={submit}
                className="mt-10 grid gap-6 rounded-3xl border border-yellow-400/20 bg-white/5 p-8 backdrop-blur-lg md:p-10"
            >
                <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Full name">
                        <input
                            value={form.name}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    name: e.target.value,
                                })
                            }
                            className={inputCls}
                            required
                        />
                    </Field>

                    <Field label="Phone">
                        <input
                            value={form.phone}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    phone: e.target.value,
                                })
                            }
                            className={inputCls}
                            required
                        />
                    </Field>

                    <Field label="Metal type">
                        <select
                            value={form.metal}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    metal: e.target.value,
                                })
                            }
                            className={inputCls}
                        >
                            {["Gold", "Silver", "Diamond", "Platinum"].map((m) => (
                                <option key={m}>{m}</option>
                            ))}
                        </select>
                    </Field>

                    <Field label="Approx weight (grams)">
                        <input
                            type="number"
                            value={form.weight}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    weight: e.target.value,
                                })
                            }
                            className={inputCls}
                        />
                    </Field>
                </div>

                {/* DESCRIPTION */}
                <Field label="Description">
                    <textarea
                        rows={4}
                        value={form.description}
                        onChange={(e) =>
                            setForm({
                                ...form,
                                description: e.target.value,
                            })
                        }
                        className={inputCls}
                        placeholder="Tell us about your jewellery..."
                    />
                </Field>

                {/* IMAGE UPLOAD */}
                <div>
                    <div className="text-xs uppercase tracking-widest text-gray-400">
                        Photos (up to 5)
                    </div>

                    <label className="mt-2 flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-yellow-400/40 bg-black/20 px-6 py-10 text-sm text-gray-400 transition hover:border-yellow-400 hover:bg-yellow-400/5">
                        <Upload className="h-5 w-5 text-yellow-400" />
                        Click to upload images
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={(e) => onUpload(e.target.files)}
                        />
                    </label>

                    {/* PREVIEW */}
                    {files.length > 0 && (
                        <div className="mt-4 grid grid-cols-5 gap-2">
                            {files.map((f, i) => (
                                <div
                                    key={i}
                                    className="relative aspect-square overflow-hidden rounded-md border border-yellow-400/30"
                                >
                                    <img
                                        src={f.url}
                                        className="h-full w-full object-cover"
                                        alt={f.name}
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFiles(files.filter((_, x) => x !== i))
                                        }
                                        className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-black/70 text-white"
                                    >
                                        <X className="h-3 w-3" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* BUTTON */}
                <button className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:scale-105">
                    Request Valuation
                </button>
            </form>
        </div>
    );
}