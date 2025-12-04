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
                content: "La integral es la operación inversa a la derivada.\n$\\int f(x) \\, dx = F(x) + C$",
                formulas: [
                    "$\\int k \\, dx = kx + C$",
                    "$\\int x^n \\, dx = \\frac{x^{n+1}}{n+1} + C, \\quad n \\neq -1$",
                    "$\\int (f(x) \\pm g(x)) \\, dx = \\int f(x) \\, dx \\pm \\int g(x) \\, dx$"
                ]
            },
            {
                title: "Trigonométricas y Exponenciales",
                content: "Memoriza estas integrales directas para acelerar el cálculo.",
                formulas: [
                    "$\\int e^x \\, dx = e^x + C$",
                    "$\\int \\frac{1}{x} \\, dx = \\ln|x| + C$",
                    "$\\int \\cos(x) \\, dx = \\sin(x) + C$",
                    "$\\int \\sin(x) \\, dx = -\\cos(x) + C$",
                    "$\\int \\sec^2(x) \\, dx = \\tan(x) + C$"
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
                content: "Se usa cuando ves una función y su derivada multiplicando.\nCambio: $u = f(x)$, $du = f'(x)dx$.",
                formulas: ["$\\int g(f(x))f'(x) \\, dx = \\int g(u) \\, du$"]
            },
            {
                title: "Integración por Partes",
                content: "Útil para productos de funciones. Recuerda ILATE para elegir 'u'.",
                formulas: ["$\\int u \\, dv = uv - \\int v \\, du$"]
            },
            {
                title: "Sustitución Trigonométrica",
                content: "Para raíces cuadradas con sumas o restas de cuadrados.",
                formulas: [
                    "$\\sqrt{a^2-x^2} \\to x = a \\sin(\\theta)$",
                    "$\\sqrt{a^2+x^2} \\to x = a \\tan(\\theta)$",
                    "$\\sqrt{x^2-a^2} \\to x = a \\sec(\\theta)$"
                ]
            },
            {
                title: "Fracciones Parciales",
                content: "Para funciones racionales $P(x)/Q(x)$. Primero verifica que grado(P) < grado(Q), si no, divide polinomios.",
                formulas: [
                    "Factor lineal $(x-a) \\to \\frac{A}{x-a}$",
                    "Cuadrático irreducible $(x^2+bx+c) \\to \\frac{Bx+C}{x^2+bx+c}$"
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
                    "$\\int_{a}^{b} f(x) \\, dx = F(b) - F(a)$",
                    "$\\frac{d}{dx} \\int_{a}^{x} f(t) \\, dt = f(x)$"
                ]
            },
            {
                title: "Propiedades",
                content: "Linealidad, inversión de límites y separación de intervalos.",
                formulas: [
                    "$\\int_{a}^{a} f(x) \\, dx = 0$",
                    "$\\int_{a}^{b} f(x) \\, dx = - \\int_{b}^{a} f(x) \\, dx$",
                    "$\\int_{a}^{b} f(x) \\, dx = \\int_{a}^{c} f(x) \\, dx + \\int_{c}^{b} f(x) \\, dx$"
                ]
            }
        ],
        tips: ["Si la función es impar y el intervalo es simétrico $[-a, a]$, la integral es 0.", "Si la función es par en $[-a, a]$, es 2 veces la integral de $[0, a]$."]
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
                formulas: ["$\\int_{a}^{\\infty} f(x) \\, dx = \\lim_{t\\to\\infty} \\int_{a}^{t} f(x) \\, dx$"]
            },
            {
                title: "Segunda Especie (Discontinuidad)",
                content: "Cuando la función se indefine dentro del intervalo.",
                formulas: ["Si $f$ discontinua en $b$: $\\lim_{t\\to b^-} \\int_{a}^{t} f(x) \\, dx$"]
            },
            {
                title: "Criterios de Convergencia",
                content: "Comparación directa, comparación en el límite y P-integral.",
                formulas: [
                    "$\\int_{1}^{\\infty} \\frac{1}{x^p} \\, dx$ converge si $p > 1$",
                    "$\\int_{0}^{1} \\frac{1}{x^p} \\, dx$ converge si $p < 1$"
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
                formulas: ["$A = \\int_{a}^{b} (\\text{Arriba} - \\text{Abajo}) \\, dx$"]
            },
            {
                title: "Respecto a Y",
                content: "Curva derecha menos curva izquierda.",
                formulas: ["$A = \\int_{c}^{d} (\\text{Derecha} - \\text{Izquierda}) \\, dy$"]
            }
        ],
        tips: ["¡Dibuja la gráfica! Es vital para saber cuál función va arriba.", "Encuentra los puntos de intersección igualando $f(x) = g(x)$."]
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
                    "Discos: $V = \\pi \\int [R(x)]^2 \\, dx$",
                    "Arandelas: $V = \\pi \\int ([R(x)]^2 - [r(x)]^2) \\, dx$"
                ]
            },
            {
                title: "Capas Cilíndricas",
                content: "Integras paralelo al eje de rotación.",
                formulas: ["$V = 2\\pi \\int \\text{radio} \\cdot \\text{altura} \\, dx$"]
            }
        ],
        tips: ["El radio NO es siempre $f(x)$. Es la distancia desde el eje de rotación a la curva.", "Capas: Radio = distancia al eje, Altura = curva mayor - curva menor."]
    },
    {
        id: TopicId.PARAMETRIC,
        title: "Curvas Paramétricas",
        icon: "⏳",
        description: "Funciones definidas por parámetro t.",
        subtopics: [
            {
                title: "Derivadas",
                content: "Derivada $dy/dx$ usando $dy/dt$ y $dx/dt$.",
                formulas: [
                    "$\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt}$",
                    "$\\frac{d^2y}{dx^2} = \\frac{\\frac{d}{dt}(dy/dx)}{dx/dt}$"
                ]
            },
            {
                title: "Longitud de Arco",
                content: "Pitágoras generalizado.",
                formulas: ["$L = \\int \\sqrt{ (dx/dt)^2 + (dy/dt)^2 } \\, dt$"]
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
                content: "$x = r \\cos(\\theta)$, $y = r \\sin(\\theta)$.",
                formulas: ["$\\frac{dy}{dx} = \\frac{r'\\sin\\theta + r\\cos\\theta}{r'\\cos\\theta - r\\sin\\theta}$"]
            },
            {
                title: "Área y Longitud",
                content: "Área de sectores polares.",
                formulas: [
                    "$A = \\frac{1}{2} \\int r^2 \\, d\\theta$",
                    "$L = \\int \\sqrt{r^2 + (dr/d\\theta)^2} \\, d\\theta$"
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
                formulas: ["$\\lim_{n\\to\\infty} a_n = L$"]
            },
            {
                title: "Teoremas",
                content: "Sándwich, L'Hopital (usando función asociada) y Monotonía.",
                formulas: ["Si $a_n$ es monótona y acotada $\\to$ Converge"]
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
                    "Geométrica: $\\sum ar^n$ converge si $|r|<1$. Suma $= \\frac{a}{1-r}$",
                    "Serie-P: $\\sum \\frac{1}{n^p}$ converge si $p > 1$"
                ]
            },
            {
                title: "Criterios",
                content: "Integral, Comparación, Razón y Raíz.",
                formulas: [
                    "Razón: $L = \\lim |a_{n+1}/a_n|$. $L < 1$ converge.",
                    "Raíz: $L = \\lim |a_n|^{1/n}$. $L < 1$ converge."
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
                content: "Usar Razón o Raíz para hallar $|x-a| < R$.",
                formulas: ["$1/R = \\lim |c_{n+1}/c_n|$"]
            },
            {
                title: "Intervalo",
                content: "Verificar convergencia en los extremos $x = a-R$ y $x = a+R$ manualmente.",
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
                content: "Centrada en $a$. Maclaurin es centrada en $0$.",
                formulas: [
                    "$f(x) = \\sum \\frac{f^{(n)}(a)}{n!} (x-a)^n$"
                ]
            },
            {
                title: "Series Comunes (Maclaurin)",
                content: "Memorizar estas series ahorra mucho tiempo.",
                formulas: [
                    "$e^x = 1 + x + \\frac{x^2}{2!} + \\dots$",
                    "$\\sin(x) = x - \\frac{x^3}{3!} + \\frac{x^5}{5!} \\dots$",
                    "$\\cos(x) = 1 - \\frac{x^2}{2!} + \\frac{x^4}{4!} \\dots$"
                ]
            }
        ],
        tips: ["El Residuo de Lagrange acota el error de la aproximación.", "Para series alternantes, el error es menor que el primer término despreciado."]
    }
];
