import React, { useState } from 'react';
import {
    Container,
    Grid,
    Typography,
    Box,
    Chip,
    Button,
    Stack,
    Rating,
    IconButton,
    Divider,
    Breadcrumbs,
    Link,
    useTheme,
    useMediaQuery,
    Tabs,
    Tab,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import {
    Favorite,
    FavoriteBorder,
    ShoppingCart,
    Share,
    LocalShipping,
    Security,
    Replay,
    ExpandMore,
    Coffee,
    Scale,
    Flag,
    CalendarToday
} from "@mui/icons-material";
import Header from "../widgets/header";
import Footer from "../widgets/footer";
import { useParams, useNavigate } from 'react-router-dom';
import type { CoffeeI } from '../types/coffee';

// Mock данные - в реальном приложении будут приходить из API
const mockCoffee: CoffeeI = {
    id: 1,
    name: "Эспрессо Премиум",
    description: "Насыщенный кофе с бархатной пенкой и нотами темного шоколада. Идеально сбалансированный вкус с длительным послевкусием.",
    category: {
        id: 1,
        name: "Эспрессо",
        description: "Классические эспрессо напитки"
    },
    brand: {
        id: 1,
        name: "Italian Roasters",
        description: "Семейная обжарка из Италии",
        logo: "/images/brand-logo.jpg",
        country: "Италия",
        owner: {
            id: "1",
            full_name: "Марио Росси",
            phone_number: "+393331234567",
            photo: "/images/owner.jpg",
            birth_date: new Date("1980-05-15"),
        }
    },
    roast_level: "medium",
    acidity_level: "medium",
    net_weight: 250,
    price: 1800,
    stock_quantity: 15,
    is_available: true,
    avg_rating: 4.8,
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-01-20"),
    coffee_images: [
        { id: 1, image: "/images/coffee-detail-1.jpg", index: 0, coffee: {} as CoffeeI },
        { id: 2, image: "/images/coffee-detail-2.jpg", index: 1, coffee: {} as CoffeeI },
        { id: 3, image: "/images/coffee-detail-3.jpg", index: 2, coffee: {} as CoffeeI },
    ]
};

const CardDetailScreen = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    // В реальном приложении здесь будет запрос к API
    const coffee = mockCoffee;

    const handleAddToCart = () => {
        // Логика добавления в корзину
        console.log(`Added ${quantity} of ${coffee.name} to cart`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

    const features = [
        { icon: <LocalShipping />, text: "Бесплатная доставка от 5000₸" },
        { icon: <Security />, text: "Гарантия качества" },
        { icon: <Replay />, text: "Возврат в течение 14 дней" }
    ];

    const characteristics = [
        { label: "Вес упаковки", value: `${coffee.net_weight}г` },
        { label: "Уровень обжарки", value: coffee.roast_level === 'light' ? 'Светлая' : coffee.roast_level === 'medium' ? 'Средняя' : 'Тёмная' },
        { label: "Кислотность", value: coffee.acidity_level === 'low' ? 'Низкая' : coffee.acidity_level === 'medium' ? 'Средняя' : 'Высокая' },
        { label: "Страна происхождения", value: coffee.brand.country },
        { label: "Наличие", value: coffee.stock_quantity > 0 ? `В наличии (${coffee.stock_quantity} шт.)` : 'Нет в наличии' }
    ];

    const reviews = [
        { id: 1, author: "Алексей", rating: 5, comment: "Отличный кофе! Очень насыщенный вкус.", date: "2024-01-20" },
        { id: 2, author: "Мария", rating: 4, comment: "Хорошее качество, но немного дороговато.", date: "2024-01-18" },
        { id: 3, author: "Дмитрий", rating: 5, comment: "Лучший эспрессо, который я пробовал!", date: "2024-01-15" }
    ];

    if (!coffee) {
        return (
            <Stack minHeight="100vh">
                <Header />
                <Container sx={{ py: 8, textAlign: 'center', flex: 1 }}>
                    <Typography variant="h4">Товар не найден</Typography>
                </Container>
                <Footer />
            </Stack>
        );
    }

    return (
        <Stack component={'main'} direction={'column'} minHeight={'100vh'} width={'100%'}>
            <Header />

            <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
                {/* Хлебные крошки */}
                <Breadcrumbs sx={{ mb: 4 }}>
                    <Link
                        color="inherit"
                        href="/"
                        onClick={(e) => { e.preventDefault(); navigate('/'); }}
                        sx={{ cursor: 'pointer' }}
                    >
                        Главная
                    </Link>
                    <Link
                        color="inherit"
                        href="/menu"
                        onClick={(e) => { e.preventDefault(); navigate('/menu'); }}
                        sx={{ cursor: 'pointer' }}
                    >
                        Меню
                    </Link>
                    <Typography color="text.primary">{coffee.name}</Typography>
                </Breadcrumbs>

                <Grid container spacing={6}>
                    {/* Левая колонка - изображения */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={2}>
                            {/* Главное изображение */}
                            <Box
                                sx={{
                                    width: '100%',
                                    height: isMobile ? 300 : 500,
                                    borderRadius: 3,
                                    backgroundColor: 'grey.100',
                                    backgroundImage: `url(${coffee.coffee_images?.[selectedImage]?.image || '/images/coffee-placeholder.jpg'})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    backgroundRepeat: 'no-repeat',
                                    position: 'relative'
                                }}
                            />

                            {/* Миниатюры */}
                            {coffee.coffee_images && coffee.coffee_images.length > 1 && (
                                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto' }}>
                                    {coffee.coffee_images.map((image, index) => (
                                        <Box
                                            key={image.id}
                                            sx={{
                                                width: 80,
                                                height: 80,
                                                borderRadius: 2,
                                                backgroundColor: 'grey.100',
                                                backgroundImage: `url(${image.image})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                cursor: 'pointer',
                                                border: selectedImage === index ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
                                                flexShrink: 0
                                            }}
                                            onClick={() => setSelectedImage(index)}
                                        />
                                    ))}
                                </Stack>
                            )}
                        </Stack>
                    </Grid>

                    {/* Правая колонка - информация о товаре */}
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Stack spacing={3}>
                            {/* Заголовок и рейтинг */}
                            <Box>
                                <Chip
                                    label={coffee.category.name}
                                    size="small"
                                    color="primary"
                                    variant="outlined"
                                    sx={{ mb: 2 }}
                                />
                                <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
                                    {coffee.name}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                    <Rating value={coffee.avg_rating} precision={0.1} readOnly />
                                    <Typography variant="body2" color="text.secondary">
                                        ({coffee.avg_rating} · 24 отзыва)
                                    </Typography>
                                </Box>
                                <Typography variant="body1" color="text.secondary">
                                    Бренд: {coffee.brand.name}
                                </Typography>
                            </Box>

                            {/* Цена */}
                            <Box>
                                <Typography variant="h3" color="primary" fontWeight="bold">
                                    {coffee.price} ₸
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    за {coffee.net_weight}г
                                </Typography>
                            </Box>

                            {/* Описание */}
                            <Typography variant="body1" sx={{ lineHeight: 1.7 }}>
                                {coffee.description}
                            </Typography>

                            {/* Характеристики */}
                            <Box>
                                <Typography variant="h6" gutterBottom fontWeight="bold">
                                    Характеристики
                                </Typography>
                                <Grid container spacing={1}>
                                    {characteristics.map((char, index) => (
                                        <Grid size={{ xs: 6 }} key={index}>
                                            <Typography variant="body2" color="text.secondary">
                                                {char.label}:
                                            </Typography>
                                            <Typography variant="body2" fontWeight="medium">
                                                {char.value}
                                            </Typography>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Box>

                            {/* Количество и кнопки */}
                            <Box>
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight="bold">
                                        Количество:
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            disabled={quantity <= 1}
                                        >
                                            -
                                        </IconButton>
                                        <Typography sx={{ minWidth: 40, textAlign: 'center' }}>
                                            {quantity}
                                        </Typography>
                                        <IconButton
                                            size="small"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            +
                                        </IconButton>
                                    </Box>
                                </Stack>

                                <Stack direction={isMobile ? "column" : "row"} spacing={2}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        startIcon={<ShoppingCart />}
                                        onClick={handleAddToCart}
                                        disabled={!coffee.is_available}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            borderRadius: 2
                                        }}
                                    >
                                        В корзину
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        size="large"
                                        onClick={handleBuyNow}
                                        disabled={!coffee.is_available}
                                        sx={{
                                            flex: 1,
                                            py: 1.5,
                                            borderRadius: 2
                                        }}
                                    >
                                        Купить сейчас
                                    </Button>
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            onClick={() => setIsFavorite(!isFavorite)}
                                            color={isFavorite ? "error" : "default"}
                                        >
                                            {isFavorite ? <Favorite /> : <FavoriteBorder />}
                                        </IconButton>
                                        <IconButton>
                                            <Share />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            </Box>

                            {/* Особенности */}
                            <Card variant="outlined">
                                <CardContent>
                                    <List dense>
                                        {features.map((feature, index) => (
                                            <ListItem key={index}>
                                                <ListItemIcon sx={{ minWidth: 40 }}>
                                                    {feature.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={feature.text} />
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                        </Stack>
                    </Grid>
                </Grid>

                {/* Детальная информация */}
                <Box sx={{ mt: 8 }}>
                    <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 4 }}>
                        <Tab label="Описание" />
                        <Tab label="Характеристики" />
                        <Tab label={`Отзывы (${reviews.length})`} />
                    </Tabs>

                    {activeTab === 0 && (
                        <Stack spacing={3}>
                            <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                                {coffee.description} Этот кофе отличается идеальным балансом между кислотностью и горечью,
                                с нотами темного шоколада, карамели и легкой фруктовой кислинкой. Идеально подходит
                                для приготовления эспрессо и других кофейных напитков.
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMore />}>
                                            <Typography fontWeight="bold">Способ приготовления</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Для идеального эспрессо: температура воды 92-96°C, время экстракции 25-30 секунд,
                                                выход 30-40 мл из 18-20 г молотого кофе.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                                <Grid size={{ xs: 12, md: 6 }}>
                                    <Accordion>
                                        <AccordionSummary expandIcon={<ExpandMore />}>
                                            <Typography fontWeight="bold">Рекомендации по хранению</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography>
                                                Хранить в сухом прохладном месте, в герметичной упаковке,
                                                избегая прямых солнечных лучей. Использовать в течение 2-3 недель после вскрытия.
                                            </Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                </Grid>
                            </Grid>
                        </Stack>
                    )}

                    {activeTab === 1 && (
                        <Grid container spacing={4}>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom>Основные характеристики</Typography>
                                <List>
                                    {characteristics.map((char, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={char.label}
                                                secondary={char.value}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Grid>
                            <Grid size={{ xs: 12, md: 6 }}>
                                <Typography variant="h6" gutterBottom>О бренде</Typography>
                                <Typography variant="body1" sx={{ mb: 2 }}>
                                    {coffee.brand.description}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Coffee color="primary" />
                                    <Typography>Страна: {coffee.brand.country}</Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    )}

                    {activeTab === 2 && (
                        <Stack spacing={3}>
                            {reviews.map(review => (
                                <Card key={review.id} variant="outlined">
                                    <CardContent>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                            <Typography fontWeight="bold">{review.author}</Typography>
                                            <Rating value={review.rating} size="small" readOnly />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                            {new Date(review.date).toLocaleDateString('ru-RU')}
                                        </Typography>
                                        <Typography>{review.comment}</Typography>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    )}
                </Box>
            </Container>

            <Footer />
        </Stack>
    );
};

export default CardDetailScreen;