import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography";
import CoffeeCard from "./card";
import { useFetchCoffeesQuery } from "../services/coffee";
import { CircularProgress } from "@mui/material";
import React from "react";
import type { CoffeeI } from "../types/coffee";

const PopularCoffees = () => {
    const { data, isLoading, error } = useFetchCoffeesQuery();
    const [coffees, setCoffees] = React.useState<CoffeeI[]>([])

    React.useEffect(() => {
        if (data?.results) {
            setCoffees(data.results);
        }
    }, [data]);

    const renderListCoffees = () => {
        return (
            <Grid container spacing={3}>
                {coffees.map((coffee, index) => (
                    <CoffeeCard data={coffee} key={coffee.id} />
                ))}
            </Grid>
        )
    }
    return (
        <Stack component={'section'} spacing={4}
            sx={{
                py: 8,
                px: 2
            }}>
            {/* Заголовок секции */}
            <Stack spacing={2} textAlign="center">
                <Typography variant="h3" component="h2" fontWeight="bold">
                    Популярные сорта кофе
                </Typography>
                <Typography variant="h6" color="text.secondary" mx="auto" >
                    Откройте для себя самые востребованные сорта кофе от наших обжарщиков
                </Typography>
            </Stack>
            {isLoading ? (
                <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
                    <CircularProgress />
                </Stack>
            ) : renderListCoffees()}
        </Stack>
    )
}

export default PopularCoffees;