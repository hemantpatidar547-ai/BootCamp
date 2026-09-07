import './globals.css';

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
                            <div className="logo-icon">
                                <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M8 3H5.5C4.67157 3 4 3.67157 4 4.5V19.5C4 20.3284 4.67157 21 5.5 21H8M16 3H18.5C19.3284 3 20 3.67157 20 4.5V19.5C20 20.3284 19.3284 21 18.5 21H16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <rect x="7" y="9" width="4" height="3.5" rx="0.5" fill="#ff5900" />
                                    <rect x="13" y="9" width="4" height="3.5" rx="0.5" fill="#ff5900" />
                                    <path d="M11 10.5H13" stroke="#ff5900" strokeWidth="2" />
                                    <path d="M9 15C10.5 16.5 13.5 16.5 15 15" stroke="#ff5900" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                            <div className="logo-text">
                                <span className="logotop">CODING</span>
                                <span className="logobottom">SHARKS</span>
                            </div>
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
