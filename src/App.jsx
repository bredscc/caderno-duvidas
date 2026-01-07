import React, { useState } from 'react';
import { BookOpen, Plus, Trash2, Send, Loader2, X, Clock, Lightbulb } from 'lucide-react';

export default function StudyNotesAssistant() {
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState('');
  const [studyTopic, setStudyTopic] = useState('');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const addNote = () => {
    if (currentNote.trim()) {
      setNotes([...notes, { id: Date.now(), text: currentNote, timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }]);
      setCurrentNote('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addNote();
    }
  };

  const getExplanations = async () => {
    if (notes.length === 0) return;
    
    setIsLoading(true);
    setShowExplanation(true);
    
    try {
      const notesText = notes.map((note, idx) => `${idx + 1}. ${note.text}`).join('\n');
      
      const prompt = `Sou um estudante e estou estudando sobre: ${studyTopic || 'diversos assuntos'}.

Durante meus estudos, anotei as seguintes dúvidas e pontos de estranheza:

${notesText}

Por favor, me ajude explicando cada uma dessas dúvidas de forma clara e didática. Para cada ponto:
- Forneça uma explicação completa e compreensível
- Correlacione as dúvidas quando houver conexão entre elas
- Use exemplos práticos quando possível
- Cite fontes confiáveis ou conceitos estabelecidos quando relevante

Estruture sua resposta de forma organizada, abordando cada dúvida numerada.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 4000,
          messages: [
            { role: 'user', content: prompt }
          ],
        })
      });

      const data = await response.json();
      const explanationText = data.content
        .filter(item => item.type === 'text')
        .map(item => item.text)
        .join('\n');
      
      setExplanation(explanationText);
    } catch (error) {
      setExplanation('Desculpe, ocorreu um erro ao buscar as explicações. Por favor, tente novamente.');
      console.error('Erro:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setNotes([]);
    setExplanation('');
    setShowExplanation(false);
    setStudyTopic('');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Caderno de Dúvidas</h1>
              <p className="text-sm text-slate-600">Mantenha o foco e esclareça tudo depois</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Study Topic Input */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-6">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Assunto de Estudo
          </label>
          <input
            type="text"
            placeholder="Ex: Física Quântica, Programação em Python, História do Brasil..."
            value={studyTopic}
            onChange={(e) => setStudyTopic(e.target.value)}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 placeholder-slate-400"
          />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Notes Section */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-900">Anotações</h2>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm font-medium">
                  {notes.length} {notes.length === 1 ? 'dúvida' : 'dúvidas'}
                </span>
              </div>
              
              {/* Note Input */}
              <div>
                <textarea
                  value={currentNote}
                  onChange={(e) => setCurrentNote(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Descreva sua dúvida ou ponto de estranheza..."
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-slate-900 placeholder-slate-400"
                  rows="3"
                />
                <button
                  onClick={addNote}
                  disabled={!currentNote.trim()}
                  className="mt-3 w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors font-medium"
                >
                  <Plus className="w-5 h-5" />
                  Adicionar Dúvida
                </button>
              </div>
            </div>

            {/* Notes List */}
            <div className="p-6">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {notes.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-3">
                      <Lightbulb className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">Nenhuma dúvida registrada</p>
                    <p className="text-sm text-slate-400 mt-1">Comece anotando suas questões</p>
                  </div>
                ) : (
                  notes.map((note, idx) => (
                    <div key={note.id} className="bg-slate-50 p-4 rounded-lg border border-slate-200 group hover:border-slate-300 transition-all">
                      <div className="flex gap-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-semibold">
                          {idx + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-slate-800 text-sm leading-relaxed whitespace-pre-wrap break-words">{note.text}</p>
                          <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-500">
                            <Clock className="w-3 h-3" />
                            {note.timestamp}
                          </div>
                        </div>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="flex-shrink-0 text-slate-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Action Buttons */}
              {notes.length > 0 && (
                <div className="mt-6 space-y-2">
                  <button
                    onClick={getExplanations}
                    disabled={isLoading}
                    className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 disabled:bg-slate-300 flex items-center justify-center gap-2 transition-colors font-medium shadow-sm"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Processando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Explicar Todas as Dúvidas
                      </>
                    )}
                  </button>
                  <button
                    onClick={clearAll}
                    className="w-full bg-white text-slate-700 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 transition-colors font-medium"
                  >
                    Limpar Tudo
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Explanation Section */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-slate-900">Explicações Detalhadas</h2>
                {showExplanation && explanation && (
                  <button
                    onClick={() => setShowExplanation(false)}
                    className="text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
            
            <div className="p-6">
              <div className="max-h-[600px] overflow-y-auto">
                {!showExplanation ? (
                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-3">
                      <Send className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-slate-500 font-medium">Aguardando análise</p>
                    <p className="text-sm text-slate-400 mt-1">Clique no botão verde para receber as explicações</p>
                  </div>
                ) : isLoading ? (
                  <div className="text-center py-16">
                    <Loader2 className="w-12 h-12 mx-auto mb-4 animate-spin text-emerald-600" />
                    <p className="text-slate-700 font-medium">Analisando suas dúvidas</p>
                    <p className="text-sm text-slate-500 mt-1">Aguarde alguns instantes...</p>
                  </div>
                ) : (
                  <div className="prose prose-slate prose-sm max-w-none">
                    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                      <div className="whitespace-pre-wrap text-slate-800 leading-relaxed">
                        {explanation}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}