import { motion } from "framer-motion";
import { Scale, TrendingUp, DollarSign, Users } from "lucide-react";
import { AgentCard } from "@/components/ui/agentCard";

const agents = [
    {
        icon: Scale,
        title: "Legal Procedures",
        description: "Navigate Tunisian business law, company registration, and compliance requirements with ease. Get instant answers to legal questions.",
        color: "hsl(187, 85%, 43%)",
    },
    {
        icon: TrendingUp,
        title: "Ecosystem Analyzer",
        description: "Analyze market trends, identify opportunities, and understand your competition. Data-driven insights for Tunisian markets.",
        color: "hsl(18, 95%, 62%)",
    },
    {
        icon: DollarSign,
        title: "Financial Guidance",
        description: "Discover funding opportunities, prepare pitch decks, and connect with investors interested in Tunisian startups.",
        color: "hsl(142, 71%, 45%)",
    },
    {
        icon: Users,
        title: "Virtual Critique",
        description: "Get personalized guidance from AI trained on insights from successful Tunisian entrepreneurs and business experts.",
        color: "hsl(262, 83%, 58%)",
    },
];

export const MeetTheAgents = () => {
    return (
        <section className="py-24 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Meet Your AI Agents</h2>
                    <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                        Specialized AI assistants ready to help you at every stage of your entrepreneurial journey
                    </p>
                </motion.div>

                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {agents.map((agent, index) => (
                        <AgentCard key={index} {...agent} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
