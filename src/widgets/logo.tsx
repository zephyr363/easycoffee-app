import Coffee from "@mui/icons-material/Coffee"
import Stack from "@mui/material/Stack"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"

const Logo = () => {
    const theme = useTheme()
    return (
        <Stack direction={'row'} justifyContent={'center'} alignItems={'center'} spacing={1} color={theme.palette.primary.main}>
            <Typography variant="h4" textAlign={"center"}>
                EasyCoffee
            </Typography>
            <Coffee fontSize="large" />
        </Stack>
    )
}
export default Logo;