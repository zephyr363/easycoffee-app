import Stack from "@mui/material/Stack";
import Header from "../widgets/header";
import HeroSection from "../widgets/hero-section";
import PopularCoffees from "../widgets/popular-coffees";
import Footer from "../widgets/footer";
import AboutSection from "../widgets/about-section";

const HomeScreen = () => {
    return (
        <Stack component={'main'} direction={'column'} height={'100vh'} width={'100%'} sx={{overflowY: 'auto'}}>
            <Header />
            <HeroSection />
            <AboutSection />
            <PopularCoffees />
            <Footer />
        </Stack>
    );
}

export default HomeScreen;