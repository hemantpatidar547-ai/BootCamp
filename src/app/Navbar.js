'use client';

import codingLogo from './assets/Coding_white.webp';

export default function Navbar ()
{
    const openEnrollmentForm = () =>
    {
        window.dispatchEvent( new CustomEvent( 'open-enrollment-form' ) );
    };

    return (
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
                    <button className="nav-cta" onClick={ openEnrollmentForm }>Apply now</button>
                </div>
            </div>
        </nav>
    );
}
