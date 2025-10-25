export interface Choice {
    value: string;
    label: string;
}

export const ACIDITY_LEVEL_CHOICES: Choice[] = [
    { value: "low", label: "Низкая" },
    { value: "medium", label: "Средняя" },
    { value: "high", label: "Высокая" },
];

export const ROAST_LEVEL_CHOICES: Choice[] = [
    { value: "light", label: "Светлая" },
    { value: "medium", label: "Средняя" },
    { value: "dark", label: "Тёмная" },
];
