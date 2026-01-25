import { Box, Typography, Link } from '@mui/material';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    
    return (
        <Box
            component="footer"
            sx={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                py: 2,
                px: 3,
                backgroundColor: (theme: any) =>
                    (theme.vars || theme).palette.background.paper,
                borderTop: (theme: any) =>
                    `1px solid ${(theme.vars || theme).palette.divider}`,
                zIndex: (theme: any) => theme.zIndex.appBar - 1,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 2,
                }}
            >
                <Typography variant="body2" color="text.secondary">
                    © {currentYear} Freelancer Client. All rights reserved.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Link
                        href="#"
                        variant="body2"
                        color="text.secondary"
                        underline="hover"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        href="#"
                        variant="body2"
                        color="text.secondary"
                        underline="hover"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        href="#"
                        variant="body2"
                        color="text.secondary"
                        underline="hover"
                    >
                        Contact
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default Footer;
