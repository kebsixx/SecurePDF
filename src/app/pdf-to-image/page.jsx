"use client";

import { useState } from "react";
import Link from "next/link";
import { pdfToImages } from "@/lib/pdf";
import Navigation from "@/components/Navigation";

export default function PdfToImagePage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState("2");
  const [format, setFormat] = useState("png");
  const [fileName, setFileName] = useState("");

  async function handleConvert() {
    if (!file) return alert("Pilih file PDF terlebih dahulu");

    setLoading(true);
    setImages([]);

    try {
      const result = await pdfToImages(file, {
        scale: parseFloat(scale),
        format,
        quality: 0.92,
      });

      setImages(result);
    } catch (err) {
      console.error(err);
      alert("Gagal convert PDF: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  function downloadImage(imageData, _index) {
    const url = URL.createObjectURL(imageData.blob);
    const a = document.createElement("a");
    a.href = url;
    const baseName = fileName || file.name.replace(/\.pdf$/i, "") || "image";
    a.download = `${baseName}_page_${imageData.pageNumber}.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    images.forEach((img, index) => {
      setTimeout(() => downloadImage(img, index), index * 300);
    });
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen pb-20">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-black text-purple-600 dark:text-purple-400 tracking-tight">
              SECURE
              <span className="text-zinc-900 dark:text-zinc-50">PDF</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Privasi Total: Pemrosesan 100% di Browser Anda.
            </p>
          </Link>
          <Navigation activePage="pdf-to-image" theme="purple" />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-purple-600 dark:text-purple-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
            Pengaturan Konversi
          </h3>
          <div className="flex flex-wrap gap-3 text-zinc-900 dark:text-zinc-50">
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Resolusi:
              </label>
              <button
                onClick={() => setScale("1")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  scale === "1"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                72
              </button>
              <button
                onClick={() => setScale("2")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  scale === "2"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                144
              </button>
              <button
                onClick={() => setScale("3")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  scale === "3"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                216
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Format:
              </label>
              <button
                onClick={() => setFormat("png")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  format === "png"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                PNG
              </button>
              <button
                onClick={() => setFormat("jpeg")}
                className={`px-2 py-1 text-xs rounded transition-colors ${
                  format === "jpeg"
                    ? "bg-purple-600 text-white"
                    : "hover:bg-purple-100 dark:hover:bg-purple-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                JPEG
              </button>
            </div>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Nama file (opsional)"
              className="bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-purple-500 outline-none min-w-35"
            />
          </div>
        </div>

        <div
          className="bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 mb-6"
          style={{ display: "none" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-600 text-white p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Pengaturan Konversi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Kualitas Resolusi
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setScale("1")}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    scale === "1"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      Rendah (72 DPI)
                    </span>
                    {scale === "1" && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setScale("2")}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    scale === "2"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      Sedang (144 DPI)
                    </span>
                    {scale === "2" && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setScale("3")}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    scale === "3"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-900 dark:text-zinc-50">
                      Tinggi (216 DPI)
                    </span>
                    {scale === "3" && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-3">
                Format Gambar
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setFormat("png")}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    format === "png"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-50">
                        PNG
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Tanpa kompresi, kualitas terbaik
                      </div>
                    </div>
                    {format === "png" && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
                <button
                  onClick={() => setFormat("jpeg")}
                  className={`w-full p-3 rounded-lg border-2 transition-all text-left ${
                    format === "jpeg"
                      ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                      : "border-zinc-200 dark:border-zinc-700 hover:border-purple-300 dark:hover:border-purple-700"
                  }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-zinc-900 dark:text-zinc-50">
                        JPEG
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Ukuran lebih kecil
                      </div>
                    </div>
                    {format === "jpeg" && (
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="currentColor"
                        viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-purple-700 dark:text-purple-300 mt-3 flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            Setiap halaman PDF akan dikonversi menjadi gambar terpisah
          </p>
        </div>

        <div
          onClick={() => document.getElementById("pdf-input")?.click()}
          className="group bg-white dark:bg-zinc-900 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center transition-all hover:border-purple-400 dark:hover:border-purple-500 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 cursor-pointer mb-10">
          <input
            id="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              setImages([]);
            }}
            className="hidden"
          />
          <div className="bg-purple-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
            {file ? file.name : "Pilih file PDF"}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Klik untuk memilih file dari komputer
          </p>
        </div>

        {images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                Hasil Konversi
                <span className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 text-xs px-2 py-1 rounded-full">
                  {images.length} halaman
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="absolute top-3 left-3 bg-zinc-800/70 dark:bg-zinc-700/70 text-white text-[10px] px-2 py-0.5 rounded-md z-10">
                    Hal {img.pageNumber}
                  </div>
                  <img
                    src={URL.createObjectURL(img.blob)}
                    alt={`Page ${img.pageNumber}`}
                    className="h-40 w-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => downloadImage(img, index)}
                    className="absolute -top-2 -right-2 bg-purple-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-purple-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </button>
                  <div className="mt-2 text-[10px] text-zinc-500 dark:text-zinc-400 truncate px-1">
                    {img.width} × {img.height} px
                  </div>
                </div>
              ))}
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
              <button
                onClick={downloadAll}
                disabled={loading}
                className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-200 dark:shadow-purple-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
                <span>Download Semua Gambar</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {!images.length && !loading && file && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
            <button
              onClick={handleConvert}
              disabled={!file || loading}
              className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-purple-200 dark:shadow-purple-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
              <span>
                {loading ? "Memproses..." : "Convert ke Gambar Sekarang"}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
