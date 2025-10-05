import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChevronRight, CheckCircle2 } from "lucide-react";

interface TestFormData {
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    step6: string;
}

export const LegalIntakeForm = () => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState<TestFormData>({
        step1: "",
        step2: "",
        step3: "",
        step4: "",
        step5: "",
        step6: "",
    });
    const [currentInput, setCurrentInput] = useState("");
    const [error, setError] = useState("");
    const [isComplete, setIsComplete] = useState(false);

    const totalSteps = 6;

    const validateAndProceed = () => {
        setError("");

        const val = currentInput.trim();
        if (val !== "Expensia") {
            return setError("This name is already taken.");
        }

        const updated = { ...formData };
        switch (step) {
            case 0: updated.step1 = val; break;
            case 1: updated.step2 = val; break;
            case 2: updated.step3 = val; break;
            case 3: updated.step4 = val; break;
            case 4: updated.step5 = val; break;
            case 5: updated.step6 = val; break;
        }

        setFormData(updated);
        setCurrentInput("");

        if (step === totalSteps - 1) {
            setIsComplete(true);
        } else {
            setStep((s) => s + 1);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            validateAndProceed();
        }
    };

    if (isComplete) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center p-4">
                <Card className="w-full max-w-3xl p-8 bg-card border-border shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                        <h2 className="text-2xl font-bold text-foreground">Form Complete</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {Object.entries(formData).map(([k, v]) => (
                            <div key={k}>
                                <h3 className="font-semibold text-lg text-foreground">{k}</h3>
                                <p className="text-muted-foreground">{v}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                <div className="mb-8">
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-bluue"
                            style={{ width: `${((step + 1) / totalSteps) * 100}%` }}
                        />
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                        Question {step + 1} of {totalSteps}
                    </p>
                </div>

                <Card className="p-8 bg-card border-border shadow-lg">
                    <div className="space-y-6">
                        <h2 className="text-3xl font-bold text-foreground mb-8">
                            Step {step + 1}: Reserve your company's name
                        </h2>

                        <Input
                            value={currentInput}
                            onChange={(e) => setCurrentInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your answer..."
                            className="text-lg bg-background border-input text-foreground h-14"
                            autoFocus
                        />

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
