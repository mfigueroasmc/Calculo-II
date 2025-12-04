import React from 'react';
import { Topic, SubTopic } from '../types';
import { Info, AlertCircle, PlayCircle } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface TopicViewerProps {
    topic: Topic;
    onStartPractice: (subTopic?: SubTopic) => void;
}

const TopicViewer: React.FC<TopicViewerProps> = ({ topic, onStartPractice }) => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header */}
            <header className="space-y-2">
                <div className="flex items-center gap-2 text-blue-600 font-medium">
                    <span>{topic.icon}</span>
                    <span className="uppercase tracking-wider text-xs">Unidad de Aprendizaje</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">{topic.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
                    {topic.description}
                </p>
            </header>

            {/* Smart Tips - Extracted from "Pónganle énfasis a esto" */}
            {topic.tips.length > 0 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 mb-4 text-amber-800">
                        <AlertCircle size={20} />
                        <h3 className="font-bold text-lg">Consejos del Resumen</h3>
                    </div>
                    <ul className="space-y-2">
                        {topic.tips.map((tip, idx) => (
                            <li key={idx} className="flex gap-3 text-amber-900">
                                <span className="font-bold select-none">•</span>
                                <ReactMarkdown 
                                    children={tip} 
                                    remarkPlugins={[remarkMath]} 
                                    rehypePlugins={[rehypeKatex]}
                                    className="markdown-content"
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Subtopics Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {topic.subtopics.map((sub, idx) => (
                    <div key={idx} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-slate-800 mb-2">{sub.title}</h3>
                            <div className="text-slate-600 text-sm leading-relaxed mb-4 markdown-content">
                                <ReactMarkdown 
                                    children={sub.content} 
                                    remarkPlugins={[remarkMath]} 
                                    rehypePlugins={[rehypeKatex]}
                                />
                            </div>
                        </div>
                        
                        {sub.formulas && sub.formulas.length > 0 && (
                            <div className="bg-slate-50 rounded-lg p-3 mb-4 border border-slate-100 font-mono text-sm text-slate-700 space-y-2">
                                {sub.formulas.map((f, i) => (
                                    <div key={i} className="overflow-x-auto">
                                        <ReactMarkdown 
                                            children={f} 
                                            remarkPlugins={[remarkMath]} 
                                            rehypePlugins={[rehypeKatex]}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="mt-auto pt-4 border-t border-slate-100">
                            <button 
                                onClick={() => onStartPractice(sub)}
                                className="w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-700 font-medium py-2 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <PlayCircle size={18} />
                                Practicar este tema
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center mt-12">
                <button 
                    onClick={() => onStartPractice()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1 flex items-center gap-3"
                >
                    <PlayCircle size={24} />
                    Resolver Ejercicios con el Tutor IA
                </button>
            </div>
        </div>
    );
};

export default TopicViewer;
