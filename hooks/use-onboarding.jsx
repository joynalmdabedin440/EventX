import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

// Pages that require onboarding (attendee-centered)
const ATTENDEE_PAGES = ["/explore", "/events", "/my-tickets", "/profile"];
export function useOnboarding() {
    const [showOnboarding, setShowOnboarding] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    
}