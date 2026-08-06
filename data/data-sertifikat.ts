export type PencapaianCategory = "label_01" | "label_02";

export interface PencapaianItem {
  id: string;
  title: string;
  issuer: string;
  category: PencapaianCategory;
  date: string;
  image: string;
}

export const pencapaianData: PencapaianItem[] = [
  {
    id: "top-performer-2025",
    title: "Top PERFORMER 2025",
    issuer: "Semen Merah Putih",
    category: "label_01",
    date: "2026-02-05",
    image: "/images/piagam/sertifikat-2025.png",
  },
  {
    id: "penghargaan-mitra-distribusi-2025",
    title: "Tropi Top PERFORMER 2025",
    issuer: "Semen Merah Putih",
    category: "label_02",
    date: "2026-02-05",
    image: "/images/piagam/tropi-2025-01.png",
  },
  {
    id: "top-performer-2024",
    title: "Top PERFORMER 2024",
    issuer: "Semen Merah Putih",
    category: "label_01",
    date: "2025-01-23",
    image: "/images/piagam/sertifikat-2024.png",
  },
  {
    id: "penghargaan-mitra-distribusi-2024",
    title: "Tropi Top PERFORMER 2024",
    issuer: "Semen Merah Putih",
    category: "label_02",
    date: "2025-01-23",
    image: "/images/piagam/tropi-2024-01.png",
  },

  {
    id: "top-performer-2023",
    title: "Top PERFORMER 2023",
    issuer: "Semen Merah Putih",
    category: "label_01",
    date: "2024-01-19",
    image: "/images/piagam/sertifikat-2023.png",
  },
  {
    id: "penghargaan-mitra-distribusi-2023",
    title: "Tropi Top PERFORMER 2023",
    issuer: "Semen Merah Putih",
    category: "label_02",
    date: "2024-01-19",
    image: "/images/piagam/tropi-2023-01.png",
  },
];
