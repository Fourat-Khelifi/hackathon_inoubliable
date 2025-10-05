import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface FormData {
    startup_name: string;
    budget: number | null;
    budget_currency: string;
    industry: string;
    idea_description: string;
    idea_word_count: number;
    desired_location: string;
    have_team: boolean | null;
    team_size: number | null;
    funding_intentions: string;
}

const INDUSTRIES = [
    "Tech/Software",
    "Fintech",
    "E-commerce",
    "Health/MedTech",
    "EdTech",
    "Agritech",
    "Tourism/Hospitality",
    "Manufacturing",
    "Services",
    "Energy/CleanTech",
    "Food & Beverage",
    "Logistics",
    "Media/Content",
];

const LOCATIONS = [
    "Tunis",
    "Sousse",
    "Monastir",
    "Sfax",
    "Bizerte",
    "Nabeul",
    "Gabes",
    "Ariana",
    "Kairouan",
];

export const StartupIntakeForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<FormData>(() => {
        if (typeof window === "undefined") return {
            startup_name: "",
            budget: null,
            budget_currency: "TND",
            industry: "",
            idea_description: "",
            idea_word_count: 0,
            desired_location: "",
            have_team: null,
            team_size: null,
            funding_intentions: "",
        };
        const saved = localStorage.getItem("startup");
        return saved
            ? JSON.parse(saved)
            : {
                startup_name: "",
                budget: null,
                budget_currency: "TND",
                industry: "",
                idea_description: "",
                idea_word_count: 0,
                desired_location: "",
                have_team: null,
                team_size: null,
                funding_intentions: "",
            };
    });
    const [currentInput, setCurrentInput] = useState("");
    const [error, setError] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    const totalSteps = 8;

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("startup", JSON.stringify(formData));
        }
    }, [formData]);

    const countWords = (text: string): number =>
        text.trim().split(/\s+/).filter((w) => w.length > 0).length;

    const validateAndProceed = () => {
        setError("");

        const val = currentInput.trim();
        let updated = { ...formData };

        switch (step) {
            case 0:
                if (!val) return setError("Startup name is required.");
                updated.startup_name = val;
                break;

            case 1: {
                const b = parseFloat(val);
                if (isNaN(b) || b <= 0)
                    return setError("Budget must be a number greater than 0.");
                updated.budget = b;
                break;
            }

            case 2:
                if (!val) return setError("Please select an industry.");
                updated.industry = val;
                break;

            case 3: {
                if (!val) return setError("Description is required.");
                const wc = countWords(val);
                if (wc > 100)
                    return setError(`Your description has ${wc} words. Limit to 100.`);
                updated.idea_description = val;
                updated.idea_word_count = wc;
                break;
            }

            case 4:
                if (!val) return setError("Please select a location.");
                updated.desired_location = val;
                break;

            case 5: {
                const resp = val.toLowerCase();
                if (resp !== "yes" && resp !== "no")
                    return setError("Please answer 'yes' or 'no'.");
                updated.have_team = resp === "yes";
                if (resp === "no") {
                    updated.team_size = null;
                    setFormData(updated);
                    setCurrentInput("");
                    return setStep(7);
                }
                break;
            }

            case 6: {
                const t = parseInt(val);
                if (isNaN(t) || t < 1)
                    return setError("Team size must be an integer >= 1.");
                updated.team_size = t;
                break;
            }

            case 7: {
                const f = val.toLowerCase();
                if (f !== "bootstrap" && f !== "external")
                    return setError("Please choose 'bootstrap' or 'external'.");
                updated.funding_intentions = f;
                setFormData(updated);
                setIsComplete(true);
                return;
            }
        }

        setFormData(updated);
        setCurrentInput("");
        setStep((s) => s + 1);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            validateAndProceed();
        }
    };

    const renderQuestion = () => {
        switch (step) {
            case 0:
                return { question: "Startup name", type: "input" };
            case 1:
                return { question: "Budget (number, TND)", type: "input" };
            case 2:
                return { question: "Industry", type: "select", options: INDUSTRIES };
            case 3:
                return { question: "Idea description (max 100 words)", type: "textarea" };
            case 4:
                return { question: "Desired location", type: "select", options: LOCATIONS };
            case 5:
                return { question: "Do you have a team? (yes or no)", type: "input" };
            case 6:
                return { question: "Team size", type: "input" };
            case 7:
                return { question: "Funding intentions", type: "select", options: ["bootstrap", "external"] };
            default:
                return { question: "", type: "input" };
        }
    };

    if (isComplete)
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-3xl p-8 bg-card border-border shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground">Form Complete</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Startup Name</h3>
                            <p className="text-muted-foreground">{formData.startup_name}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Budget</h3>
                            <p className="text-muted-foreground">
                                {formData.budget} {formData.budget_currency}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Industry</h3>
                            <p className="text-muted-foreground">{formData.industry}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Idea Description</h3>
                            <p className="text-muted-foreground">{formData.idea_description}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Desired Location</h3>
                            <p className="text-muted-foreground">{formData.desired_location}</p>
                        </div>

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Have Team</h3>
                            <p className="text-muted-foreground">{formData.have_team ? "Yes" : "No"}</p>
                        </div>

                        {formData.have_team && (
                            <div>
                                <h3 className="font-semibold text-lg text-foreground">Team Size</h3>
                                <p className="text-muted-foreground">{formData.team_size}</p>
                            </div>
                        )}

                        <div>
                            <h3 className="font-semibold text-lg text-foreground">Funding Intentions</h3>
                            <p className="text-muted-foreground">{formData.funding_intentions}</p>
                        </div>
                    </div>
                </Card>
            </div>
        );


    const q = renderQuestion();
    const progress = ((step + 1) / totalSteps) * 100;

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-bluue"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Question {step + 1} of {totalSteps}
                    </p>
                </div>

                <Card className="p-8 bg-card border-border shadow-lg">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-foreground mb-8">
                            {q.question}
                        </h2>

                        {q.type === "select" && q.options ? (
                            <Select value={currentInput} onValueChange={setCurrentInput}>
                                <SelectTrigger className="text-lg bg-background border-input text-foreground h-14">
                                    <SelectValue placeholder="Select an option..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {q.options.map((opt, i) => (
                                        <SelectItem key={i} value={opt} className="text-lg">
                                            {opt}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        ) : q.type === "textarea" ? (
                            <Textarea
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your answer..."
                                className="min-h-[120px] text-lg bg-background border-input text-foreground resize-none"
                                autoFocus
                            />
                        ) : (
                            <Input
                                value={currentInput}
                                onChange={(e) => setCurrentInput(e.target.value)}
                                onKeyDown={handleKeyPress}
                                placeholder="Type your answer..."
                                className="text-lg bg-background border-input text-foreground h-14"
                                autoFocus
                            />
                        )}

                        {error && (
                            <p className="text-destructive text-sm">{error}</p>
                        )}

                        <Button
                            onClick={validateAndProceed}
                            className="w-full h-12 text-lg font-semibold bg-bluue hover:bg-bluue/90"
                        >
                            Continue
                            <ChevronRight className="ml-2 w-5 h-5" />
                        </Button>

                        <p className="text-xs text-muted-foreground text-center">
                            Press Enter to continue
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
