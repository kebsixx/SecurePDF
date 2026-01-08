"use client";

import { useState } from "react";
import Link from "next/link";
import { splitPDF } from "@/lib/pdf";

export default function SplitPDFPage() {
  const [file, setFile] = useState(null);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(1);
  const [loading, setLoading] = useState(false);

  async function handleSplit() {
    if (!file) return alert("Pilih file PDF terlebih dahulu");
    if (
      !Number.isInteger(+from) ||
      !Number.isInteger(+to) ||
      +from < 1 ||
      +to < +from
    ) {
      return alert("Range halaman tidak valid");
    }

    setLoading(true);

    try {
      const blob = await splitPDF(file, +from, +to);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download =
        (file.name.replace(/\.pdf$/i, "") || "split") + `_${from}-${to}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal memisah PDF");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-zinc-50 dark:bg-black min-h-screen pb-20">
      <style jsx>{`
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <Link
            href="/"
            className="cursor-pointer hover:opacity-80 transition-opacity">
            <h1 className="text-3xl font-black text-orange-600 dark:text-orange-400 tracking-tight">
              SECURE
              <span className="text-zinc-900 dark:text-zinc-50">PDF</span>
            </h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              Privasi Total: Pemrosesan 100% di Browser Anda.
            </p>
          </Link>
          <div className="flex flex-wrap justify-end gap-3 text-zinc-900 dark:text-zinc-50">
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2 py-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Dari:
              </label>
              <button
                type="button"
                onClick={() => setFrom(Math.max(1, +from - 1))}
                className="shrink-0 w-7 h-7 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded transition-colors">
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
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                type="number"
                min={1}
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-16 text-center bg-transparent border-none text-sm font-semibold text-zinc-900 dark:text-zinc-50 focus:ring-0 outline-none"
              />
              <button
                type="button"
                onClick={() => setFrom(+from + 1)}
                className="shrink-0 w-7 h-7 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded transition-colors">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-2 py-1">
              <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                Sampai:
              </label>
              <button
                type="button"
                onClick={() => setTo(Math.max(1, +to - 1))}
                className="shrink-0 w-7 h-7 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded transition-colors">
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
                    d="M20 12H4"
                  />
                </svg>
              </button>
              <input
                type="number"
                min={1}
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-16 text-center bg-transparent border-none text-sm font-semibold text-zinc-900 dark:text-zinc-50 focus:ring-0 outline-none"
              />
              <button
                type="button"
                onClick={() => setTo(+to + 1)}
                className="shrink-0 w-7 h-7 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/40 text-orange-600 dark:text-orange-400 rounded transition-colors">
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
                    d="M12 4v16m8-8H4"
                  />
                </svg>
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
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Compress
          </Link>
          <Link
            href="/merge-pdf"
            className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
            Merge
          </Link>
          <Link
            href="/split-pdf"
            className="px-4 py-2 rounded-lg bg-orange-600 text-white text-sm font-semibold whitespace-nowrap">
            Split
          </Link>
        </div>

        <div
          onClick={() => document.getElementById("pdf-input")?.click()}
          className="group bg-white dark:bg-zinc-900 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center transition-all hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/30 dark:hover:bg-orange-950/20 cursor-pointer mb-10">
          <input
            id="pdf-input"
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="hidden"
          />
          <div className="bg-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
            {file ? file.name : "Pilih file PDF untuk dipecah"}
          </h3>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            Klik untuk memilih file dari komputer
          </p>
        </div>

        {file && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
            <button
              onClick={handleSplit}
              disabled={!file || loading}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-orange-200 dark:shadow-orange-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
              <span>{loading ? "Memproses..." : "Pisahkan PDF Sekarang"}</span>
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
