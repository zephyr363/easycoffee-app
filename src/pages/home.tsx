import Stack from "@mui/material/Stack";
import Header from "../widgets/header";
import HeroSection from "../widgets/hero-section";
import PopularCoffees from "../widgets/popular-coffees";

const HomeScreen = () => {
    return (
        <Stack component={'main'} direction={'column'} height={'100vh'} width={'100%'}>
            <Header />
            <HeroSection />
            <PopularCoffees />
        </Stack>
    );
}

export default HomeScreen;