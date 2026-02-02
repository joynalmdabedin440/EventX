"use client";

import { api } from '@/convex/_generated/api';
import { useConvexMutation, useConvexQuery } from '@/hooks/use-convex-query';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from 'date-fns';
import { City, State } from 'country-state-city';
import UpgradeModal from '@/components/upgrade-modal';
import Image from 'next/image';
import UnsplashImagePicker from '@/components/unsplash-image-picker';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CATEGORIES } from '@/lib/data';


// HH:MM in 24h
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

const eventSchema = z.object({
    title: z.string().min(5, "Title must be at least 5 characters"),
    description: z.string().min(20, "Description must be at least 20 characters"),
    category: z.string().min(1, "Please select a category"),
    startDate: z.date({ required_error: "Start date is required" }),
    endDate: z.date({ required_error: "End date is required" }),
    startTime: z.string().regex(timeRegex, "Start time must be HH:MM"),
    endTime: z.string().regex(timeRegex, "End time must be HH:MM"),
    locationType: z.enum(["physical", "online"]).default("physical"),
    venue: z.string().url("Must be a valid URL").optional().or(z.literal("")),
    address: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().optional(),
    capacity: z.number().min(1, "Capacity must be at least 1"),
    ticketType: z.enum(["free", "paid"]).default("free"),
    ticketPrice: z.number().optional(),
    coverImage: z.string().optional(),
    themeColor: z.string().default("#1e3a8a"),
});


const CreateEventPage = () => {

    const router = useRouter();
    const [showImagePicker, setShowImagePicker] = useState(false);
    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [upgradeReason, setUpgradeReason] = useState("limit"); // "limit" or "color"

    // Check if user has Pro plan
    const { has } = useAuth();
    const hasPro = has?.({ plan: "pro" });

    const { data: currentUser } = useConvexQuery(api.users.getCurrentUser);
    const { mutate: createEvent, isLoading } = useConvexMutation(
        api.events.createEvent
    );

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        control,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            locationType: "physical",
            ticketType: "free",
            capacity: 50,
            themeColor: "#1e3a8a",
            category: "",
            state: "",
            city: "",
            startTime: "",
            endTime: "",
        },
    });

    const themeColor = watch("themeColor");
    const ticketType = watch("ticketType");
    const selectedState = watch("state");
    const startDate = watch("startDate");
    const endDate = watch("endDate");
    const coverImage = watch("coverImage");

    const indianStates = useMemo(() => State.getStatesOfCountry("IN"), []);

    const cities = useMemo(() => {
        if (!selectedState) return [];
        const st = indianStates.find((s) => s.name === selectedState);
        if (!st) return [];
        return City.getCitiesOfState("IN", st.isoCode);
    }, [selectedState, indianStates]);

    // Color presets - show all for Pro, only default for Free
    const colorPresets = [
        "#1e3a8a", // Default color (always available)
        ...(hasPro ? ["#4c1d95", "#065f46", "#92400e", "#7f1d1d", "#831843"] : []),
    ];

    const handleColorClick = (color) => {
        // If not default color and user doesn't have Pro
        if (color !== "#1e3a8a" && !hasPro) {
            setUpgradeReason("color");
            setShowUpgradeModal(true);
            return;
        }
        setValue("themeColor", color);
    };

    const combineDateTime = (date, time) => {
        if (!date || !time) return null;
        const [hh, mm] = time.split(":").map(Number);
        const d = new Date(date);
        d.setHours(hh, mm, 0, 0);
        return d;
    };

    const onSubmit = async (data) => { }




    return (
        <div className="min-h-screen transition-colors duration-300 px-6 py-8 -mt-6 md:-mt-16 lg:-mt-5 lg:rounded-md" style={{ backgroundColor: themeColor }} >

            {/* Header */}
            <div className="max-w-6xl mx-auto flex flex-col gap-5 md:flex-row justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-bold">Create Event</h1>
                    {!hasPro && (
                        <p className="text-sm text-muted-foreground mt-2">
                            Free: {currentUser?.freeEventsCreated || 0}/1 events created
                        </p>
                    )}
                </div>
                {/* <AIEventCreator onEventGenerated={handleAIGenerate} /> */}
            </div>

            <div className="max-w-6xl mx-auto grid md:grid-cols-[320px_1fr] gap-10">
                {/* left image and theme */}
                <div className="space-y-6">
                    <div
                        className="aspect-square w-full rounded-xl overflow-hidden flex items-center justify-center cursor-pointer border"
                        onClick={() => setShowImagePicker(true)}
                    >
                        {coverImage ? (
                            <Image
                                src={coverImage}
                                alt="Cover"
                                className="w-full h-full object-cover"
                                width={500} // Adjust width as needed
                                height={500} // Adjust height as needed
                                priority // Optional: prioritize loading this image
                            />
                        ) : (
                            <span className="opacity-60 text-sm">
                                Click to add cover image
                            </span>
                        )}
                    </div>

                    {/* color picker for pro user */}

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label className="text-sm">Theme Color</Label>
                            {!hasPro && (
                                <Badge variant="secondary" className="text-xs gap-1">
                                    <Sparkles className="w-3 h-3" />
                                    Pro
                                </Badge>
                            )}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {colorPresets.map((color) => (
                                <button
                                    key={color}
                                    type="button"
                                    className={`w-10 h-10 rounded-full border-2 transition-all ${!hasPro && color !== "#1e3a8a"
                                        ? "opacity-40 cursor-not-allowed"
                                        : "hover:scale-110"
                                        }`}
                                    style={{
                                        backgroundColor: color,
                                        borderColor: themeColor === color ? "white" : "transparent",
                                    }}
                                    onClick={() => handleColorClick(color)}
                                    title={
                                        !hasPro && color !== "#1e3a8a"
                                            ? "Upgrade to Pro for custom colors"
                                            : ""
                                    }
                                />
                            ))}
                            {!hasPro && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUpgradeReason("color");
                                        setShowUpgradeModal(true);
                                    }}
                                    className="w-10 h-10 rounded-full border-2 border-dashed border-purple-300 flex items-center justify-center hover:border-purple-500 transition-colors"
                                    title="Unlock more colors with Pro"
                                >
                                    <Sparkles className="w-5 h-5 text-purple-400" />
                                </button>
                            )}
                        </div>
                        {!hasPro && (
                            <p className="text-xs text-muted-foreground">
                                Upgrade to Pro to unlock custom theme colors
                            </p>
                        )}
                    </div>
                </div>

                {/* right form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                    {/* Title */}
                    <div>
                        <Input
                            {...register("title")}
                            placeholder="Event Name"
                            className="text-3xl font-semibold bg-transparent border focus-visible:ring-0"
                        />
                        {errors.title && (
                            <p className="text-sm text-red-400 mt-1">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Date + Time */}
                    <div className="grid grid-cols-2 gap-6">
                        {/* Start */}
                        <div className="space-y-2">
                            <Label className="text-sm">Start</Label>
                            <div className="grid grid-cols-[1fr_auto] gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button

                                            className="w-full justify-between bg-transparent border border-input hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {startDate ? format(startDate, "PPP") : "Pick date"}
                                            <CalendarIcon className="w-4 h-4 opacity-60" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={(date) => setValue("startDate", date)}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    type="time"
                                    {...register("startTime")}
                                    placeholder="hh:mm"
                                />
                            </div>
                            {(errors.startDate || errors.startTime) && (
                                <p className="text-sm text-red-400">
                                    {errors.startDate?.message || errors.startTime?.message}
                                </p>
                            )}
                        </div>

                        {/* End */}
                        <div className="space-y-2">
                            <Label className="text-sm">End</Label>
                            <div className="grid grid-cols-[1fr_auto] gap-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button

                                            className="w-full justify-between bg-transparent border border-input hover:bg-accent hover:text-accent-foreground"
                                        >
                                            {endDate ? format(endDate, "PPP") : "Pick date"}
                                            <CalendarIcon className="w-4 h-4 opacity-60" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={(date) => setValue("endDate", date)}
                                            disabled={(date) => date < (startDate || new Date())}
                                        />
                                    </PopoverContent>
                                </Popover>
                                <Input
                                    type="time"
                                    {...register("endTime")}
                                    placeholder="hh:mm"
                                />
                            </div>
                            {(errors.endDate || errors.endTime) && (
                                <p className="text-sm text-red-400">
                                    {errors.endDate?.message || errors.endTime?.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <Label className="text-sm">Category</Label>
                        <Controller
                            control={control}
                            name="category"
                            render={({ field }) => (
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id}>
                                                {cat.icon} {cat.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            )}
                        />
                        {errors.category && (
                            <p className="text-sm text-red-400">{errors.category.message}</p>
                        )}
                    </div>

                       {/* Location */}
          <div className="space-y-3">
            <Label className="text-sm">Location</Label>
            <div className="grid grid-cols-2 gap-4">
              <Controller
                control={control}
                name="state"
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(val) => {
                      field.onChange(val);
                      setValue("city", "");
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {indianStates.map((s) => (
                        <SelectItem key={s.isoCode} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />


                </form>
            </div>

            {/* Unsplash Picker */}
            {showImagePicker && (
                <UnsplashImagePicker
                    isOpen={showImagePicker}
                    onClose={() => setShowImagePicker(false)}
                    onSelect={(url) => {
                        setValue("coverImage", url);
                        setShowImagePicker(false);
                    }}
                />
            )}

            {/* Upgrade Modal */}
            <UpgradeModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                trigger={upgradeReason}
            />
        </div>
    )
}

export default CreateEventPage