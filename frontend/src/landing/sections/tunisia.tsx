import { motion } from "framer-motion";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
const data = [
    { year: 2021, ecosystemValue: 79 },  // approx US$79M
    { year: 2022, ecosystemValue: 98 },  // approx US$98M
    { year: 2023, ecosystemValue: 241 }, // US$241M
    { year: 2024, ecosystemValue: 113 }, // forecast US$113M
    { year: 2025, ecosystemValue: 140 }, // rough projection for plotting
];

export const TunisiaSection = () => {
    return (
        <section className="py-20 px-4 sm:px-6 bg-muted/30">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="grid md:grid-cols-2 gap-12 items-center"
                >
                    {/* Text Content */}
                    <div className="space-y-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="text-3xl sm:text-4xl md:text-5xl font-bold"
                        >
                            Tunisia is a country of{" "}
                            <span className="bg-bluue bg-clip-text text-transparent">
                ideas
              </span>
                            .
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="space-y-4 text-muted-foreground text-lg"
                        >
                            <p>
                                Every year, thousands dream of launching a business. Yet, many give up due to
                                confusing laws, rising inflation, and lack of financial guidance.
                            </p>
                            <p>
                                That's why we built <span className="text-primary font-semibold">AI Startup Hub</span> —
                                to simplify the startup journey for future entrepreneurs.
                            </p>
                        </motion.div>
                    </div>

                    {/* Chart */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h3 className="text-xl font-semibold mb-6 text-center">
                            Tunisia Startup Ecosystem Growth (2021‑2025)
                        </h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="year" />
                            <YAxis label={{ value: 'Ecosystem Value (US$M)', angle: -90, position: 'insideLeft',dy:80}} className="text-bluue"/>
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="ecosystemValue" stroke="#2089df" activeDot={{ r: 8 }} />
                        </LineChart>
                        </ResponsiveContainer>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};
