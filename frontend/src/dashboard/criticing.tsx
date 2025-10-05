import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { PersonaCard } from "@/dashboard/critic";
import { Lightbulb, TrendingUp, Target, Loader2 } from "lucide-react";

interface ApiResponse {
    message1: string;
    message2: string;
    message3: string;
}

const Critic = () => {
    const [idea, setIdea] = useState("");
    const [loading, setLoading] = useState(false);
    const [responses, setResponses] = useState<ApiResponse | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!idea.trim()) {
            return;
        }

        setLoading(true);

        try {
            // Replace this URL with your actual API endpoint
            const response = await fetch("https://lyndon-nonqualitative-duncan.ngrok-free.dev/criticize", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ idea }),
            });

            if (!response.ok) {
                throw new Error("Failed to get feedback");
            }

            const data: ApiResponse = await response.json();
            setResponses(data);

        } catch (error) {
            console.error("API Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16 md:py-24">
                <div className="max-w-4xl mx-auto text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-bluue bg-clip-text text-transparent">
                        Validate Your Startup Idea
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8">
                        Get instant feedback from three expert personas on your next big idea
                    </p>
                </div>

                {/* Input Form */}
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-16 animate-fade-in-up">
                    <div className="flex gap-3">
                        <Input
                            type="text"
                            placeholder="Describe your startup idea..."
                            value={idea}
                            onChange={(e) => setIdea(e.target.value)}
                            className="flex-1 h-14 px-6 text-lg border-border bg-card/50 backdrop-blur-sm focus:border-primary transition-colors"
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="h-14 px-8 bg-bluue hover:opacity-90 transition-opacity font-semibold"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Validating
                                </>
                            ) : (
                                "Validate"
                            )}
                        </Button>
                    </div>
                </form>

                {/* Feedback Cards */}
                {responses && (
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
                        <PersonaCard
                            icon={Lightbulb}
                            title="Persona 1"
                            message={responses.message1}
                            delay={0}
                        />
                        <PersonaCard
                            icon={TrendingUp}
                            title="Persona 2"
                            message={responses.message2}
                            delay={100}
                        />
                        <PersonaCard
                            icon={Target}
                            title="Persona 3"
                            message={responses.message3}
                            delay={200}
                        />
                    </div>
                )}

                {/* Placeholder when no responses */}
                {!responses && !loading && (
                    <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 opacity-50">
                        <Card className="p-6 border-dashed border-border bg-card/30">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-muted">
                                    <Lightbulb className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2 text-foreground">The Innovator</h3>
                                    <p className="text-muted-foreground">Waiting for your idea...</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-dashed border-border bg-card/30">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-muted">
                                    <TrendingUp className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2 text-foreground">The Market Analyst</h3>
                                    <p className="text-muted-foreground">Waiting for your idea...</p>
                                </div>
                            </div>
                        </Card>
                        <Card className="p-6 border-dashed border-border bg-card/30">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-lg bg-muted">
                                    <Target className="w-6 h-6 text-muted-foreground" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-lg mb-2 text-foreground">The Strategist</h3>
                                    <p className="text-muted-foreground">Waiting for your idea...</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Critic;
