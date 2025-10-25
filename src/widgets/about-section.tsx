import React from 'react';
import {
    Container,
    Typography,
    Grid,
    Box,
    Card,
    CardContent,
    Stack,
    useTheme,
    useMediaQuery
} from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
    height: '100%',
    transition: 'all 0.3s ease-in-out',
    border: `1px solid ${theme.palette.divider}`,
    '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: theme.shadows[8],
    }
}));

const StatBox = styled(Box)(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(3),
    borderRadius: theme.spacing(2),
    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
    color: 'white',
    transition: 'transform 0.3s ease',
    '&:hover': {
        transform: 'scale(1.05)'
    }
}));

const AboutSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const stats = [
        { number: "5+", label: "Лет опыта" },
        { number: "1000+", label: "Довольных клиентов" },
        { number: "50+", label: "Сортов кофе" },
        { number: "3", label: "Кофейни в городе" }
    ];

    const features = [
        {
            icon: "☕",
            title: "Свежие зерна",
            description: "Используем только свежеобжаренные зерна арабики из лучших регионов мира"
        },
        {
            icon: "👨‍🍳",
            title: "Профессиональные бариста",
            description: "Наши специалисты проходят обучение и создают идеальный кофе"
        },
        {
            icon: "🌱",
            title: "Экологичность",
            description: "Заботимся о природе с помощью экологичной упаковки и материалов"
        },
        {
            icon: "🌍",
            title: "Прямые поставки",
            description: "Работаем напрямую с фермерами для лучшего качества и справедливых цен"
        }
    ];

    return (
        <Box component="section" sx={{ py: 10, bgcolor: 'background.default' }} id="about">
            <Container maxWidth="lg">
                {/* Заголовок секции */}
                <Box textAlign="center" mb={8}>
                    <Typography
                        variant="h3"
                        component="h2"
                        fontWeight="bold"
                        gutterBottom
                        sx={{
                            background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}
                    >
                        О нашей кофейне
                    </Typography>
                    <Typography
                        variant="h6"
                        color="text.secondary"
                        sx={{
                            maxWidth: 600,
                            mx: 'auto',
                            lineHeight: 1.6
                        }}
                    >
                        Мы создаем уникальные кофейные впечатления с 2018 года,
                        объединяя традиции и инновации в каждой чашке
                    </Typography>
                </Box>

                {/* Статистика */}
                <Grid container spacing={3} sx={{ mb: 8 }}>
                    {stats.map((stat, index) => (
                        <Grid size={
                            { xs: 6, md: 3 }
                        } key={index}>
                            <StatBox>
                                <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    gutterBottom
                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' } }}
                                >
                                    {stat.number}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.9 }}>
                                    {stat.label}
                                </Typography>
                            </StatBox>
                        </Grid>
                    ))}
                </Grid>

                {/* Особенности */}
                <Grid container spacing={4} sx={{ mb: 8 }}>
                    {features.map((feature, index) => (
                        <Grid size={
                            { xs: 12, md: 3, sm: 6 }
                        } key={index}>
                            <StyledCard>
                                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                                    <Typography
                                        variant="h2"
                                        sx={{
                                            mb: 2,
                                            fontSize: { xs: '2.5rem', md: '3rem' }
                                        }}
                                    >
                                        {feature.icon}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        fontWeight="bold"
                                        color="primary"
                                    >
                                        {feature.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ lineHeight: 1.6 }}
                                    >
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    ))}
                </Grid>

                {/* История и описание */}
                <Grid container spacing={6} alignItems="center">
                    <Grid size={
                        { xs: 12, md: 6 }
                    }>
                        <Stack spacing={3}>
                            <Typography
                                variant="h4"
                                fontWeight="bold"
                                sx={{ color: 'primary.main' }}
                            >
                                Наша история
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                Начав с маленькой кофейни в центре Алматы в 2018 году,
                                мы мечтали познакомить наших гостей с настоящим вкусом
                                качественного кофе. Сегодня мы — команда энтузиастов,
                                которая продолжает делиться своей страстью к кофе.
                            </Typography>
                            <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                                Мы тщательно отбираем каждый сорт зерен, работаем напрямую
                                с фермерами и постоянно учимся новому, чтобы каждая ваша
                                чашка кофе была идеальной.
                            </Typography>
                            <Box sx={{ pt: 2 }}>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        fontStyle: 'italic',
                                        color: 'text.secondary',
                                        borderLeft: `3px solid ${theme.palette.primary.main}`,
                                        pl: 2
                                    }}
                                >
                                    "Кофе — это не просто напиток, это искусство,
                                    которое объединяет людей"
                                </Typography>
                            </Box>
                        </Stack>
                    </Grid>

                    <Grid size={
                        { xs: 12, md: 6 }
                    }>
                        <Box
                            sx={{
                                height: 400,
                                borderRadius: 4,
                                background: `linear-gradient(135deg, ${theme.palette.primary.light}20 0%, ${theme.palette.secondary.light}20 100%)`,
                                border: `2px dashed ${theme.palette.primary.main}30`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                        >
                            <Box
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'rgba(0,0,0,0.02)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    p: 4
                                }}
                            >
                                <Typography
                                    variant="h5"
                                    color="primary"
                                    textAlign="center"
                                    fontWeight="bold"
                                    gutterBottom
                                >
                                    Наша кофейня
                                </Typography>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    textAlign="center"
                                    sx={{ maxWidth: 300 }}
                                >
                                    Уютное пространство, где рождаются лучшие кофейные традиции
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* Призыв к действию */}
                <Box
                    sx={{
                        mt: 8,
                        p: 4,
                        borderRadius: 4,
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                        border: `1px solid ${theme.palette.divider}`,
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" gutterBottom fontWeight="bold">
                        Хотите узнать больше о нашем кофе?
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        Приходите в нашу кофейню и откройте для себя мир премиального кофе
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default AboutSection;