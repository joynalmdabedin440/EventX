import { State } from "country-state-city";
import { is } from "date-fns/locale";

export function createLocationSlug(city, state) { 
    if(!city || !state) return "";
    return `${city}-${state}`.toLowerCase().replace(/\s+/g, '-');
}

export function parseLocationSlug(slug) {
    if (!slug || typeof slug !== 'string') return { city: null, state: null, isValid: false };

    const parts = slug.split('-');
    //must be 2 parts
    if (parts.length < 2) {
        return {
            city: null, state: null, isValid: false
        }
        
    
    }
    // parse city 
    const cityName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
    
    // parse state
    const stateName = parts.slice(1).map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
    
    //get all state

    const indStates = State.getStatesOfCountry("IN");

    //validate state exists
    const stateObj = indStates.find(s => s.name.toLowerCase() === stateName.toLowerCase());
    if (!stateObj) {
        return{ city: null, state: null, isValid: false };
    }

}