// Consolidated imports at the top
import { PDFDocument } from "pdf-lib";
import jsPDF from "jspdf";
import * as pdfjsLib from "pdfjs-dist";

// Setup worker untuk pdfjs-dist
if (typeof window !== "undefined") {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

// lib/pdf/compress.js
export async function compressPDF(file, level = "medium") {
  const arrayBuffer = await file.arrayBuffer();

  const sourcePdf = await PDFDocument.load(arrayBuffer, {
    updateMetadata: false,
  });

  const newPdf = await PDFDocument.create();

  if (level === "low") {
    newPdf.setTitle("");
    newPdf.setAuthor("");
    newPdf.setCreator("");
    newPdf.setProducer("");
  }

  const pages = await newPdf.copyPages(sourcePdf, sourcePdf.getPageIndices());

  pages.forEach((p) => newPdf.addPage(p));

  const bytes = await newPdf.save();
  return new Blob([bytes], { type: "application/pdf" });
}

// lib/pdf/merge.js
export async function mergePDFs(files) {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    pages.forEach((p) => mergedPdf.addPage(p));
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([mergedBytes], { type: "application/pdf" });
}

// lib/pdf/split.js

export async function splitPDF(file, from, to) {
  const bytes = await file.arrayBuffer();
  const sourcePdf = await PDFDocument.load(bytes);

  const newPdf = await PDFDocument.create();

  const pages = await newPdf.copyPages(
    sourcePdf,
    Array.from({ length: to - from + 1 }, (_, i) => i + from - 1)
  );

  pages.forEach((p) => newPdf.addPage(p));

  const newBytes = await newPdf.save();
  return new Blob([newBytes], { type: "application/pdf" });
}

// lib/pdf/images-to-pdf.js
// Generate a PDF from an array of image data URLs entirely client-side
export async function imagesToPDF(imageDataList, options = {}) {
  const {
    format = "a4",
    orientation = "auto", // 'auto' | 'p' | 'l'
    margin = 10, // mm
    quality = 0.7, // 0..1, maps to FAST/MEDIUM/SLOW in jsPDF
  } = options;

  const doc = new jsPDF({
    orientation: orientation === "auto" ? "p" : orientation,
    unit: "mm",
    format,
    compress: true,
  });

  for (let i = 0; i < imageDataList.length; i++) {
    const imgData = imageDataList[i];

    const imgProps = await new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.width,
          height: img.height,
          ratio: img.width / img.height,
        });
      };
      img.onerror = () => reject(new Error("Gagal memuat gambar"));
      img.src = imgData;
    });

    let pageOrientation = orientation;
    if (orientation === "auto") {
      pageOrientation = imgProps.width > imgProps.height ? "l" : "p";
    }

    if (i > 0) {
      doc.addPage(format, pageOrientation);
    } else {
      if (orientation === "auto" && pageOrientation === "l") {
        doc.deletePage(1);
        doc.addPage(format, "l");
      }
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const printableWidth = pageWidth - margin * 2;
    const printableHeight = pageHeight - margin * 2;

    let width = printableWidth;
    let height = width / imgProps.ratio;

    if (height > printableHeight) {
      height = printableHeight;
      width = height * imgProps.ratio;
    }

    const x = margin + (printableWidth - width) / 2;
    const y = margin + (printableHeight - height) / 2;

    const compressionLevel =
      quality < 0.6 ? "FAST" : quality < 0.8 ? "MEDIUM" : "SLOW";

    doc.addImage(
      imgData,
      "JPEG",
      x,
      y,
      width,
      height,
      undefined,
      compressionLevel
    );
  }

  // Return a Blob for preview or download
  return doc.output("blob");
}

// lib/pdf/pdf-to-images.js
// Convert PDF pages to images (PNG format)
export async function pdfToImages(file, options = {}) {
  const {
    scale = 2, // Resolusi: 1 = 72dpi, 2 = 144dpi, 3 = 216dpi
    format = "png", // 'png' atau 'jpeg'
    quality = 0.92, // Untuk JPEG, 0-1
  } = options;

  // Baca file sebagai ArrayBuffer
  const arrayBuffer = await file.arrayBuffer();

  // Load PDF menggunakan pdf.js
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

  const images = [];

  // Loop semua halaman
  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    // Ambil halaman
    const page = await pdf.getPage(pageNum);

    // Hitung ukuran canvas berdasarkan viewport
    const viewport = page.getViewport({ scale });

    // Buat canvas element
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // Render halaman ke canvas
    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;

    // Convert canvas ke Blob
    const blob = await new Promise((resolve) => {
      if (format === "jpeg") {
        canvas.toBlob(resolve, "image/jpeg", quality);
      } else {
        canvas.toBlob(resolve, "image/png");
      }
    });

    images.push({
      blob,
      pageNumber: pageNum,
      width: viewport.width,
      height: viewport.height,
    });
  }

  return images;
}
