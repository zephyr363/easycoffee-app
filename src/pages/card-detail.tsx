import React, { useState } from 'react';
import Header from "../widgets/header";
import Footer from "../widgets/footer";
import { useParams, useNavigate } from 'react-router-dom';
import type { CoffeeI } from '../types/coffee';
import { useFetchCoffeeDetailsQuery } from '../services/coffee';
import CoffeeMainInfo from '../widgets/coffee-main-info';
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
    const [quantity, setQuantity] = useState(1);

    // В реальном приложении здесь будет запрос к API
    const { data } = useFetchCoffeeDetailsQuery(Number(id));
    // используем данные из API, если они есть, иначе моковые данные
    const coffee = data ?? mockCoffee;

    const handleAddToCart = () => {
        // Логика добавления в корзину
        console.log(`Added ${quantity} of ${coffee.name} to cart`);
    };

    const handleBuyNow = () => {
        handleAddToCart();
        navigate('/cart');
    };

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
            <CoffeeMainInfo coffee={coffee} />
            <Footer />
        </Stack>
    );
};

export default CardDetailScreen;