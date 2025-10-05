import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";

export const Footer = () => {
    return (
        <section className="py-24 sm:py-32 relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10" />

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                        Ready to Turn Your Idea Into Reality?
                    </h2>
                    <p className="text-lg sm:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
                        Join the growing community of Tunisian entrepreneurs launching their dreams with AI-powered guidance.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Button
                            size="lg"
                            className="group text-base sm:text-lg px-8 py-6 bg-primary hover:shadow-glow transition-all duration-300"
                        >
                            Start Your Journey
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="text-base sm:text-lg px-8 py-6 bg-secondary"
                        >
                            <MessageSquare className="mr-2 w-5 h-5" />
                            Talk to an AI Agent
                        </Button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-12 text-sm text-muted-foreground"
                    >
                        <p>No credit card required • Free to get started • Built for Tunisia</p>
                    </motion.div>
                </motion.div>
            </div>

            {/* Footer */}
            <footer className="mt-24 border-t border-border pt-8">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                        <p>© 2025. Empowering Tunisian entrepreneurs.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
                            <a href="#" className="hover:text-primary transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </section>
    );
};
