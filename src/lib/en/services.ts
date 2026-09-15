import type { CatalogText, ItemText } from "../catalog";

/** English text for the services catalogue, keyed by slug. Photos and slugs come from ../services. */
export const servicesEn: Record<string, ItemText> = {
  "vinyl-flooring": {
    t: "Vinyl Flooring of Any Type",
    d: "Installation of vinyl floor and wall coverings, PVC wall panels and decorative luxury vinyl tiles (LVT), including preparation of the right substrate for each covering.",
  },
  "soft-flooring": {
    t: "Soft Flooring",
    d: "Installation of soft flooring and preparation of the subfloor for laying it.",
  },
  insulation: {
    t: "Thermal Insulation",
    d: "Thermal insulation, waterproofing and soundproofing works.",
  },
  "deck-flooring": {
    t: "Decking",
    d: "Installation of decking, complete with the supporting substructure.",
  },
  "floor-preparation": {
    t: "Floor Substrate Preparation",
    d: "Preparing the floor substrate for subsequent works: screed reinforcement and repair, mechanical grinding of concrete and screed, pouring of self-leveling compound, and more.",
    intro: [
      {
        p: "For your new floor to turn out exactly as you want and imagine it, the substrate has to be properly prepared first — and that preparation starts with the screed. Unfortunately, screed quality is often overlooked: it is seen as a simple job that anyone can do well. The usual result is a poorly laid, unstable sand-cement layer riddled with deep, long cracks and an uneven surface. Such a screed is no fit base for a floor: parquet or any other flooring laid on top of it will be just as poor and uneven, and — most importantly — unstable, crumbling and prone to breaking.",
      },
      {
        h: "Damaged screed can be repaired and reinforced",
        p: "If your screed is already laid and you have doubts about its quality, get in touch — our specialists will help you find the right solution. Our company has extensive knowledge and experience in repairing and reinforcing damaged or poorly laid screeds. Using specialist construction chemicals, we can often avoid breaking out the existing screed and pouring a new one — and we back the work with a warranty.",
      },
      {
        h: "We offer the following types of flooring",
        list: [
          "Soft flooring in rolls",
          "Carpet tiles",
          "Vinyl flooring in rolls",
          "Vinyl floor tiles",
          "Decking",
          "Imitation flooring",
          "Laminate flooring",
          "Solid wood flooring",
          "Ceramic and porcelain stoneware tiles",
          "Industrial flooring",
        ],
      },
    ],
  },
  "sandwich-panels": {
    t: "Sandwich Panels",
    d: "Installation of sandwich panels, prefabricated partition panels and decorative panels.",
    captions: {
      "/img/products/sandwich-panels/02.jpg": "Mineral wool sandwich panel",
      "/img/products/sandwich-panels/09.webp": "Combined sandwich panel",
      "/img/products/sandwich-panels/08.jpg": "Polyurethane sandwich panel",
      "/img/products/sandwich-panels/07.jpg": "Polyurethane roof sandwich panel",
      "/img/products/sandwich-panels/06.jpg": "Polyurethane roof sandwich panel",
      "/img/products/sandwich-panels/05.jpg": "Polyurethane sandwich panel",
      "/img/products/sandwich-panels/04.webp": "Mineral wool roof sandwich panel",
      "/img/products/sandwich-panels/03.jpg": "Mineral wool sandwich panel",
      "/img/products/sandwich-panels/01.jpg": "Mineral wool roof sandwich panel",
    },
  },
  "decorative-panels": {
    t: "Decorative Panels",
    d: "Installation of decorative panels.",
    intro: [
      {
        p: "These are ready-to-install wall and ceiling cladding panels for both exterior and interior facades. They are made from polyester, fiberglass, natural wood and stone powders, synthesized with special chemical compounds. The panels are eco-friendly and feel like genuine natural materials to the touch. They are manufactured by European companies; we import them to Georgia and install them.",
      },
      {
        p: "Don't waste time searching for other solutions — contact us and get ready-made panels in any surface and texture you like, tailored to your specific project, delivered to site and installed in the shortest possible time.",
      },
    ],
  },
  "decorative-glass": {
    t: "Corrugated and Decorative Glass (Decomina)",
    d: "Supply and installation of corrugated glass and construction of glass block walls.",
  },
  hvac: {
    t: "HVAC — Heating, Ventilation and Air Conditioning",
    d: "Design and installation of HVAC (heating, ventilation and air conditioning) systems.",
    intro: [
      {
        p: "Heating, ventilation and air conditioning are key components of comfort, with virtually no limit to their quality, variety and cost. They can be provided as separate systems or units, or combined into a single high-efficiency, centralized system with automatic controls that runs under software management without human intervention.",
      },
      {
        h: "Save energy and money",
        p: "Today's environmental and energy challenges push us to keep refining heat recovery methods and equipment. Shrinking global energy resources drive a steady rise in energy prices, and without heat recovery it has become practically impossible to heat and cool medium-sized and large facilities economically.",
      },
      {
        h: "Pay attention to the air you breathe",
        p: "Simply cooling and heating the air is no longer enough to create full comfort and a healthy environment. More and more often, the air has to be treated to bring its quality up to the required parameters. Beyond temperature control, air treatment covers filtration, humidity control and airflow management.",
      },
      {
        h: "Trust us to create a healthy, comfortable environment",
        p: "In an age of information overload, it is hard to research every element needed for a healthy, comfortable environment and choose the best options. Our international team, with 30 years of experience in the sector, will gladly provide professional consultation and recommendations, and develop the optimal concept for your needs and/or technical specifications.",
      },
    ],
  },
  "textile-ducts": {
    t: "Textile Air Ducts",
    d: "Supply and installation of textile air ducts.",
  },
  refrigeration: {
    t: "Refrigeration Systems",
    d: "Design, supply and installation of refrigeration units and refrigeration systems.",
    captions: {
      "/img/products/cold-storage-systems/02.jpg": "Loading dock shelters",
      "/img/products/cold-storage-systems/03.png": "Industrial door",
      "/img/products/cold-storage-systems/04.jpg": "Standard high-speed roll-up door",
      "/img/products/loading-ramps/01.jpg": "Pneumatic and hydraulic dock leveler systems",
      "/img/products/loading-ramps/02.jpg": "Inflatable dock shelter",
      "/img/products/loading-ramps/03.jpg": "Cushion dock seal",
      "/img/products/loading-ramps/04.jpg": "Automatic dock leveler systems",
      "/img/products/loading-ramps/05.png": "Hydraulic loading ramp systems",
      "/img/products/cold-storage-doors/01.png": "Double swing door, semi-insulated",
      "/img/products/cold-storage-doors/02.png": "Swing door, semi-insulated",
      "/img/products/cold-storage-doors/03.jpg": "Insulated high-speed roll-up door",
      "/img/products/cold-storage-doors/04.png": "Single-leaf hinged door",
      "/img/products/cold-storage-doors/05.jpg": "Double-leaf hinged door",
      "/img/products/cold-storage-doors/06.png": "Service door, semi-insulated",
      "/img/products/cold-storage-doors/07.png": "Service door",
      "/img/products/cold-storage-doors/08.png": "Automatic horizontal sliding door",
      "/img/products/cold-storage-doors/09.png": "Vertical sliding door",
      "/img/products/cold-storage-doors/10.jpg": "Hermetic sliding door with pressure control",
      "/img/products/cold-storage-doors/11.png": "Horizontal sliding door",
      "/img/products/cold-storage-doors/12.png": "Hinged sliding door",
      "/img/products/cold-storage-doors/13.png": "Monorail sliding door",
    },
  },
  "steam-units": {
    t: "Heat Supply Units",
    d: "Design and installation of heat supply units — steam boilers, steam plant equipment and water treatment systems.",
  },
  "suspended-ceilings": {
    t: "Suspended Ceilings: Supply and Installation",
    d: "Installation of suspended ceilings — Clip-in, Lay-in and Grilyato systems, as well as industrial, plasterboard and various panel ceilings.",
    intro: [
      {
        h: "Not all ceilings are created equal",
        p: "Ceilings are an endless subject thanks to their sheer variety — all the more so since, beyond simply closing off a space and serving as decor, today's ceilings take on many other equally important functions. In modern buildings, this key interior element brings together a whole range of technologies: thermal and acoustic insulation, energy saving, noise reduction, improved lighting performance and hygiene. And, last but not least, a suspended ceiling can conceal any and all building services. Depending on its function and desired look, a ceiling can be chosen from a wide range of types and materials.",
      },
      {
        h: "Talk to us before you buy a ceiling",
        p: "To make sure your new ceiling matches both your taste and your technical requirements, contact us — a specialist from our team will help you arrive at the best solution. The type, structure and material of a ceiling are chosen primarily according to the purpose and function of the building. The ceiling type then determines its supporting structure, the engineering calculations and the full bill of materials needed for installation.",
      },
      {
        p: "We offer a wide range of ceilings made of wood, metal, vinyl, composite and imitation materials, matched to the purpose and function of your facility. When you order materials and installation from us, recommendations, consultation and calculations are free of charge.",
      },
    ],
  },
  "concrete-drilling": {
    t: "Concrete Drilling",
    d: "Concrete drilling, reinforced concrete cutting and large-diameter core openings in reinforced concrete using specialist high-tech equipment.",
    intro: [
      {
        p: "Concrete drilling and cutting are used to create openings for building services or any other purpose in reinforced concrete walls, floors and ceilings of every kind. The work is carried out with a specialist core drilling rig that cuts precise-diameter openings through reinforced concrete quickly, without demolition or vibration. It is mainly used to route ventilation shafts, water supply and sewer risers, electrical lines and other services through reinforced concrete slabs and walls.",
      },
      {
        p: "Openings of the required diameter are also cut to weaken a building's load-bearing elements ahead of demolition. In addition, openings in reinforced concrete are made for decorative and other purposes.",
      },
      {
        p: "Service Pro LLC has expert-level specialists and state-of-the-art equipment for this work. Core drilling may look simple and safe at first glance, but without specialist knowledge, tools and equipment it carries considerable risks — it should only be carried out by professionals and companies with professional-grade machinery.",
      },
    ],
  },
  laminate: {
    t: "Laminate Flooring Installation",
    d: "Installation of laminate flooring.",
  },
  "industrial-floors": {
    t: "Industrial Flooring",
    d: "Installation of industrial flooring.",
  },
  "ceramic-tiles": {
    t: "Ceramic Tiling",
    d: "Laying ceramic floor tiles and fixing ceramic wall tiles.",
  },
  painting: {
    t: "Painting Works",
    d: "Interior and facade painting works.",
  },
  electrical: {
    t: "Electrical Works",
    d: "Electrical systems: design and installation.",
  },
  "design-renovation": {
    t: "Design / Renovation",
    d: "Design and renovation of residential, commercial, healthcare and industrial facilities.",
  },
  "medical-planning": {
    t: "Medical Facility Technology Planning",
    d: "Technology planning for medical facilities: concept development, design and implementation.",
  },
  "industrial-planning": {
    t: "Industrial Facility Technology Planning",
    d: "Technology planning for industrial facilities: concept development, design, implementation and service.",
  },
  "water-sewage": {
    t: "Water Supply and Sewerage",
    d: "Water supply: hot and cold water systems, installation of water treatment systems, and installation of drainage and sewerage networks and systems.",
  },

  // Second-level items under floor-preparation
  "floor-screed": {
    t: "Sand-Cement Floor Screeding",
    d: "Floor screeding with sand-cement mortar.",
  },
  "screed-repair": {
    t: "Damaged Screed Repair and Reinforcement",
    d: "Repair and reinforcement of damaged screed.",
  },
  "self-leveling": {
    t: "Self-Leveling Compound",
    d: "Pouring of self-leveling compound.",
  },
};

export const serviceCatalogEn: CatalogText = {
  label: "Services",
  noun: "Service",
  features: { label: "The service includes", items: ["Consultation", "Recommendations"] },
  copy: {
    others: "Other services",
    all: "All services",
    order: "Estimate and timeline",
    cta: "Need an estimate for your project?",
    missing: "Can't find the service you need?",
  },
};
