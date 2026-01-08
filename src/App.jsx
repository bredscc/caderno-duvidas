import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Copy,
  Check,
  X,
  Info,
  Download,
  StickyNote,
  BookMarked,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

export default function StudyNotesAssistant() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [studyTopic, setStudyTopic] = useState('');
  const [copied, setCopied] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const addNote = () => {
    if (currentNote.trim()) {
      const newNote = {
        id: Date.now(),
        text: currentNote,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setNotes([newNote, ...notes]);
      setCurrentNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  const clearAll = () => {
    if (notes.length > 0 && window.confirm('Arquivar todas as anotações?')) {
      setNotes([]);
      setStudyTopic('');
    }
  };

  const copyAllNotes = async () => {
    const notesText = notes
      .map((note, idx) => `${idx + 1}. ${note.text}`)
      .join('\n\n');

    const textToCopy = `Assunto: ${
      studyTopic || 'Estudos diversos'
    }\n\nDúvidas:\n\n${notesText}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadNotes = () => {
    if (notes.length === 0) return;

    const date = new Date().toLocaleDateString('pt-BR');
    const filename = `anotacoes-${studyTopic || 'estudos'}-${date}.txt`;

    const content = `
CADERNO DE ANOTAÇÕES
====================

Assunto:
${studyTopic || 'Estudos diversos'}

Data:
${date}

Anotações:
-----------

${notes
  .map(
    (note, idx) =>
      `${idx + 1}. (${note.timestamp})\n${note.text}\n`
  )
  .join('\n')}
`;

    const blob = new Blob([content.trim()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="kawaii-planner">
      {/* Washi Tape Decorativo */}
      <div className="washi-tape washi-1">
        <Sparkles className="w-4 h-4" />
        <Sparkles className="w-4 h-4" />
      </div>
      
      <div className="washi-tape washi-2">
        <span>Dúvidas & Ideias</span>
      </div>

      {/* Header */}
      <header className="planner-header">
        <div className="header-content">
          <div className="header-title">
            <div className="kawaii-icon">
              <BookMarked className="w-6 h-6" />
            </div>
            <div>
              <h1>Caderno de Anotações</h1>
              <p>Anoto agora, busco depois • ฅ^•ﻌ•^ฅ</p>
            </div>
          </div>

          <button
            onClick={() => setShowInstructions(true)}
            className="kawaii-button info-btn"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Modal de Instruções */}
      {showInstructions && (
        <div className="instruction-modal" onClick={() => setShowInstructions(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h2>Como usar seu caderno</h2>
              <button
                onClick={() => setShowInstructions(false)}
                className="close-btn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="modal-body">
              <div className="tip-item">
                <div className="tip-number">1</div>
                <p>Digite suas dúvidas no caderno e pressione "Anotar" ou Enter para salvar.</p>
              </div>
              <div className="tip-item">
                <div className="tip-number">2</div>
                <p>Use o botão de copiar para copiar todas as anotações.</p>
              </div>
              <div className="tip-item">
                <div className="tip-number">3</div>
                <p>Baixe suas anotações para guardar no seu computador.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => setShowInstructions(false)}
                className="kawaii-button primary-btn"
              >
                Entendi!
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="planner-main">
        {/* Assunto */}
        <div className="topic-section">
          <div className="paper-card topic-card">
            <div className="card-header">
              <StickyNote className="w-5 h-5" />
              <label>O que estou estudando agora?</label>
            </div>
            <input
              value={studyTopic}
              onChange={(e) => setStudyTopic(e.target.value)}
              className="topic-input"
              placeholder="Ex: Programação, Álgebra, Francês..."
            />
          </div>
        </div>

        <div className="planner-grid">
          {/* Área de Escrita */}
          <div className="notebook-section">
            <div className="notebook-cover">
              <div className="notebook-rings">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="notebook-ring"
                  />
                ))}
              </div>
              
              <div className="lined-paper">
                <div className="margin-line" />
                
                <div className="writing-area">
                  <textarea
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="O que me causou dúvida? Escreva aqui..."
                    className="note-textarea"
                  />

                  <button
                    onClick={addNote}
                    disabled={!currentNote.trim()}
                    className="kawaii-button add-note-btn"
                  >
                    <div className="btn-inner">
                      <Plus className="w-5 h-5" />
                      Anotar
                    </div>
                  </button>

                  {notes.length > 0 && (
                    <div className="action-buttons">
                      <button
                        onClick={copyAllNotes}
                        className="kawaii-button action-btn copy-btn"
                      >
                        <div className="btn-icon">
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </div>
                        {copied ? 'Copiado!' : 'Copiar tudo'}
                      </button>

                      <button
                        onClick={downloadNotes}
                        className="kawaii-button action-btn download-btn"
                      >
                        <div className="btn-icon">
                          <Download className="w-4 h-4" />
                        </div>
                        Baixar
                      </button>

                      <button
                        onClick={clearAll}
                        className="kawaii-button action-btn archive-btn"
                      >
                        Arquivar tudo
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Lista de Notas */}
          <div className="notes-section">
            {notes.length === 0 ? (
              <div className="empty-notes">
                <div className="empty-icon">
                  <BookOpen className="w-12 h-12" />
                </div>
                <p>Seu caderno está esperando para ser usado</p>
                <p className="empty-sub">Comece escrevendo algo à esquerda!</p>
              </div>
            ) : (
              notes.map((note, idx) => (
                <div
                  key={note.id}
                  className="note-card"
                >
                  <div className="note-number">
                    {idx + 1}
                  </div>
                  
                  <div className="note-content">
                    <div className="note-text">
                      {note.text}
                    </div>
                    
                    <div className="note-footer">
                      <span className="note-time">
                        {note.timestamp}
                      </span>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="delete-btn"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      <footer className="planner-footer">
        <p>brecketline</p>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600&family=Quicksand:wght@400;500;600&family=Gaegu:wght@400;700&display=swap');
        
        .kawaii-planner {
          min-height: 100vh;
          background-color: #FFF9F5;
          background-image: 
            radial-gradient(#FFD8D8 1.5px, transparent 1.5px),
            radial-gradient(#D8F0FF 1.5px, transparent 1.5px);
          background-size: 40px 40px;
          background-position: 0 0, 20px 20px;
          font-family: 'Quicksand', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .washi-tape {
          position: absolute;
          padding: 8px 20px;
          font-family: 'Gaegu', cursive;
          font-weight: bold;
          font-size: 1.1rem;
          letter-spacing: 0.5px;
          transform: rotate(-2deg);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 3px 0 rgba(0,0,0,0.1);
        }

        .washi-1 {
          background: linear-gradient(135deg, #FFD8C8, #FFC8D8);
          color: #8B5A5A;
          top: 60px;
          left: 30px;
          border-radius: 4px 12px 12px 4px;
        }

        .washi-2 {
          background: linear-gradient(135deg, #C2F0E0, #D8C8FF);
          color: #5A5A8B;
          top: 120px;
          right: 40px;
          border-radius: 12px 4px 4px 12px;
          transform: rotate(2deg);
        }

        .planner-header {
          background: rgba(255, 248, 240, 0.85);
          backdrop-filter: blur(10px);
          border-bottom: 3px dashed #FFD8C8;
          padding: 20px 0;
          margin-top: 40px;
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .kawaii-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #FFD8C8, #FFC8E6);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 6px 0 #E6B8A8,
            inset 0 2px 4px rgba(255,255,255,0.8);
          color: #8B5A5A;
        }

        .header-title h1 {
          font-family: 'Fredoka', sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: #8B5A5A;
          margin: 0;
        }

        .header-title p {
          font-family: 'Gaegu', cursive;
          font-size: 1.1rem;
          color: #B88A8A;
          margin: 4px 0 0 0;
        }

        .kawaii-button {
          font-family: 'Fredoka', sans-serif;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          position: relative;
          border-radius: 16px;
        }

        .kawaii-button:hover {
          transform: translateY(-3px);
        }

        .kawaii-button:active {
          transform: translateY(0);
        }

        .info-btn {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #D8C8FF, #C8E6FF);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 
            0 6px 0 #B8A8E6,
            inset 0 2px 4px rgba(255,255,255,0.8);
          color: #5A5A8B;
        }

        .info-btn:hover {
          box-shadow: 
            0 8px 0 #B8A8E6,
            inset 0 2px 4px rgba(255,255,255,0.8);
        }

        .instruction-modal {
          position: fixed;
          inset: 0;
          background: rgba(139, 90, 90, 0.3);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal-content {
          background: #FFFBF9;
          border-radius: 24px;
          max-width: 500px;
          width: 100%;
          box-shadow: 
            0 10px 30px rgba(139, 90, 90, 0.15),
            inset 0 1px 0 rgba(255,255,255,0.8);
          border: 3px solid #FFD8C8;
          overflow: hidden;
        }

        .modal-header {
          background: linear-gradient(135deg, #FFD8C8, #FFE6C8);
          padding: 24px;
          display: flex;
          align-items: center;
          gap: 16px;
          border-bottom: 3px dashed #E6B8A8;
        }

        .modal-icon {
          width: 48px;
          height: 48px;
          background: #FFFBF9;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FF8E8E;
          box-shadow: 0 4px 0 #E6B8A8;
        }

        .modal-header h2 {
          font-family: 'Fredoka', sans-serif;
          color: #8B5A5A;
          margin: 0;
          flex: 1;
        }

        .close-btn {
          width: 40px;
          height: 40px;
          background: #FFFBF9;
          border-radius: 12px;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #B88A8A;
          cursor: pointer;
          box-shadow: 0 4px 0 #E6B8A8;
        }

        .modal-body {
          padding: 24px;
        }

        .tip-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
          margin-bottom: 20px;
        }

        .tip-number {
          min-width: 32px;
          height: 32px;
          background: linear-gradient(135deg, #C2F0E0, #C8E6FF);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          color: #5A5A8B;
          box-shadow: 0 4px 0 #A8D8C8;
        }

        .tip-item p {
          margin: 0;
          color: #8B5A5A;
          line-height: 1.5;
          flex: 1;
        }

        .modal-footer {
          padding: 0 24px 24px;
          text-align: center;
        }

        .primary-btn {
          background: linear-gradient(135deg, #FFD8C8, #FF8E8E);
          color: white;
          padding: 14px 32px;
          font-size: 1.1rem;
          box-shadow: 
            0 6px 0 #E66E6E,
            inset 0 2px 4px rgba(255,255,255,0.4);
          border-radius: 18px;
        }

        .planner-main {
          max-width: 1200px;
          margin: 0 auto;
          padding: 32px 24px 60px;
        }

        .topic-section {
          margin-bottom: 32px;
        }

        .paper-card {
          background: #FFFBF9;
          border-radius: 24px;
          border: 3px solid #FFD8C8;
          box-shadow: 
            0 8px 0 #E6B8A8,
            inset 0 0 0 1px rgba(255,255,255,0.8);
          padding: 28px;
          position: relative;
          overflow: hidden;
        }

        .paper-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 12px;
          background: linear-gradient(135deg, #FFD8C8, #FFE6C8);
          border-bottom: 2px dashed #E6B8A8;
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .card-header svg {
          color: #FF8E8E;
        }

        .card-header label {
          font-family: 'Fredoka', sans-serif;
          font-size: 1.2rem;
          color: #8B5A5A;
          font-weight: 600;
        }

        .topic-input {
          width: 100%;
          background: transparent;
          border: none;
          border-bottom: 3px dashed #FFD8C8;
          padding: 12px 0;
          font-family: 'Gaegu', cursive;
          font-size: 1.4rem;
          color: #8B5A5A;
          outline: none;
        }

        .topic-input::placeholder {
          color: #D8A8A8;
          opacity: 0.7;
        }

        .planner-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
        }

        @media (max-width: 768px) {
          .planner-grid {
            grid-template-columns: 1fr;
          }
          
          .washi-tape {
            font-size: 0.9rem;
            padding: 6px 15px;
          }
          
          .header-title h1 {
            font-size: 1.3rem;
          }
        }

        .notebook-cover {
          background: #FFFBF9;
          border-radius: 28px;
          border: 3px solid #FFD8C8;
          box-shadow: 
            0 10px 0 #E6B8A8,
            inset 0 0 0 1px rgba(255,255,255,0.8);
          overflow: hidden;
        }

        .notebook-rings {
          background: linear-gradient(135deg, #FFD8C8, #FFE6C8);
          padding: 16px;
          display: flex;
          justify-content: center;
          gap: 20px;
          border-bottom: 3px dashed #E6B8A8;
        }

        .notebook-ring {
          width: 24px;
          height: 24px;
          background: #FFFBF9;
          border-radius: 50%;
          box-shadow: 
            inset 0 2px 4px rgba(139, 90, 90, 0.1),
            0 2px 0 rgba(139, 90, 90, 0.1);
        }

        .lined-paper {
          background: #FFFEFC;
          background-image: 
            repeating-linear-gradient(
              transparent,
              transparent 29px,
              #FFE6E6 29px,
              #FFE6E6 30px
            );
          padding: 32px;
          min-height: 500px;
          position: relative;
        }

        .margin-line {
          position: absolute;
          left: 32px;
          top: 32px;
          bottom: 32px;
          width: 4px;
          background: linear-gradient(to bottom, #FFC8C8, #FFD8C8);
          border-radius: 2px;
        }

        .writing-area {
          margin-left: 48px;
        }

        .note-textarea {
          width: 100%;
          height: 200px;
          background: transparent;
          border: none;
          resize: none;
          font-family: 'Gaegu', cursive;
          font-size: 1.3rem;
          line-height: 30px;
          color: #8B5A5A;
          outline: none;
          padding: 8px 0;
        }

        .note-textarea::placeholder {
          color: #D8A8A8;
          opacity: 0.7;
        }

        .add-note-btn {
          width: 100%;
          background: linear-gradient(135deg, #FFD8C8, #FF8E8E);
          color: white;
          padding: 18px;
          margin-top: 24px;
          font-size: 1.2rem;
          border-radius: 20px;
          box-shadow: 
            0 8px 0 #E66E6E,
            inset 0 2px 4px rgba(255,255,255,0.4);
        }

        .add-note-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none !important;
        }

        .btn-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
        }

        .action-buttons {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 24px;
        }

        @media (max-width: 600px) {
          .action-buttons {
            grid-template-columns: 1fr;
          }
        }

        .action-btn {
          padding: 14px;
          font-size: 0.95rem;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .copy-btn {
          background: linear-gradient(135deg, #C8E6FF, #D8C8FF);
          color: #5A5A8B;
          box-shadow: 
            0 6px 0 #A8A8E6,
            inset 0 2px 4px rgba(255,255,255,0.8);
        }

        .download-btn {
          background: linear-gradient(135deg, #C2F0E0, #C8FFE6);
          color: #5A8B5A;
          box-shadow: 
            0 6px 0 #A8D8A8,
            inset 0 2px 4px rgba(255,255,255,0.8);
        }

        .archive-btn {
          background: #FFFBF9;
          color: #B88A8A;
          border: 2px solid #FFD8C8;
          box-shadow: 0 6px 0 #E6B8A8;
        }

        .btn-icon {
          width: 20px;
          height: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .notes-section {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .empty-notes {
          background: #FFFBF9;
          border-radius: 28px;
          border: 3px dashed #FFD8C8;
          padding: 60px 40px;
          text-align: center;
          box-shadow: 
            inset 0 0 20px rgba(255, 216, 200, 0.3),
            0 8px 0 rgba(230, 184, 168, 0.3);
        }

        .empty-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #FFE6C8, #FFD8C8);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: #8B5A5A;
          box-shadow: 
            0 8px 0 #E6B8A8,
            inset 0 2px 4px rgba(255,255,255,0.8);
        }

        .empty-notes p {
          font-family: 'Gaegu', cursive;
          font-size: 1.4rem;
          color: #B88A8A;
          margin: 8px 0;
        }

        .empty-sub {
          font-size: 1.1rem !important;
          color: #D8A8A8 !important;
        }

        .note-card {
          background: #FFFBF9;
          border-radius: 20px;
          padding: 24px;
          position: relative;
          border: 3px solid #FFD8C8;
          box-shadow: 
            0 8px 0 #E6B8A8,
            inset 0 0 0 1px rgba(255,255,255,0.8);
          transition: all 0.3s ease;
        }

        .note-card:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 10px 0 #E6B8A8,
            inset 0 0 0 1px rgba(255,255,255,0.8);
        }

        .note-number {
          position: absolute;
          top: -12px;
          left: -12px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #FF8E8E, #FFD8C8);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Fredoka', sans-serif;
          font-weight: 600;
          color: white;
          box-shadow: 
            0 6px 0 #E66E6E,
            inset 0 2px 4px rgba(255,255,255,0.4);
        }

        .note-content {
          margin-left: 8px;
        }

        .note-text {
          font-family: 'Gaegu', cursive;
          font-size: 1.3rem;
          color: #8B5A5A;
          line-height: 1.5;
          margin-bottom: 16px;
          padding-right: 8px;
        }

        .note-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 2px dotted #FFD8C8;
          padding-top: 12px;
        }

        .note-time {
          font-family: 'Quicksand', sans-serif;
          font-size: 0.9rem;
          color: #B88A8A;
        }

        .delete-btn {
          width: 36px;
          height: 36px;
          background: linear-gradient(135deg, #FFE6E6, #FFD8D8);
          border-radius: 10px;
          border: none;
          display: flex;
          align-items: center;
      justify-content: center;
      color: #FF6E6E;
      cursor: pointer;
      box-shadow: 0 4px 0 #E6A8A8;
      transition: all 0.2s ease;
    }

    .delete-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 0 #E6A8A8;
    }

    .planner-footer {
      text-align: center;
      padding: 24px;
      margin-top: 40px;
      border-top: 3px dashed #FFD8C8;
      background: rgba(255, 248, 240, 0.8);
    }

    .planner-footer p {
      font-family: 'Gaegu', cursive;
      font-size: 1.1rem;
      color: #B88A8A;
      margin: 0;
    }
  `}</style>
</div>
);
}