import Link from "next/link";

export default function Navigation({ activePage, theme = "indigo" }) {
  const tools = [
    { id: "image-to-pdf", label: "Image → PDF", href: "/image-to-pdf" },
    { id: "pdf-to-image", label: "PDF → Image", href: "/pdf-to-image" },
    { id: "compress-pdf", label: "Compress", href: "/compress-pdf" },
    { id: "merge-pdf", label: "Merge", href: "/merge-pdf" },
    { id: "split-pdf", label: "Split", href: "/split-pdf" },
  ];

  const themeColors = {
    indigo: {
      active: "bg-indigo-600 text-white",
      inactive:
        "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
    },
    purple: {
      active: "bg-purple-600 text-white",
      inactive:
        "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
    },
    blue: {
      active: "bg-blue-600 text-white",
      inactive:
        "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
    },
    emerald: {
      active: "bg-emerald-600 text-white",
      inactive:
        "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
    },
    orange: {
      active: "bg-orange-600 text-white",
      inactive:
        "bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 hover:bg-zinc-100 dark:hover:bg-zinc-700",
    },
  };

  const colors = themeColors[theme] || themeColors.indigo;

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {tools.map((tool) => (
        <Link
          key={tool.id}
          href={tool.href}
          className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
            activePage === tool.id ? colors.active : colors.inactive
          }`}>
          {tool.label}
        </Link>
      ))}
    </div>
  );
}
