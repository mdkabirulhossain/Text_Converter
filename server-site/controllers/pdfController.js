import PDFDocument from "pdfkit";


export const generatePdf = async (req, res) => {
try {
const { text, title } = req.body;
if (!text) return res.status(400).json({ message: 'Text is required' });


const doc = new PDFDocument({ margin: 50 });


// stream to buffer
const chunks = [];
doc.on('data', (chunk) => chunks.push(chunk));
doc.on('end', () => {
const result = Buffer.concat(chunks);
res.set({
'Content-Type': 'application/pdf',
'Content-Disposition': `attachment; filename="${(title || 'document').replace(/[^a-z0-9]/gi, '_')}.pdf"`,
'Content-Length': result.length
});
res.send(result);
});


// Add content
doc.fontSize(18).text(title || 'Document', { align: 'center' });
doc.moveDown();
doc.fontSize(12).text(text, { align: 'left' });


doc.end();
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};