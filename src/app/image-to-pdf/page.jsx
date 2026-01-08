"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Sortable from "sortablejs";
import { imagesToPDF } from "@/lib/pdf";

export default function ImageToPdfPage() {
  const [fileDataList, setFileDataList] = useState([]);
  const [pageSize, setPageSize] = useState("a4");
  const [orientation, setOrientation] = useState("auto");
  const [marginSize, setMarginSize] = useState("10");
  const [compression, setCompression] = useState("0.7");
  const [fileName, setFileName] = useState("");
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");

  const inputRef = useRef(null);
  const dropZoneRef = useRef(null);
  const previewGridRef = useRef(null);
  const previewFrameRef = useRef(null);
  const sortableRef = useRef(null);

  // Initialize Sortable.js (with touch-friendly options)
  useEffect(() => {
    if (
      previewGridRef.current &&
      fileDataList.length > 0 &&
      !sortableRef.current
    ) {
      sortableRef.current = Sortable.create(previewGridRef.current, {
        animation: 150,
        ghostClass: "sortable-ghost",
        handle: ".drag-handle",
        forceFallback: true,
        fallbackOnBody: true,
        delayOnTouchOnly: true,
        delay: 180,
        touchStartThreshold: 5,
        scroll: true,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        onEnd: () => {
          const newOrder = Array.from(
            previewGridRef.current.querySelectorAll("[data-id]")
          ).map((el) => {
            const id = el.getAttribute("data-id");
            return fileDataList.find((item) => item.id === id);
          });
          setFileDataList(newOrder);
        },
      });
    }
  }, [fileDataList.length]);

  // Set iframe src when preview URL changes
  useEffect(() => {
    if (previewUrl && previewFrameRef.current) {
      previewFrameRef.current.src = previewUrl;
    }
  }, [previewUrl]);

  const processImage = (file, quality = 0.7) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const maxDim = 2000;
          let width = img.width;
          let height = img.height;

          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = (height * maxDim) / width;
              width = maxDim;
            } else {
              width = (width * maxDim) / height;
              height = maxDim;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", quality));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
    });
  };

  const handleFiles = async (files) => {
    const quality = parseFloat(compression);
    const newFiles = [];

    for (const file of files) {
      if (file.type.startsWith("image/")) {
        try {
          const base64 = await processImage(file, quality);
          newFiles.push({
            id: Math.random().toString(36).substr(2, 9),
            content: base64,
            name: file.name,
          });
        } catch (err) {
          console.error("Gagal memproses gambar:", file.name, err);
        }
      }
    }

    setFileDataList([...fileDataList, ...newFiles]);
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove("border-indigo-500", "bg-indigo-50");
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.add("border-indigo-500", "bg-indigo-50");
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZoneRef.current?.classList.remove("border-indigo-500", "bg-indigo-50");
  };

  const removeItem = (id) => {
    setFileDataList(fileDataList.filter((item) => item.id !== id));
  };

  const generatePDF = async (isPreview = false) => {
    if (fileDataList.length === 0) {
      alert("Pilih gambar terlebih dahulu!");
      return;
    }

    setIsGenerating(true);
    setIsPreviewMode(isPreview);

    try {
      const blob = await imagesToPDF(
        fileDataList.map((f) => f.content),
        {
          format: pageSize,
          orientation,
          margin: parseInt(marginSize),
          quality: parseFloat(compression),
        }
      );

      if (isPreview) {
        const blobUrl = URL.createObjectURL(blob);
        setPreviewUrl(blobUrl);
        setIsPreviewOpen(true);
      } else {
        const finalFileName = fileName
          ? `${fileName.replace(/[/\\?%*:|"<>]/g, "-")}.pdf`
          : `SecurePDF_${new Date().getTime()}.pdf`;
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = finalFileName;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Gagal membuat PDF: " + error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <style jsx global>{`
        .sortable-ghost {
          opacity: 0.4;
          border: 2px solid #4f46e5;
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
          <div className="flex flex-col md:flex-row justify-between items-start mb-6 gap-4">
            <Link
              href="/"
              className="cursor-pointer hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-black text-indigo-600 dark:text-indigo-400 tracking-tight">
                SECURE
                <span className="text-zinc-900 dark:text-zinc-50">PDF</span>
              </h1>
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                Privasi Total: Pemrosesan 100% di Browser Anda.
              </p>
            </Link>
            <div className="flex flex-wrap justify-end gap-3 text-zinc-900 dark:text-zinc-50 max-w-lg">
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Kertas:
                </label>
                <button
                  onClick={() => setPageSize("a4")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    pageSize === "a4"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  A4
                </button>
                <button
                  onClick={() => setPageSize("a3")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    pageSize === "a3"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  A3
                </button>
                <button
                  onClick={() => setPageSize("letter")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    pageSize === "letter"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Letter
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Orientasi:
                </label>
                <button
                  onClick={() => setOrientation("auto")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    orientation === "auto"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Auto
                </button>
                <button
                  onClick={() => setOrientation("p")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    orientation === "p"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Portrait
                </button>
                <button
                  onClick={() => setOrientation("l")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    orientation === "l"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Landscape
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Margin:
                </label>
                <button
                  onClick={() => setMarginSize("0")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    marginSize === "0"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  0
                </button>
                <button
                  onClick={() => setMarginSize("10")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    marginSize === "10"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  10mm
                </button>
                <button
                  onClick={() => setMarginSize("20")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    marginSize === "20"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  20mm
                </button>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg px-3 py-2">
                <label className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                  Kualitas:
                </label>
                <button
                  onClick={() => setCompression("0.5")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    compression === "0.5"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Rendah
                </button>
                <button
                  onClick={() => setCompression("0.7")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    compression === "0.7"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Sedang
                </button>
                <button
                  onClick={() => setCompression("0.9")}
                  className={`px-2 py-1 text-xs rounded transition-colors ${
                    compression === "0.9"
                      ? "bg-indigo-600 text-white"
                      : "hover:bg-indigo-100 dark:hover:bg-indigo-900/40 text-zinc-700 dark:text-zinc-300"
                  }`}>
                  Tinggi
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
            <Link
              href="/image-to-pdf"
              className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold whitespace-nowrap">
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
              className="px-4 py-2 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors whitespace-nowrap">
              Split
            </Link>
          </div>

          <div
            ref={dropZoneRef}
            onClick={() => inputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className="group bg-white dark:bg-zinc-900 border-4 border-dashed border-zinc-200 dark:border-zinc-800 rounded-3xl p-12 text-center transition-all hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/20 cursor-pointer mb-10">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleFiles(Array.from(e.target.files || []))}
              className="hidden"
            />
            <div className="bg-indigo-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
              Tarik gambar ke sini
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 mt-1">
              Atau klik untuk memilih file dari komputer
            </p>
          </div>

          {fileDataList.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                  Urutan Halaman
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-xs px-2 py-1 rounded-full">
                    {fileDataList.length}
                  </span>
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 italic font-medium">
                  Geser kotak gambar untuk mengatur urutan halaman
                </p>
              </div>

              <div
                ref={previewGridRef}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-10">
                {fileDataList.map((item, index) => (
                  <div
                    key={item.id}
                    data-id={item.id}
                    className="relative bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow group select-none touch-none">
                    <div className="absolute top-3 left-3 bg-zinc-800/70 dark:bg-zinc-700/70 text-white text-[10px] px-2 py-0.5 rounded-md z-10">
                      Hal {index + 1}
                    </div>
                    <img
                      src={item.content}
                      alt={item.name}
                      className="h-40 w-full object-cover rounded-lg drag-handle cursor-grab active:cursor-grabbing select-none touch-none"
                    />
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600">
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
                    <div className="mt-2 text-[10px] text-zinc-500 dark:text-zinc-400 truncate px-1">
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>

              <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 p-4 shadow-2xl flex justify-center gap-4 z-50">
                <button
                  onClick={() => generatePDF(true)}
                  disabled={isGenerating}
                  className="bg-zinc-800 hover:bg-zinc-900 disabled:opacity-50 text-white px-8 py-4 rounded-2xl font-bold shadow-xl flex items-center gap-3 transition-all transform hover:-translate-y-1">
                  <span>
                    {isPreviewMode && isGenerating ? "Memuat..." : "Preview"}
                  </span>
                </button>
                <button
                  onClick={() => generatePDF(false)}
                  disabled={isGenerating}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center gap-3 transition-all transform hover:-translate-y-1">
                  <span>
                    {!isPreviewMode && isGenerating
                      ? "Memproses..."
                      : "Download PDF Sekarang"}
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

      {isPreviewOpen && (
        <div className="fixed inset-0 bg-zinc-900/80 dark:bg-black/90 z-100 flex flex-col items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 w-full max-w-4xl h-[90vh] rounded-3xl overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-800">
            <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex justify-between items-center">
              <h3 className="font-bold text-zinc-900 dark:text-zinc-50">
                Preview PDF
              </h3>
              <button
                onClick={() => setIsPreviewOpen(false)}
                className="text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <iframe
              ref={previewFrameRef}
              src={previewUrl}
              className="flex-1 w-full border-none"
            />
          </div>
        </div>
      )}
    </>
  );
}
