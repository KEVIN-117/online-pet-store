export interface TreeItem {
    id: string;
    label: string;
    children?: TreeItem[];
}

export const treeData: TreeItem[] = [
    {
        id: "1",
        label: "Documentos",
        children: [
            {
                id: "1-1",
                label: "Proyectos",
                children: [
                    { id: "1-1-1", label: "Proyecto A.pdf" },
                    { id: "1-1-2", label: "Proyecto B.docx" },
                    { id: "1-1-3", label: "Memoria Técnica.pptx" },
                ],
            },
            {
                id: "1-2",
                label: "Informes",
                children: [
                    { id: "1-2-1", label: "Informe Anual.xlsx" },
                    { id: "1-2-2", label: "Estadísticas.csv" },
                    {
                        id: "1-2-3",
                        label: "Encuestas",
                        children: [
                            { id: "1-2-3-1", label: "Encuesta Clientes 2023.xlsx" },
                            { id: "1-2-3-2", label: "Encuesta Satisfacción.docx" },
                        ],
                    },
                ],
            },
            {
                id: "1-3",
                label: "Contratos",
                children: [
                    { id: "1-3-1", label: "Contrato Empresa X.pdf" },
                    { id: "1-3-2", label: "Contrato Empresa Y.docx" },
                ],
            },
        ],
    },
    {
        id: "2",
        label: "Imágenes",
        children: [
            {
                id: "2-1",
                label: "Fotografías",
                children: [
                    { id: "2-1-1", label: "Vacaciones.jpg" },
                    { id: "2-1-2", label: "Cumpleaños.png" },
                ],
            },
            {
                id: "2-2",
                label: "Fondos de Pantalla",
                children: [
                    { id: "2-2-1", label: "Montañas.jpg" },
                    { id: "2-2-2", label: "Galaxy Wallpaper.png" },
                ],
            },
        ],
    },
    {
        id: "3",
        label: "Audios",
        children: [
            { id: "3-1", label: "Podcast Episodio 1.mp3" },
            { id: "3-2", label: "Entrevista.wav" },
            {
                id: "3-3",
                label: "Música",
                children: [
                    { id: "3-3-1", label: "Canción Favorita.mp3" },
                    { id: "3-3-2", label: "Relaxing Sounds.flac" },
                ],
            },
        ],
    },
    {
        id: "4",
        label: "Videos",
        children: [
            { id: "4-1", label: "Presentación Corporativa.mp4" },
            { id: "4-2", label: "Tutorial React.js.webm" },
        ],
    },
    {
        id: "5",
        label: "Código Fuente",
        children: [
            {
                id: "5-1",
                label: "Frontend",
                children: [
                    { id: "5-1-1", label: "App.tsx" },
                    { id: "5-1-2", label: "Navbar.jsx" },
                    { id: "5-1-3", label: "styles.css" },
                ],
            },
            {
                id: "5-2",
                label: "Backend",
                children: [
                    { id: "5-2-1", label: "server.js" },
                    { id: "5-2-2", label: "database.sql" },
                ],
            },
        ],
    },
    {
        id: "6",
        label: "Configuraciones",
        children: [
            { id: "6-1", label: "Configuración de la aplicación.json" },
            { id: "6-2", label: "Configuración del usuario.json" },
            {
                id: "6-3",
                label: "Red",
                children: [
                    { id: "6-3-1", label: "config_router.json" },
                    { id: "6-3-2", label: "firewall_rules.conf" },
                ],
            },
        ],
    },
    {
        id: "7",
        label: "Base de Datos",
        children: [
            { id: "7-1", label: "Backup 2024.sql" },
            { id: "7-2", label: "usuarios.csv" },
        ],
    },
];
