/** Service texts converted from the client's Word documents (Georgian). */
import type { ItemText } from "../catalog";
import deckFlooring from "./deck-flooring.json";
import electrical from "./electrical.json";
import insulation from "./insulation.json";
import sandwichPanels from "./sandwich-panels.json";
import steamUnits from "./steam-units.json";
import vinylFlooring from "./vinyl-flooring.json";
import waterSewage from "./water-sewage.json";
import waterTreatment from "./water-treatment.json";
import xRayProtection from "./x-ray-protection.json";

export const serviceDocs = {
  "deck-flooring": deckFlooring,
  "electrical": electrical,
  "insulation": insulation,
  "sandwich-panels": sandwichPanels,
  "steam-units": steamUnits,
  "vinyl-flooring": vinylFlooring,
  "water-sewage": waterSewage,
  "water-treatment": waterTreatment,
  "x-ray-protection": xRayProtection,
} as unknown as Record<string, Partial<ItemText>>;
