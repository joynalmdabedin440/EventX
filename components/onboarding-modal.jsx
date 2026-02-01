"use client"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useMemo, useState } from "react";
import { Progress } from "./ui/progress"
import { ArrowRight, Heart, MapPin } from "lucide-react"
import { CATEGORIES } from "@/lib/data"
import { Badge } from "./ui/badge"
import { useConvexMutation } from "@/hooks/use-convex-query"
import { api } from "@/convex/_generated/api"
import { State } from "country-state-city"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export function OnboardingModal({ isOpen, onClose, onComplete }) {

    const [step, setStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [location, setLocation] = useState({
        city: '',
        state: '',
        country: ''
    });
    // Get Indian states
    const indianStates = useMemo(() => {
        return State.getStatesOfCountry("IN");
    }, []);

    // Get cities based on selected state
    const cities = useMemo(() => {
        if (!location.state) return [];
        const selectedState = indianStates.find((s) => s.name === location.state);
        if (!selectedState) return [];
        return City.getCitiesOfState("IN", selectedState.isoCode);
    }, [location.state, indianStates]);




    const progress = (step / 2) * 100;

    const toggleInterest = (categoryId) => {
        setSelectedInterests((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const { mutate: completeOnboarding, isLoading } = useConvexMutation(
        api.users.completeOnboarding
    )

    const handleNext = () => {
        if (step === 1 && selectedInterests.length < 3) {
            toast.error("Please select at least 3 interests");
            return;
        }
        if (step === 2 && (!location.city || !location.state)) {
            toast.error("Please select both state and city");
            return;
        }
        if (step < 2) {
            setStep(step + 1);
        } else {
            handleComplete();
        }
    };
    const handleComplete = async () => {
        try {
            await completeOnboarding({
                location: {
                    city: location.city,
                    state: location.state,
                    country: location.country,
                },
                interests: selectedInterests,
            });
            toast.success("Welcome to Spott! 🎉");
            onComplete();
        } catch (error) {
            toast.error("Failed to complete onboarding");
            console.error(error);
        }
    };


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>

            <DialogContent className="sm:max-w-2xl bg-black/70 backdrop-blur-lg border border-white/10">
                <DialogHeader>
                    <div className="mb-4  ">
                        <Progress value={progress} ></Progress>
                    </div>
                    <DialogTitle className="flex items-center gap-2 text-2xl">
                        {
                            step === 1 ? (<>
                                <Heart className="w-6 h-6 text-purple-500" />
                                What interests you have?


                            </>) : (
                                <>
                                    <MapPin className="w-6 h-6 text-purple-500" />
                                    Where are you located?
                                </>
                            )
                        }
                    </DialogTitle>
                    <DialogDescription>
                        {step === 1
                            ? "Select at least 3 categories to personalize your experience"
                            : "We'll show you events happening near you"}
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    {
                        step === 1 && (
                            <div className="space-y-6">
                                <div className=" grid gap-3 grid-cols-2 sm:grid-cols-3 max-h-[400px] overflow-y-auto p-2">
                                    {
                                        CATEGORIES.map((category) => (
                                            <button key={category.id} onClick={() => toggleInterest(category.id)} className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${selectedInterests.includes(category.id)
                                                ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                                                : "border-border hover:border-purple-300"
                                                }`} >
                                                <div className="text-2xl mb-2">{category.icon}</div>
                                                <div className="text-sm font-medium">{category.label}</div>

                                            </button>
                                        ))
                                    }

                                </div>

                                {/* add badge for total selected interests */}
                                <div className="flex items-center gap-2">
                                    <Badge
                                        variant={
                                            selectedInterests.length >= 3 ? "default" : "secondary"
                                        }
                                    >
                                        {selectedInterests.length} selected
                                    </Badge>
                                    {selectedInterests.length >= 3 && (
                                        <span className="text-sm text-green-500">
                                            ✓ Ready to continue
                                        </span>
                                    )}
                                </div>

                            </div>
                        )
                    }

                </div>

                {/* Step 2: Location */}
                {step === 2 && (
                    <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="state">State</Label>
                                <Select
                                    value={location.state}
                                    onValueChange={(value) => {
                                        setLocation({ ...location, state: value, city: "" });
                                    }}
                                >
                                    <SelectTrigger id="state" className="h-11 w-full">
                                        <SelectValue placeholder="Select state" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {indianStates.map((state) => (
                                            <SelectItem key={state.isoCode} value={state.name}>
                                                {state.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>)


                }

                <DialogFooter className={"flex gap-3"}>
                    <Button className="flex-1 gap-2" disabled={isLoading} onClick={handleNext}
                    >
                        {
                            isLoading ? "Completing..." : step === 2 ? "Complete Setup" : "Continue"
                        }
                        <ArrowRight className="w-4 h-4" />
                    </Button>

                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
