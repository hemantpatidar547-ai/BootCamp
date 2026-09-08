import './globals.css';
import codingLogo from './assets/Coding_white.webp';

export const metadata = {
    title: 'Bootcamp - Master Full Stack',
    description: 'The Exact Framework To Master Full-Stack Development',
};

export default function RootLayout ( { children } )
{
    return (
        <html lang="en">
            <body>
                <nav className="navbar">
                    <div className="nav-container">
                        <div className="logo-section">
                                <img src={ codingLogo.src } alt="Coding Sharks" className="navbar-logo" />
                            </div>
                            <div className="nav-center-links">
                                <a href="#syllabus">Syllabus</a>
                                <a href="#projects">Projects</a>
                                <a href="#mentors">Mentors</a>
                                <a href="#pricing">Pricing</a>
                            </div>
                            <div className="nav-right">
                                <button className="nav-cta">Apply now</button>
                            </div>
                    </div>
                </nav>
                { children }
            </body>
        </html>
    );
}
