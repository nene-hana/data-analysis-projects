import { DatasetInfo, DatasetColumn } from '../types';

export const parseFile = async (file: File): Promise<DatasetInfo> => {
  return new Promise((resolve, reject) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    
    if (isExcel) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          const workbook = window.XLSX.read(data, { type: 'binary' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = window.XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          
          if (jsonData.length < 2) throw new Error("File appears empty or invalid");
          
          const headers = jsonData[0] as string[];
          const rows = jsonData.slice(1) as any[][];
          
          // Convert array of arrays to array of objects for consistency
          const mappedData = rows.map(row => {
            const obj: any = {};
            headers.forEach((h, i) => {
              obj[h] = row[i];
            });
            return obj;
          });

          const info = analyzeData(file.name, headers, mappedData);
          resolve(info);
        } catch (err) {
          reject(err);
        }
      };
      reader.readAsBinaryString(file);
    } else {
      // CSV Parsing
      window.Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        preview: 2000, // Limit for performance on client side
        complete: (results: any) => {
          if (results.data && results.data.length > 0) {
            const headers = results.meta.fields || Object.keys(results.data[0]);
            const info = analyzeData(file.name, headers, results.data);
            resolve(info);
          } else {
            reject(new Error("Could not parse CSV data"));
          }
        },
        error: (error: any) => reject(error),
      });
    }
  });
};

const analyzeData = (fileName: string, headers: string[], data: any[]): DatasetInfo => {
  const rowCount = data.length;
  
  const columns: DatasetColumn[] = headers.map(header => {
    let missing = 0;
    const values = new Set();
    let numericCount = 0;
    const samples: any[] = [];

    // Analyze first 500 rows or all if smaller
    const limit = Math.min(rowCount, 500);
    
    for (let i = 0; i < limit; i++) {
      const val = data[i][header];
      if (val === null || val === undefined || val === '') {
        missing++;
      } else {
        values.add(val);
        if (typeof val === 'number') numericCount++;
        if (samples.length < 5) samples.push(val);
      }
    }

    // Heuristic for type detection
    let type: DatasetColumn['type'] = 'unknown';
    if (numericCount > (limit - missing) * 0.9) {
        type = 'numeric';
    } else {
        // Simple check for date
        const isDate = samples.some(s => !isNaN(Date.parse(String(s))));
        type = isDate && values.size > 10 ? 'datetime' : 'categorical';
    }

    return {
      name: header,
      type,
      missingCount: missing, // Approximate from sample if large
      uniqueCount: values.size,
      sampleValues: samples
    };
  });

  return {
    fileName,
    rowCount,
    columns,
    sampleData: data.slice(0, 10)
  };
};
