import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const Footer = () => {
    return (
        <Stack
            component="footer"
            sx={{
                bgcolor: 'primary.main',
                color: 'white',
                py: 6,
                px: 4,
                mt: 'auto'
            }}
        >
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={4}
                justifyContent="space-between"
                alignItems={{ xs: 'center', md: 'flex-start' }}
                maxWidth="lg"
                mx="auto"
                width="100%"
            >
                {/* Company Info */}
                <Stack spacing={2} sx={{ maxWidth: 300, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h6" fontWeight="bold">
                        Coffee House
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Лучшие кофе в Средней Азии. Отборные зерна, профессиональная обжарка и неповторимый вкус.
                    </Typography>
                    <Stack direction="row" spacing={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                        <IconButton sx={{ color: 'white' }}>
                            <FacebookIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <InstagramIcon />
                        </IconButton>
                        <IconButton sx={{ color: 'white' }}>
                            <TwitterIcon />
                        </IconButton>
                    </Stack>
                </Stack>

                {/* Quick Links */}
                <Stack spacing={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h6" fontWeight="bold">
                        Быстрые ссылки
                    </Typography>
                    <Link href="/" color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                        Главная
                    </Link>
                    <Link href="/menu" color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                        Меню
                    </Link>
                    <Link href="/about" color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                        О нас
                    </Link>
                    <Link href="/contact" color="inherit" underline="hover" sx={{ cursor: 'pointer' }}>
                        Контакты
                    </Link>
                </Stack>

                {/* Contact Info */}
                <Stack spacing={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h6" fontWeight="bold">
                        Контакты
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        📞 +7 (777) 123-45-67
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        📧 info@coffeehouse.kz
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        🏠 г. Алматы, ул. Кабанбай батыра 123
                    </Typography>
                </Stack>

                {/* Working Hours */}
                <Stack spacing={2} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="h6" fontWeight="bold">
                        Часы работы
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Пн-Пт: 8:00 - 22:00
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Сб-Вс: 9:00 - 23:00
                    </Typography>
                </Stack>
            </Stack>

            {/* Copyright */}
            <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.2)', mt: 4, pt: 3, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    © {new Date().getFullYear()} Coffee House. Все права защищены.
                </Typography>
            </Box>
        </Stack>
    );
};

export default Footer;