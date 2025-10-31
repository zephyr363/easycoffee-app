import useEmblaCarousel from "embla-carousel-react";
import type { CoffeeImage } from "../types/coffee";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import type { FC } from "react";

interface ICoffeeCardCarousel {
    items: CoffeeImage[];
}

const CoffeeCardCarousel: FC<ICoffeeCardCarousel> = ({ items }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
    });

    return (
        <Box className="embla" sx={{ overflow: 'hidden' }}>
            <Box className="embla__viewport" ref={emblaRef} sx={{ overflow: 'hidden' }}>
                <Stack
                    className="embla__container"
                    direction="row"
                    sx={{
                        display: 'flex',
                        backfaceVisibility: 'hidden',
                        touchAction: 'pan-y pinch-zoom'
                    }}
                >
                    {items.map((item, index) => (
                        <Box
                            className="embla__slide"
                            key={item.id}
                            sx={{
                                flex: '0 0 100%',
                                minWidth: 0,
                                position: 'relative'
                            }}
                        >
                            <Box
                                component="img"
                                src={item.image}
                                alt={`Кофе ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: 200,
                                    objectFit: 'cover',
                                    display: 'block'
                                }}
                            />
                        </Box>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
};

export default CoffeeCardCarousel;