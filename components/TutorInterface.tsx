import React, { useState, useEffect, useRef } from 'react';
import { Topic, SubTopic, ChatMessage } from '../types';
import { generateTutorResponse } from '../services/geminiService';
import { Send, X, Bot, User, Loader2, Sparkles, AlertTriangle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface TutorInterfaceProps {
    topic: Topic;
    initialSubTopic?: SubTopic;
    isOpen: boolean;
    onClose: () => void;
    hasApiKey: boolean;
    onRequestApiKey: () => void;
}

const TutorInterface: React.FC<TutorInterfaceProps> = ({ 
    topic, 
    initialSubTopic, 
    isOpen, 
    onClose,
    hasApiKey,
    onRequestApiKey
}) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial greeting when opening
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            const contextMsg = initialSubTopic 
                ? `Hola, quiero practicar "${initialSubTopic.title}" dentro de ${topic.title}. ¿Me das un ejercicio paso a paso?`
                : `Hola Profe, necesito ayuda con ${topic.title}. ¿Podemos repasar los conceptos clave o hacer un ejercicio?`;
            
            // We simulate the user asking this to trigger the AI
            // In a real app we might just have the AI greet first.
            setMessages([{ role: 'model', text: `¡Hola! Soy tu tutor de Cálculo 2. Veo que estás estudiando **${topic.title}**${initialSubTopic ? ` - ${initialSubTopic.title}` : ''}. \n\n¿Quieres que te explique la teoría o prefieres resolver un ejercicio paso a paso?` }]);
        }
    }, [isOpen, topic, initialSubTopic]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        if (!hasApiKey) {
            onRequestApiKey();
            return;
        }

        const userMsg: ChatMessage = { role: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsLoading(true);

        try {
            const history = messages.map(m => ({ role: m.role, text: m.text }));
            const responseText = await generateTutorResponse(topic, initialSubTopic, userMsg.text, history);
            
            setMessages(prev => [...prev, { role: 'model', text: responseText }]);
        } catch (error) {
            setMessages(prev => [...prev, { role: 'model', text: "Hubo un error conectando con el tutor. Por favor verifica tu API Key.", isError: true }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm p-4 md:p-6">
            <div className="bg-white w-full max-w-2xl h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
                
                {/* Header */}
                <div className="bg-slate-900 p-4 flex items-center justify-between text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="bg-blue-500 p-2 rounded-lg">
                            <Bot size={24} />
                        </div>
                        <div>
                            <h3 className="font-bold">Tutor IA - {topic.title}</h3>
                            <p className="text-xs text-slate-400">Basado en Resumen UdeC</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* API Key Warning */}
                {!hasApiKey && (
                    <div className="bg-amber-50 p-3 border-b border-amber-100 flex items-center justify-between text-amber-800 text-sm shrink-0">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={16} />
                            <span>Se requiere Gemini API Key para chatear.</span>
                        </div>
                        <button 
                            onClick={onRequestApiKey}
                            className="text-blue-600 font-bold hover:underline"
                        >
                            Configurar Key
                        </button>
                    </div>
                )}

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
                    {messages.map((msg, idx) => (
                        <div 
                            key={idx} 
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            <div className={`
                                w-8 h-8 rounded-full flex items-center justify-center shrink-0
                                ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-emerald-600 text-white'}
                            `}>
                                {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                            </div>
                            <div className={`
                                max-w-[85%] p-3 rounded-2xl text-sm md:text-base leading-relaxed
                                ${msg.role === 'user' 
                                    ? 'bg-blue-600 text-white rounded-br-none' 
                                    : 'bg-white text-slate-800 shadow-sm border border-slate-200 rounded-bl-none'}
                                ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}
                            `}>
                                <div className="markdown-content">
                                    <ReactMarkdown 
                                        children={msg.text} 
                                        remarkPlugins={[remarkMath]} 
                                        rehypePlugins={[rehypeKatex]}
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0">
                                <Bot size={16} />
                            </div>
                            <div className="bg-white p-3 rounded-2xl rounded-bl-none shadow-sm border border-slate-200 flex items-center gap-2 text-slate-500">
                                <Loader2 size={16} className="animate-spin" />
                                <span className="text-sm">Pensando paso a paso...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-slate-200 shrink-0">
                    <div className="relative">
                        <textarea
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Escribe tu duda o pide un ejercicio..."
                            className="w-full pl-4 pr-12 py-3 bg-slate-100 border-0 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all resize-none text-slate-800 max-h-32"
                            rows={1}
                            disabled={!hasApiKey || isLoading}
                        />
                        <button 
                            onClick={handleSend}
                            disabled={!inputValue.trim() || !hasApiKey || isLoading}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <div className="mt-2 text-center">
                        <p className="text-[10px] text-slate-400">
                            La IA puede cometer errores. Verifica con tus apuntes.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TutorInterface;
