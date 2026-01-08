"use client";

import { useState } from "react";
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
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Split PDF
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          Pisahkan range halaman dari sebuah PDF. Pemrosesan 100% di browser.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full text-sm p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
        />

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div>
            <label className="block mb-1 text-sm text-zinc-900 dark:text-zinc-50">
              Dari halaman
            </label>
            <input
              type="number"
              min={1}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm text-zinc-900 dark:text-zinc-50">
              Sampai halaman
            </label>
            <input
              type="number"
              min={1}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button
          onClick={handleSplit}
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors">
          {loading ? "Memproses..." : "Split PDF"}
        </button>

        {file && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            File: {file.name}
          </p>
        )}
      </div>
    </main>
  );
}
