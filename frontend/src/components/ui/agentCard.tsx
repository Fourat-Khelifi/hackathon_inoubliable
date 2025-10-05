import { motion } from "framer-motion";
import type {LucideIcon} from "lucide-react";

interface AgentCardProps {
    icon: LucideIcon;
    title: string;
    description: string;
    color: string;
    index: number;
}

export const AgentCard = ({ icon: Icon, title, description, color, index }: AgentCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
        >
            <div className="relative flex items-start gap-6 p-6 rounded-2xl border-2 border-border bg-card hover:border-primary/20 transition-all duration-300 overflow-hidden">
                <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                    style={{
                        background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                    }}
                >
                    <Icon className="w-8 h-8" style={{ color }} />
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">
                        {description}
                    </p>
                </div>

                {/* Hover effect gradient */}
                <div
                    className="absolute -inset-4 -z-10 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500"
                    style={{
                        background: `radial-gradient(circle at left, ${color}20, transparent 70%)`,
                    }}
                />
            </div>
        </motion.div>
    );
};
