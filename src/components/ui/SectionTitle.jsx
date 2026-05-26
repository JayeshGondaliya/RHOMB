import { motion } from "framer-motion";
export function SectionTitle({ eyebrow, title, subtitle, center = true }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}
        >
            {eyebrow && (
                <div className="mb-3 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.4em] text-gold">
                    <span className="h-px w-8 bg-gold/60" />
                    {eyebrow}
                    <span className="h-px w-8 bg-gold/60" />
                </div>
            )}
            <h2 className="font-display text-3xl md:text-5xl leading-tight">{title}</h2>
            {subtitle && <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{subtitle}</p>}
        </motion.div>
    );
}
