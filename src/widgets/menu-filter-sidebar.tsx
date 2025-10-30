import React from "react";
import {
    Search,
    FilterList,
    ClearAll,
    ExpandMore
} from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Slider,
    Stack,
    TextField,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import { useFetchCategoriesQuery } from "../services/coffee";
import type { CoffeeCategoryI } from "../types/coffee";

interface FiltersSidebarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCategory: string;
    setSelectedCategory: (value: string) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    sortBy: string;
    setSortBy: (value: string) => void;
}

const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    sortBy,
    setSortBy
}) => {
    const { data } = useFetchCategoriesQuery();
    const [categories, setCategories] = React.useState<CoffeeCategoryI[]>([]);

    React.useEffect(() => {
        if (data?.results) {
            setCategories(data.results);
        }
    }, [data]);

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('all');
        setPriceRange([500, 3000]);
        setSortBy('popular');
    };

    const getActiveFiltersCount = () => {
        let count = 0;
        if (searchTerm) count++;
        if (selectedCategory !== 'all') count++;
        if (priceRange[0] !== 500 || priceRange[1] !== 3000) count++;
        if (sortBy !== 'popular') count++;
        return count;
    };

    const activeFiltersCount = getActiveFiltersCount();

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            {/* Заголовок и сброс */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" fontWeight="600" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterList fontSize="small" />
                    Фильтры
                </Typography>
                {activeFiltersCount > 0 && (
                    <Button
                        size="small"
                        startIcon={<ClearAll />}
                        onClick={handleResetFilters}
                        sx={{ minWidth: 'auto' }}
                    >
                        Сброс
                    </Button>
                )}
            </Box>

            {/* Поиск */}
            <TextField
                fullWidth
                size="small"
                placeholder="Поиск кофе..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search fontSize="small" />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Сортировка */}
            <Accordion defaultExpanded sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '48px!important', p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Сортировка
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                    <FormControl fullWidth size="small">
                        <Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <MenuItem value="popular">Популярные</MenuItem>
                            <MenuItem value="price-asc">Цена ↑</MenuItem>
                            <MenuItem value="price-desc">Цена ↓</MenuItem>
                            <MenuItem value="rating">По рейтингу</MenuItem>
                            <MenuItem value="name">По названию</MenuItem>
                        </Select>
                    </FormControl>
                </AccordionDetails>
            </Accordion>

            {/* Категории */}
            <Accordion defaultExpanded sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '48px!important', p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Категории
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                    <Stack spacing={0.5}>
                        <Chip
                            label="Все"
                            variant={selectedCategory === 'all' ? "filled" : "outlined"}
                            onClick={() => setSelectedCategory('all')}
                            color={selectedCategory === 'all' ? "primary" : "default"}
                            size="small"
                        />
                        {categories.map(category => (
                            <Chip
                                key={category.id}
                                label={category.name}
                                variant={selectedCategory === category.name ? "filled" : "outlined"}
                                onClick={() => setSelectedCategory(category.name)}
                                color={selectedCategory === category.name ? "primary" : "default"}
                                size="small"
                            />
                        ))}
                    </Stack>
                </AccordionDetails>
            </Accordion>

            {/* Цена */}
            <Accordion defaultExpanded sx={{ boxShadow: 'none', '&:before': { display: 'none' } }}>
                <AccordionSummary expandIcon={<ExpandMore />} sx={{ minHeight: '48px!important', p: 0 }}>
                    <Typography variant="subtitle1" fontWeight="600">
                        Цена
                    </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ p: 0, pt: 1 }}>
                    <Slider
                        value={priceRange}
                        onChange={(_, newValue) => setPriceRange(newValue as number[])}
                        valueLabelDisplay="auto"
                        valueLabelFormat={(value) => `${value}₸`}
                        min={500}
                        max={3000}
                        step={100}
                        size="small"
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            {priceRange[0]}₸
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {priceRange[1]}₸
                        </Typography>
                    </Box>
                </AccordionDetails>
            </Accordion>

            {/* Счетчик активных фильтров */}
            {activeFiltersCount > 0 && (
                <Chip
                    icon={<FilterList />}
                    label={`Активных фильтров: ${activeFiltersCount}`}
                    variant="outlined"
                    color="primary"
                    size="small"
                />
            )}
        </Stack>
    );
};

export default FiltersSidebar;