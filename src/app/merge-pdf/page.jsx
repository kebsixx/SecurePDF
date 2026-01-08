"use client";

import { useEffect, useRef, useState } from "react";
import Sortable from "sortablejs";
import { mergePDFs } from "@/lib/pdf";

export default function MergePDFPage() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);
  const sortableRef = useRef(null);

  // Create Sortable once the list is rendered (files present)
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

  // Cleanup on unmount
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

  return (
    <main className="min-h-screen bg-zinc-50 dark:bg-black py-12">
      <div className="max-w-xl mx-auto px-4">
        <style jsx global>{`
          .sortable-ghost {
            background-color: rgba(99, 102, 241, 0.15) !important;
            border: 1px dashed #6366f1 !important;
          }
          .sortable-chosen {
            background-color: rgba(79, 70, 229, 0.08) !important;
          }
          .drag-handle {
            cursor: grab;
          }
          .drag-handle:active {
            cursor: grabbing;
          }
        `}</style>
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
          Merge PDF
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-8">
          Gabungkan beberapa file PDF menjadi satu. Pemrosesan 100% di browser.
        </p>

        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={(e) => setFiles(Array.from(e.target.files || []))}
          className="mb-4 block w-full text-sm p-2 border border-zinc-300 dark:border-zinc-700 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50"
        />

        {files.length > 0 && (
          <ul ref={listRef} className="space-y-2 mb-4">
            {files.map((f, i) => (
              <li
                key={i}
                className="drag-handle flex items-center justify-between gap-2 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-300 dark:border-zinc-700 rounded-md px-3 py-2 shadow-sm select-none touch-none cursor-grab active:cursor-grabbing">
                <span className="truncate">
                  {i + 1}. {f.name}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Tarik untuk urutkan
                </span>
              </li>
            ))}
          </ul>
        )}

        <button
          onClick={handleMerge}
          disabled={files.length < 2 || loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-colors">
          {loading ? "Memproses..." : "Merge PDF"}
        </button>

        {files.length > 0 && (
          <ul className="text-xs text-zinc-500 dark:text-zinc-400 mt-4 space-y-1">
            {files.map((f, i) => (
              <li key={i}>{f.name}</li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
