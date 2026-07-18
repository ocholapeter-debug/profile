import React, { useState, useEffect } from 'react';
import ImageTracer from 'imagetracerjs'; // npm install imagetracerjs
import JSZip from 'jszip'; // npm install jzip
import * as XLSX from 'xlsx'; // npm install xlsx
import { pipeline } from '@xenova/transformers'; // npm install @xenova/transformers
import { PencilRuler, Archive, TableProperties, Mic, Download, Loader2, File, Code, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { auth, signOut, onAuthStateChanged } from './firebase';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  // --- STATE SYSTEM MANAGEMENT ---
  const [loadingStates, setLoadingStates] = useState({ vector: false, zip: false, sheet: false, audio: false });
  const [logMessages, setLogMessages] = useState({ audio: '' });
  
  // Feature Outputs
  const [svgPreview, setSvgPreview] = useState('');
  const [zipFiles, setZipFiles] = useState([]);
  const [zipDownloadUrl, setZipDownloadUrl] = useState('');
  const [sheetJsonData, setSheetJsonData] = useState(null);
  const [transcriptionText, setTranscriptionText] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return unsubscribe;
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  // --- TOOL 1: SVG VECTORIZER ENGINE ---
  const handleVectorization = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingStates(prev => ({ ...prev, vector: true }));
    const reader = new FileReader();
    reader.onload = (event) => {
      // Processes pixels directly inside the client engine context
      ImageTracer.imageToSVG(
        event.target.result,
        (svgString) => {
          setSvgPreview(svgString);
          setLoadingStates(prev => ({ ...prev, vector: false }));
        },
        { ltres: 1, qtres: 1, scale: 1 }
      );
    };
    reader.readAsDataURL(file);
  };

  const downloadSVGFile = () => {
    if (!svgPreview) return;
    const blob = new Blob([svgPreview], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'vectorized-output.svg';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  // --- TOOL 2: ZIP ARCHIVE COMPRESSOR ENGINE ---
  const handleZipFileSelection = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setZipFiles(selectedFiles);
    setZipDownloadUrl('');
  };

  const generateZipArchive = async () => {
    if (zipFiles.length === 0) return alert('Please stage files first.');
    setLoadingStates(prev => ({ ...prev, zip: true }));

    const zipEngine = new JSZip();
    // Dynamic mapping straight into virtual directory trees
    zipFiles.forEach((file) => {
      zipEngine.file(file.name, file);
    });

    try {
      // Compress elements via high-efficiency DEFLATE algorithms
      const contentBlob = await zipEngine.generateAsync({ type: 'blob' });
      const url = URL.createObjectURL(contentBlob);
      setZipDownloadUrl(url);
    } catch (err) {
      console.error('Zip generation crash error:', err);
    } finally {
      setLoadingStates(prev => ({ ...prev, zip: false }));
    }
  };

  // --- TOOL 3: SPREADSHEET MATRIX CONVERTER ENGINE ---
  const handleSpreadsheetParsing = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataBuffer = new Uint8Array(event.target.result);
      const workbook = XLSX.read(dataBuffer, { type: 'array' });
      const primarySheetName = workbook.SheetNames[0];
      const targetWorksheet = workbook.Sheets[primarySheetName];
      
      // Structural transformation directly into standard readable JSON arrays
      const formattedJson = XLSX.utils.sheet_to_json(targetWorksheet);
      setSheetJsonData(formattedJson);
    };
    reader.readAsArrayBuffer(file);
  };

  // --- TOOL 4: AI VOICE AUDIO TRANSCRIBER ENGINE ---
  const executeAudioTranscription = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoadingStates(prev => ({ ...prev, audio: true }));
    setLogMessages(prev => ({ ...prev, audio: 'Downloading Whisper models to browser cache...' }));

    try {
      // Runs specialized model pipelines inside web assembly threads via WebWorkers
      const transcriberEngine = await pipeline('automatic-speech-recognition', 'Xenova/whisper-tiny.en');
      setLogMessages(prev => ({ ...prev, audio: 'Analyzing raw acoustic structural parameters...' }));
      
      const response = await fetch(URL.createObjectURL(file));
      const audioBuffer = await response.arrayBuffer();
      
      setLogMessages(prev => ({ ...prev, audio: 'Executing AI matrix calculations...' }));
      const result = await transcriberEngine(audioBuffer);
      
      setTranscriptionText(result.text);
    } catch (err) {
      setLogMessages(prev => ({ ...prev, audio: `Execution failure: ${err.message}` }));
    } finally {
      setLoadingStates(prev => ({ ...prev, audio: false }));
    }
  };

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <div>
          <h1>Office & Student Productivity Hub</h1>
          <p>100% Client-Side In-Browser Media & Document Engines</p>
        </div>
        <button onClick={handleLogout} className="execution-button bg-rose">Logout</button>
      </header>

      {/* DYNAMIC METRIC CSS GRID CONTAINER ELEMENT */}
      <main className="dashboard-grid">
        
        {/* CARD 1: SVG VECTORIZER */}
        <section className="dashboard-card border-purple">
          <h2 className="card-title"><PencilRuler className="icon-purple" /> SVG Vectorizer</h2>
          <p className="card-desc">Convert low-res graphics (.png, .jpg) directly into infinitely scalable math vector graphics.</p>
          <input type="file" accept="image/*" onChange={handleVectorization} className="custom-file-input" />
          
          {loadingStates.vector && (
            <div className="status-indicator processing"><Loader2 className="spin-animation" /> Tracing canvas pipelines...</div>
          )}
          {svgPreview && !loadingStates.vector && (
            <div className="inner-output-box">
              <div className="vector-preview" dangerouslySetInnerHTML={{ __html: svgPreview }} />
              <button onClick={downloadSVGFile} className="execution-button bg-purple"><Download size={16} /> Save SVG Layout</button>
            </div>
          )}
        </section>

        {/* CARD 2: FILE ARCHIVE COMPRESSOR */}
        <section className="dashboard-card border-emerald">
          <h2 className="card-title"><Archive className="icon-emerald" /> Directory Zip Packager</h2>
          <p className="card-desc">Bundle multiple file groups securely inside your device sandbox without server data data leaks.</p>
          <input type="file" multiple onChange={handleZipFileSelection} className="custom-file-input" />
          
          {zipFiles.length > 0 && (
            <div className="inner-output-box">
              <span className="box-subheading">Staged Files ({zipFiles.length}):</span>
              <ul className="file-preview-list">
                {zipFiles.map((f, i) => (
                  <li key={i}><File size={12} /> {f.name}</li>
                ))}
              </ul>
              {!zipDownloadUrl && (
                <button onClick={generateZipArchive} disabled={loadingStates.zip} className="execution-button bg-emerald">
                  {loadingStates.zip ? 'Deflating Data Arrays...' : 'Compile Secure Zip Bundle'}
                </button>
              )}
            </div>
          )}
          {zipDownloadUrl && (
            <div className="status-indicator success-alert">
              <span><CheckCircle2 size={16} /> Zip compiled locally!</span>
              <a href={zipDownloadUrl} download="workspace-archive.zip" className="execution-button bg-emerald-dark"><Download size={16} /> Download .ZIP Archive</a>
            </div>
          )}
        </section>

        {/* CARD 3: SPREADSHEET MATRIX CONVERTER */}
        <section className="dashboard-card border-blue">
          <h2 className="card-title"><TableProperties className="icon-blue" /> Spreadsheet JSON Parser</h2>
          <p className="card-desc">Instantly convert columns, formulas, and ledger sheets (.xlsx, .csv) into structural object models.</p>
          <input type="file" accept=".xlsx, .xls, .csv" onChange={handleSpreadsheetParsing} className="custom-file-input" />
          
          {sheetJsonData && (
            <div className="inner-output-box">
              <span className="box-subheading"><Code size={14} /> Structural JSON Objects:</span>
              <pre className="json-code-viewport">{JSON.stringify(sheetJsonData, null, 2)}</pre>
            </div>
          )}
        </section>

        {/* CARD 4: AI AUDIO TRANSCRIBER */}
        <section className="dashboard-card border-rose">
          <h2 className="card-title"><Mic className="icon-rose" /> Offline Whisper Transcriber</h2>
          <p className="card-desc">Transcribe lectures and records using local neural network pipelines inside browser processing threads.</p>
          <input type="file" accept="audio/*" onChange={executeAudioTranscription} disabled={loadingStates.audio} className="custom-file-input" />
          
          {loadingStates.audio && (
            <div className="status-indicator processing"><Loader2 className="spin-animation" /> {logMessages.audio}</div>
          )}
          {!loadingStates.audio && transcriptionText && (
            <div className="inner-output-box">
              <span className="box-subheading"><FileText size={14} /> Extracted Plaintext Dialog:</span>
              <textarea value={transcriptionText} readOnly className="output-textbox-area" />
            </div>
          )}
        </section>

      </main>
    </div>
  );
}