import React from 'react';
import { Topic, TopicId } from '../types';
import { BookOpen, ChevronRight } from 'lucide-react';

interface SidebarProps {
    topics: Topic[];
    currentTopicId: TopicId;
    onSelectTopic: (id: TopicId) => void;
    isOpen: boolean;
    toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ topics, currentTopicId, onSelectTopic, isOpen, toggleSidebar }) => {
    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={toggleSidebar}
                ></div>
            )}

            {/* Sidebar Container */}
            <aside 
                className={`
                    fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static md:h-screen flex flex-col
                `}
            >
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <div className="bg-blue-600 p-2 rounded-lg text-white">
                        <BookOpen size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-800 text-lg leading-tight">Cálculo II</h1>
                        <p className="text-xs text-slate-500 font-medium">UdeC Resumen</p>
                    </div>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 scrollbar-hide">
                    <ul className="space-y-1">
                        {topics.map((topic) => (
                            <li key={topic.id}>
                                <button
                                    onClick={() => {
                                        onSelectTopic(topic.id);
                                        if (window.innerWidth < 768) toggleSidebar();
                                    }}
                                    className={`
                                        w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm font-medium transition-colors
                                        ${currentTopicId === topic.id 
                                            ? 'bg-blue-50 text-blue-700' 
                                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{topic.icon}</span>
                                        <span className="truncate">{topic.title}</span>
                                    </div>
                                    {currentTopicId === topic.id && <ChevronRight size={16} />}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-3 rounded-md border border-slate-200">
                        <p className="text-xs text-slate-500 text-center">
                            Basado en el resumen de<br/>Nicolás Fernández Beltrán
                        </p>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
