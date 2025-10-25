import React from 'react';
import LocalCafe from "@mui/icons-material/LocalCafe"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import { styled } from "@mui/material/styles"
import useMediaQuery from '@mui/material/useMediaQuery';

const LogoWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    padding: '4px 8px',
    borderRadius: '12px',
    '&:hover': {
        transform: 'scale(1.02)',
        backgroundColor: 'rgba(0,0,0,0.03)',
    }
}))

const Logo = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

    return (
        <LogoWrapper>
            <LocalCafe
                sx={{
                    fontSize: isMobile ? '1.5rem' : '2rem',
                    color: theme.palette.primary.main,
                    mr: isMobile ? 0.5 : 1,
                    transition: 'transform 0.3s ease',
                    '.logo-wrapper:hover &': {
                        transform: 'rotate(20deg)'
                    }
                }}
            />
            <Typography
                variant={isMobile ? "h6" : "h5"}
                sx={{
                    fontWeight: 700,
                    color: theme.palette.primary.main,
                    fontFamily: '"Plus Jakarta Sans", sans-serif',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.3px',
                }}
            >
                EasyCoffee
            </Typography>
        </LogoWrapper>
    )
}

export default Logo