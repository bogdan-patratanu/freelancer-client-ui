import * as React from 'react';
import { Layout } from 'react-admin';
import AppBar from './AppBar';
import Menu from './Menu';
import Footer from './Footer';

const CustomLayout = ({ children }: { children: React.ReactNode }) => (
    <>
        <Layout
            appBar={AppBar}
            menu={Menu}
            sx={{
                backgroundColor: theme =>
                    (theme.vars || theme).palette.background.default,
                '& .RaLayout-content': {
                    paddingBottom: '80px',
                },
            }}
        >
            {children}
        </Layout>
        <Footer />
    </>
);

export default CustomLayout;
