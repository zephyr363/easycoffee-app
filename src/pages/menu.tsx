import React, { useState, useEffect } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Button,
    Stack,
    Drawer,
    useTheme,
    useMediaQuery,
    Pagination,
    IconButton
} from "@mui/material";
import {
    FilterList,
    Close,
} from "@mui/icons-material";
import Header from "../widgets/header";
import Footer from "../widgets/footer";
import { useFetchCoffeesQuery } from '../services/coffee';
import type { CoffeeI } from '../types/coffee';
import CoffeeCard from '../widgets/card';
import FiltersSidebar from '../widgets/menu-filter-sidebar';

const MenuScreen = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Состояния фильтров
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceRange, setPriceRange] = useState<number[]>([500, 10000]);
    const [sortBy, setSortBy] = useState('popular');
    const [currentPage, setCurrentPage] = useState(1);

    // Получаем данные с учетом фильтров
    const { data: coffeeData, isLoading } = useFetchCoffeesQuery({
        page: currentPage,
        search: searchTerm || undefined,
        category: selectedCategory !== 'all' ? selectedCategory : undefined,
        price_min: priceRange[0],
        price_max: priceRange[1],
        ordering: getOrdering(sortBy),
    });

    const coffees = coffeeData?.results || [];
    const totalPages = Math.ceil((coffeeData?.count || 0) / 10); // Предполагаем 10 items per page

    // Функция для преобразования sortBy в параметр ordering
    function getOrdering(sortBy: string): string {
        switch (sortBy) {
            case 'price-asc':
                return 'price';
            case 'price-desc':
                return '-price';
            case 'rating':
                return '-avg_rating';
            case 'name':
                return 'name';
            default: // popular
                return '-avg_rating'; // или другой критерий популярности
        }
    }

    // Рекомендуемые товары (с высоким рейтингом)
    const recommendedProducts = coffees.filter(product => (product.avg_rating ?? 0) > 4.5);

    // Сброс фильтров при изменении страницы
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, priceRange, sortBy]);

    return (
        <Stack component={'main'} direction={'column'} minHeight={'100vh'} width={'100%'}>
            <Header />

            <Container maxWidth="xl" sx={{ py: 4, flex: 1 }}>
                {/* Заголовок страницы */}
                <Box textAlign="center" mb={6}>
                    <Typography variant="h2" component="h1" fontWeight="bold" gutterBottom>
                        Наше Меню
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        Откройте для себя мир премиального кофе
                    </Typography>
                </Box>

                {/* Кнопка фильтров для мобильных */}
                {isMobile && (
                    <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        onClick={() => setMobileFiltersOpen(true)}
                        sx={{ mb: 3, width: '100%' }}
                    >
                        Фильтры и сортировка
                    </Button>
                )}

                <Grid container spacing={4}>
                    {/* Боковая панель фильтров */}
                    {!isMobile && (
                        <Grid size={{ md: 3 }}>
                            <FiltersSidebar
                                searchTerm={searchTerm}
                                setSearchTerm={setSearchTerm}
                                selectedCategory={selectedCategory}
                                setSelectedCategory={setSelectedCategory}
                                priceRange={priceRange}
                                setPriceRange={setPriceRange}
                                sortBy={sortBy}
                                setSortBy={setSortBy}
                            />
                        </Grid>
                    )}

                    {/* Основной контент */}
                    <Grid size={{ md: 9, xs: 12, }}>
                        {/* Рекомендуемые товары */}
                        {recommendedProducts.length > 0 && (
                            <Box mb={6}>
                                <Typography variant="h4" gutterBottom fontWeight="bold">
                                    Рекомендуем попробовать
                                </Typography>
                                <Grid container spacing={3}>
                                    {recommendedProducts.map(product => (
                                        <Grid size={{ sm: 6, xs: 12, }} key={product.id}>
                                            <CoffeeCard data={product} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>
                        )}

                        {/* Все товары */}
                        <Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                                <Typography variant="h4" fontWeight="bold">
                                    Все товары ({coffeeData?.count || 0})
                                </Typography>
                                {isMobile && coffeeData?.count && (
                                    <Typography variant="body2" color="text.secondary">
                                        {coffees.length} из {coffeeData.count}
                                    </Typography>
                                )}
                            </Box>

                            {isLoading ? (
                                <Box textAlign="center" py={8}>
                                    <Typography variant="h6" color="text.secondary">
                                        Загрузка...
                                    </Typography>
                                </Box>
                            ) : coffees.length === 0 ? (
                                <Box textAlign="center" py={8}>
                                    <Typography variant="h6" color="text.secondary">
                                        Ничего не найдено
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Попробуйте изменить параметры фильтрации
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <Grid container spacing={3}>
                                        {coffees.map(product => (
                                            <Grid size={{ sm: 6, xs: 12, lg: 4 }} key={product.id}>
                                                <CoffeeCard data={product} />
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {/* Пагинация */}
                                    {totalPages > 1 && (
                                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                            <Pagination
                                                count={totalPages}
                                                page={currentPage}
                                                onChange={(_, value) => setCurrentPage(value)}
                                                color="primary"
                                                size={isMobile ? "small" : "medium"}
                                            />
                                        </Box>
                                    )}
                                </>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Мобильное меню фильтров */}
            <Drawer
                anchor="right"
                open={mobileFiltersOpen}
                onClose={() => setMobileFiltersOpen(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 320,
                        p: 3
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Фильтры
                    </Typography>
                    <IconButton onClick={() => setMobileFiltersOpen(false)}>
                        <Close />
                    </IconButton>
                </Box>
                <FiltersSidebar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </Drawer>

            <Footer />
        </Stack>
    );
};

export default MenuScreen;