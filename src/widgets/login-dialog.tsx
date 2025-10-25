import { useState } from "react";
import Modal from "@mui/material/Modal";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { toggleLoginDialolg } from "../store/slices/dialog";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import {
    Box,
    TextField,
    Button,
    Typography,
    Tabs,
    Tab,
    Divider,
    IconButton,
    InputAdornment,
} from "@mui/material";
import { Close, Visibility, VisibilityOff } from "@mui/icons-material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`auth-tabpanel-${index}`}
            aria-labelledby={`auth-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
        </div>
    );
}

const LoginDialog = () => {
    const dispatch = useAppDispatch();
    const isOpen = useAppSelector((state) => state.dialogs.isLoginDialogOpen);
    const [tabValue, setTabValue] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
    });

    const handleClose = () => {
        dispatch(toggleLoginDialolg(false));
        setTabValue(0);
        setFormData({
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
        });
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [field]: event.target.value,
        });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (tabValue === 0) {
            // Логин
            console.log("Login data:", { email: formData.email, password: formData.password });
        } else {
            // Регистрация
            console.log("Register data:", formData);
        }
    };

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <Modal open={isOpen} onClose={handleClose}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: "100%",
                    maxWidth: 500,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 0,
                }}
            >
                <Container maxWidth="sm">
                    <Stack spacing={3} sx={{ p: 3 }}>
                        {/* Заголовок и кнопка закрытия */}
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            <Typography variant="h5" component="h2" fontWeight="bold">
                                Вход в аккаунт
                            </Typography>
                            <IconButton onClick={handleClose} size="small">
                                <Close />
                            </IconButton>
                        </Stack>

                        {/* Табы для переключения между логином и регистрацией */}
                        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                            <Tabs value={tabValue} onChange={handleTabChange} centered>
                                <Tab label="Вход" id="auth-tab-0" />
                                <Tab label="Регистрация" id="auth-tab-1" />
                            </Tabs>
                        </Box>

                        {/* Форма логина */}
                        <TabPanel value={tabValue} index={0}>
                            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange("email")}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Пароль"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange("password")}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Войти
                                </Button>
                            </Stack>
                        </TabPanel>

                        {/* Форма регистрации */}
                        <TabPanel value={tabValue} index={1}>
                            <Stack component="form" spacing={3} onSubmit={handleSubmit}>
                                <Stack direction="row" spacing={2}>
                                    <TextField
                                        fullWidth
                                        label="Имя"
                                        value={formData.firstName}
                                        onChange={handleInputChange("firstName")}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        label="Фамилия"
                                        value={formData.lastName}
                                        onChange={handleInputChange("lastName")}
                                    />
                                </Stack>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleInputChange("email")}
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Пароль"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleInputChange("password")}
                                    required
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={handleTogglePassword} edge="end">
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    fullWidth
                                    label="Подтвердите пароль"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange("confirmPassword")}
                                    required
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    fullWidth
                                    sx={{ py: 1.5 }}
                                >
                                    Зарегистрироваться
                                </Button>
                            </Stack>
                        </TabPanel>

                        {/* Разделитель или дополнительная информация */}
                        <Box>
                            <Divider sx={{ my: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    или
                                </Typography>
                            </Divider>
                            <Typography variant="body2" textAlign="center" color="text.secondary">
                                {tabValue === 0 ? "Нет аккаунта? " : "Уже есть аккаунт? "}
                                <Typography
                                    component="span"
                                    variant="body2"
                                    color="primary"
                                    sx={{ cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                                    onClick={() => setTabValue(tabValue === 0 ? 1 : 0)}
                                >
                                    {tabValue === 0 ? "Зарегистрируйтесь" : "Войдите"}
                                </Typography>
                            </Typography>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Modal>
    );
};

export default LoginDialog;