"use client";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import { useState } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";

export default function CompressPDFPage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleConvert() {
    if (!file) return;

    setLoading(true);
    setImages([]);

    try {
      const pdfjsLib = await import("pdfjs-dist");

      pdfjsLib.GlobalWorkerOptions.workerSrc =
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      const result = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2 });

        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: ctx, viewport }).promise;
        result.push(canvas.toDataURL("image/png"));
      }

      setImages(result);
    } catch (err) {
      console.error(err);
      alert("Gagal convert PDF ke image");
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
          <Navigation activePage="compress-pdf" theme="blue" />
        </div>

        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 mb-6">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 mb-4 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-600 dark:text-blue-400"
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
            Pengaturan Kompresi
          </h3>
          <div className="flex flex-wrap gap-3 text-zinc-900 dark:text-zinc-50">
            <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
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
                    ? `bg-blue-600 text-white`
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
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Nama file (opsional)"
              className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2 text-xs focus:ring-2 focus:ring-blue-500 outline-none min-w-35"
            />
          </div>
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
