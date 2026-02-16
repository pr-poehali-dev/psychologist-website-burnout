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

export default registerCyrillicFonts;
