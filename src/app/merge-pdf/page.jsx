"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Sortable from "sortablejs";
import { mergePDFs } from "@/lib/pdf";

export default function MergePDFPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const sortableRef = useRef(null);

  useEffect(() => {
    if (!listRef.current || sortableRef.current) return;

    sortableRef.current = Sortable.create(listRef.current, {
      animation: 150,
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      draggable: "li",
      forceFallback: true,
      fallbackOnBody: true,
      delayOnTouchOnly: true,
      delay: 180,
      touchStartThreshold: 5,
      scroll: true,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      onEnd: (evt) => {
        setFiles((prev) => {
          const next = [...prev];
          const [moved] = next.splice(evt.oldIndex, 1);
          next.splice(evt.newIndex, 0, moved);
          return next;
        });
      },
    });
  }, [files.length]);

  useEffect(() => {
    return () => {
      if (sortableRef.current) {
        sortableRef.current.destroy();
        sortableRef.current = null;
      }
    };
  }, []);

  async function handleMerge() {
    if (files.length < 2) {
      alert("Pilih minimal 2 file PDF");
      return;
    }

    setLoading(true);

    try {
      const blob = await mergePDFs(files);

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
      alert("Gagal merge PDF");
    } finally {
      setLoading(false);
    }
  }

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    <>
      <style jsx global>{`
        .sortable-ghost {
          opacity: 0.4;
          border: 2px solid #10b981;
        }
        .sortable-chosen {
          background-color: rgba(16, 185, 129, 0.08) !important;
        }
        .drag-handle {
          cursor: grab;
        }
        .drag-handle:active {
          cursor: grabbing;
        }
      `}</style>

      <div className="bg-zinc-50 dark:bg-black min-h-screen pb-20">
        <div className="max-w-5xl mx-auto py-10 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">
                SECURE
                <span className="text-zinc-900 dark:text-zinc-50">PDF</span>
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Privasi Total: Pemrosesan 100% di Browser Anda.
              </p>
            </Link>
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
              className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold whitespace-nowrap">
              Merge
            </Link>
            <Link
              href="/split-pdf"
              className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
              Split
            </Link>
          </div>

          <div
            onClick={() => document.getElementById("pdf-input")?.click()}
            className="group bg-white dark:bg-zinc-900 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center transition-all hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/30 dark:hover:bg-emerald-950/20 cursor-pointer mb-10">
            <input
              id="pdf-input"
              type="file"
              accept="application/pdf"
              multiple
              onChange={(e) => setFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
            <div className="bg-emerald-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Pilih file PDF untuk digabungkan
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Klik untuk memilih beberapa file (minimal 2)
            </p>
          </div>

          {files.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  Urutan File
                  <span className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs px-2 py-1 rounded-full">
                    {files.length} file
                  </span>
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic font-medium">
                  Geser untuk mengatur urutan
                </p>
              </div>

              <ul ref={listRef} className="space-y-3 mb-10">
                {files.map((f, i) => (
                  <li
                    key={i}
                    className="drag-handle group bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition-shadow select-none touch-none">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm font-bold px-2 py-1 rounded">
                          {i + 1}
                        </div>
                        <span className="truncate text-zinc-900 dark:text-zinc-50">
                          {f.name}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFile(i);
                        }}
                        className="bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
                <button
                  onClick={handleMerge}
                  disabled={files.length < 2 || loading}
                  className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-emerald-200 dark:shadow-emerald-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
                  <span>
                    {loading ? "Memproses..." : "Gabungkan PDF Sekarang"}
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
            </div>
          )}
        </div>
      </div>
    </>
  );
}
