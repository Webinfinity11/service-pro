import type { CatalogText, ItemText } from "../catalog";

/** English text for the products catalogue, keyed by slug. Photos and slugs come from ../products. */
export const productsEn: Record<string, ItemText> = {
  "vinyl-floors": {
    t: "Vinyl Flooring",
    d: "Vinyl floor and wall coverings, including LVT (luxury vinyl tiles).",
  },
  "construction-chemicals": {
    t: "Construction Chemicals",
    d: "Construction chemicals for subfloor preparation and vinyl flooring adhesion.",
  },
  "textile-ducts": {
    t: "Textile Air Ducts",
    d: "Textile air ducts and their suspension systems.",
  },
  "cold-storage-systems": {
    t: "Cold Storage and Warehouse Systems",
    d: "Automatic and manual doors; cold storage and warehouse equipment; dock loading and unloading systems.",
    captions: {
      "/img/products/cold-storage-systems/01.jpg": "Folding fabric door",
      "/img/products/cold-storage-systems/02.jpg": "Loading dock shelters",
      "/img/products/cold-storage-systems/03.png": "Industrial door",
      "/img/products/cold-storage-systems/04.jpg": "Standard high-speed roll-up door",
    },
  },
  "soft-floors": {
    t: "Soft Flooring",
    d: "A full range of soft flooring.",
  },
  "sandwich-panels": {
    t: "Sandwich Panels",
    d: "Sandwich panels with polyurethane (PUR), polyisocyanurate (PIR), mineral wool and other cores.",
    captions: {
      "/img/products/sandwich-panels/01.jpg": "Mineral wool roof sandwich panel",
      "/img/products/sandwich-panels/02.jpg": "Mineral wool sandwich panel",
      "/img/products/sandwich-panels/03.jpg": "Mineral wool sandwich panel",
      "/img/products/sandwich-panels/04.webp": "Mineral wool roof sandwich panel",
      "/img/products/sandwich-panels/05.jpg": "Polyurethane sandwich panel",
      "/img/products/sandwich-panels/06.jpg": "Polyurethane roof sandwich panel",
      "/img/products/sandwich-panels/07.jpg": "Polyurethane roof sandwich panel",
      "/img/products/sandwich-panels/08.jpg": "Polyurethane sandwich panel",
      "/img/products/sandwich-panels/09.webp": "Combined sandwich panel",
    },
  },
  "decorative-panels": {
    t: "Decorative Panels",
    d: "Decorative panels for interiors and facades (Neteren).",
    intro: [
      {
        p: "These are ready-made wall and ceiling cladding panels for exterior and interior facades. They are produced from polyester resin, fibreglass, natural wood and stone powders and special chemical compounds. The panels are environmentally friendly and feel like genuine natural materials to the touch. They are manufactured by European companies; we import and install them in Georgia.",
      },
      {
        p: "Don't waste time searching for alternatives. Contact us and get ready-made panels in any surface finish and texture you want, delivered to site and installed quickly.",
      },
    ],
  },
  "chiller-units": {
    t: "Refrigeration Units",
    d: "Refrigeration units and refrigeration systems.",
  },
  "thermal-insulation": {
    t: "Thermal Insulation Systems and Materials",
    d: "Complete building insulation (roof, walls, floor) with polyurethane (PIR) spray foam or boards; insulation of steam, hot and chilled water pipelines, heat exchangers and process equipment with prefabricated pipe sections and metal cladding. Insulation of shut-off and control valves with quick-release removable jackets.",
  },
  "decorative-glass": {
    t: "Decorative Glass (Decomina)",
    d: "Decorative corrugated glass (Decomina).",
  },
  "steam-units": {
    t: "Heat Supply Units",
    d: "Steam boilers, steam plant equipment and water treatment systems.",
  },
  "deck-floors": {
    t: "Decking",
    d: "Decking and a full range of mounting accessories.",
  },
  hvac: {
    t: "HVAC — Heating, Ventilation and Air Conditioning",
    d: "Heating, ventilation and air conditioning systems, including air handling units (AHU), heat recovery units, air ducts and automatic control equipment.",
    intro: [
      {
        p: "Heating, ventilation and air conditioning are components of comfort with virtually no limit in quality, variety or cost. Each can be supplied as a standalone system or unit, or combined into a high-efficiency, centralised, automatically controlled system run by software without human intervention.",
      },
      {
        h: "Save energy and money",
        p: "Today's environmental and energy challenges push us to keep refining heat recovery methods and equipment. Dwindling global energy resources are driving a steady rise in energy prices. Without heat recovery, heating and cooling medium and large facilities has become practically unthinkable.",
      },
      {
        h: "Pay attention to the air you breathe",
        p: "Simply cooling and heating the air is no longer enough to create full comfort and a healthy environment. More and more often, air must be treated to bring its quality to the required parameters. Beyond temperature control, air treatment also means managing cleanliness, humidity and airflow.",
      },
      {
        h: "Trust us to create a healthy, comfortable environment",
        p: "In an age of information overload, it is hard to research every element needed for a healthy, comfortable environment and choose the best option. Our international team, with 30 years of experience in the sector, will gladly provide professional advice and recommendations and develop the optimal concept for your needs and/or technical brief.",
      },
    ],
  },
  "suspended-ceilings": {
    t: "Suspended Ceilings",
    d: "Ceilings of every type, including Clip-in, Lay-in and Grilyato, as well as industrial, plasterboard and other panel ceilings.",
    intro: [
      {
        h: "Not all ceilings are alike",
        p: "Ceilings are an endless subject because of their sheer variety — all the more so as today a ceiling does far more than simply cover and decorate a space. In modern buildings this key interior element brings together a range of technologies: thermal and acoustic insulation, energy saving, noise reduction, enhanced lighting and hygiene. And, last but not least, a suspended ceiling can conceal any and all building services. Depending on functional requirements and appearance, ceilings of many types and materials are available.",
      },
      {
        h: "Contact us before you buy a ceiling",
        p: "To make sure your new ceiling matches both your taste and your technical requirements, get in touch — one of our specialists will help you find the optimal solution. The type, structure and material of a ceiling are chosen first and foremost according to the building's purpose and function. The ceiling type then determines the design and calculation of its structure and the overall quantity of materials required.",
      },
      {
        p: "We offer a wide range of ceilings in wood, metal, vinyl, composite and imitation materials to suit the purpose and function of your project. When you order materials and installation from us, recommendations, consultation and calculations are free of charge.",
      },
    ],
  },

  "cold-storage-doors": {
    t: "Cold Storage Doors",
    d: "Automatic and manual doors for cold storage and warehouse facilities — sliding, hinged, swing (saloon-type), service and high-speed roll-up doors.",
    captions: {
      "/img/products/cold-storage-doors/01.png": "Double-leaf swing door, semi-insulated",
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
  "loading-ramps": {
    t: "Dock Levellers",
    d: "Loading and unloading dock systems — hydraulic and pneumatic dock levellers and dock shelters.",
    captions: {
      "/img/products/loading-ramps/01.jpg": "Pneumatic and hydraulic dock levellers",
      "/img/products/loading-ramps/02.jpg": "Inflatable dock shelter",
      "/img/products/loading-ramps/03.jpg": "Cushion dock seal",
      "/img/products/loading-ramps/04.jpg": "Automatic dock leveller systems",
      "/img/products/loading-ramps/05.png": "Hydraulic dock leveller systems",
    },
  },
  "insulation-jackets": {
    t: "Removable Insulation Jackets",
    d: "Insulation of shut-off and control valves, heat exchangers and process equipment with quick-release removable jackets.",
  },
  "pir-spray-foam": {
    t: "PIR and PUR Spray Foam",
    d: "Polyisocyanurate (PIR) and polyurethane (PUR) spray foam — complete building insulation for roofs, walls and floors.",
  },
  "pir-boards": {
    t: "PIR and PUR Insulation Boards",
    d: "Polyisocyanurate (PIR) and polyurethane (PUR) insulation boards.",
  },
  "prefabricated-pipes": {
    t: "Pre-insulated Pipe Sections",
    d: "Prefabricated pipe insulation sections in mineral wool, glass wool or polyurethane (PUR and PIR) for steam, hot and chilled water pipelines, with metal cladding.",
  },
  ahu: {
    t: "AHU — Air Handling Units",
    d: "Central air conditioners — air handling units for heating, cooling and filtering air and controlling humidity and airflow.",
  },
  "air-filters": {
    t: "Air Filters",
    d: "Air filters for HVAC systems — clean air and a healthy indoor environment.",
  },
  recuperators: {
    t: "Heat Recovery Units",
    d: "Heat recovery units (recuperators) — recovering thermal energy in ventilation systems to save energy and cut costs.",
  },
};

export const productCatalogEn: CatalogText = {
  label: "Products",
  noun: "Product",
  features: { label: "", items: ["Supply", "Installation", "Service"] },
  copy: {
    others: "Other products",
    all: "All products",
    order: "Price and lead time",
    cta: "Need a price for a specific product?",
    missing: "Can't find the product you need?",
  },
};
