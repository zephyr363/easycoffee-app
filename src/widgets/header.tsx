
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import ShoppingCart from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Logo from "./logo";
import { toggleLoginDialolg } from "../store/slices/dialog";
import { useAppDispatch } from "../store/hooks";

type MenuItemType = {
    label: string;
    link: string;
}
const Header = () => {
    const dispatch = useAppDispatch()
    const items: MenuItemType[] = [
        { 'label': 'Главная', 'link': '/' },
        { 'label': 'Меню', 'link': '/menu' },
        { 'label': 'О нас', 'link': '/about' },
        { 'label': 'Контакты', 'link': '/contact' },
    ]

    const renderMenuItem = (item: MenuItemType) => {
        return <Button variant="text" key={item.label} sx={{ borderRadius: 4 }}>{item.label}</Button>
    }
    const renderItems = () => {
        return items.map((item) => renderMenuItem(item));
    }

    return (
        <Stack direction={'row'} component={'header'} justifyContent={'space-between'} alignItems={'center'} p={4} >
            <Logo />
            <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={3}>
                {renderItems()}
                <IconButton>
                    <ShoppingCart />
                </IconButton>
                <Button variant="contained" sx={{ borderRadius: 4 }} onClick={() => dispatch(toggleLoginDialolg(true))}>
                    Вход|Регистрация
                </Button>
            </Stack>
        </Stack>
    );
}

export default Header;