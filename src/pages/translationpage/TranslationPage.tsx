import { useState } from "react";
import "./TranslationPage.scss";
import * as XLSX from 'xlsx';
import axios from "axios";

const TranslationPage = () => {

    const [excelData, setExcelData] = useState<any>([]);
    const [flatText, setFlatText] = useState<any>("");
    const [loading, setLoading] = useState<any>(false);
    const [translatedRows, setTranslatedRows] = useState<any[]>([]);

    const handleFileUpload = (event: any) => {
        const file = event.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
    
          const sheetName = workbook.SheetNames[0]; // First sheet
          const worksheet = workbook.Sheets[sheetName];
    
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
    
          // Filter out empty rows
          const cleanedData = jsonData.filter((row: any) =>
            row.some(
              (cell: any) =>
                cell !== null &&
                cell !== undefined &&
                cell.toString().trim() !== ""
            )
          );
    
          setExcelData(cleanedData);
    
          // Flatten to a single string (text blob)
          const flat = cleanedData.flat().filter(Boolean).join(" ");
          setFlatText(flat);
    
          console.log("Cleaned Data:", cleanedData);
          console.log("Flat Text for Translation:", flat);
        };
    
        reader.readAsArrayBuffer(file);
    };

    const handleTranslate1 = async () => {
        if (!excelData.length) return;
        setLoading(true);
      
        const apiKey = "AIzaSyB2VXeL_GSmaalWxiCtzrrhE_KnFiCRAgo";
      
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
      
        const translated: any[] = [];
      
        for (const row of excelData) {
          const sentence = row.join(" ");
          try {
            const res = await axios.post(url, {
              q: sentence,
              target: "en",
              format: "text",
            });
      
            translated.push({
              original: row,
              translated: res.data.data.translations[0].translatedText,
            });
          } catch (error) {
            console.error("Row translation error:", error);
            translated.push({ original: row, translated: "❌ Error translating" });
          }
        }
      
        setTranslatedRows(translated);
        setLoading(false);
      };
      

    return (
        <div className="translation-page">
            <div>
                <h3>Upload Excel File (.xls or .xlsx)</h3>
                <input type="file" accept=".xls,.xlsx" onChange={handleFileUpload} />

                <h4>🧾 Flattened Text (for Translation):</h4>
                <textarea
                    style={{ width: "100%", height: 200 }}
                    value={flatText}
                    readOnly
                />

                <button onClick={handleTranslate1} disabled={loading}>
                    {loading ? "Translating..." : "🌐 Translate to English"}
                </button>

                {translatedRows.length > 0 && (
                    <div style={{ marginTop: "20px" }}>
                        <h4>🧾 Row-wise Translations:</h4>
                        {translatedRows.map((row, idx) => (
                        <div key={idx} style={{ marginBottom: "10px" }}>
                            <strong>Row {idx + 1}:</strong>
                            <div>🗒️ Original: {row.original.join(" | ")}</div>
                            <div>🌐 Translated: {row.translated}</div>
                        </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default TranslationPage;