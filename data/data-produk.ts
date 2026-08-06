// ─── Import data varian per produk ─────────────────────────────────────────────
import MortindoVariants from "./mortindo";
import SemenmerahputihVariants from "./semenmerahputih";
import DrymixVariants from "./drymix";
import ZiegelVariants from "./ziegel";
import M1Variants from "./m1";
import WavinVariants from "./wavin";
import AvaVariants from "./ava";
import ServvoVariants from "./servvo";
import AerVariants from "./aer";
import AirVariants from "./air";
import en from "@/messages/en.json";

type productMessages = typeof en.product;
export type ProductTranslationKey = keyof productMessages;

// ─── Type Definition ──────────────────────────────────────────────────────────

// Kategori tab varian — dipakai bareng di Tab.tsx
export type VariantCategory = "Spesifikasi" | "Tipe" | "kontak";

export type ProductVariant = {
  id?: number | string;
  name: string;
  image?: string;
  size?: string;
  color?: string;
  weight?: string;
  description?: string;
  price?: number;
  category?: VariantCategory;
  [key: string]: string | number | undefined;
};

export type Product = {
  id: number;
  name: string;
  slug: string;
  image: string;
  gambarUtama: string;
  namaBrand: string;
  logoSrc: string;
  descKey: ProductTranslationKey;
  category: "building" | "sanitary" | "safety";
  rating: number;
  reviews: number;
  href: string;
  discount?: string;
  price?: number;
  itemsBadge?: string;
  featuresKeys: ProductTranslationKey[];
  gallery?: string[];
  variants: ProductVariant[];
};

// ─── Data ─────────────────────────────────────────────────────────────────────
const produkDetailList: Product[] = [
  {
    id: 1,
    name: "Semen Merahputih",
    slug: "semenmerahputih",
    image: "/images/produk/Semen Merah-Putih.png",
    gambarUtama: "/images/produk/Semen Merah-Putih.png",
    namaBrand: "Semen Merahputih",
    logoSrc: "/images/produk/A/SE/logo-semen.webp",
    descKey: "semenmerahputih_desc",
    gallery: ["/images/produk/Semen Merah-Putih.png"],
    featuresKeys: [
      "semenmerahputih_features_1",
      "semenmerahputih_features_2",
      "semenmerahputih_features_3",
      "semenmerahputih_features_4",
      "semenmerahputih_features_5",
    ],
    category: "building",
    rating: 5,
    reviews: 175,
    discount: "",
    itemsBadge: "4 Items",
    href: "/produk/semenmerahputih",
    variants: SemenmerahputihVariants,
  },
  {
    id: 2,
    name: "Mortindo",
    slug: "mortindo",
    image: "/images/produk/Mortindo.png",
    gambarUtama: "/images/produk/Mortindo.png",
    namaBrand: "Mortindo",
    logoSrc: "/images/produk/A/MO/logo-mortindo.png",
    descKey: "mortindo_desc",
    gallery: ["/images/produk/Mortindo.png"],
    featuresKeys: [
      "mortindo_features_1",
      "mortindo_features_2",
      "mortindo_features_3",
      "mortindo_features_4",
      "mortindo_features_5",
      "mortindo_features_6",
    ],
    category: "building",
    rating: 5,
    reviews: 340,
    itemsBadge: "5 Items",
    href: "/produk/mortindo",
    variants: MortindoVariants,
  },
  {
    id: 3,
    name: "Drymix",
    slug: "drymix",
    image: "/images/produk/Drymix.png",
    gambarUtama: "/images/produk/Drymix.png",
    namaBrand: "Drymix",
    logoSrc: "/images/produk/A/DR/logo-drymix.png",
    descKey: "drymix_desc",
    featuresKeys: [
      "drymix_features_1",
      "drymix_features_2",
      "drymix_features_3",
      "drymix_features_4",
      "drymix_features_5",
      "drymix_features_6",
    ],
    category: "building",
    rating: 5,
    reviews: 236,
    discount: "",
    itemsBadge: "5 Items",
    href: "/produk/drymix",
    variants: DrymixVariants,
  },
  {
    id: 4,
    name: "Wavin",
    slug: "wavin",
    price: 129900,
    image: "/images/produk/Wavin.png",
    gambarUtama: "/images/produk/Wavin.png",
    namaBrand: "Wavin",
    logoSrc: "/images/produk/A/WV/logo-wavin.png",
    descKey: "wavin_desc",
    featuresKeys: [
      "wavin_features_1",
      "wavin_features_2",
      "wavin_features_3",
      "wavin_features_4",
      "wavin_features_5",
      "wavin_features_6",
    ],
    category: "building",
    rating: 5,
    reviews: 165,
    discount: "",
    itemsBadge: "6 Items",
    href: "/produk/wavin",
    variants: WavinVariants,
  },
  {
    id: 5,
    name: "Ziegel",
    slug: "ziegel",
    image: "/images/produk/Ziegel.png",
    gambarUtama: "/images/produk/Ziegel.png",
    namaBrand: "Ziegel",
    logoSrc: "/images/produk/A/ZI/logo-ziegel.png",
    descKey: "ziegel_desc",
    featuresKeys: [
      "ziegel_features_1",
      "ziegel_features_2",
      "ziegel_features_3",
      "ziegel_features_4",
      "ziegel_features_5",
      "ziegel_features_6",
    ],
    category: "building",
    rating: 5,
    reviews: 340,
    itemsBadge: "1 Items",
    href: "/produk/ziegel",
    variants: ZiegelVariants,
  },
  {
    id: 6,
    name: "M1 Waterproofing",
    slug: "m1",
    image: "/images/produk/M1.png",
    gambarUtama: "/images/produk/M1.png",
    namaBrand: "M1 Waterproofing",
    logoSrc: "/images/produk/A/M1/logo-m1.png",
    descKey: "m1_desc",
    featuresKeys: [
      "m1_features_1",
      "m1_features_2",
      "m1_features_3",
      "m1_features_4",
      "m1_features_5",
    ],
    category: "building",
    rating: 5,
    reviews: 340,
    itemsBadge: "1 Items",
    href: "/produk/m1",
    variants: M1Variants,
  },
  {
    id: 7,
    name: "Servvo",
    slug: "servvo",
    image: "/images/produk/Servvo.png",
    gambarUtama: "/images/produk/Servvo.png",
    namaBrand: "Servvo",
    logoSrc: "/images/produk/A/SV/logo-servvo.png",
    descKey: "servvo_desc",
    featuresKeys: [
      "servvo_features_1",
      "servvo_features_2",
      "servvo_features_3",
      "servvo_features_4",
      "servvo_features_5",
      "servvo_features_6",
    ],
    category: "safety",
    rating: 5,
    reviews: 330,
    itemsBadge: "8 Items",
    href: "/produk/servvo",
    variants: ServvoVariants,
  },
  {
    id: 8,
    name: "Air",
    slug: "air",
    image: "/images/produk/AIRR.png",
    gambarUtama: "/images/produk/AIRR.png",
    namaBrand: "Air",
    logoSrc: "/images/produk/A/AI/logo-air.png",
    descKey: "air_desc",
    featuresKeys: [
      "air_features_1",
      "air_features_2",
      "air_features_3",
      "air_features_4",
      "air_features_5",
    ],
    category: "sanitary",
    rating: 5,
    reviews: 340,
    itemsBadge: "6 Items",
    href: "/produk/air",
    variants: AirVariants,
  },
  {
    id: 9,
    name: "Aer",
    slug: "aer",
    image: "/images/produk/AERR.png",
    gambarUtama: "/images/produk/AERR.png",
    namaBrand: "Aer",
    logoSrc: "/images/produk/A/AE/logo-aer.png",
    descKey: "aer_desc",
    featuresKeys: [
      "aer_features_1",
      "aer_features_2",
      "aer_features_3",
      "aer_features_4",
      "aer_features_5",
    ],
    category: "sanitary",
    rating: 5,
    reviews: 340,
    itemsBadge: "3 Items",
    href: "/produk/aer",
    variants: AerVariants,
  },
  {
    id: 10,
    name: "Ava",
    slug: "ava",
    image: "/images/produk/AVAA.png",
    gambarUtama: "/images/produk/AVAA.png",
    namaBrand: "Ava",
    logoSrc: "/images/produk/A/AV/logo-ava.png",
    descKey: "ava_desc",
    featuresKeys: ["ava_features_1", "ava_features_2", "ava_features_3"],
    category: "sanitary",
    rating: 5,
    reviews: 340,
    itemsBadge: "3 Items",
    href: "/produk/ava",
    variants: AvaVariants,
  },
];

export default produkDetailList;
