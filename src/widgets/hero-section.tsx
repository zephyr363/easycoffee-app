import { Box, Button, Container } from "@mui/material";
import Stack from "@mui/material/Stack";
import bgHero from "../assets/young-male-barista-holding-coffee-cup-looking-surprised-standing-black-apron-against-yellow-b.jpg";
import { Typography } from "@mui/material";

const HeroSection = () => {
    return (
        <Stack
            component={'section'}
            sx={{
                height: { xs: 500, md: 600 },
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(${bgHero})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                position: 'relative',
                color: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                p: 4
            }}
        >
            <Container maxWidth="lg">
                <Stack
                    spacing={4}
                    sx={{
                        maxWidth: 600,
                        mx: 'auto'
                    }}
                >
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 'bold',
                            fontSize: { xs: '2.5rem', md: '3.5rem' },
                            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                        }}
                    >
                        Лучшие кофе в Средней Азии
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: { xs: '1.1rem', md: '1.3rem' },
                            opacity: 0.9,
                            lineHeight: 1.6
                        }}
                    >
                        Отборные зерна, профессиональная обжарка и неповторимый вкус.
                        Откройте для себя мир премиального кофе.
                    </Typography>

                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={2}
                        sx={{ justifyContent: 'center', mt: 2 }}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: 'primary.dark',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                            Выбрать кофе
                        </Button>

                        <Button
                            variant="outlined"
                            size="large"
                            sx={{
                                borderColor: 'white',
                                color: 'white',
                                px: 4,
                                py: 1.5,
                                fontSize: '1.1rem',
                                '&:hover': {
                                    bgcolor: 'rgba(255,255,255,0.1)',
                                    borderColor: 'white',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.3s ease'
                                }
                            }}
                        >
                            Узнать больше
                        </Button>
                    </Stack>

                    <Box sx={{ mt: 4 }}>
                        <Typography
                            variant="body2"
                            sx={{
                                opacity: 0.8,
                                fontStyle: 'italic'
                            }}
                        >
                            Более 1000 довольных клиентов по всему региону
                        </Typography>
                    </Box>
                </Stack>
            </Container>
        </Stack>
    );
}

export default HeroSection;