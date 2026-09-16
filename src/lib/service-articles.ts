/**
 * Long-form service texts from the client's documents
 * ("სერვისებში ჩასამატებელი ტექსტები", 2026-09). Diagrams with Georgian
 * labels appear on the Georgian page only.
 */
import type { ContentBlock, ItemText } from "./catalog";
import type { Lang } from "./i18n";
import { serviceDocs } from "./service-docs";

const refrigerationStages: ContentBlock = {
  type: "image",
  src: "/img/services/refrigeration/service-stages.png",
  alt: "მაცივარ-საწყობის სამაცივრე სისტემის სერვისის ეტაპები",
  width: 1024,
  height: 559,
  localized: true,
};

const refrigerationSteps: ContentBlock = {
  type: "image",
  src: "/img/services/refrigeration/service-steps.png",
  alt: "HVAC/R სისტემის მომსახურების ეტაპები ნაბიჯ-ნაბიჯ",
  width: 1013,
  height: 553,
  localized: true,
};

const airFilterWork: ContentBlock = {
  type: "image",
  src: "/img/services/air-filters/doc-01.png",
  alt: "ჰაერის ფილტრის შეცვლა AHU-ში, HEPA ფილტრის ბოქსი და დამოუკიდებელი ჰაერის რეკუპერატორი",
  width: 1024,
  height: 559,
  localized: true,
};

const ka: Record<string, Partial<ItemText>> = {
  "air-filters": {
    content: [
      {
        type: "p",
        text: "ჩვენი 30 წლიანი გამოცდილების მქონე საინჟინრო ჯგუფი გთავაზობთ შენობის ფუნქციონალური დატვირთვისამებრ შეგირჩიოთ ჰაერის ფილტრები, შენობაში არსებული ზონალობის მიხედვით განგისაზღვროთ ფილტრაციის საჭირო კლასი, მოგაწოდოთ შესაბამისი კლასისა და ხარისხის ფილტრები და უზრუნველყოს მათი მონტაჟი და ან შეცვლა საჭიროებისამებრ.",
      },
      {
        type: "p",
        text: "ჰაერის ფილტრი სავენტილაციო სისტემის ის ელემენტია, რომელიც პირდაპირ განსაზღვრავს შენობაში შემავალი ჰაერის ხარისხს. სწორად შერჩეული და დროულად შეცვლილი ფილტრი იცავს როგორც ადამიანებს, ისე თავად დანადგარს — არასწორად შერჩეული ან გადავსებული ფილტრი კი ორივეს აზიანებს.",
      },
      { type: "h2", text: "სერვისის ეტაპები" },
      {
        type: "list",
        items: [
          "**ობიექტის დათვალიერება და ზონალობის განსაზღვრა:** რომელ სივრცეს რა სისუფთავის ჰაერი სჭირდება — საოპერაციო, პალატა, ლაბორატორია, საწარმოო ხაზი, სავაჭრო დარბაზი თუ ოფისი.",
          "**ფილტრაციის კლასის შერჩევა:** უხეში წმენდის **G4** წინასწარი ფილტრაციისთვის, წვრილი წმენდის **F7/F9** ძირითადი საფეხურისთვის, აბსოლუტური **HEPA (H13/H14)** და ულტრა-აბსოლუტური **ULPA** კრიტიკული სივრცეებისთვის — ISO 16890, EN 779 და EN 1822 სტანდარტების მიხედვით.",
          "**მოწოდება:** შერჩეული კლასისა და ზომის ფილტრების მოწოდება ევროპელი მწარმოებლებისგან, მათ შორის არასტანდარტული ზომებით.",
          "**მონტაჟი და ჰერმეტულობის შემოწმება:** ფილტრის ჩასმა კასეტაში ან ბოქსში, ჩარჩოს ჰერმეტულობის შემოწმება — რადგან ფილტრის გვერდიდან გამავალი ჰაერი მთელ ფილტრაციას აზრს უკარგავს.",
          "**პერიოდული შეცვლა გრაფიკით:** ფილტრების მდგომარეობის კონტროლი, ძველი ფილტრის ამოღება და ახლით ჩანაცვლება ობიექტისთვის შედგენილი გრაფიკის მიხედვით.",
        ],
      },
      airFilterWork,
      { type: "h2", text: "ვისთვის არის ჰაერის ფილტრაცია კრიტიკული" },
      {
        type: "list",
        items: [
          "**კლინიკები და საავადმყოფოები:** საოპერაციო ბლოკები, ინტენსიური თერაპიის და საიზოლაციო პალატები, სტერილიზაციის განყოფილებები — HEPA H13/H14 ფილტრაცია ჰოსპიტალური ინფექციებისა და ჯვარედინი დაბინძურების პრევენციისთვის.",
          "**ლაბორატორიები და ფარმაცევტული ობიექტები:** სუფთა ოთახები, მედიკამენტების საწყობები — მრავალსაფეხურიანი ფილტრაცია GDP მოთხოვნებთან ერთად.",
          "**კვების ობიექტები:** საწარმოები, საკონდიტროები, სამზარეულოები და კვების ქსელები — პროდუქტის ვარგისიანობა პირდაპირ არის დამოკიდებული საწარმოო ხაზზე მიწოდებული ჰაერის სისუფთავეზე.",
          "**ოფისები, სასტუმროები და სავაჭრო ცენტრები:** F7/F9 კასკადი ქუჩის სმოგის, PM2.5 ნაწილაკებისა და ალერგენების შესაკავებლად.",
        ],
      },
      { type: "h2", text: "რატომ არ არის ფილტრის შეცვლა წვრილმანი" },
      {
        type: "list",
        items: [
          "**ენერგია:** გადავსებული ფილტრი ზრდის წნევის ვარდნას, ვენტილატორი მეტ დენს ხარჯავს — ფილტრზე დაზოგილი თანხა ელექტროენერგიის ანგარიშში ბრუნდება.",
          "**ჰაერის ხარჯი:** ფილტრის გადავსებისას სისტემაში შემავალი ჰაერის რაოდენობა ეცემა და ვენტილაცია პროექტით გათვლილ რეჟიმს ვეღარ იჭერს.",
          "**ჰიგიენა:** ტენიან და დაბინძურებულ ფილტრზე მიკროორგანიზმები მრავლდებიან — ფილტრი დაცვის ბარიერიდან თავად ხდება დაბინძურების წყარო.",
          "**დანადგარის რესურსი:** წინასწარი ფილტრაციის გარეშე ბინძურდება კალორიფერები, ამაორთქლებლები და ვენტილატორები, რაც ამცირებს AHU-ს რესურსს და ზრდის სერვისის ხარჯს.",
        ],
      },
      {
        type: "note",
        text: "ფილტრების კლასების, სტანდარტებისა და ტექნიკური მახასიათებლების დეტალური მიმოხილვა — შემაჯამებელი ცხრილითა და სქემებით — იხილეთ პროდუქტების განყოფილებაში.",
      },
      {
        type: "link",
        href: "/products/air-filters",
        text: "ჰაერის ფილტრები — კლასები, სტანდარტები და ასორტიმენტი",
      },
    ],
  },
  refrigeration: {
    d: "სამაცივრე სისტემების და მაცივარ-საწყობების პროექტირება, მოწოდება, მონტაჟი, სრული დიაგნოსტიკა და სერვისი — მაცივარაგენტის ლაბორატორიული ანალიზით და პორტალზე ატვირთვით.",
    content: [
      {
        type: "p",
        text: "ჩვენს ქვეყანაში თანდათანობით სულ უფრო მატულობს სამაცივრე საწყობების რიცხვი, რაც შესაბამისად საგრძნობლად ზრდის მოთხოვნას სამაცივრე სისტემების სერვისებზე. ძალზედ დიდი მნიშვნელობა აქვს სერვისის სწორად მართვას, რადგან არასწორად ჩატარებულმა სერვისმა, არაკვალიფიციურმა კადრებმა და შეცდომით მიღებულმა გადაწყვეტილებებმა შეიძლება გამოიწვიოს თქვენი სამაცივრე სისტემის დაზიანება, რაც მოგეხსენებათ შესაძლოა გახდეს საკმაოდ დიდი ზარალის მიზეზი თქვენი ორგანიზაციისათვის.",
      },
      {
        type: "p",
        text: "ჩვენი ფირმა, რომელიც **საქართველოს სამაცივრო და კრიოგენული ტექნიკისა და ჰაერის კონდიცირების ინჟინერთა ასოციაცია (GARCAE)**-ეს აქტიური წევრია, გთავაზობთ მომსახურების სრულ ციკლს: მაცივარ-საწყობისა და სამაცივრე სისტემის თქვენი საჭიროებისამებრ პროექტირებას, შერჩევას, მოწოდებას, მონტაჟს და მონტაჟის შემდგომ სერვისებს.",
      },
      refrigerationStages,
      { type: "h2", text: "სრული დიაგნოსტიკა, ხარჯთაღრიცხვა და სერვისი" },
      {
        type: "p",
        text: "აღნიშნულ სისტემებსა და მეურნეობებს ვუკეთებთ **სრულ დიაგნოსტიკას**, პრობლემების აღმოფხვრისთვის საჭირო სამუშაოებისა და მასალების **ხარჯთაღრიცხვას** და **სრულ სერვისს**, რაც გულისხმობს: მთელი სისტემის ტექნიკურ დათვალიერებას, ამაორთქლებლებისა და კონდენსატორების გარეცხვა/გაწმენდას, წნევის, ტემპერატურისა და ელექტრული პარამეტრების მწარმოებლის მიერ დადგენილ სამუშაო პარამეტრებთან შესაბამისობაზე შემოწმებას, მაცივარაგენტის ჟონვაზე შემოწმებას, საჭიროების შემთხვევაში სისტემიდან მაცივარაგენტის ევაკუაციას (ამოტუმბვას), ლაბორატორიაში ანალიზის ჩატარებას, ანალიზის პასუხის შესაბამისად მაცივარაგენტის შეცვლას და/ან სისტემაში უკან ჩატუმბვას.",
      },
      {
        type: "p",
        text: "ჩატუმბვამდე ხორციელდება სისტემაში აზოტის შეტუმბვა, რათა სისტემა კარგად გამოშრეს და თან ჟონვაზე საბოლოოდ შემოწმდეს.",
      },
      refrigerationSteps,
      { type: "h2", text: "აზოტის გამოყენება სერვისის დროს" },
      {
        type: "list",
        items: [
          "**ჟონვაზე შემოწმება:** აზოტით სისტემაში იქმნება მაღალი წნევა, რაც საშუალებას იძლევა გამოვლინდეს მიკრო-ნაპრალები და ცუდად მირჩილული ან გადაბმული ადგილები. ვინაიდან აზოტი არ იცვლის მოცულობას ტემპერატურის მცირე ცვალებადობისას ისე მკვეთრად, როგორც მაცივარაგენტი, წნევის ვარდნის ტესტი ბევრად უფრო ზუსტია.",
          "**ოქსიდაციის (მურის/ქერცლის) პრევენცია რჩილვისას:** სპილენძის მილების მაღალ ტემპერატურაზე რჩილვის დროს, თუ შიგნით ჟანგბადია, წარმოიქმნება სპილენძის ოქსიდი — შავი ქერცლი და მური. ეს ნაწილაკები მოგვიანებით სწყდება კედლებს, მოძრაობს სისტემაში და ჭედავს ფილტრებს, კაპილარულ მილებსა და თერმორეგულირებად სარქველებს (TXV). რჩილვის პროცესში მილში სუსტი წნევით აზოტის მუდმივი გატარება ჟანგბადს სრულად დევნის და მილს შიგნიდან იდეალურად სუფთას ტოვებს.",
          "**სისტემის გამორეცხვა და ჭუჭყის გამოდევნა:** სისტემის რემონტისას (მაგალითად, კომპრესორის გადაწვის ან ძველი მილგაყვანილობის ქსელის გამოყენების შემთხვევაში), სპეციალური გამრეცხი სითხეების შეყვანის შემდეგ, მაღალი წნევით აზოტის შებერვა ეფექტურად დევნის ძველი ზეთის, მჟავებისა და ფიზიკური ჭუჭყის ნარჩენებს.",
          "**ტენის მოცილება და გამოშრობა:** აზოტი ხელოვნურად გამომშრალი აირია. სისტემაში მისი გატარება შთანთქავს მილის კედლებზე დარჩენილ ტენს და ფიზიკურად გამოაქვს ის გარეთ, რაც ვაკუუმირების პროცესს ბევრად აადვილებს.",
          "**სამმაგი ვაკუუმირების პროცესი (Triple Evacuation):** ღრმა და ხარისხიანი ვაკუუმის მისაღწევად, მხოლოდ ვაკუუმ-ტუმბოს ჩართვა ხშირად არ არის საკმარისი (განსაკუთრებით დიდ სისტემებში ან თუ სისტემაში ბევრი ტენი მოხვდა). ამ დროს ვიყენებთ სამმაგი ვაკუუმირების მეთოდს: ვაკუუმირების ეტაპებს შორის ვტუმბავთ აზოტს მცირე წნევით, რათა დავარღვით ვაკუუმი. აზოტი „ერევა“ დარჩენილ არაკონდენსირებად აირებსა და ტენის ორთქლს და მომდევნო ვაკუუმირებისას ისინი მარტივად გამოიდევნება სისტემიდან.",
        ],
      },
      { type: "h2", text: "ხელახალი გაშვება, ტესტირება და პორტალზე ატვირთვა" },
      {
        type: "p",
        text: "ამის შემდეგ სისტემაში კვლავ ვტუმბავთ მაცივარაგენტს, ზეთს და სისტემას ახლიდან ვუშვებთ. ხორციელდება სისტემის მუშაობის ოპტიმიზება და ტესტირება. თუ სისტემა გაივლის ახალ ტესტირებას და უპრობლემოდ გავა სამუშაო რეჟიმზე, აღნიშნული სამუშაოების შესახებ ინფორმაციას **ვტვირთავთ პორტალზე**, რათა ჩვენი მომსახურების ობიექტი აკმაყოფილებდეს კანონით დადგენილ ნორმებს.",
      },
    ],
  },
  "textile-ducts": {
    d: "ჩვენ პირველები ვართ საქართველოში, ვინც ევროპიდან ჩამოიტანა ტექსტილის ჰაერსადენები — სწრაფი დამზადება, მიწოდება და მონტაჟი, უფრო დაბალი საბოლოო ფასი.",
    content: [
      {
        type: "p",
        text: "აღსანიშნავია, რომ **ჩვენ პირველები ვართ საქართველოში**, ვინც ჩამოიტანა ევროპიდან ტექსტილის ჰაერსადენები და დაამონტაჟა რიგ ინდუსტრიულ ობიექტებზე. ჩვენ ვართ ტექსტილის ჰაერსადენების მწარმოებელი **ყველაზე მოწინავე ევროპული საწარმოს პარტნიორები და წარმომადგენლები საქართველოში**.",
      },
      {
        type: "list",
        items: [
          "**უსწრაფესი დამზადება და ლოჯისტიკა:** ტექსტილის ჰაერსადენები მზადდება უსწრაფესად და მათი ლოჯისტიკაც ხორციელდება უსწრაფესად. ისინი დამზადების შემდეგ ლაგდება კომპაქტურ ყუთებში და მათი ძალიან დაბალი წონის გამო (100-დან 300 გრამამდე 1მ²-ზე) მოწოდება ხორციელდება თვითმფრინავით.",
          "**სწრაფი და მარტივი მონტაჟი:** მონტაჟი ხორციელდება კიდევ უფრო სწრაფად და მარტივად.",
          "**უადვილესი სერვისი:** თავისი სპეციალური სამაგრი სისტემიდან ჰაერსადენების მოხსნა ხორციელდება ისევე მარტივად, როგორც სრიალა კარნიზებიდან იხსნება ფარდები, შემდეგ სარეცხ მანქანაში ირეცხება და ასევე მარტივად (ფარდებივით) შესრიალდება თავისი სამაგრი სისტემის სრიალა (Slider) პროფილზე (რელსზე) ან ბაგირზე (ტროსზე). ამისთვის დაგჭირდებათ 10 წუთი.",
          "**უფრო იაფი საბოლოო ჯამში:** ტექსტილის ჰაერსადენები თავისი ლოჯისტიკიან, მონტაჟიანად ბევრად იაფი ჯდება, ვიდრე მეტალის ან კომპოზიტური (სენდვიჩის ტიპის) ჰაერსადენები — იმ შემთხვევაშიც კი, თუ თქვენ გაქვთ თქვენი საკუთარი მეტალის ან სენდვიჩის ჰაერსადენების საწარმო.",
          "**იაფდება ვენტილაციის მთლიანი პროექტი:** საგრძნობლად მცირდება ჰაერის მოდინებითი აგრეგატების სიმძლავრეები, არ ჭირდება ჰაერსადენების თბოიზოლირება, ასევე არ ჭირდება ცხაურები, დიფუზორები, სარქველები და მსგავსი ჰაერტექნიკური ელემენტები, რადგან ამ ტიპის ჰაერსადენებიდან ჰაერის განაწილება სხვა პრინციპით ხორციელდება.",
        ],
      },
      {
        type: "note",
        text: "დეტალური ინფორმაცია ტექსტილის ჰაერსადენების სპეციფიკისა და მახასიათებლების შესახებ იხილეთ ჩვენსავე ვებგვერდზე, პროდუქტების განყოფილებაში, ან დაგვიკავშირდით.",
      },
    ],
  },
};

const en: Record<string, Partial<ItemText>> = {
  "air-filters": {
    content: [
      {
        type: "p",
        text: "Our engineering team, with 30 years of experience, selects air filters to match how the building is actually used, sets the filtration class required for each zone, supplies filters of the right class and quality, and installs or replaces them as needed.",
      },
      {
        type: "p",
        text: "The air filter is the element of a ventilation system that directly determines the quality of the air entering the building. A correctly specified filter, replaced on time, protects both the people inside and the equipment itself — the wrong filter, or a clogged one, damages both.",
      },
      { type: "h2", text: "How the service works" },
      {
        type: "list",
        items: [
          "**Site survey and zoning:** establishing how clean the air has to be in each space — operating theatre, ward, laboratory, production line, sales floor or office.",
          "**Choosing the filtration class:** coarse **G4** for pre-filtration, fine **F7/F9** for the main stage, absolute **HEPA (H13/H14)** and ultra-absolute **ULPA** for critical spaces — to the ISO 16890, EN 779 and EN 1822 standards.",
          "**Supply:** filters of the chosen class and size from European manufacturers, including non-standard sizes.",
          "**Installation and seal check:** fitting the filter into its cassette or box and checking the frame seal — air that slips past the edge of a filter defeats the whole filtration stage.",
          "**Scheduled replacement:** monitoring filter condition and replacing spent filters on a schedule drawn up for the facility.",
        ],
      },
      { type: "h2", text: "Where air filtration is critical" },
      {
        type: "list",
        items: [
          "**Clinics and hospitals:** operating theatres, intensive care and isolation rooms, sterilisation departments — HEPA H13/H14 filtration to prevent hospital-acquired infection and cross-contamination.",
          "**Laboratories and pharmaceutical facilities:** cleanrooms and medicine stores — multi-stage filtration alongside GDP requirements.",
          "**Food facilities:** production plants, bakeries, kitchens and food retail — shelf life depends directly on the cleanliness of the air supplied to the production line.",
          "**Offices, hotels and shopping centres:** an F7/F9 cascade to hold back street smog, PM2.5 particles and allergens.",
        ],
      },
      { type: "h2", text: "Why a filter change is not a detail" },
      {
        type: "list",
        items: [
          "**Energy:** a clogged filter raises the pressure drop and the fan draws more power — what you save on the filter comes back on the electricity bill.",
          "**Airflow:** as the filter loads up, the volume of air entering the system falls and the ventilation no longer holds the design regime.",
          "**Hygiene:** micro-organisms multiply on a damp, dirty filter, turning the protective barrier into a source of contamination.",
          "**Equipment life:** without pre-filtration the coils, evaporators and fans foul up, shortening the life of the air handling unit and pushing up service costs.",
        ],
      },
      {
        type: "note",
        text: "For a detailed review of filter classes, standards and technical characteristics — with a summary table and diagrams — see the products section.",
      },
      {
        type: "link",
        href: "/products/air-filters",
        text: "Air filters — classes, standards and range",
      },
    ],
  },
  refrigeration: {
    d: "Design, supply and installation of refrigeration systems and cold stores, plus full diagnostics and service — including laboratory refrigerant analysis and reporting to the national portal.",
    content: [
      {
        type: "p",
        text: "The number of cold storage warehouses in Georgia keeps growing, and with it the demand for refrigeration system servicing. Managing that service properly matters a great deal: poorly performed work, unqualified staff and wrong decisions can damage your refrigeration system, which can lead to significant losses for your organisation.",
      },
      {
        type: "p",
        text: "Our company, an active member of the **Georgian Association of Refrigeration, Cryogenic and Air Conditioning Engineers (GARCAE)**, offers the full service cycle: design, equipment selection, supply, installation and after-installation service of cold stores and refrigeration systems tailored to your needs.",
      },
      refrigerationStages,
      { type: "h2", text: "Full diagnostics, cost estimates and service" },
      {
        type: "p",
        text: "We carry out **full diagnostics** of these systems and facilities, prepare a **cost estimate** of the work and materials needed to fix the problems, and provide **full service**: a technical inspection of the whole system, washing and cleaning of evaporators and condensers, checking pressure, temperature and electrical parameters against the manufacturer's operating values, refrigerant leak testing, and where needed, recovering the refrigerant from the system, having it analysed in a laboratory, and then replacing it and/or charging it back into the system based on the results.",
      },
      {
        type: "p",
        text: "Before recharging, the system is pressurised with nitrogen so that it dries out thoroughly and passes a final leak test.",
      },
      refrigerationSteps,
      { type: "h2", text: "Why we use nitrogen during service" },
      {
        type: "list",
        items: [
          "**Leak testing:** nitrogen creates high pressure in the system, revealing micro-cracks and poorly brazed or badly joined spots. Because nitrogen's volume changes far less with small temperature swings than refrigerant does, the pressure-drop test is much more accurate.",
          "**Preventing oxidation (soot and scale) during brazing:** when copper pipes are brazed at high temperature with oxygen inside, copper oxide forms as black scale and soot. These particles later break away, travel through the system and clog filters, capillary tubes and thermostatic expansion valves (TXV). A constant low-pressure nitrogen purge while brazing drives out all the oxygen and leaves the pipe perfectly clean inside.",
          "**Flushing the system and removing contaminants:** during repairs (for example after a compressor burnout or when reusing old pipework), blowing high-pressure nitrogen through the system after special flushing fluids effectively clears out old oil, acids and physical debris.",
          "**Removing moisture and drying:** nitrogen is an artificially dried gas. Passing it through the system absorbs moisture left on the pipe walls and physically carries it out, which makes evacuation much easier.",
          "**Triple evacuation:** a vacuum pump alone is often not enough to reach a deep, high-quality vacuum, especially in large systems or when a lot of moisture has entered. We use triple evacuation: between evacuation stages we break the vacuum with nitrogen at low pressure. The nitrogen mixes with the remaining non-condensable gases and water vapour, so the next evacuation removes them easily.",
        ],
      },
      { type: "h2", text: "Restart, testing and portal reporting" },
      {
        type: "p",
        text: "We then charge the system with refrigerant and oil again and restart it, followed by optimisation and testing. Once the system passes the new tests and runs smoothly, we **upload the work records to the portal** so the facility we service complies with the standards required by law.",
      },
    ],
  },
  "textile-ducts": {
    d: "We were the first in Georgia to bring textile air ducts from Europe — fast manufacturing, delivery and installation at a lower overall cost.",
    content: [
      {
        type: "p",
        text: "**We were the first in Georgia** to bring textile air ducts from Europe and install them on a number of industrial sites. We are **partners and representatives in Georgia of Europe's most advanced textile air duct manufacturer**.",
      },
      {
        type: "list",
        items: [
          "**Fastest manufacturing and logistics:** textile ducts are made very quickly and delivered just as fast. After manufacturing they are packed in compact boxes and, because they are so light (100 to 300 grams per m²), shipped by air.",
          "**Quick, simple installation:** installation is even faster and easier.",
          "**Effortless maintenance:** the ducts come off their special suspension system as easily as curtains slide off a curtain rail. They go into a washing machine and then slide back onto the suspension profile (rail) or cable just as easily. It takes about 10 minutes.",
          "**Cheaper overall:** including logistics and installation, textile ducts cost far less than metal or composite (sandwich-type) ducts — even if you have your own metal or sandwich duct workshop.",
          "**A cheaper ventilation project as a whole:** supply air handling units can be much smaller, the ducts need no thermal insulation, and there is no need for grilles, diffusers, dampers or similar air distribution components, because textile ducts distribute air on a different principle.",
        ],
      },
      {
        type: "note",
        text: "For detailed information on the specifics and characteristics of textile air ducts, see the products section of our website or contact us.",
      },
    ],
  },
};

const dropLocalized = (list: Record<string, Partial<ItemText>>) =>
  Object.fromEntries(
    Object.entries(list).map(([slug, a]) => [
      slug,
      { ...a, content: a.content?.filter((b) => !(b.type === "image" && b.localized)) },
    ])
  );

/** The client wants every flooring service to repeat the full list of floors we lay
 *  (kept in one place: the floor-preparation intro). */
const floorTypes = {
  ka: {
    h: "ჩვენ გთავაზობთ იატაკის შემდეგ სახეობებს",
    items: ["რბილი იატაკი რულონური ტიპის", "რბილი იატაკის ფილები", "ვინილის იატაკის საფარი რულონებში", "ვინილის იატაკის ფილები", "დეკის იატაკი", "იმიტირებული იატაკი", "ლამინირებული პარკეტი (ლამინატი)", "ნატურალური ხის იატაკი", "კერამიკული და კერამგრანიტის ფილები", "ინდუსტრიული იატაკები"],
  },
  en: {
    h: "Types of flooring we install",
    items: ["Soft flooring in rolls", "Soft flooring tiles", "Vinyl flooring in rolls", "Vinyl floor tiles", "Decking", "Imitation flooring", "Laminate flooring", "Natural wood flooring", "Ceramic and porcelain stoneware tiles", "Industrial floors"],
  },
};
const FLOOR_SERVICES = ["vinyl-flooring", "soft-flooring", "deck-flooring", "laminate", "industrial-floors", "ceramic-tiles"];

function withFloors(list: Record<string, Partial<ItemText>>, lang: Lang) {
  const out = { ...list };
  for (const slug of FLOOR_SERVICES) {
    const block: ContentBlock[] = [
      { type: "h2", text: floorTypes[lang].h },
      { type: "list", items: floorTypes[lang].items },
    ];
    out[slug] = { ...out[slug], content: [...(out[slug]?.content ?? []), ...block] };
  }
  return out;
}

export const serviceArticles: Record<Lang, Record<string, Partial<ItemText>>> = {
  ka: withFloors({ ...serviceDocs, ...ka }, "ka"),
  en: withFloors(dropLocalized(en), "en"),
};
