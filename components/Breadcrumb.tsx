import { Link } from "@/i18n/navigation";
import Image from "next/image";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBreadcrumbProps {
  title: string;
  items: BreadcrumbItem[];
  backgroundImage?: string;
  maxLabelLength?: number;
}

// Helper function untuk memotong teks dan menambahkan " ..."
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + " ...";
};

export default function PageBreadcrumb({
  title,
  items,
  backgroundImage = "/images/image-sinergi-01.png",
  maxLabelLength = 15,
}: PageBreadcrumbProps) {
  return (
    <section className="absolute top-0 w-full h-64 md:h-130 overflow-hidden">
      {/* Background Image */}
      <Image
        src={backgroundImage}
        alt="Page header background"
        fill
        className="object-cover object-center filter contrast-105 brightness-90"
        priority
      />

      {/* Corporate Dark Overlay */}
      <div className="absolute inset-0 bg-transparent" />

      {/* Smooth Bottom Gradient Overlay untuk kesan kedalaman */}
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/70 to-smp-orange/30" />

      {/* Content Wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl h-full px-4 sm:px-6 lg:px-8 flex items-end pb-8 md:pb-12">
        <div className="flex flex-col items-start text-left w-full space-y-3">
          {/* Breadcrumb Navigation */}
          <nav aria-label="breadcrumb" className="w-full">
            <ol className="flex items-center gap-2 flex-nowrap sm:flex-wrap justify-start overflow-x-auto sm:overflow-visible py-1 scrollbar-hide">
              {items.map((item, index) => {
                const isLast = index === items.length - 1;
                // Item terakhir biasanya dibiarkan full, item sebelumnya dipotong jika terlalu panjang
                const displayedLabel = isLast
                  ? item.label
                  : truncateText(item.label, maxLabelLength);

                return (
                  <li key={index} className="flex items-center gap-2 shrink-0">
                    {isLast ? (
                      // Item aktif (halaman sekarang)
                      <span
                        className="text-smp-blue text-xs sm:text-sm font-medium tracking-wide truncate"
                        title={item.label}
                      >
                        {displayedLabel}
                      </span>
                    ) : (
                      // Item yang bisa diklik
                      <Link
                        href={item.href ?? "#"}
                        className="text-white/60 text-xs sm:text-sm font-medium hover:text-white transition-colors duration-200 py-1 inline-block"
                        title={item.label}
                      >
                        {displayedLabel}
                      </Link>
                    )}

                    {/* Separator Slash (Disesuaikan dengan gambar yang menggunakan "/") */}
                    {!isLast && (
                      <span className="text-white/40 text-xs sm:text-sm shrink-0 font-medium mx-1">
                        /
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          {/* Page Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-smp-blue text-2xl sm:text-4xl lg:text-5xl font-semibold tracking-tight leading-tight ">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
