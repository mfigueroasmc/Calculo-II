import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TopicViewer from './components/TopicViewer';
import TutorInterface from './components/TutorInterface';
import { TOPICS } from './constants';
import { TopicId, SubTopic } from './types';
import { initializeGemini } from './services/geminiService';
import { Menu, Key } from 'lucide-react';

const App: React.FC = () => {
    const [currentTopicId, setCurrentTopicId] = useState<TopicId>(TopicId.INTEGRALS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTutorOpen, setIsTutorOpen] = useState(false);
    const [selectedSubTopic, setSelectedSubTopic] = useState<SubTopic | undefined>(undefined);
    const [apiKey, setApiKey] = useState<string>("");
    const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

    // Auto-detect API key from env if available (development)
    useEffect(() => {
        // In this environment we expect the user to provide it or it to be injected
        // For the purpose of the component, we check local storage first for persistence
        const storedKey = localStorage.getItem("GEMINI_API_KEY");
        if (storedKey) {
            setApiKey(storedKey);
            initializeGemini(storedKey);
        }
    }, []);

    const handleSaveApiKey = (key: string) => {
        if (key.trim()) {
            setApiKey(key);
            localStorage.setItem("GEMINI_API_KEY", key);
            initializeGemini(key);
            setIsApiKeyModalOpen(false);
        }
    };

    const currentTopic = TOPICS.find(t => t.id === currentTopicId) || TOPICS[0];

    const handleStartPractice = (subTopic?: SubTopic) => {
        setSelectedSubTopic(subTopic);
        setIsTutorOpen(true);
    };

    return (
        <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
            {/* Sidebar */}
            <Sidebar 
                topics={TOPICS}
                currentTopicId={currentTopicId}
                onSelectTopic={setCurrentTopicId}
                isOpen={isSidebarOpen}
                toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
                
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between shrink-0">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-slate-800">Cálculo II</span>
                    <button onClick={() => setIsApiKeyModalOpen(true)} className={`${apiKey ? 'text-green-600' : 'text-slate-400'}`}>
                        <Key size={20} />
                    </button>
                </div>

                {/* Desktop Top Bar (Hidden on mobile) */}
                <div className="hidden md:flex justify-end p-4 absolute top-0 right-0 z-10">
                    <button 
                        onClick={() => setIsApiKeyModalOpen(true)} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                            apiKey ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <Key size={16} />
                        {apiKey ? 'API Key Configurada' : 'Configurar API Key'}
                    </button>
                </div>

                {/* Scrollable Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:px-12 pt-16 md:pt-16">
                    <TopicViewer 
                        topic={currentTopic} 
                        onStartPractice={handleStartPractice}
                    />
                </main>
            </div>

            {/* Tutor Modal */}
            <TutorInterface 
                topic={currentTopic}
                initialSubTopic={selectedSubTopic}
                isOpen={isTutorOpen}
                onClose={() => setIsTutorOpen(false)}
                hasApiKey={!!apiKey}
                onRequestApiKey={() => setIsApiKeyModalOpen(true)}
            />

            {/* API Key Modal */}
            {isApiKeyModalOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-fade-in-up">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">Configurar Gemini API</h3>
                        <p className="text-slate-600 text-sm mb-4">
                            Para usar el tutor inteligente, necesitas una API Key gratuita de Google Gemini. 
                            Tu clave se guarda localmente en tu navegador.
                        </p>
                        <input 
                            type="password" 
                            placeholder="Pegar API Key aquí..."
                            className="w-full p-3 border border-slate-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveApiKey((e.target as HTMLInputElement).value);
                            }}
                        />
                        <div className="flex justify-end gap-3">
                            <button 
                                onClick={() => setIsApiKeyModalOpen(false)}
                                className="px-4 py-2 text-slate-500 hover:bg-slate-100 rounded-lg font-medium"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={() => {
                                    const input = document.querySelector('input[type="password"]') as HTMLInputElement;
                                    handleSaveApiKey(input.value);
                                }}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
                            >
                                Guardar
                            </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 text-center">
                            <a 
                                href="https://aistudio.google.com/app/apikey" 
                                target="_blank" 
                                rel="noreferrer"
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Obtener API Key aquí
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
