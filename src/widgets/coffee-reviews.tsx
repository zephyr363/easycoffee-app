
import type { CoffeeI, CoffeeReviewI } from "../types/coffee";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { useEffect, useState, type FC } from "react";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import { useLazyFetchCoffeeReviewsQuery } from "../services/coffee";
import Pagination from "@mui/material/Pagination";
import { useTheme } from "@mui/material/styles";


const CoffeeReviews: FC<{ coffee: CoffeeI }> = ({ coffee }) => {
    const theme = useTheme()
    const [trigger,] = useLazyFetchCoffeeReviewsQuery();
    const [reviews, setReviews] = useState<CoffeeReviewI[]>([]);
    const [page, setPage] = useState(1);
    const [countPages, setCountPages] = useState(0);

    const getReviews = async (page: number) => {
        const resp = await trigger({ page: page, product_id: coffee.id }).unwrap();
        setReviews(resp.results)
        setCountPages(resp.count)
    }

    useEffect(() => {
        getReviews(page)
    }, [])


    return (
        <Stack spacing={3}>
            {reviews.map(review => (
                <Card key={review.id} variant="outlined">
                    <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography fontWeight="bold">{review.author.full_name}</Typography>
                            <Rating value={review.rating} size="small" readOnly />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {new Date(review.created_at).toLocaleDateString('ru-RU')}
                        </Typography>
                        <Typography>{review.comment}</Typography>
                    </CardContent>
                </Card>
            ))}
            <Pagination count={countPages}
                page={page} color={'primary'} />
        </Stack>
    )
}

export default CoffeeReviews;