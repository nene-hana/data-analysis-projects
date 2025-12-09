import React from 'react';
import { Download, Code2, BrainCircuit, Activity, CheckCircle2, Copy } from 'lucide-react';
import { PipelineAnalysis } from '../types';

interface AnalysisResultsProps {
  analysis: PipelineAnalysis;
  onReset: () => void;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ analysis, onReset }) => {
  const downloadNotebook = () => {
    // Construct a minimal .ipynb JSON
    const notebook = {
      cells: [
        {
          cell_type: "markdown",
          metadata: {},
          source: [
            "# Machine Learning Pipeline\n",
            `Generated for task: **${analysis.taskType}** using **${analysis.modelSelected}**`
          ]
        },
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: analysis.pythonCode.split('\n').map(line => line + '\n')
        }
      ],
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3"
        },
        language_info: {
          codemirror_mode: {
            name: "ipython",
            version: 3
          },
          file_extension: ".py",
          mimetype: "text/x-python",
          name: "python",
          nbconvert_exporter: "python",
          pygments_lexer: "ipython3",
          version: "3.8.5"
        }
      },
      nbformat: 4,
      nbformat_minor: 4
    };

    const blob = new Blob([JSON.stringify(notebook, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pipeline.ipynb";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(analysis.pythonCode);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <BrainCircuit className="w-8 h-8 text-purple-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Problem Type</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{analysis.taskType}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <Activity className="w-8 h-8 text-blue-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Recommended Model</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{analysis.modelSelected}</p>
        </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
          <Code2 className="w-8 h-8 text-emerald-600 mb-3" />
          <h3 className="text-sm font-semibold text-slate-500 uppercase">Code Generated</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">Ready</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Dataset Overview */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
              <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
              Dataset Analysis
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-wrap">
              {analysis.datasetOverview}
            </p>
          </div>

          {/* Model Reasoning */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
               <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
               Why this model?
            </h3>
             <p className="text-sm text-slate-600 leading-relaxed">
              {analysis.modelReasoning}
            </p>
          </div>

          {/* Pipeline Steps */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4 flex items-center">
               <span className="w-1 h-6 bg-emerald-500 rounded-full mr-3"></span>
               Pipeline Steps
            </h3>
            <div className="space-y-4">
              {analysis.preprocessingSteps.map((step, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-800">{step.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Code */}
        <div className="lg:col-span-2">
          <div className="bg-slate-900 rounded-xl overflow-hidden shadow-lg h-full flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <Code2 className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-sm text-slate-300">pipeline.py</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={copyCode}
                  className="p-2 hover:bg-slate-700 rounded-lg text-slate-400 hover:text-white transition-colors"
                  title="Copy to clipboard"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <button 
                  onClick={downloadNotebook}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Jupyter Notebook</span>
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-6">
              <pre className="font-mono text-sm text-slate-300">
                <code>{analysis.pythonCode}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
      
       <div className="flex justify-center pt-10">
        <button
          onClick={onReset}
          className="text-slate-500 hover:text-slate-800 font-medium underline underline-offset-4"
        >
          Start New Pipeline
        </button>
      </div>
    </div>
  );
};

export default AnalysisResults;
