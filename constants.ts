import { Topic, TopicId } from './types';

export const TOPICS: Topic[] = [
    {
        id: TopicId.INTEGRALS,
        title: "La Integral Indefinida",
        icon: "∫",
        description: "Reglas básicas, integrales de Euler, logarítmicas y trigonométricas.",
        subtopics: [
            {
                title: "Reglas Básicas",
                content: "La integral es la operación inversa a la derivada. \n∫ f(x) dx = F(x) + C",
                formulas: [
                    "∫ k dx = kx + C",
                    "∫ x^n dx = (x^{n+1})/(n+1) + C, n ≠ -1",
                    "∫ (f(x) ± g(x)) dx = ∫ f(x) dx ± ∫ g(x) dx"
                ]
            },
            {
                title: "Trigonométricas y Exponenciales",
                content: "Memoriza estas integrales directas para acelerar el cálculo.",
                formulas: [
                    "∫ e^x dx = e^x + C",
                    "∫ 1/x dx = ln|x| + C",
                    "∫ cos(x) dx = sin(x) + C",
                    "∫ sin(x) dx = -cos(x) + C",
                    "∫ sec²(x) dx = tan(x) + C"
                ]
            }
        ],
        tips: ["No olvides la constante de integración (+ C).", "Simplifica la expresión algebraica antes de integrar si es posible."]
    },
    {
        id: TopicId.INTEGRATION_METHODS,
        title: "Métodos de Integración",
        icon: "🛠️",
        description: "Sustitución, Partes, Trigonométrica y Fracciones Parciales.",
        subtopics: [
            {
                title: "Sustitución Simple",
                content: "Se usa cuando ves una función y su derivada multiplicando. \nCambio: u = f(x), du = f'(x)dx.",
                formulas: ["∫ g(f(x))f'(x) dx = ∫ g(u) du"]
            },
            {
                title: "Integración por Partes",
                content: "Útil para productos de funciones. Recuerda ILATE para elegir 'u'.",
                formulas: ["∫ u dv = uv - ∫ v du"]
            },
            {
                title: "Sustitución Trigonométrica",
                content: "Para raíces cuadradas con sumas o restas de cuadrados.",
                formulas: [
                    "√(a²-x²) → x = a·sin(θ)",
                    "√(a²+x²) → x = a·tan(θ)",
                    "√(x²-a²) → x = a·sec(θ)"
                ]
            },
            {
                title: "Fracciones Parciales",
                content: "Para funciones racionales P(x)/Q(x). Primero verifica que grado(P) < grado(Q), si no, divide polinomios.",
                formulas: [
                    "Factor lineal (x-a) → A/(x-a)",
                    "Cuadrático irreducible (x²+bx+c) → (Bx+C)/(x²+bx+c)"
                ]
            }
        ],
        tips: ["En por partes, elige 'u' según ILATE: Inversa, Logarítmica, Algebraica, Trigonométrica, Exponencial.", "Si tienes una raíz cuadrada extraña, intenta sustitución trigonométrica."]
    },
    {
        id: TopicId.DEFINITE_INTEGRAL,
        title: "Integral Definida",
        icon: "📏",
        description: "Teorema Fundamental del Cálculo y Sumas de Riemann.",
        subtopics: [
            {
                title: "Teorema Fundamental (TFC)",
                content: "Relaciona la integral definida con la antiderivada.",
                formulas: [
                    "∫[a,b] f(x) dx = F(b) - F(a)",
                    "d/dx ∫[a,x] f(t) dt = f(x)"
                ]
            },
            {
                title: "Propiedades",
                content: "Linealidad, inversión de límites y separación de intervalos.",
                formulas: [
                    "∫[a,a] f(x) dx = 0",
                    "∫[a,b] f(x) dx = - ∫[b,a] f(x) dx",
                    "∫[a,b] f(x) dx = ∫[a,c] + ∫[c,b]"
                ]
            }
        ],
        tips: ["Si la función es impar y el intervalo es simétrico [-a, a], la integral es 0.", "Si la función es par en [-a, a], es 2 veces la integral de [0, a]."]
    },
    {
        id: TopicId.IMPROPER_INTEGRALS,
        title: "Integrales Impropias",
        icon: "⚠️",
        description: "Límites infinitos y discontinuidades.",
        subtopics: [
            {
                title: "Primera Especie (Intervalo Infinito)",
                content: "Cuando uno de los límites de integración es infinito.",
                formulas: ["∫[a,∞] f(x) dx = lim(t→∞) ∫[a,t] f(x) dx"]
            },
            {
                title: "Segunda Especie (Discontinuidad)",
                content: "Cuando la función se indefine dentro del intervalo.",
                formulas: ["Si f discontinua en b: lim(t→b-) ∫[a,t] f(x) dx"]
            },
            {
                title: "Criterios de Convergencia",
                content: "Comparación directa, comparación en el límite y P-integral.",
                formulas: [
                    "∫[1,∞] 1/x^p dx converge si p > 1",
                    "∫[0,1] 1/x^p dx converge si p < 1"
                ]
            }
        ],
        tips: ["Verifica siempre si la función es continua en todo el intervalo cerrado antes de integrar normalmente.", "Usa el criterio de la P-integral para decidir convergencia rápidamente."]
    },
    {
        id: TopicId.AREA_BETWEEN_CURVES,
        title: "Áreas entre Curvas",
        icon: "🎨",
        description: "Cálculo de regiones acotadas por funciones.",
        subtopics: [
            {
                title: "Respecto a X",
                content: "Curva superior menos curva inferior.",
                formulas: ["A = ∫[a,b] (Arriba - Abajo) dx"]
            },
            {
                title: "Respecto a Y",
                content: "Curva derecha menos curva izquierda.",
                formulas: ["A = ∫[c,d] (Derecha - Izquierda) dy"]
            }
        ],
        tips: ["¡Dibuja la gráfica! Es vital para saber cuál función va arriba.", "Encuentra los puntos de intersección igualando f(x) = g(x)."]
    },
    {
        id: TopicId.SOLIDS_REVOLUTION,
        title: "Sólidos de Revolución",
        icon: "🍩",
        description: "Métodos de Discos, Arandelas y Capas Cilíndricas.",
        subtopics: [
            {
                title: "Discos y Arandelas",
                content: "Integras perpendicular al eje de rotación.",
                formulas: [
                    "Discos: V = π ∫ [R(x)]² dx",
                    "Arandelas: V = π ∫ ([R(x)]² - [r(x)]²) dx"
                ]
            },
            {
                title: "Capas Cilíndricas",
                content: "Integras paralelo al eje de rotación.",
                formulas: ["V = 2π ∫ radio · altura dx"]
            }
        ],
        tips: ["El radio NO es siempre f(x). Es la distancia desde el eje de rotación a la curva.", "Capas: Radio = distancia al eje, Altura = curva mayor - curva menor."]
    },
    {
        id: TopicId.PARAMETRIC,
        title: "Curvas Paramétricas",
        icon: "⏳",
        description: "Funciones definidas por parámetro t.",
        subtopics: [
            {
                title: "Derivadas",
                content: "Derivada dy/dx usando dy/dt y dx/dt.",
                formulas: [
                    "dy/dx = (dy/dt) / (dx/dt)",
                    "d²y/dx² = (d/dt(dy/dx)) / (dx/dt)"
                ]
            },
            {
                title: "Longitud de Arco",
                content: "Pitágoras generalizado.",
                formulas: ["L = ∫ √( (dx/dt)² + (dy/dt)² ) dt"]
            }
        ],
        tips: ["¡Cuidado con la segunda derivada! No es dividir las segundas derivadas de t. Tienes que derivar la primera derivada respecto a t y dividir por dx/dt."]
    },
    {
        id: TopicId.POLAR,
        title: "Coordenadas Polares",
        icon: "🎯",
        description: "Curvas definidas por r y θ.",
        subtopics: [
            {
                title: "Conversión y Derivadas",
                content: "x = r cos(θ), y = r sin(θ).",
                formulas: ["dy/dx = (r'sinθ + rcosθ) / (r'cosθ - rsinθ)"]
            },
            {
                title: "Área y Longitud",
                content: "Área de sectores polares.",
                formulas: [
                    "A = (1/2) ∫ r² dθ",
                    "L = ∫ √(r² + (dr/dθ)²) dθ"
                ]
            }
        ],
        tips: ["Aprovecha la simetría (ej. rosas de 4 pétalos).", "Ten cuidado con el origen (polo) al buscar límites de integración."]
    },
    {
        id: TopicId.SEQUENCES,
        title: "Sucesiones",
        icon: "🔢",
        description: "Límites de secuencias y convergencia.",
        subtopics: [
            {
                title: "Convergencia",
                content: "Límite cuando n tiende a infinito.",
                formulas: ["lim(n→∞) an = L"]
            },
            {
                title: "Teoremas",
                content: "Sándwich, L'Hopital (usando función asociada) y Monotonía.",
                formulas: ["Si an es monótona y acotada → Converge"]
            }
        ],
        tips: ["Para L'Hopital, cambia 'n' por 'x' y deriva la función continua."]
    },
    {
        id: TopicId.SERIES,
        title: "Series Numéricas",
        icon: "∑",
        description: "Sumas infinitas y pruebas de convergencia.",
        subtopics: [
            {
                title: "Series Conocidas",
                content: "Geométrica y Serie-P.",
                formulas: [
                    "Geométrica: Σ ar^n converge si |r|<1. Suma = a/(1-r)",
                    "Serie-P: Σ 1/n^p converge si p > 1"
                ]
            },
            {
                title: "Criterios",
                content: "Integral, Comparación, Razón y Raíz.",
                formulas: [
                    "Razón: L = lim |a_{n+1}/a_n|. L < 1 converge.",
                    "Raíz: L = lim |a_n|^(1/n). L < 1 converge."
                ]
            }
        ],
        tips: ["Si hay factoriales (!), usa Criterio de la Razón.", "Si hay potencias n-ésimas de todo el término, usa Criterio de la Raíz."]
    },
    {
        id: TopicId.POWER_SERIES,
        title: "Series de Potencias",
        icon: "🔋",
        description: "Radio e intervalo de convergencia.",
        subtopics: [
            {
                title: "Radio de Convergencia (R)",
                content: "Usar Razón o Raíz para hallar |x-a| < R.",
                formulas: ["1/R = lim |c_{n+1}/c_n|"]
            },
            {
                title: "Intervalo",
                content: "Verificar convergencia en los extremos x = a-R y x = a+R manualmente.",
                formulas: []
            }
        ],
        tips: ["No olvides analizar los extremos del intervalo por separado usando criterios de series numéricas."]
    },
    {
        id: TopicId.TAYLOR,
        title: "Series de Taylor",
        icon: "📈",
        description: "Aproximación de funciones mediante polinomios.",
        subtopics: [
            {
                title: "Fórmula de Taylor",
                content: "Centrada en a. Maclaurin es centrada en 0.",
                formulas: [
                    "f(x) = Σ (f^(n)(a) / n!) (x-a)^n"
                ]
            },
            {
                title: "Series Comunes (Maclaurin)",
                content: "Memorizar estas series ahorra mucho tiempo.",
                formulas: [
                    "e^x = 1 + x + x²/2! + ...",
                    "sin(x) = x - x³/3! + x⁵/5! ...",
                    "cos(x) = 1 - x²/2! + x⁴/4! ..."
                ]
            }
        ],
        tips: ["El Residuo de Lagrange acota el error de la aproximación.", "Para series alternantes, el error es menor que el primer término despreciado."]
    }
];
