import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useState, type FC } from "react";
import type { CoffeeI } from "../types/coffee";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/icons-material/Link";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Share from "@mui/icons-material/Share";
import Favorite from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Rating from "@mui/material/Rating";
import ListItemIcon from "@mui/material/ListItemIcon";
import LocalShipping from "@mui/icons-material/LocalShipping";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Security from "@mui/icons-material/Security";
import Replay from "@mui/icons-material/Replay";
import Chip from "@mui/material/Chip";
import CoffeeDetailedCarousel from "./coffee-detailed-carousel";
import CoffeInfoDetails from "./coffee-info-details";

const CoffeeMainInfo: FC<{ coffee: CoffeeI }> = ({ coffee }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [quantity, setQuantity] = useState(1);
    const [isFavorite, setIsFavorite] = useState(false);

    const handleAddToCart = () => {
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
    const renderFeatures = () => (
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
    )

    const renderHeaderAndRating = () => {
        return (
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
                        ({coffee.avg_rating} · {coffee.review_count ? `${coffee.review_count} отзыв` : "Нет отзывов"})
                    </Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    Бренд: {coffee.brand.name}
                </Typography>
            </Box>
        )
    }
    return (
        <Container maxWidth="lg" sx={{ py: 4, flex: 1 }}>
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
                    <CoffeeDetailedCarousel items={coffee.coffee_images ?? []} />
                </Grid>

                {/* Правая колонка - информация о товаре */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={3}>
                        {/* Заголовок и рейтинг */}
                        {renderHeaderAndRating()}

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
                        {renderFeatures()}
                    </Stack>
                </Grid>
            </Grid>

            {/* Детальная информация */}
            <CoffeInfoDetails coffee={coffee} />
        </Container>

    )
}

export default CoffeeMainInfo;