import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useState, type FC } from "react";
import Tabs from "@mui/material/Tabs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import Coffee from "@mui/icons-material/Coffee";
import Tab from "@mui/material/Tab";
import type { CoffeeI } from "../types/coffee";
import CoffeeReviews from "./coffee-reviews";



const CoffeInfoDetails: FC<{ coffee: CoffeeI }> = ({ coffee }) => {
    const [activeTab, setActiveTab] = useState(0);
    const characteristics = [
        { label: "Вес упаковки", value: `${coffee.net_weight}г` },
        { label: "Уровень обжарки", value: coffee.roast_level === 'light' ? 'Светлая' : coffee.roast_level === 'medium' ? 'Средняя' : 'Тёмная' },
        { label: "Кислотность", value: coffee.acidity_level === 'low' ? 'Низкая' : coffee.acidity_level === 'medium' ? 'Средняя' : 'Высокая' },
        { label: "Страна происхождения", value: coffee.brand.country },
        { label: "Наличие", value: coffee.stock_quantity > 0 ? `В наличии (${coffee.stock_quantity} шт.)` : 'Нет в наличии' }
    ];
    return (
        <Box sx={{ mt: 8 }}>
            <Tabs value={activeTab} onChange={(_, newValue) => setActiveTab(newValue)} sx={{ mb: 4 }}>
                <Tab label="Описание" />
                <Tab label="Характеристики" />
                <Tab label={`Отзывы (${coffee.review_count})`} />
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
                <CoffeeReviews coffee={coffee} />
            )}
        </Box>
    )
}

export default CoffeInfoDetails;