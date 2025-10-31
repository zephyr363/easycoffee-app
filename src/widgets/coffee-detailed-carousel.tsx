import { useState } from "react";
import type { CoffeeImage } from "../types/coffee";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import type { FC } from "react";

interface ICoffeeDetailedCarousel {
    items: CoffeeImage[];
}

const CoffeeDetailedCarousel: FC<ICoffeeDetailedCarousel> = ({ items }) => {
    const [selectedImage, setSelectedImage] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const mainImage = items[selectedImage]?.image || '/images/coffee-placeholder.jpg';

    return (
        <Stack spacing={2}>
            {/* Главное изображение */}
            <Box
                sx={{
                    width: '100%',
                    height: isMobile ? 300 : 500,
                    borderRadius: 3,
                    backgroundColor: 'grey.100',
                    backgroundImage: `url(${mainImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'relative'
                }}
            />

            {/* Миниатюры */}
            {items.length > 1 && (
                <Stack direction="row" spacing={1} sx={{ overflowX: 'auto', py: 1 }}>
                    {items.map((image, index) => (
                        <Box
                            key={image.id}
                            sx={{
                                width: 80,
                                height: 80,
                                borderRadius: 2,
                                backgroundColor: 'grey.100',
                                backgroundImage: `url(${image.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                cursor: 'pointer',
                                border: selectedImage === index ?
                                    `2px solid ${theme.palette.primary.main}` :
                                    '2px solid transparent',
                                flexShrink: 0,
                                transition: 'border-color 0.2s ease',
                                '&:hover': {
                                    borderColor: theme.palette.primary.light
                                }
                            }}
                            onClick={() => setSelectedImage(index)}
                        />
                    ))}
                </Stack>
            )}
        </Stack>
    );
};

export default CoffeeDetailedCarousel;