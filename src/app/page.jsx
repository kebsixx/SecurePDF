import Link from "next/link";

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
    <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-black tracking-tight text-black dark:text-zinc-50 mb-4">
            SECURE
            <span className="text-indigo-600 dark:text-indigo-400">PDF</span>
          </h1>
          <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-3">
            Kelola PDF Anda dengan Aman & Mudah
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 flex items-center justify-center gap-2">
            <svg
              className="h-4 w-4"
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
            100% Privasi - Semua pemrosesan dilakukan di browser Anda
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {features.map((feature) => (
            <Link
              key={feature.href}
              href={feature.href}
              className="group relative bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-all hover:shadow-xl hover:scale-[1.02] duration-200">
              <div
                className={`absolute inset-0 bg-linear-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-2xl transition-opacity`}
              />
              <div
                className={`inline-flex p-3 rounded-xl bg-linear-to-br ${feature.gradient} text-white mb-4 shadow-lg`}>
                {feature.icon}
              </div>
              <h2 className="text-2xl font-bold text-black dark:text-zinc-50 mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                {feature.title}
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                Mulai sekarang
                <svg
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
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

        {/* Footer Info */}
        <div className="text-center space-y-4">
          <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-500">
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
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
              Tidak perlu upload
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
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
              100% offline
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="h-5 w-5 text-emerald-600 dark:text-emerald-400"
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
              Gratis selamanya
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
