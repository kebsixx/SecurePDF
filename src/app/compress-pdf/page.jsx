"use client";

import { useState } from "react";
import Link from "next/link";
import { compressPDF } from "@/lib/pdf";

export default function CompressPDFPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("medium");

  async function handleCompress() {
    if (!file) return alert("Pilih file PDF terlebih dahulu");

    setLoading(true);

    try {
      const blob = await compressPDF(file, level);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = file.name.replace(/\.pdf$/i, "") + "-compressed.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal memproses PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen pb-20">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-black text-blue-600 dark:text-blue-400 tracking-tight">
              SECURE
              <span className="text-zinc-900 dark:text-zinc-50">PDF</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Privasi Total: Pemrosesan 100% di Browser Anda.
            </p>
          </Link>
          <div className="flex flex-wrap justify-end gap-3 text-zinc-900 dark:text-zinc-50">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Kompresi:
              </label>
              <button
                onClick={() => setLevel("low")}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  level === "low"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                Rendah
              </button>
              <button
                onClick={() => setLevel("medium")}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  level === "medium"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                Sedang
              </button>
              <button
                onClick={() => setLevel("high")}
                className={`px-3 py-1 text-xs rounded transition-colors ${
                  level === "high"
                    ? "bg-blue-600 text-white"
                    : "hover:bg-blue-100 dark:hover:bg-blue-900/40 text-zinc-700 dark:text-zinc-300"
                }`}>
                Tinggi
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
          <Link
            href="/image-to-pdf"
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Image → PDF
          </Link>
          <Link
            href="/pdf-to-image"
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            PDF → Image
          </Link>
          <Link
            href="/compress-pdf"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold whitespace-nowrap">
            Compress
          </Link>
          <Link
            href="/merge-pdf"
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Merge
          </Link>
          <Link
            href="/split-pdf"
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Split
          </Link>
        </div>

        <div
          className="bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6 mb-6"
          style={{ display: "none" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
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
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
              Pilih Tingkat Kompresi
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button
              onClick={() => setLevel("low")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                level === "low"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700"
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    level === "low"
                      ? "border-blue-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}>
                  {level === "low" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Rendah
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Kompresi minimal, kualitas terbaik
              </p>
            </button>
            <button
              onClick={() => setLevel("medium")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                level === "medium"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700"
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    level === "medium"
                      ? "border-blue-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}>
                  {level === "medium" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Sedang
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Seimbang antara ukuran dan kualitas
              </p>
            </button>
            <button
              onClick={() => setLevel("high")}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                level === "high"
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 hover:border-blue-300 dark:hover:border-blue-700"
              }`}>
              <div className="flex items-center gap-2 mb-1">
                <div
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                    level === "high"
                      ? "border-blue-500"
                      : "border-zinc-300 dark:border-zinc-600"
                  }`}>
                  {level === "high" && (
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  )}
                </div>
                <span className="font-semibold text-zinc-900 dark:text-zinc-50">
                  Tinggi
                </span>
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Kompresi maksimal, ukuran terkecil
              </p>
            </button>
          </div>
          <p className="text-xs text-blue-700 dark:text-blue-300 mt-3 flex items-center gap-1">
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
            Kompresi dilakukan dengan mengoptimalkan metadata dan struktur PDF
          </p>
        </div>

        <div
          onClick={() => document.getElementById("pdf-input")?.click()}
          className="group bg-white dark:bg-zinc-900 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center transition-all hover:border-blue-400 dark:hover:border-blue-500 hover:bg-blue-50/30 dark:hover:bg-blue-950/20 cursor-pointer mb-10">
          <input
            id="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <div className="bg-blue-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
            {file ? file.name : "Pilih file PDF untuk dikompres"}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Klik untuk memilih file dari komputer
          </p>
          {file && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
              Ukuran: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
          )}
        </div>

        {file && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
            <button
              onClick={handleCompress}
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 dark:shadow-blue-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
              <span>{loading ? "Memproses..." : "Compress PDF Sekarang"}</span>
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
