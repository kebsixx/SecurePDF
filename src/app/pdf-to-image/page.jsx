"use client";

import { useState } from "react";
import { pdfToImages } from "@/lib/pdf";

export default function PdfToImagePage() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState("2");
  const [format, setFormat] = useState("png");

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

  function downloadImage(imageData, index) {
    const url = URL.createObjectURL(imageData.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${file.name.replace(/\.pdf$/i, "")}_page_${
      imageData.pageNumber
    }.${format}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function downloadAll() {
    images.forEach((img, index) => {
      setTimeout(() => downloadImage(img, index), index * 300);
    });
  }

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          PDF to Image
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          Konversi setiap halaman PDF menjadi gambar. Pemrosesan 100% di
          browser.
        </p>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <div>
            <label className="block mb-1 text-sm text-zinc-900 dark:text-zinc-50">
              Kualitas Resolusi
            </label>
            <select
              value={scale}
              onChange={(e) => setScale(e.target.value)}
              style={{ colorScheme: "light dark" }}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="1">Rendah (72 DPI)</option>
              <option value="2">Sedang (144 DPI)</option>
              <option value="3">Tinggi (216 DPI)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-900 dark:text-zinc-50">
              Format Gambar
            </label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              style={{ colorScheme: "light dark" }}
              className="w-full p-3 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="png">PNG (Tanpa Kompresi)</option>
              <option value="jpeg">JPEG (Lebih Kecil)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-sm text-zinc-900 dark:text-zinc-50">
              Pilih PDF
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => {
                setFile(e.target.files?.[0] || null);
                setImages([]);
              }}
              className="w-full p-2.5 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 text-sm"
            />
          </div>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!file || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors mb-8">
          {loading ? "Memproses..." : "Convert ke Gambar"}
        </button>

        {/* Results */}
        {images.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
                Hasil: {images.length} Halaman
              </h2>
              <button
                onClick={downloadAll}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors">
                Download Semua
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3 shadow-sm">
                  <img
                    src={URL.createObjectURL(img.blob)}
                    alt={`Page ${img.pageNumber}`}
                    className="w-full h-auto rounded border border-zinc-200 dark:border-zinc-700 mb-2"
                  />
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-zinc-600 dark:text-zinc-400">
                      <div className="font-medium">
                        Halaman {img.pageNumber}
                      </div>
                      <div className="text-xs">
                        {img.width} × {img.height} px
                      </div>
                    </div>
                    <button
                      onClick={() => downloadImage(img, index)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-xs font-semibold transition-colors">
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Info */}
        {file && !loading && images.length === 0 && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
            Klik "Convert ke Gambar" untuk memulai
          </p>
        )}
      </div>
    </main>
  );
}
