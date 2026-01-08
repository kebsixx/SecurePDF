"use client";

import { useState } from "react";
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

      // Download otomatis
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
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Compress PDF
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          File diproses langsung di browser. Tidak ada data yang diunggah ke
          server.
        </p>

        <label className="block mb-2 text-sm font-medium text-zinc-900 dark:text-zinc-50">
          Tingkat Kompresi
        </label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ colorScheme: "light dark" }}
          className="mb-4 block w-full text-sm p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none">
          <option value="low">Rendah</option>
          <option value="medium">Sedang</option>
          <option value="high">Tinggi</option>
        </select>

        <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
          Kompresi dilakukan dengan mengoptimalkan metadata dan struktur PDF,
          bukan mengubah isi dokumen.
        </p>

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4 block w-full text-sm p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
        />

        <button
          onClick={handleCompress}
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors">
          {loading ? "Memproses..." : "Compress PDF"}
        </button>

        {file && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
          </p>
        )}
      </div>
    </main>
  );
}
