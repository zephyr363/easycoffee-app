import useEmblaCarousel from "embla-carousel-react";
import type { CoffeeImage } from "../types/coffee";
import Stack from "@mui/material/Stack";


const CoffeeImagesCarousel: React.FC<{ items: CoffeeImage[] }> = ({ items }) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false })


    return (
        <Stack component={'section'} className="embla">
            <Stack className="embla__viewport" ref={emblaRef}>
            <Stack className="embla__container" sx={{ display: 'flex' }}>
                {
                    items && items.map((item, index) => (
                        <Stack className="embla__slide">
                            <img src={item.image} width={'100%'} height={'100%'} />
                        </Stack>
                    ))
                }
            </Stack>
            </Stack>
        </Stack>
    );
}


export default CoffeeImagesCarousel;
