import type {LucideIcon} from "lucide-react";
import { Card } from "@/components/ui/card";

interface PersonaCardProps {
    icon: LucideIcon;
    title: string;
    message: string;
    delay: number;
}

export const PersonaCard = ({ icon: Icon, title, message, delay }: PersonaCardProps) => {
    return (
        <Card
            className="p-6 border-border bg-card backdrop-blur-sm animate-fade-in-up hover:border-primary/50 transition-all duration-300"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                    <Icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{message}</p>
                </div>
            </div>
        </Card>
    );
};
