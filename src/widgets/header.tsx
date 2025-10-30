import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Logo from "./logo";
import { toggleLoginDialolg } from "../store/slices/dialog";
import { useAppDispatch } from "../store/hooks";
import {
    Drawer,
    Box,
    useTheme,
    useMediaQuery,
    Typography
} from "@mui/material";
import { useNavigate } from "react-router-dom";

type MenuItemType = {
    label: string;
    link: string;
}

const Header = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const [mobileOpen, setMobileOpen] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

    const items: MenuItemType[] = [
        { 'label': 'Главная', 'link': '/' },
        { 'label': 'Меню', 'link': '/menu' },
        { 'label': 'О нас', 'link': '/#about' },
    ];

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (link: string) => {
        // Закрываем меню при клике на мобильном устройстве
        if (isMobile) {
            setMobileOpen(false);
        }
        navigate(link)

    };

    const renderMenuItem = (item: MenuItemType, isMobile: boolean = false) => {
        return (
            <Button
                variant={isMobile ? "outlined" : "text"}
                key={item.label}
                sx={{
                    borderRadius: 4,
                    fontSize: isMobile ? '1.1rem' : '1rem',
                    py: isMobile ? 1.5 : 1,
                    width: isMobile ? '100%' : 'auto',
                    justifyContent: isMobile ? 'center' : 'flex-start'
                }}
                onClick={() => handleMenuItemClick(item.link)}
            >
                {item.label}
            </Button>
        );
    };

    const renderDesktopMenu = () => {
        return (
            <Stack
                direction={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                spacing={3}
                sx={{ display: { xs: 'none', md: 'flex' } }}
            >
                {items.map((item) => renderMenuItem(item))}
                <IconButton sx={{
                    color: 'text.primary',
                    '&:hover': { backgroundColor: 'action.hover' }
                }}>
                    <ShoppingCart />
                </IconButton>
                <Button
                    variant="contained"
                    sx={{
                        borderRadius: 4,
                        px: 3,
                        py: 1
                    }}
                    onClick={() => dispatch(toggleLoginDialolg(true))}
                >
                    Вход|Регистрация
                </Button>
            </Stack>
        );
    };

    const renderMobileMenuButton = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                    display: { md: 'none' },
                    color: 'text.primary'
                }}
            >
                <MenuIcon />
            </IconButton>
        );
    };

    const renderDrawer = () => {
        return (
            <Drawer
                variant="temporary"
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: 280,
                        p: 3,
                        backgroundColor: 'background.paper'
                    },
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" fontWeight="bold">
                        Меню
                    </Typography>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Stack spacing={2} sx={{ mb: 4 }}>
                    {items.map((item) => renderMenuItem(item, true))}
                </Stack>

                <Stack spacing={2}>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: 4,
                            py: 1.5
                        }}
                        onClick={() => {
                            dispatch(toggleLoginDialolg(true));
                            setMobileOpen(false);
                        }}
                    >
                        Вход|Регистрация
                    </Button>

                    <IconButton
                        sx={{
                            width: '100%',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 4,
                            py: 1.5
                        }}
                    >
                        <ShoppingCart sx={{ mr: 1 }} />
                        <Typography variant="body2" sx={{ flex: 1 }}>
                            Корзина
                        </Typography>
                    </IconButton>
                </Stack>
            </Drawer>
        );
    };

    return (
        <>
            <Stack
                direction={'row'}
                component={'header'}
                justifyContent={'space-between'}
                alignItems={'center'}
                p={{ xs: 2, md: 4 }}
                sx={{
                    position: 'sticky',
                    top: 0,
                    backgroundColor: 'background.paper',
                    zIndex: theme.zIndex.appBar,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
                    backdropFilter: 'blur(10px)',
                }}
            >
                {/* Логотип */}
                <Box sx={{ flexShrink: 0 }}>
                    <Logo />
                </Box>

                {/* Десктопное меню */}
                {renderDesktopMenu()}

                {/* Мобильное меню и корзина */}
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ display: { md: 'none' } }}
                >
                    <IconButton sx={{
                        color: 'text.primary',
                        '&:hover': { backgroundColor: 'action.hover' }
                    }}>
                        <ShoppingCart />
                    </IconButton>
                    {renderMobileMenuButton()}
                </Stack>
            </Stack>

            {/* Мобильное меню (Drawer) */}
            {renderDrawer()}
        </>
    );
}

export default Header;