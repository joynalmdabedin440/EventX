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
import { useState } from "react";
import { Progress } from "./ui/progress"
import { Heart, MapPin } from "lucide-react"
import { CATEGORIES } from "@/lib/data"
import { Badge } from "./ui/badge"

export function OnboardingModal({ isOpen, onClose, onComplete }) {

    const [step, setStep] = useState(1);
    const [selectedInterests, setSelectedInterests] = useState([]);
    const [location, setLocation] = useState({
        city: '',
        state: '',
        country: ''
    });

    const progress = (step / 2) * 100;

    const toggleInterest = (categoryId) => {
        setSelectedInterests((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
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

                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>

        </Dialog>
    )
}
