import { CustomNavBar } from '@/components/core/NavBar/NavBar';
import Footer from '@/components/core/Footer/Footer';

function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <CustomNavBar />
            <main className={'mb-auto flex-grow basis-1'}>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
