import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import TargetSelection from './components/TargetSelection';
import AnalysisResults from './components/AnalysisResults';
import { generatePipeline } from './services/geminiService';
import { DatasetInfo, PipelineAnalysis } from './types';

enum Step {
  UPLOAD,
  SELECT_TARGET,
  ANALYZING,
  RESULTS
}

const App: React.FC = () => {
  const [step, setStep] = useState<Step>(Step.UPLOAD);
  const [dataset, setDataset] = useState<DatasetInfo | null>(null);
  const [analysis, setAnalysis] = useState<PipelineAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDataLoaded = (data: DatasetInfo) => {
    setDataset(data);
    setStep(Step.SELECT_TARGET);
    setError(null);
  };

  const handleTargetSelected = async (target: string) => {
    if (!dataset) return;
    setStep(Step.ANALYZING);
    try {
      const result = await generatePipeline(dataset, target);
      setAnalysis(result);
      setStep(Step.RESULTS);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate pipeline. Please check your API Key and try again.");
      setStep(Step.SELECT_TARGET);
    }
  };

  const handleReset = () => {
    setStep(Step.UPLOAD);
    setDataset(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
                AutoML Gen
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
               <div className="flex items-center space-x-2 text-sm text-slate-500">
                 <span className={`w-2 h-2 rounded-full ${step === Step.UPLOAD ? 'bg-blue-600' : 'bg-slate-300'}`} />
                 <span className={step === Step.UPLOAD ? 'font-semibold text-blue-600' : ''}>Upload</span>
               </div>
               <div className="flex items-center space-x-2 text-sm text-slate-500">
                 <span className={`w-2 h-2 rounded-full ${step === Step.SELECT_TARGET ? 'bg-blue-600' : 'bg-slate-300'}`} />
                 <span className={step === Step.SELECT_TARGET ? 'font-semibold text-blue-600' : ''}>Target</span>
               </div>
               <div className="flex items-center space-x-2 text-sm text-slate-500">
                 <span className={`w-2 h-2 rounded-full ${step === Step.RESULTS ? 'bg-blue-600' : 'bg-slate-300'}`} />
                 <span className={step === Step.RESULTS ? 'font-semibold text-blue-600' : ''}>Results</span>
               </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-center max-w-2xl mx-auto">
            {error}
          </div>
        )}

        {/* Dynamic Content Based on Step */}
        <div className="flex flex-col items-center">
          
          {step === Step.UPLOAD && (
            <div className="text-center w-full space-y-8 animate-fade-in-up">
              <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl mb-4">
                  From Dataset to <span className="text-blue-600">ML Pipeline</span> in seconds.
                </h1>
                <p className="text-lg text-slate-600">
                  Upload your CSV or Excel file. Our AI agent will analyze it, handle preprocessing, and write the best model training code for you.
                </p>
              </div>
              <FileUpload onDataLoaded={handleDataLoaded} />
            </div>
          )}

          {step === Step.SELECT_TARGET && dataset && (
            <TargetSelection 
              data={dataset} 
              onTargetSelected={handleTargetSelected} 
              onBack={handleReset} 
            />
          )}

          {step === Step.ANALYZING && (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mb-6" />
              <h2 className="text-2xl font-bold text-slate-800">Analyzing Dataset...</h2>
              <p className="text-slate-500 mt-2">Detecting types, designing preprocessing steps, and selecting models.</p>
            </div>
          )}

          {step === Step.RESULTS && analysis && (
            <AnalysisResults analysis={analysis} onReset={handleReset} />
          )}

        </div>
      </main>
    </div>
  );
};

export default App;
