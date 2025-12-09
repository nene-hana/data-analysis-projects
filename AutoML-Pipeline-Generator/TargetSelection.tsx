import React, { useState } from 'react';
import { Target, ArrowRight, Table } from 'lucide-react';
import { DatasetInfo } from '../types';

interface TargetSelectionProps {
  data: DatasetInfo;
  onTargetSelected: (target: string) => void;
  onBack: () => void;
}

const TargetSelection: React.FC<TargetSelectionProps> = ({ data, onTargetSelected, onBack }) => {
  const [selectedCol, setSelectedCol] = useState<string>('');

  const handleSubmit = () => {
    if (selectedCol) {
      onTargetSelected(selectedCol);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Target className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Select Target Variable</h2>
            <p className="text-sm text-slate-500">Which column do you want to predict?</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto p-1">
          {data.columns.map((col) => (
            <button
              key={col.name}
              onClick={() => setSelectedCol(col.name)}
              className={`
                flex items-center justify-between p-4 rounded-lg border text-left transition-all
                ${selectedCol === col.name
                  ? 'border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
                }
              `}
            >
              <div className="flex flex-col">
                <span className="font-medium text-slate-800">{col.name}</span>
                <span className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{col.type}</span>
              </div>
              {selectedCol === col.name && (
                <div className="w-3 h-3 bg-indigo-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="mt-8 flex justify-between pt-6 border-t border-slate-100">
           <button
            onClick={onBack}
            className="px-6 py-2.5 text-slate-600 font-medium hover:text-slate-900 transition-colors"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            disabled={!selectedCol}
            className={`
              flex items-center space-x-2 px-8 py-2.5 rounded-lg font-semibold text-white transition-all
              ${selectedCol
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg translate-y-0'
                : 'bg-slate-300 cursor-not-allowed'
              }
            `}
          >
            <span>Generate Pipeline</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Table className="w-5 h-5 text-slate-400" />
          <h3 className="font-semibold text-slate-700">Dataset Preview</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                {data.columns.slice(0, 8).map(col => (
                  <th key={col.name} className="px-4 py-3 font-medium whitespace-nowrap">{col.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.sampleData.slice(0, 5).map((row, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-slate-50">
                  {data.columns.slice(0, 8).map(col => (
                    <td key={col.name} className="px-4 py-2.5 text-slate-600 whitespace-nowrap">
                      {row[col.name]?.toString().substring(0, 30)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-slate-400 mt-2 text-center">Showing first 5 rows and 8 columns</p>
        </div>
      </div>
    </div>
  );
};

export default TargetSelection;
