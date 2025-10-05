import { Button } from "@/components/ui/button";
import Prism from "@/components/ui/prism";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

function Header() {
    const [showPrism, setShowPrism] = useState(true);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const handleScroll = () => {
                // Example condition: hide Prism if user scrolled beyond 100px
                setShowPrism(window.scrollY < 742);
            };
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, []);

    return (
        <div className="bg-black h-[600px] min-h-screen relative">
            {showPrism ? (
                <Prism
                    animationType="rotate"
                    timeScale={0.5}
                    height={3.5}
                    baseWidth={4}
                    scale={3.6}
                    hueShift={0}
                    colorFrequency={1}
                    noise={0}
                    glow={1}
                />
            ) : (
                <div className="w-full h-full" />
            )}

            <div className="flex flex-col items-center text-center px-4 absolute inset-0 w-full h-full z-10">
                <div className="flex flex-row justify-between w-full text-white px-16 py-8">
                    <img src="src/assets/logo.png" className="w-24 h-24 invert absolute top-[-14px] left-10 " />
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href="/dashboard">Dashboard</a>
                </div>

                <div className="flex flex-col items-center justify-center w-full h-full z-10">
                    <div className="container mx-auto px-4 sm:px-6 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-white/20 mb-8"
                            >
                                <Sparkles className="w-4 h-4 text-primary" />
                                <span className="text-sm font-medium text-white">
                                    AI-Powered Platform for Tunisian Entrepreneurs
                                </span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white"
                            >
                                From Idea to Launch
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="text-lg sm:text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto"
                            >
                                We guide Tunisian entrepreneurs from idea to launch legal setup, market insights, and funding support all in one place.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            >
                                <Button size="lg" className="group text-base sm:text-lg px-8 py-6">
                                    Start Your Journey
                                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="text-base sm:text-lg px-8 py-6 hover:bg-secondary transition-all duration-300"
                                >
                                    Learn More
                                </Button>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="mt-16 flex flex-wrap justify-center gap-8 text-sm text-muted-foreground"
                            >
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-2 h-2 rounded-full bg-primary animate-glow " />
                                    <span className="text-black">Legal Setup</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <div
                                        className="w-2 h-2 rounded-full bg-primary animate-glow"
                                        style={{ animationDelay: "0.5s" }}
                                    />
                                    <span className="text-black">Market Insights</span>
                                </div>
                                <div className="flex items-center gap-2 text-white">
                                    <div
                                        className="w-2 h-2 rounded-full bg-primary animate-glow"
                                        style={{ animationDelay: "1s" }}
                                    />
                                    <span className="text-black">Funding Support</span>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
