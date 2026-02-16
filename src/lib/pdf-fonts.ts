import { jsPDF } from 'jspdf';

let cachedRegular: string | null = null;
let cachedBold: string | null = null;

const FONT_URLS = {
  regular: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Regular.ttf',
  bold: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/fonts/Roboto/Roboto-Medium.ttf',
};

async function fetchFontAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function registerCyrillicFonts(doc: jsPDF): Promise<void> {
  if (!cachedRegular) {
    cachedRegular = await fetchFontAsBase64(FONT_URLS.regular);
  }
  if (!cachedBold) {
    cachedBold = await fetchFontAsBase64(FONT_URLS.bold);
  }

  doc.addFileToVFS('Roboto-Regular.ttf', cachedRegular);
  doc.addFont('Roboto-Regular.ttf', 'Roboto', 'normal');

  doc.addFileToVFS('Roboto-Medium.ttf', cachedBold);
  doc.addFont('Roboto-Medium.ttf', 'Roboto', 'bold');

  doc.setFont('Roboto');
}

const LOGO_URL = 'https://cdn.poehali.dev/projects/a3bac347-5782-42ad-951c-8eff9ebbaf38/files/f226b9d0-255f-4b9e-9235-be6096d95e92.jpg';
let cachedLogo: string | null = null;

async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function addPdfBranding(doc: jsPDF): Promise<void> {
  if (!cachedLogo) {
    try {
      cachedLogo = await fetchImageAsBase64(LOGO_URL);
    } catch {
      cachedLogo = null;
    }
  }

  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);

    if (cachedLogo) {
      doc.addImage(`data:image/jpeg;base64,${cachedLogo}`, 'JPEG', 10, 270, 15, 15);
    }

    doc.setFont('Roboto', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(80, 80, 80);
    doc.text('Психолог Александр Гонтарь', 28, 278);

    doc.setFont('Roboto', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text('КПТ-терапия  ·  t.me/algonpsy  ·  algonpsy@vk.com', 28, 284);

    doc.setDrawColor(200, 200, 200);
    doc.line(10, 268, 200, 268);
  }
}

export default registerCyrillicFonts;