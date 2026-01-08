"use client";

import { useState } from "react";
import { PDFDocument } from "pdf-lib";

export default function CompressPDFPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [level, setLevel] = useState("medium");

  async function handleCompress() {
    if (!file) return alert("Pilih file PDF terlebih dahulu");

    setLoading(true);

    try {
      // Baca file PDF
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);

      // Buat PDF baru (rebuild = bentuk kompresi client-side)
      const newPdf = await PDFDocument.create();

      if (level === "low") {
        newPdf.setTitle("");
        newPdf.setAuthor("");
        newPdf.setCreator("");
        newPdf.setProducer("");
      }
      const pages = await newPdf.copyPages(pdfDoc, pdfDoc.getPageIndices());
      pages.forEach((p) => newPdf.addPage(p));

      // Simpan PDF
      const pdfBytes = await newPdf.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });

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
    <main className="max-w-xl mx-auto px-4 py-12 text-slate-800">
      <h1 className="text-2xl font-bold mb-2">Compress PDF</h1>
      <p className="text-sm text-slate-500 mb-6">
        File diproses langsung di browser. Tidak ada data yang diunggah ke
        server.
      </p>

      <label className="block mb-2 text-sm font-medium">Tingkat Kompresi</label>
      <select
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        style={{ colorScheme: "light" }}
        className="mb-4 block w-full text-sm p-2 border border-slate-300 rounded-lg bg-white text-slate-800 focus:ring-2 focus:ring-indigo-500 outline-none dark:bg-white dark:text-slate-900">
        <option className="text-slate-800 bg-white" value="low">
          Rendah
        </option>
        <option className="text-slate-800 bg-white" value="medium">
          Sedang
        </option>
        <option className="text-slate-800 bg-white" value="high">
          Tinggi
        </option>
      </select>

      <p className="text-xs text-slate-400 mb-4">
        Kompresi dilakukan dengan mengoptimalkan metadata dan struktur PDF,
        bukan mengubah isi dokumen.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="mb-4 block w-full text-sm"
      />

      <button
        onClick={handleCompress}
        disabled={!file || loading}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:opacity-50">
        {loading ? "Memproses..." : "Compress PDF"}
      </button>

      {file && (
        <p className="text-xs text-slate-400 mt-4">
          File: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
        </p>
      )}
    </main>
  );
}
