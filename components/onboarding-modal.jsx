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

export function OnboardingModal() {

    const [step, setStep] = useState(1);

    const progress = (step / 2) * 100;

    return (
        <Dialog>
            <form>
                <DialogTrigger asChild>
                    <Button >Open Dialog</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <div className="mb-4">
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
                            Make changes to your profile here. Click save when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Name</Label>
                            <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="username-1">Username</Label>
                            <Input id="username-1" name="username" defaultValue="@peduarte" />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}
