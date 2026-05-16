import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sofa,
  ChefHat,
  Bath,
  Flower2,
  Shirt,
  Bed,
  Sparkles,
  Footprints,
  Baby,
  PaintBucket,
  Hexagon,
  Lightbulb,
  Tv,
  Crown,
  Clapperboard,
  Router,
  Hotel,
  BookOpen,
  ArrowRight,
  Sliders,
  CheckCircle2,
  MoveDiagonal,
  X,
  ChevronLeft,
  ChevronRight,
  Cuboid,
  PenTool,
  Hammer,
} from "lucide-react";

type ServiceElement = {
  name: string;
  description: string;
  image?: string;
  subModels?: string[];
};

type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  services: ServiceItem[];
};

type ServiceItem = {
  name: string;
  desc: string;
  image?: string;
  elements?: ServiceElement[];
  color?: string;
};

const serviceCategories: ServiceCategory[] = [
  {
    id: "core",
    name: "Core Living Spaces",
    description:
      "Foundation spaces designed for comfort, luxury, and daily living.",
    services: [
      {
        icon: Sofa,
        name: "Living Room",
        desc: "Plush, modern spaces for entertaining and relaxation.",
        image:
          "https://i.postimg.cc/SsXdLPWZ/Gemini-Generated-Image-1qnh4r1qnh4r1qnh.png",
        elements: [
          {
            name: "Custom Sofas & Sectionals",
            description:
              "Tailor-made seating to fit your exact floor plan and style preference.",
            image:
              "https://i.postimg.cc/B6Cpx1SX/Gemini-Generated-Image-pordakpordakpord.png",
            subModels: ["L-Shape", "U-Shape", "Chesterfield"],
          },
          {
            name: "Entertainment Units",
            description:
              "Seamless integrated media walls with hidden wire management.",
            image:
              "https://i.postimg.cc/pTBCDnW9/Gemini-Generated-Image-hrks0rhrks0rhrks.png",
            subModels: ["Floating", "Floor-standing", "Built-in"],
          },
          {
            name: "Statement Lighting",
            description:
              "Curated light fixtures that set the perfect mood and ambiance.",
            image:
              "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=400",
            subModels: ["Chandeliers", "Floor Lamps", "Wall Sconces"],
          },
        ],
        color:
          "bg-blue-50 text-blue-600 border-blue-100 group-hover:border-blue-200",
      },
      {
        icon: ChefHat,
        name: "Modular Kitchen",
        desc: "Smart, highly-efficient culinary spaces with premium finishes.",
        image: "https://i.postimg.cc/7hd27x2S/11.png",
        elements: [
          {
            name: "Handle-less Cabinets",
            description:
              "Sleek, seamless cabinetry with automated or manual opening mechanisms.",
            image:
              "https://i.postimg.cc/QtqmpW89/Gemini-Generated-Image-l24vq6l24vq6l24v.png",
            subModels: ["J-Pull Profiles", "Push-to-Open", "Gola Profiles"],
          },
          {
            name: "Quartz Countertops",
            description:
              "Durable, non-porous surfaces that resist staining and scratching.",
            image:
              "https://i.postimg.cc/cCpmRqg6/Gemini-Generated-Image-bjtzknbjtzknbjtz.png",
            subModels: ["Calacatta", "Pure White", "Grey Concrete"],
          },
          {
            name: "Built-in Appliances",
            description:
              "Integrated, flush-mounted appliances for a continuous design flow.",
            image:
              "https://i.postimg.cc/kG0cQr64/Gemini-Generated-Image-asugdcasugdcasug-(1).png",
            subModels: ["Ovens", "Microwaves", "Dishwashers"],
          },
        ],
        color:
          "bg-orange-50 text-orange-600 border-orange-100 group-hover:border-orange-200",
      },
      {
        icon: Bath,
        name: "Bathroom & Vanity",
        desc: "Spa-like retreats with elegant fixtures and bespoke vanities.",
        image:
          "https://i.postimg.cc/RZkfRJF2/Whats-App-Image-2025-10-29-at-15-36-41-2.jpg",
        elements: [
          {
            name: "Floating Vanities",
            description:
              "Wall-mounted basins that enhance perceived space and ease cleaning.",
            image: "https://i.postimg.cc/XNzFtgzj/17.png",
            subModels: ["Single Sink", "Double Sink", "Wall-mounted"],
          },
          {
            name: "Walk-in Showers",
            description:
              "Accessible, luxurious showering enclosures with minimal hardware.",
            image: "https://i.postimg.cc/XNzFtgz7/18.png",
            subModels: ["Frameless Glass", "Rain Showers", "Niches"],
          },
          {
            name: "Backlit Mirrors",
            description:
              "Mirrors featuring integrated LED lighting for perfect illumination.",
            image:
              "https://i.postimg.cc/YCWsv3P8/Gemini-Generated-Image-vcn0livcn0livcn0.png",
            subModels: ["Round", "Rectangular", "Irregular Shapes"],
          },
        ],
        color:
          "bg-teal-50 text-teal-600 border-teal-100 group-hover:border-teal-200",
      },
      {
        icon: Flower2,
        name: "Pooja Room",
        desc: "Tranquil, beautifully crafted spiritual spaces.",
        image:
          "https://i.postimg.cc/KYhsBTSx/Gemini-Generated-Image-rdqud8rdqud8rdqu.png",
        elements: [
          {
            name: "Marble Mandirs",
            description:
              "Traditional intricate designs carved from premium solid marble.",
            image:
              "https://i.postimg.cc/ZqzDpNt5/Gemini-Generated-Image-ehqvmmehqvmmehqv.png",
            subModels: ["White Makarana", "Italian Marble"],
          },
          {
            name: "Intricate Carved Doors",
            description:
              "Detailed woodwork functioning as privacy screens and decor.",
            image:
              "https://i.postimg.cc/cHXJwthd/Gemini-Generated-Image-exjm9uexjm9uexjm.png",
            subModels: ["Teak Wood", "Brass Inlay"],
          },
          {
            name: "Backlit Onyx Panels",
            description:
              "Translucent stone panels that glow with warm ambient light.",
            image:
              "https://i.postimg.cc/cHXJwthq/Gemini-Generated-Image-1jm66o1jm66o1jm6.png",
            subModels: ["Warm Yellow", "Cool White"],
          },
        ],
        color:
          "bg-pink-50 text-pink-600 border-pink-100 group-hover:border-pink-200",
      },
    ],
  },
  {
    id: "furniture",
    name: "Bespoke Furniture",
    description:
      "Custom-crafted furniture tailored to your exact dimensions and lifestyle.",
    services: [
      {
        icon: Shirt,
        name: "Wardrobes",
        desc: "Walk-in and sliding wardrobes with smart storage systems.",
        image: "https://i.postimg.cc/SQv8HGv9/22.png",
        elements: [
          {
            name: "Sliding Doors",
            description:
              "Space-saving sliding mechanisms with soft-close features.",
            image: "https://i.postimg.cc/hvSh3bYB/Untitled-design-(9).png",
            subModels: ["Lacquered Glass", "Wooden Finish", "Mirror"],
          },
          {
            name: "Walk-in Closets",
            description:
              "Expansive open storage systems for dedicated dressing rooms.",
            image:
              "https://i.postimg.cc/zDc1QF6K/Gemini-Generated-Image-r3x93pr3x93pr3x9.png",
            subModels: ["Island Units", "Shoe Displays"],
          },
          {
            name: "Custom Organizers",
            description:
              "Specialized inserts for efficient and elegant storage.",
            image:
              "https://i.postimg.cc/dQxKfjp2/Gemini-Generated-Image-sq7zebsq7zebsq7z-(1).png",
            subModels: ["Jewelry Trays", "Tie Racks", "Pull-out Mirrors"],
          },
        ],
        color: "bg-purple-50 text-purple-600 border-purple-100",
      },
      {
        icon: Bed,
        name: "Beds & Hydraulic",
        desc: "Luxurious slumber spaces featuring hidden hydraulic utilities.",
        image: "https://i.postimg.cc/WpHrx7HF/21.png",
        elements: [
          {
            name: "Soft-back Headboard",
            description:
              "Plush, comfortable backing available in various premium fabrics.",
            image:
              "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&q=80&w=400",
            subModels: ["Tufted", "Panel", "Wingback"],
          },
          {
            name: "Hydraulic Storage",
            description:
              "Effortless lift mechanisms revealing spacious under-bed storage.",
            image: "https://i.postimg.cc/WzCkr2kh/7.png",
            subModels: ["Manual Lift", "Motorized Lift"],
          },
          {
            name: "Integrated Nightstands",
            description:
              "Seamlessly attached side tables for a cohesive master suite.",
            image:
              "https://i.postimg.cc/Jzk2sqFP/Gemini-Generated-Image-fpjyzkfpjyzkfpjy.png",
            subModels: ["Floating", "Attached with reading lights"],
          },
        ],
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      },
      {
        icon: Sparkles,
        name: "Dressing Tables",
        desc: "Elegant vanity setups with perfect lighting and mirrors.",
        image:
          "https://i.postimg.cc/FRp92mgb/Gemini-Generated-Image-wq00mywq00mywq00.png",
        elements: [
          {
            name: "Hollywood Mirrors",
            description:
              "Glamorous illuminated mirrors for perfect makeup application.",
            image:
              "https://i.postimg.cc/gj0Yp5Nv/Gemini-Generated-Image-q1amozq1amozq1am-(1).png",
            subModels: ["Bulb surround", "LED Strip"],
          },
          {
            name: "Jewelry Drawers",
            description:
              "Felt-lined, compartmentalized storage for precious items.",
            image:
              "https://i.postimg.cc/SRtmxrvB/Gemini-Generated-Image-qtcgysqtcgysqtcg.png",
            subModels: ["Velvet Lined", "Acrylic Dividers"],
          },
          {
            name: "Custom Poufs",
            description: "Comfortable, stylish seating that tucks away neatly.",
            image:
              "https://images.unsplash.com/photo-1565031491910-e57fac031c41?auto=format&fit=crop&q=80&w=400",
            subModels: ["Velvet", "Leather", "Faux Fur"],
          },
        ],
        color: "bg-rose-50 text-rose-600 border-rose-100",
      },
      {
        icon: Footprints,
        name: "Shoe Racks",
        desc: "Ventilated, sleek storage solutions for your footwear.",
        image:
          "https://i.postimg.cc/C16xcvrN/Gemini-Generated-Image-8gzfni8gzfni8gzf.png",
        elements: [
          {
            name: "Pull-out Trays",
            description:
              "Ergonomic sliding trays for easy access to deeper shelves.",
            image:
              "https://i.postimg.cc/J05B4w1b/Gemini-Generated-Image-uspjufuspjufuspj.png",
            subModels: ["Telescopic channels", "Soft close"],
          },
          {
            name: "Louvered Doors",
            description:
              "Slatted front panels ensuring proper ventilation for footwear.",
            image:
              "https://i.postimg.cc/SRfzN0yf/Gemini-Generated-Image-lnpljalnpljalnpl-(1).png",
            subModels: ["Teak wood", "MDF finished"],
          },
          {
            name: "Tall Boot Storage",
            description:
              "Adjustable or dedicated tall sections to prevent creasing.",
            image:
              "https://i.postimg.cc/wMQsTK6V/Gemini-Generated-Image-upckgfupckgfupck.png",
            subModels: ["Adjustable shelves", "Hanging clips"],
          },
        ],
        color: "bg-amber-50 text-amber-600 border-amber-100",
      },
      {
        icon: Baby,
        name: "Kids Space & Desks",
        desc: "Space-saving, safe, and playful designs for young ones.",
        image:
          "https://i.postimg.cc/1zs0Stmg/Gemini-Generated-Image-9oznra9oznra9ozn.png",
        elements: [
          {
            name: "Space-Saving Beds",
            description:
              "Multifunctional beds designed for growing children and siblings.",
            image:
              "https://i.postimg.cc/Xqmc6kq9/Gemini-Generated-Image-86rngr86rngr86rn.png",
            subModels: ["Bunk Beds", "Trundle Beds", "Loft Beds"],
          },
          {
            name: "Fold-away Desks",
            description:
              "Compact study areas that collapse to maximize play area.",
            image:
              "https://i.postimg.cc/VNm9w6fJ/Gemini-Generated-Image-ju6advju6advju6a.png",
            subModels: ["Wall-mounted", "Integrated in wardrobe"],
          },
          {
            name: "Play Centers",
            description:
              "Indoor activity zones constructed with child-safe materials.",
            image:
              "https://i.postimg.cc/C5zH2QhL/Gemini-Generated-Image-7629os7629os7629.png",
            subModels: ["Climbing Walls", "Reading Nooks"],
          },
        ],
        color: "bg-green-50 text-green-600 border-green-100",
      },
      {
        icon: BookOpen,
        name: "Study Tables",
        desc: "Ergonomic and stylish bespoke desks for focused work or study.",
        image: "https://i.postimg.cc/8kJQ3vb0/Untitled-design-(13).png",
        elements: [
          {
            name: "Ergonomic Workstations",
            description:
              "Custom heights and surfaces to support healthy posture.",
            subModels: ["Sit-stand enabled", "L-shaped"],
          },
          {
            name: "Integrated Storage",
            description:
              "Seamlessly built-in bookshelves and concealed file cabinets.",
            subModels: ["Overhead cabinets", "Under-desk drawers"],
          },
          {
            name: "Wire Management",
            description:
              "Built-in channels to keep cables hidden and desks clutter-free.",
            subModels: ["Grommets", "Concealed trays"],
          },
        ],
        color: "bg-teal-50 text-teal-600 border-teal-100",
      },
    ],
  },
  {
    id: "architectural",
    name: "Architectural & Aesthetic",
    description:
      "Structural and finishing touches that elevate the character of your home.",
    services: [
      {
        icon: PaintBucket,
        name: "Ceilings",
        desc: "Intricate false ceilings with ambient cove lighting.",
        image: "https://i.postimg.cc/9frv6CQC/67.png",
        elements: [
          {
            name: "Cove Lighting",
            description:
              "Hidden light strips reflecting off the ceiling for soft ambiance.",
            image:
              "https://i.postimg.cc/ryhbsB7k/Gemini-Generated-Image-rqvhzrrqvhzrrqvh.png",
            subModels: ["Warm White", "RGB Smart LED"],
          },
          {
            name: "Drop Ceilings",
            description:
              "Suspended panels housing recessed lights and hiding infrastructure.",
            image: "https://i.postimg.cc/fLPcnfq6/Code-Generated-Image.png",
            subModels: ["Gypsum Boards", "Grid patterns"],
          },
        ],
        color: "bg-cyan-50 text-cyan-600 border-cyan-100",
      },
      {
        icon: Hexagon,
        name: "CNC Work",
        desc: "Precision-cut patterned partitions and wall panels.",
        image: "https://i.postimg.cc/jjLGptSR/68.png",
        elements: [
          {
            name: "Room Dividers",
            description:
              "Elegant latticework to zone spaces without blocking light.",
            image:
              "https://i.postimg.cc/prJnXN28/Gemini-Generated-Image-kqy2v8kqy2v8kqy2.png",
            subModels: ["Geometric", "Floral", "Abstract"],
          },
          {
            name: "Wall Art Panels",
            description:
              "Statement accent walls featuring complex milled geometries.",
            image:
              "https://i.postimg.cc/5yg6Ww35/Gemini-Generated-Image-uh7sj2uh7sj2uh7s-(1).png",
            subModels: ["Backlit MDF", "Metallic finish"],
          },
          {
            name: "Mandir Grills",
            description:
              "Traditional motifs rendered via modern laser cutting.",
            image:
              "https://i.postimg.cc/5ySFNcxz/Gemini-Generated-Image-bwit4pbwit4pbwit.png",
            subModels: ["Brass finish", "White duco"],
          },
        ],
        color: "bg-fuchsia-50 text-fuchsia-600 border-fuchsia-100",
      },
      {
        icon: Lightbulb,
        name: "Lighting",
        desc: "Layered illumination for mood, task, and accent functionality.",
        image: "https://i.postimg.cc/N05W3BjY/69.png",
        elements: [
          {
            name: "Statement Chandeliers",
            description:
              "Sculptural hanging fixtures serving as room centerpieces.",
            image:
              "https://i.postimg.cc/YqcHt4VQ/Gemini-Generated-Image-s3eq54s3eq54s3eq.png",
            subModels: ["Crystal", "Modern Minimalist", "Industrial"],
          },
          {
            name: "Architectural Track Lights",
            description:
              "Flexible gallery-style lighting for art and features.",
            image:
              "https://i.postimg.cc/KzZbSCsJ/Gemini-Generated-Image-53acyn53acyn53ac-(1).png",
            subModels: ["Magnetic Tracks", "Surface mounted"],
          },
          {
            name: "Smart Dimmers",
            description:
              "Integrated control panels allowing precise light level tuning.",
            image:
              "https://i.postimg.cc/FKbv6hGg/Gemini-Generated-Image-boa5lfboa5lfboa5.png",
            subModels: ["Touch panels", "App controlled"],
          },
        ],
        color: "bg-yellow-50 text-yellow-600 border-yellow-100",
      },
      {
        icon: Tv,
        name: "TV Section",
        desc: "Sleek entertainment units and customized media walls.",
        image:
          "https://i.postimg.cc/pL4QSHyv/Gemini-Generated-Image-ttz2m3ttz2m3ttz2.png",
        elements: [
          {
            name: "Floating Consoles",
            description:
              "Wall-mounted sub-cabinets bringing a light, airy feel.",
            image:
              "https://i.postimg.cc/JhX3V2Bc/Gemini-Generated-Image-tbgkzztbgkzztbgk.png",
            subModels: ["Drawers", "Flap doors"],
          },
          {
            name: "Backlit Louver Panels",
            description:
              "Textured backdrop walls creating cinematic viewing experiences.",
            image:
              "https://i.postimg.cc/bNdtfB71/Gemini-Generated-Image-wmgvw6wmgvw6wmgv-(1).png",
            subModels: ["Charcoal", "Wood finish"],
          },
          {
            name: "Display Shelves",
            description:
              "Surrounding asymmetrical shelving for curated styling.",
            image:
              "https://i.postimg.cc/xTqzV4wK/Gemini-Generated-Image-c4rrgpc4rrgpc4rr.png",
            subModels: ["Glass shelves", "Open wooden boxes"],
          },
        ],
        color: "bg-slate-50 text-slate-600 border-slate-100",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized Segments",
    description:
      "Niche, high-end additions for a truly distinguished residence.",
    services: [
      {
        icon: Crown,
        name: "Boutique Designs",
        desc: "Ultra-luxury styling tailored for exclusive residential tastes.",
        image:
          "https://i.postimg.cc/mkBcZz2r/Gemini-Generated-Image-dslytidslytidsly-1.png",
        elements: [
          {
            name: "Ultra-Luxury Finishes",
            description:
              "Application of rare materials like onyx, liquid metal, and gold leaf.",
            subModels: ["Liquid Metal", "Gold Leafing"],
          },
          {
            name: "Curated Art",
            description:
              "Procurement of striking centerpieces and gallery-worthy artwork.",
            subModels: ["Oversized Canvas", "Metal Sculptures"],
          },
          {
            name: "Signature Monogramming",
            description:
              "Bespoke branding across linens, hardware, and entranceways.",
            subModels: ["Cushions", "Entrance Mats"],
          },
        ],
        color: "bg-amber-100 text-amber-700 border-amber-200",
      },
      {
        icon: Clapperboard,
        name: "Home Theatre & Acoustics",
        desc: "Immersive sound-treated audio-visual rooms.",
        image: "https://i.postimg.cc/BZVDRCwk/13.png",
        elements: [
          {
            name: "Acoustic Paneling",
            description:
              "Advanced diffusion and absorption for reference-grade sound.",
            subModels: ["Fabric panels", "Wooden diffusers"],
          },
          {
            name: "Tiered Seating",
            description:
              "Elevated cinema layouts featuring motorized reclining chairs.",
            subModels: ["Motorized Recliners", "Loveseats"],
          },
          {
            name: "Starlight Ceilings",
            description:
              "Fiber-optic ceiling installations replicating the night sky.",
            subModels: ["Shooting star effect", "Constellations"],
          },
        ],
        color: "bg-red-50 text-red-600 border-red-100",
      },
      {
        icon: Router,
        name: "Smart Home",
        desc: "Seamless voice and app-controlled home ecosystems.",
        image:
          "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
        elements: [
          {
            name: "Voice Control",
            description:
              "Centralized hubs managing lighting, climate, and media via voice.",
            subModels: ["Alexa Integration", "Google Home"],
          },
          {
            name: "Automated Curtains",
            description:
              "Motorized window treatments synced to schedules or sensors.",
            subModels: ["Sheer automation", "Blackout drapes"],
          },
          {
            name: "Biometric Security",
            description:
              "Keyless entry systems including fingerprint and facial recognition.",
            subModels: ["Smart Door Locks", "Video Doorbells"],
          },
        ],
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      },
      {
        icon: Hotel,
        name: "Hotel Suite Rooms",
        desc: "Luxurious and opulent suite layouts replicating five-star hospitality.",
        image:
          "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800",
        elements: [
          {
            name: "Presidential Layouts",
            description:
              "Expansive room plans incorporating lounge areas and sleeping quarters.",
            subModels: ["Open Concept", "Divided Spaces"],
          },
          {
            name: "Sumptuous Bedding Details",
            description:
              "Oversized headboards upholstered in premium fabrics with integrated lighting.",
            subModels: ["Tufted Leather", "Velvet Panels"],
          },
          {
            name: "In-Suite Amenities",
            description:
              "Integrated minibar cellars, espresso stations, and walk-in dressing areas.",
            subModels: ["Wine Coolers", "Coffee Bars"],
          },
        ],
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      },
    ],
  },
  {
    id: "visualization",
    name: "2D & 3D Visualization",
    description:
      "Immersive previews and exact layouts to bring your vision to life before construction.",
    services: [
      {
        icon: Cuboid,
        name: "3D Walkthroughs",
        desc: "Realistic, immersive 3D virtual tours of your space.",
        image:
          "https://i.postimg.cc/8CNQMh4N/Gemini-Generated-Image-k36hcvk36hcvk36h.png",
        color: "bg-indigo-50 text-indigo-600 border-indigo-100",
      },
      {
        icon: PenTool,
        name: "2D Floor Plans",
        desc: "Accurate architectural layouts for precise space planning.",
        image:
          "https://i.postimg.cc/g2NFyxTd/Gemini-Generated-Image-aqy7vlaqy7vlaqy7.png",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      },
      {
        icon: PenTool,
        name: "2D Render",
        desc: "Beautifully colored and textured 2D top-down views.",
        image:
          "https://i.postimg.cc/50k2sPKp/Gemini-Generated-Image-98wqr498wqr498wq.png",
        color: "bg-emerald-50 text-emerald-600 border-emerald-100",
      },
    ],
  },
  {
    id: "renovation",
    name: "Renovation",
    description:
      "Transform your existing spaces into stunning, modern environments.",
    services: [
      {
        icon: Hammer,
        name: "Full Home Renovation",
        desc: "Complete transformation of your entire living space.",
        image: "https://i.postimg.cc/GtqPMpqV/Untitled-design-(10).png",
        elements: [
          {
            name: "Structural Changes",
            description: "Modifying walls and layouts for better flow.",
          },
          {
            name: "Complete Overhaul",
            description:
              "End-to-end renovation including plumbing and electricals.",
          },
        ],
        color: "bg-orange-50 text-orange-600 border-orange-100",
      },
      {
        icon: Hammer,
        name: "Kitchen & Bath Remodeling",
        desc: "Modernize and upgrade your most essential spaces.",
        image: "https://i.postimg.cc/D02mYdNK/Untitled-design-(8).png",
        elements: [
          {
            name: "Kitchen Updates",
            description: "New countertops, cabinets, and appliances.",
          },
          {
            name: "Bathroom Upgrades",
            description: "Modern fixtures, tiling, and vanities.",
          },
        ],
        color: "bg-orange-50 text-orange-600 border-orange-100",
      },
    ],
  },
];

const InteractiveConfigurator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"upper" | "counter" | "lower">(
    "upper",
  );
  const [upperColor, setUpperColor] = useState("hgWhite");
  const [lowerColor, setLowerColor] = useState("matteCharcoal");
  const [counterColor, setCounterColor] = useState("quartzWhite");

  const kitchenColors: Record<
    string,
    {
      name: string;
      hex: string;
      text: string;
      shadow?: string;
      border?: string;
    }
  > = {
    // High Gloss
    hgWhite: {
      name: "Gloss Snow White",
      hex: "#ffffff",
      text: "text-gray-900",
      shadow: "inset 0 0 10px rgba(255,255,255,0.8), 0 2px 4px rgba(0,0,0,0.1)",
      border: "#f3f4f6",
    },
    hgCream: {
      name: "Gloss Cream",
      hex: "#fdfbf7",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.7)",
      border: "#ececdc",
    },
    hgVanilla: {
      name: "Gloss Vanilla",
      hex: "#f3e5ab",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.5)",
      border: "#e6d89e",
    },
    hgLatte: {
      name: "Gloss Latte",
      hex: "#d2b48c",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.4)",
      border: "#c5a77f",
    },
    hgDove: {
      name: "Gloss Dove Grey",
      hex: "#e0e4e8",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.6)",
      border: "#d3d7db",
    },
    hgAsh: {
      name: "Gloss Ash Grey",
      hex: "#b2beb5",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.5)",
      border: "#a5b1a8",
    },
    hgGraphite: {
      name: "Gloss Graphite",
      hex: "#4b4b4b",
      text: "text-white",
      shadow: "inset 0 0 12px rgba(255,255,255,0.2)",
    },
    hgBlack: {
      name: "Gloss Midnight",
      hex: "#111111",
      text: "text-white",
      shadow: "inset 0 0 15px rgba(255,255,255,0.15)",
    },
    hgNavy: {
      name: "Gloss Royal Navy",
      hex: "#000080",
      text: "text-white",
      shadow: "inset 0 0 10px rgba(255,255,255,0.2)",
    },
    hgOcean: {
      name: "Gloss Deep Ocean",
      hex: "#006666",
      text: "text-white",
      shadow: "inset 0 0 10px rgba(255,255,255,0.2)",
    },
    hgEmerald: {
      name: "Gloss Emerald",
      hex: "#50c878",
      text: "text-gray-900",
      shadow: "inset 0 0 10px rgba(255,255,255,0.3)",
    },
    hgRuby: {
      name: "Gloss Ruby",
      hex: "#9b111e",
      text: "text-white",
      shadow: "inset 0 0 12px rgba(255,255,255,0.2)",
    },
    hgBlush: {
      name: "Gloss Blush",
      hex: "#f4c2c2",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.5)",
    },
    hgSky: {
      name: "Gloss Sky Blue",
      hex: "#87ceeb",
      text: "text-gray-900",
      shadow: "inset 0 0 8px rgba(255,255,255,0.5)",
    },
    hgPlum: {
      name: "Gloss Plum",
      hex: "#8e4585",
      text: "text-white",
      shadow: "inset 0 0 10px rgba(255,255,255,0.2)",
    },
    // Matte
    matteWhite: {
      name: "Matte Pure White",
      hex: "#fdfdfd",
      text: "text-gray-900",
      shadow: "none",
      border: "#e5e7eb",
    },
    matteChalk: {
      name: "Matte Chalk",
      hex: "#f0ede5",
      text: "text-gray-900",
      shadow: "none",
      border: "#e3e0d8",
    },
    mattePebble: {
      name: "Matte Pebble",
      hex: "#d9d6d0",
      text: "text-gray-900",
      shadow: "none",
      border: "#ccc9c3",
    },
    matteGreige: {
      name: "Matte Greige",
      hex: "#b5a898",
      text: "text-gray-900",
      shadow: "none",
      border: "#a89b8b",
    },
    matteTaupe: {
      name: "Matte Taupe",
      hex: "#8b8589",
      text: "text-white",
      shadow: "none",
      border: "#7e787c",
    },
    matteCharcoal: {
      name: "Matte Charcoal",
      hex: "#36454f",
      text: "text-white",
      shadow: "none",
      border: "#293842",
    },
    matteOnyx: {
      name: "Matte Onyx",
      hex: "#353839",
      text: "text-white",
      shadow: "none",
      border: "#282b2c",
    },
    matteOlive: {
      name: "Matte Olive",
      hex: "#556b2f",
      text: "text-white",
      shadow: "none",
      border: "#485e22",
    },
    matteSage: {
      name: "Matte Sage",
      hex: "#9dc183",
      text: "text-gray-900",
      shadow: "none",
      border: "#90b476",
    },
    matteForest: {
      name: "Matte Forest",
      hex: "#228b22",
      text: "text-white",
      shadow: "none",
      border: "#157e15",
    },
    matteMustard: {
      name: "Matte Mustard",
      hex: "#ffdb58",
      text: "text-gray-900",
      shadow: "none",
      border: "#f2ce4b",
    },
    matteTerracotta: {
      name: "Matte Terracotta",
      hex: "#e2725b",
      text: "text-white",
      shadow: "none",
      border: "#d5654e",
    },
    matteNavy: {
      name: "Matte Navy",
      hex: "#000080",
      text: "text-white",
      shadow: "none",
      border: "#000073",
    },
    matteSlate: {
      name: "Matte Slate",
      hex: "#708090",
      text: "text-white",
      shadow: "none",
      border: "#637383",
    },
    matteDustyRose: {
      name: "Matte Dusty Rose",
      hex: "#dcae96",
      text: "text-gray-900",
      shadow: "none",
      border: "#cfa189",
    },
    // Wood & Naturals
    woodLightOak: {
      name: "Light Oak",
      hex: "#deb887",
      text: "text-gray-900",
      shadow: "none",
      border: "#d1ab7a",
    },
    woodWalnut: {
      name: "Dark Walnut",
      hex: "#5c4033",
      text: "text-white",
      shadow: "none",
      border: "#4f3326",
    },
    woodMahogany: {
      name: "Mahogany",
      hex: "#c04000",
      text: "text-white",
      shadow: "none",
      border: "#b33300",
    },
    woodCherry: {
      name: "Cherry Wood",
      hex: "#912a1f",
      text: "text-white",
      shadow: "none",
      border: "#841d12",
    },
    woodMaple: {
      name: "Maple",
      hex: "#f5d5a0",
      text: "text-gray-900",
      shadow: "none",
      border: "#e8c893",
    },
    woodTeak: {
      name: "Teak",
      hex: "#b87333",
      text: "text-white",
      shadow: "none",
      border: "#ab6626",
    },
    // Countertops
    quartzWhite: {
      name: "Quartz White",
      hex: "#fcfcfc",
      text: "text-gray-900",
      shadow: "inset 0 0 5px rgba(0,0,0,0.05)",
      border: "#f0f0f0",
    },
    quartzCalacatta: {
      name: "Calacatta Base",
      hex: "#faf9f6",
      text: "text-gray-900",
      shadow: "inset 0 0 5px rgba(0,0,0,0.05)",
      border: "#edece9",
    },
    quartzCarrara: {
      name: "Carrara Base",
      hex: "#f3f4f5",
      text: "text-gray-900",
      shadow: "inset 0 0 5px rgba(0,0,0,0.05)",
      border: "#e6e7e8",
    },
    quartzConcrete: {
      name: "Concrete",
      hex: "#b0b3b8",
      text: "text-gray-900",
      shadow: "none",
      border: "#a3a6ab",
    },
    quartzBlack: {
      name: "Absolute Black",
      hex: "#0a0a0a",
      text: "text-white",
      shadow: "inset 0 0 8px rgba(255,255,255,0.1)",
      border: "#000000",
    },
    quartzSparkle: {
      name: "Black Sparkle",
      hex: "#1c1c1c",
      text: "text-white",
      shadow: "inset 0 0 10px rgba(255,255,255,0.2)",
      border: "#0f0f0f",
    },
    quartzGrey: {
      name: "Grey Quartz",
      hex: "#808080",
      text: "text-white",
      shadow: "inset 0 0 5px rgba(0,0,0,0.05)",
      border: "#737373",
    },
    quartzSand: {
      name: "Sandstone",
      hex: "#d2b48c",
      text: "text-gray-900",
      shadow: "none",
      border: "#c5a77f",
    },
    quartzTerrazzo: {
      name: "Terrazzo Light",
      hex: "#e8e5e1",
      text: "text-gray-900",
      shadow: "none",
      border: "#dbd8d4",
    },
    quartzEmerald: {
      name: "Emerald Pearl",
      hex: "#203020",
      text: "text-white",
      shadow: "inset 0 0 5px rgba(255,255,255,0.1)",
      border: "#132313",
    },
  };

  const ColorPickerContent = ({
    value,
    onChange,
  }: {
    value: string;
    onChange: (val: string) => void;
  }) => (
    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar max-h-64 sm:max-h-80">
      <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-2">
        {Object.keys(kitchenColors).map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              value === key
                ? "border-brand-gold scale-110 z-10 ring-2 ring-brand-gold/30"
                : "border-transparent shadow-sm hover:scale-105"
            }`}
            style={{
              backgroundColor: kitchenColors[key].hex,
              boxShadow: kitchenColors[key].shadow || "none",
              borderColor:
                value === key
                  ? "#d4af37"
                  : kitchenColors[key].border || "transparent",
            }}
            title={kitchenColors[key].name}
          >
            {value === key && (
              <CheckCircle2
                className={`w-4 h-4 ${kitchenColors[key].text}`}
                style={{ filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.3))" }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 p-3 bg-white rounded-lg border border-gray-100 shadow-sm flex items-center">
        <div
          className="w-8 h-8 rounded-full shadow-inner mr-3"
          style={{
            backgroundColor: kitchenColors[value].hex,
            boxShadow: kitchenColors[value].shadow || "none",
            border: `1px solid ${kitchenColors[value].border || "#eee"}`,
          }}
        ></div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold mb-0.5">
            Selected Color
          </p>
          <p className="text-sm font-bold text-gray-900">
            {kitchenColors[value].name}
          </p>
        </div>
      </div>
    </div>
  );

  if (!isOpen) {
    return (
      <div className="mt-16 sm:mt-24 text-center">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex flex-col items-center px-8 py-6 bg-gradient-to-br from-gray-50 to-gray-100 text-brand-grey font-bold uppercase tracking-wider rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-200 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1 group"
        >
          <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <Sliders className="w-8 h-8 text-brand-gold" />
          </div>
          <span className="text-lg">Open Kitchen Configurator</span>
          <span className="text-xs text-gray-500 mt-2 normal-case font-medium">
            Check your layout look alike (Click here)
          </span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-20 bg-gray-50 rounded-2xl shadow-xl border border-gray-200 overflow-hidden text-left flex flex-col md:flex-row">
      {/* Configurator Left Sidebar */}
      <div className="w-full md:w-6/12 p-4 sm:p-6 border-b md:border-b-0 md:border-r border-gray-200 bg-white flex flex-col h-full">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3 text-brand-gold">
            <Sliders className="w-5 h-5" />
            <h4 className="text-sm sm:text-lg font-bold font-display text-brand-grey uppercase tracking-wider">
              Kitchen Configurator
            </h4>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
        `,
          }}
        />

        <div className="flex space-x-1 border-b border-gray-200 mb-6 bg-gray-50 p-1 rounded-t-lg">
          <button
            onClick={() => setActiveTab("upper")}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === "upper" ? "bg-white shadow-sm text-brand-gold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
          >
            Upper Cabinets
          </button>
          <button
            onClick={() => setActiveTab("counter")}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === "counter" ? "bg-white shadow-sm text-brand-gold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
          >
            Countertop
          </button>
          <button
            onClick={() => setActiveTab("lower")}
            className={`flex-1 py-3 text-[10px] sm:text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === "lower" ? "bg-white shadow-sm text-brand-gold" : "text-gray-500 hover:text-gray-800 hover:bg-gray-100"}`}
          >
            Lower Cabinets
          </button>
        </div>

        {activeTab === "upper" && (
          <ColorPickerContent value={upperColor} onChange={setUpperColor} />
        )}
        {activeTab === "counter" && (
          <ColorPickerContent value={counterColor} onChange={setCounterColor} />
        )}
        {activeTab === "lower" && (
          <ColorPickerContent value={lowerColor} onChange={setLowerColor} />
        )}
      </div>

      {/* Configurator Right Visualization Area */}
      <div
        className="w-full md:w-6/12 p-4 sm:p-8 flex flex-col items-center justify-center min-h-[400px] relative overflow-hidden"
        style={{ backgroundColor: "#eef2f6" }}
      >
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, #9ca3af 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Simple Front-Facing L-Shape Kitchen Illustration */}
        <div className="relative w-full max-w-[400px] aspect-[4/3] bg-white rounded-lg p-5 flex flex-col justify-end shadow-2xl border border-gray-200">
          {/* Main Back Wall Upper Cabinets */}
          <div className="absolute top-5 left-5 right-24 h-28 flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex-1 rounded shadow-sm border border-black/5"
                animate={{ backgroundColor: kitchenColors[upperColor].hex }}
                style={{
                  boxShadow: kitchenColors[upperColor].shadow || "none",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>

          {/* Right Return Upper Cabinet (The "L" shape) */}
          <motion.div
            className="absolute top-5 right-5 w-[70px] h-28 rounded shadow-sm border border-black/5"
            animate={{ backgroundColor: kitchenColors[upperColor].hex }}
            style={{
              filter: "brightness(0.92)",
              boxShadow: kitchenColors[upperColor].shadow || "none",
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Backsplash */}
          <div
            className="absolute top-[132px] left-5 right-5 h-20 bg-white grid gap-1 p-1 opacity-90"
            style={{
              gridTemplateColumns: "repeat(12, 1fr)",
              gridTemplateRows: "1fr 1fr",
            }}
          >
            {Array.from({ length: 24 }).map((_, i) => (
              <div key={i} className="bg-gray-50 rounded-sm shadow-sm" />
            ))}
          </div>

          {/* Countertop */}
          <motion.div
            className="absolute top-[212px] left-5 right-5 h-4 z-10 rounded shadow-md border border-black/10"
            animate={{ backgroundColor: kitchenColors[counterColor].hex }}
            style={{ boxShadow: kitchenColors[counterColor].shadow || "none" }}
            transition={{ duration: 0.3 }}
          />

          {/* Main Back Wall Lower Cabinets */}
          <div className="absolute top-[228px] left-5 right-24 bottom-5 flex gap-1">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="flex-1 rounded-sm shadow-lg border border-black/5 flex items-start justify-center pt-3"
                animate={{ backgroundColor: kitchenColors[lowerColor].hex }}
                style={{
                  boxShadow: kitchenColors[lowerColor].shadow || "none",
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-5 h-1.5 bg-black/10 rounded-full" />
              </motion.div>
            ))}
          </div>

          {/* Right Return Lower Cabinet (The "L" shape base) */}
          <motion.div
            className="absolute top-[228px] right-5 w-[70px] bottom-5 rounded-sm shadow-xl border border-black/5 flex items-start justify-center pt-3"
            animate={{ backgroundColor: kitchenColors[lowerColor].hex }}
            style={{
              filter: "brightness(0.92)",
              boxShadow: kitchenColors[lowerColor].shadow || "none",
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-1.5 h-5 bg-black/10 rounded-full" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const Services: React.FC = () => {
  const [activeTab, setActiveTab] = useState(serviceCategories[0].id);
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(
    null,
  );
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCategory =
    serviceCategories.find((c) => c.id === activeTab) || serviceCategories[0];

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  useEffect(() => {
    // Prevent scrolling when modal is open
    if (selectedService) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedService]);

  return (
    <section
      id="services"
      className="py-24 bg-transparent selection:bg-gray-200 selection:text-gray-900 relative"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-8 flex flex-col items-center">
          <h2 className="inline-block border-2 border-sky-200 bg-white text-sky-900 px-8 py-2 md:py-3 rounded-t-2xl rounded-b-lg text-3xl md:text-4xl font-bold tracking-tight mb-3 shadow-[0_-4px_10px_rgba(224,242,254,0.5)]">
            Comprehensive Interior Segments
          </h2>
          <p className="text-base md:text-lg text-gray-800 font-semibold whitespace-nowrap overflow-hidden text-ellipsis max-w-full">
            From core architecture to bespoke furnishings, we curate every
            aspect of your living space.
          </p>
        </div>

        {/* Flat Navigation / Tabs */}
        <div 
          className="flex overflow-x-auto justify-start md:justify-center gap-2 sm:gap-4 mb-6 pb-2 w-full px-2 md:px-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {serviceCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex-shrink-0 px-5 py-3 sm:px-6 rounded-full text-sm md:text-base font-semibold transition-all duration-300 flex items-center justify-center text-center leading-tight whitespace-nowrap ${
                activeTab === cat.id
                  ? "bg-sky-500 text-white shadow-lg shadow-sky-500/20 border border-transparent"
                  : "bg-sky-50 text-sky-700 border border-sky-200 hover:border-sky-300 hover:bg-sky-100 hover:text-sky-800"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Category Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="mb-16"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">
                {activeCategory.name}
              </h3>
              <div className="flex items-center gap-2 py-1.5 px-3">
                <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider hidden sm:inline-block">
                  See More
                </span>
              </div>
            </div>

            <div className="relative group/slider">
              <div
                ref={scrollContainerRef}
                className="flex overflow-x-auto pb-8 gap-6 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
              >
                {activeCategory.services.map((service, index) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    key={index}
                    onClick={() =>
                      service.elements ? setSelectedService(service) : null
                    }
                    className={`snap-center shrink-0 w-[85vw] sm:w-[320px] lg:w-[300px] bg-white hover:-translate-y-1 transition-all duration-300 group flex flex-col items-start overflow-hidden rounded-2xl border border-gray-100 ${service.elements ? "cursor-pointer hover:shadow-xl" : "hover:shadow-md"} relative`}
                  >
                    {service.image && (
                      <div className="w-full h-40 overflow-hidden relative">
                        <div
                          className="absolute inset-0 bg-brand-black/20 mix-blend-multiply z-10 
                                      group-hover:opacity-0 transition-opacity duration-500"
                        />
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    )}

                    <div className="p-4 flex flex-col w-full min-h-[100px]">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-xl font-bold text-brand-grey leading-tight">
                          {service.name}
                        </h4>
                      </div>

                      <div className="w-full flex justify-end items-center mt-auto pt-3">
                        {service.elements ? (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 flex items-center hover:text-sky-700 transition-colors duration-300">
                            View Details{" "}
                            <ArrowRight className="ml-1.5 w-3 h-3" />
                          </span>
                        ) : (
                          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-600 flex items-center hover:text-sky-700 transition-colors duration-300">
                            Explore <ArrowRight className="ml-1.5 w-3 h-3" />
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: activeCategory.services.length * 0.1,
                    duration: 0.4,
                  }}
                  className="snap-center shrink-0 w-[150px] sm:w-[180px] bg-white hover:bg-yellow-50 hover:-translate-y-1 transition-all duration-300 group flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-gray-200 hover:border-yellow-300 cursor-pointer min-h-[250px]"
                >
                  <div className="p-4 rounded-full bg-yellow-50 group-hover:bg-yellow-400 text-yellow-500 group-hover:text-white transition-all duration-300 shadow-sm mb-3">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                  <span className="text-[12px] mt-2 font-bold uppercase tracking-wider text-gray-400 group-hover:text-yellow-600 transition-colors">
                    See More
                  </span>
                </motion.div>
              </div>

              {/* Gradient overlay with big arrow on the right */}
              <div className="absolute right-0 top-0 bottom-8 z-10 w-24 sm:w-32 bg-gradient-to-l from-white via-white/80 to-transparent flex items-center justify-end pr-2 sm:pr-4 pointer-events-none">
                <button
                  onClick={scrollRight}
                  className="bg-white/90 backdrop-blur shadow-md p-2 sm:p-3 rounded-full text-gray-400 hover:text-yellow-600 transition-colors pointer-events-auto cursor-pointer border border-gray-100/50"
                  aria-label="Scroll right"
                >
                  <ChevronRight className="w-8 h-8 sm:w-10 sm:h-10" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Modal for Service Details */}
        <AnimatePresence>
          {selectedService && selectedService.elements && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedService(null)}
                className="absolute inset-0 bg-brand-black/40 backdrop-blur-[2px]"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-5xl bg-white/95 backdrop-blur-3xl rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.3)] overflow-hidden z-10 flex flex-col md:flex-row border border-white/20"
              >
                {/* Mobile Back Button */}
                <button
                  onClick={() => setSelectedService(null)}
                  className="md:hidden absolute top-4 left-4 z-20 flex items-center gap-1 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-sm font-medium text-gray-800 shadow-md border border-gray-200/50"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>

                <button
                  onClick={() => setSelectedService(null)}
                  className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full text-gray-800 hover:bg-gray-100 transition-all shadow-md border border-gray-200/50"
                >
                  <X className="w-5 h-5" strokeWidth={2.5} />
                </button>

                {/* Left Side: Main Info & Image */}
                <div className="w-full md:w-5/12 relative flex flex-col bg-gray-50 border-r border-gray-100 shrink-0">
                  {selectedService.image ? (
                    <div className="w-full h-48 md:h-64 relative shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                      <img
                        src={selectedService.image}
                        alt={selectedService.name}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="p-8 pb-0"></div>
                  )}

                  <div className="p-6 lg:p-8 flex-1">
                    <h3 className="text-3xl font-display font-bold text-gray-900 mb-4 tracking-tight leading-tight">
                      {selectedService.name}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {selectedService.desc}
                    </p>
                  </div>
                </div>

                {/* Right Side: Elements List (Vertical) */}
                <div
                  className="w-full md:w-7/12 p-6 lg:p-8 flex flex-col max-h-[85vh] overflow-y-auto"
                  style={{ scrollbarWidth: "thin" }}
                >
                  {selectedService.elements &&
                  selectedService.elements.length > 0 ? (
                    <div className="flex-1 flex flex-col">
                      <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-400 mb-6 pb-2 border-b border-gray-100 flex items-center">
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Detail
                        Segments & Options
                      </h4>

                      <div className="flex flex-col space-y-6">
                        {selectedService.elements.map(
                          (el: ServiceElement, idx: number) => (
                            <motion.div
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.1 + idx * 0.1 }}
                              key={idx}
                              className="group flex flex-col sm:flex-row gap-3 bg-white p-3 rounded-xl border border-sky-100 hover:border-sky-300 hover:shadow-md transition-all duration-300"
                            >
                              {/* Element Image */}
                              {el.image && (
                                <div className="w-full sm:w-24 h-24 shrink-0 rounded-lg overflow-hidden relative">
                                  <img
                                    src={el.image}
                                    alt={el.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                  />
                                </div>
                              )}

                              {/* Element Details */}
                              <div className="flex-1 flex flex-col justify-start overflow-hidden py-1">
                                <div className="mb-1.5">
                                  <span className="inline-block bg-sky-100 text-sky-900 px-2.5 py-1 rounded-t-lg rounded-br-lg text-sm font-bold shadow-sm whitespace-normal leading-tight border border-sky-200">
                                    {el.name}
                                  </span>
                                </div>
                                <p
                                  className="text-[11px] text-gray-500 mb-2 truncate"
                                  title={el.description}
                                >
                                  {el.description}
                                </p>

                                {el.subModels && el.subModels.length > 0 && (
                                  <div className="mt-auto">
                                    <div className="flex flex-wrap gap-1.5">
                                      {el.subModels.map((sub, sidx) => (
                                        <span
                                          key={sidx}
                                          className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-sky-50 border border-sky-100 text-[9px] text-sky-700 font-bold tracking-wider uppercase whitespace-nowrap"
                                        >
                                          {sub}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ),
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                      <p>Details mapping in progress...</p>
                    </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-100 shrink-0 flex justify-end">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="px-8 py-3 bg-brand-black text-white rounded-lg hover:bg-brand-gold transition-colors font-semibold shadow-md"
                    >
                      Close Detail View
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Interactive Feature (UX enhancement as requested) */}
        <InteractiveConfigurator />
      </div>
    </section>
  );
};

export default Services;
