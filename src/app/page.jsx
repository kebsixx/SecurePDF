"use client";

import Link from "next/link";
import Aurora from "@/components/Aurora";

export default function Home() {
  const features = [
    {
      title: "Image to PDF",
      description:
        "Konversi gambar ke PDF dengan kontrol penuh atas ukuran, orientasi, dan kualitas",
      href: "/image-to-pdf",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      gradient: "from-indigo-500 to-purple-600",
    },
    {
      title: "PDF to Image",
      description:
        "Ekstrak setiap halaman PDF menjadi gambar berkualitas tinggi dalam format PNG atau JPEG",
      href: "/pdf-to-image",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      gradient: "from-purple-500 to-pink-600",
    },
    {
      title: "Compress PDF",
      description:
        "Kurangi ukuran file PDF dengan tiga tingkat kompresi yang dapat disesuaikan",
      href: "/compress-pdf",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      ),
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      title: "Merge PDF",
      description:
        "Gabungkan beberapa file PDF menjadi satu dokumen dengan urutan yang dapat diatur",
      href: "/merge-pdf",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
          />
        </svg>
      ),
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      title: "Split PDF",
      description:
        "Pisahkan halaman tertentu dari PDF untuk membuat dokumen baru yang lebih kecil",
      href: "/split-pdf",
      icon: (
        <svg
          className="h-8 w-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5"
          />
        </svg>
      ),
      gradient: "from-orange-500 to-red-600",
    },
  ];

  return (
    <div className="relative min-h-screen bg-white dark:bg-black overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed top-0 left-0 right-0 h-full z-0 pointer-events-none">
        <Aurora
          colorStops={["#0080ff", "#8000ff", "#ff00ff"]}
          amplitude={1.5}
          blend={0.6}
          speed={0.8}
        />
      </div>

      {/* Gradient Overlay */}
      <div className="fixed top-0 left-0 right-0 gradient-to-b from-white/45 via-white/25 to-transparent dark:from-black/55 dark:via-black/30 dark:to-transparent z-10 pointer-events-none" />

      <main className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        {/* Hero Section */}
        <section className="text-center py-12 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50/80 dark:bg-indigo-950/50 border border-indigo-200/50 dark:border-indigo-800/50 backdrop-blur-sm mb-8">
            <svg
              className="h-4 w-4 text-indigo-600 dark:text-indigo-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">
              100% Privasi - Semua pemrosesan di browser Anda
            </span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-black tracking-tight leading-[0.95] mb-7">
            <span className="block text-black dark:text-white">SECURE</span>
            <span className="block mt-2 bg-clip-text text-transparent bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
              PDF TOOLS
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Platform all-in-one untuk mengelola dokumen PDF Anda dengan aman,
            cepat, dan mudah
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Tidak perlu upload ke server</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>100% offline</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Gratis selamanya</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                className="group relative bg-white/60 dark:bg-zinc-900/60 backdrop-blur-xl rounded-3xl p-8 border border-zinc-200/50 dark:border-zinc-800/50 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 hover:scale-[1.03] duration-300">
                <div
                  className={`absolute inset-0 gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 rounded-3xl transition-opacity duration-300`}
                />
                <div
                  className={`inline-flex p-4 rounded-2xl gradient-to-br ${feature.gradient} text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                  {feature.description}
                </p>
                <div className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                  Mulai sekarang
                  <svg
                    className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-10 pb-6">
          <div className="rounded-2xl bg-white/40 dark:bg-zinc-900/40 backdrop-blur-sm border border-zinc-200/50 dark:border-zinc-800/50 px-6 py-5">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <svg
                  className="h-4 w-4 text-emerald-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                <span>Privasi aman, proses 100% di browser</span>
              </div>
              <div className="text-zinc-500 dark:text-zinc-500">
                © {new Date().getFullYear()} SecurePDF
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
