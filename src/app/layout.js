import './globals.css';
import Navbar from './Navbar';

export const metadata = {
    title: 'Bootcamp - Master Full Stack',
    description: 'The Exact Framework To Master Full-Stack Development',
};

export default function RootLayout ( { children } )
{
    return (
        <html lang="en">
            <body>
                <Navbar />
                { children }
            </body>
        </html>
    );
}
