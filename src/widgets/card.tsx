import Favorite from "@mui/icons-material/Favorite";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React from "react";
import CoffeeImagesCarousel from "./coffee-image-carousel";
import type { CoffeeI } from "../types/coffee";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const CoffeeCard: React.FC<{ data: CoffeeI }> = ({ data }) => {
    const [isFavorite, setIsFavorite] = React.useState(false);
    const theme = useTheme();
    const navigate = useNavigate()
    const handleToggleFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    return (
        <Card
            sx={{
                maxWidth: 400,
                maxHeight: 550,
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6
                }
            }}
            onClick={() => navigate(`/coffees/${data.id}`)}
        >
            <Stack height="100%">
                {/* Изображение кофе */}
                <CoffeeImagesCarousel items={data.coffee_images ?? []} />

                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Stack spacing={2} height="100%">
                        {/* Заголовок и рейтинг */}
                        <Stack spacing={1}>
                            <Typography variant="subtitle1" component="h3" fontWeight="bold">
                                {data.name}
                            </Typography>
                            {data.avg_rating ? (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Rating value={data.avg_rating} precision={0.1} size="small" readOnly />
                                    <Typography variant="body2" color="text.secondary">
                                        {data.avg_rating}
                                    </Typography>
                                </Stack>
                            ) : (
                                <Stack direction="row" spacing={2} alignItems="center">
                                    <Typography variant="body2" color="text.secondary">
                                        Нет отзывов
                                    </Typography>
                                </Stack>
                            )}
                        </Stack>

                        {/* Описание */}
                        <Typography variant="body2" color="text.secondary" sx={{ flexGrow: 1 }}>
                            {data.description}
                        </Typography>

                        <Stack direction={'row'}>
                            <Chip label={data.category.name} variant="outlined" color={'primary'} />
                        </Stack>

                        {/* Цена и кнопки действий */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h6" color="primary" fontWeight="bold">
                                {data.price} ₸
                            </Typography>

                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={handleToggleFavorite}
                                    sx={{ minWidth: 'auto', p: 1 }}
                                >
                                    {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
                                </Button>
                                <Button
                                    variant="contained"
                                    size="small"
                                    startIcon={<ShoppingCart />}
                                    sx={{ whiteSpace: 'nowrap' }}
                                >
                                    В корзину
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                </CardContent>
            </Stack>
        </Card>
    );
}

export default CoffeeCard;