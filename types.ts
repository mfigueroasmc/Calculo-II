export enum TopicId {
    INTEGRALS = 'integrals',
    INTEGRATION_METHODS = 'methods',
    DEFINITE_INTEGRAL = 'definite',
    IMPROPER_INTEGRALS = 'improper',
    AREA_BETWEEN_CURVES = 'area',
    SOLIDS_REVOLUTION = 'solids',
    PARAMETRIC = 'parametric',
    POLAR = 'polar',
    SEQUENCES = 'sequences',
    SERIES = 'series',
    POWER_SERIES = 'power_series',
    TAYLOR = 'taylor'
}

export interface SubTopic {
    title: string;
    content: string; // Markdown-like content
    formulas?: string[];
}

export interface Topic {
    id: TopicId;
    title: string;
    icon: string;
    description: string;
    subtopics: SubTopic[];
    tips: string[]; // Intelligent tips from the PDF
}

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    isError?: boolean;
}
