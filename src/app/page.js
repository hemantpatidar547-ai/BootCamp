'use client';
import { useEffect, useRef, useState } from 'react';
import student1 from './assets/student1.webp';
import student2 from './assets/student2 (1).webp';
import student3 from './assets/student3.webp';
import student4 from './assets/student4.webp';
import student5 from './assets/student5.webp';
import office8 from './assets/office8.webp';

export default function Home ()
{
    const launchCanvasRef = useRef( null );
    const portalSectionRef = useRef( null );
    const [ showModal, setShowModal ] = useState( false );
    const [ formData, setFormData ] = useState( { name: '', email: '', phone: '' } );
    const [ submitted, setSubmitted ] = useState( false );
    const [ openFaq, setOpenFaq ] = useState( 0 );

    const faqs = [
        {
            question: 'Do I need any prior coding experience to join the Bootcamp?',
            answer: 'No. We start with the fundamentals and gradually move towards advanced full-stack development, AI tools, deployment, and system design.',
        },
        {
            question: 'What will I learn during the Full-Stack Bootcamp?',
            answer: 'You will learn JavaScript, React, Node.js, databases, APIs, Git, cloud deployment, AI-assisted development, and the practical skills needed to ship real projects.',
        },
        {
            question: 'Will I build real projects during the program?',
            answer: 'Yes. You will build and deploy portfolio-ready applications that demonstrate your skills to recruiters and hiring teams.',
        },
        {
            question: 'What kind of career support is included?',
            answer: 'You get guidance with your resume, GitHub portfolio, interview preparation, project presentation, and a focused job-search strategy.',
        },
        {
            question: 'How do I reserve my spot?',
            answer: 'Click any enrollment button on the page and submit your details. Our team will contact you with the next steps.',
        },
    ];

    const openModal = () => setShowModal( true );
    const closeModal = () => { setShowModal( false ); setSubmitted( false ); };

    useEffect( () =>
    {
        const handleNavbarEnrollment = () => openModal();
        window.addEventListener( 'open-enrollment-form', handleNavbarEnrollment );
        return () => window.removeEventListener( 'open-enrollment-form', handleNavbarEnrollment );
    }, [] );

    const handleSubmit = ( e ) =>
    {
        e.preventDefault();
        setSubmitted( true );
    };

    useEffect( () =>
    {
        const canvas = launchCanvasRef.current;
        if ( !canvas ) return undefined;
        const context = canvas.getContext( '2d' );
        const reduceMotion = window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches;
        let animationFrame;
        let particles = [];

        const resize = () =>
        {
            const pixelRatio = Math.min( window.devicePixelRatio || 1, 2 );
            canvas.width = canvas.clientWidth * pixelRatio;
            canvas.height = canvas.clientHeight * pixelRatio;
            context.setTransform( pixelRatio, 0, 0, pixelRatio, 0, 0 );
            particles = Array.from( { length: window.innerWidth < 700 ? 42 : 78 }, () => ( {
                x: Math.random() * canvas.clientWidth,
                y: Math.random() * canvas.clientHeight,
                size: Math.random() * 1.8 + 0.4,
                speed: Math.random() * 0.35 + 0.08,
                alpha: Math.random() * 0.65 + 0.15,
            } ) );
        };

        const draw = ( time = 0 ) =>
        {
            const width = canvas.clientWidth;
            const height = canvas.clientHeight;
            context.clearRect( 0, 0, width, height );
            particles.forEach( particle =>
            {
                particle.y -= reduceMotion ? 0 : particle.speed;
                if ( particle.y < -5 ) particle.y = height + 5;
                const pulse = 0.7 + Math.sin( time * 0.001 + particle.x ) * 0.3;
                context.fillStyle = `rgba(83, 255, 190, ${ particle.alpha * pulse })`;
                context.beginPath();
                context.arc( particle.x, particle.y, particle.size, 0, Math.PI * 2 );
                context.fill();
            } );
            if ( !reduceMotion ) animationFrame = requestAnimationFrame( draw );
        };

        resize();
        draw();
        window.addEventListener( 'resize', resize );
        return () =>
        {
            cancelAnimationFrame( animationFrame );
            window.removeEventListener( 'resize', resize );
        };
    }, [] );

    useEffect( () =>
    {
        const section = portalSectionRef.current;
        if ( !section ) return undefined;
        let frame;
        let targetProgress = 0;
        let currentProgress = 0;
        let isAnimating = false;
        const scene = section.querySelector( '.portal-scene' );
        const core = section.querySelector( '.portal-core' );
        const outerRing = section.querySelector( '.portal-ring-outer' );
        const innerRing = section.querySelector( '.portal-ring-inner' );
        const tunnelBack = section.querySelector( '.portal-tunnel-back' );
        const tunnelMid = section.querySelector( '.portal-tunnel-mid' );
        const tunnelFront = section.querySelector( '.portal-tunnel-front' );
        [ scene, core, outerRing, innerRing, tunnelBack, tunnelMid, tunnelFront ].forEach( item => { if ( item ) item.style.animation = 'none'; } );
        const renderPortal = () =>
        {
            currentProgress += ( targetProgress - currentProgress ) * 0.28;
            const progress = currentProgress;
            section.style.setProperty( '--portal-progress', progress.toFixed( 4 ) );
            section.dataset.portalStage = progress < 0.34 ? 'start' : progress < 0.68 ? 'mid' : 'end';
            if ( scene ) scene.style.transform = `translate(-50%, -50%) rotateX(${ 15 - progress * 33 }deg) rotateY(${ -10 + progress * 43 }deg) scale(${ 0.72 + progress * 0.53 })`;
            if ( core ) core.style.transform = `translate(-50%, -50%) rotateX(${ 45 - progress * 35 }deg) rotateZ(${ 45 + progress * 360 }deg) scale(${ 1 - progress * 0.35 })`;
            if ( outerRing ) outerRing.style.transform = `translate(-50%, -50%) rotateX(67deg) rotateZ(${ progress * 270 }deg)`;
            if ( innerRing ) innerRing.style.transform = `translate(-50%, -50%) rotateY(68deg) rotateZ(${ progress * -360 }deg)`;
            if ( tunnelBack ) tunnelBack.style.transform = `translate(-50%, -50%) rotateX(55deg) rotateZ(${ 45 + progress * 135 }deg) translateZ(${ -240 + progress * 340 }px) scale(${ 1 + progress * 0.9 })`;
            if ( tunnelMid ) tunnelMid.style.transform = `translate(-50%, -50%) rotateX(55deg) rotateZ(${ 45 - progress * 180 }deg) translateZ(${ -80 + progress * 140 }px) scale(${ 1 + progress * 0.35 })`;
            if ( tunnelFront ) tunnelFront.style.transform = `translate(-50%, -50%) rotateX(55deg) rotateZ(${ 45 + progress * 215 }deg) translateZ(${ 100 - progress * 200 }px) scale(${ 1 - progress * 0.2 })`;
            if ( Math.abs( targetProgress - currentProgress ) > 0.001 ) frame = requestAnimationFrame( renderPortal );
            else isAnimating = false;
        };
        const updatePortal = () =>
        {
            const travel = section.offsetHeight - window.innerHeight;
            targetProgress = Math.max( 0, Math.min( 1, ( window.scrollY - section.offsetTop ) / travel ) );
            if ( !isAnimating )
            {
                isAnimating = true;
                frame = requestAnimationFrame( renderPortal );
            }
        };
        updatePortal();
        window.addEventListener( 'scroll', updatePortal, { passive: true } );
        window.addEventListener( 'resize', updatePortal );
        return () =>
        {
            cancelAnimationFrame( frame );
            window.removeEventListener( 'scroll', updatePortal );
            window.removeEventListener( 'resize', updatePortal );
        };
    }, [] );

    return (
        <>
            <section id="top" className="hero-section">
                <div className="container">
                    <p className="pre-headline">🔥 LIMITED TIME ENROLLMENT: NEXT BATCH STARTS SOON</p>
                    <h1 className="headline">
                        The Exact Framework To Master <span className="highlight">Full-Stack Development</span> & Get A High-Paying Job In 12-Weeks
                    </h1>
                    <p className="sub-headline">
                        Without prior coding experience, without spending years in college, and using the new AI-coding methods to build applications faster than ever.
                    </p>
                    <div className="cta-container">
                        <button className="main-cta" onClick={ openModal }>START YOUR FREE TRAINING ➔</button>
                        <p className="trust-text">⭐ 4.9/5 Average Rating · Over 10,000+ Students</p>
                    </div>
                </div>
            </section>

            <section className="alumni-section">
                <div className="alumni-glass-card">
                    <div className="marquee-wrapper">
                        <div className="marquee-track">
                            <div className="marquee-group">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="logo-item" style={ { height: '30px', objectFit: 'contain', filter: 'brightness(0) invert(1)' } } />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="logo-item" style={ { height: '32px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '700', fontSize: '2.4rem', fontFamily: 'Segoe UI, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' } }><span style={ { display: 'grid', gridTemplateColumns: '10px 10px', gap: '2px' } }><span style={ { backgroundColor: '#F25022', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#7FBA00', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#00A4EF', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#FFB900', width: '10px', height: '10px' } }></span></span>Microsoft</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="logo-item" style={ { height: '28px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '700', fontSize: '2.6rem', color: '#0088ff', fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' } }>Meta</span>
                                <span className="logo-item" style={ { fontWeight: '900', fontSize: '2.8rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1.5px', color: 'white' } }>
                                    amazon<span style={ { color: '#ff9900', fontSize: '3rem', position: 'relative', top: '-1px', left: '-2px' } }>_</span>
                                </span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg" alt="Target" className="logo-item" style={ { height: '35px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontSize: '2.5rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1.5px' } }><span style={ { color: '#ff3366' } }>on</span> <span style={ { color: '#ffffff' } }>mobile</span></span>
                                <span className="logo-item" style={ { color: '#1e90ff', fontWeight: '800', fontSize: '2.6rem', letterSpacing: '-1px' } }>Epsilon</span>
                                <span className="logo-item" style={ { color: '#6c8cff', fontWeight: '900', fontSize: '2.2rem', letterSpacing: '1.5px', fontFamily: 'sans-serif' } }>NTT DATA</span>
                                <span className="logo-item" style={ { fontFamily: 'serif', letterSpacing: '1px', fontSize: '2.5rem', color: '#ffffff' } }>Reliance</span>
                            </div>
                            <div className="marquee-group">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple" className="logo-item" style={ { height: '30px', objectFit: 'contain', filter: 'brightness(0) invert(1)' } } />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="logo-item" style={ { height: '32px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '700', fontSize: '2.4rem', fontFamily: 'Segoe UI, sans-serif', display: 'flex', alignItems: 'center', gap: '8px' } }><span style={ { display: 'grid', gridTemplateColumns: '10px 10px', gap: '2px' } }><span style={ { backgroundColor: '#F25022', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#7FBA00', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#00A4EF', width: '10px', height: '10px' } }></span><span style={ { backgroundColor: '#FFB900', width: '10px', height: '10px' } }></span></span>Microsoft</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="logo-item" style={ { height: '28px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '700', fontSize: '2.6rem', color: '#0088ff', fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' } }>Meta</span>
                                <span className="logo-item" style={ { fontWeight: '900', fontSize: '2.8rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1.5px', color: 'white' } }>
                                    amazon<span style={ { color: '#ff9900', fontSize: '3rem', position: 'relative', top: '-1px', left: '-2px' } }>_</span>
                                </span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/c/c5/Target_Corporation_logo_%28vector%29.svg" alt="Target" className="logo-item" style={ { height: '35px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontSize: '2.5rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1.5px' } }><span style={ { color: '#ff3366' } }>on</span> <span style={ { color: '#ffffff' } }>mobile</span></span>
                                <span className="logo-item" style={ { color: '#1e90ff', fontWeight: '800', fontSize: '2.6rem', letterSpacing: '-1px' } }>Epsilon</span>
                                <span className="logo-item" style={ { color: '#6c8cff', fontWeight: '900', fontSize: '2.2rem', letterSpacing: '1.5px', fontFamily: 'sans-serif' } }>NTT DATA</span>
                                <span className="logo-item" style={ { fontFamily: 'serif', letterSpacing: '1px', fontSize: '2.5rem', color: '#ffffff' } }>Reliance</span>
                            </div>
                        </div>

                        <div className="marquee-track track-reverse">
                            <div className="marquee-group">
                                <span className="logo-item" style={ { color: '#635BFF', fontWeight: '900', fontSize: '2.6rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' } }>stripe</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify" className="logo-item" style={ { height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)' } } />
                                <span className="logo-item" style={ { color: '#4db8ff', fontWeight: '900', fontSize: '2.6rem', letterSpacing: '2px', fontFamily: 'Arial, sans-serif' } }>TCS</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="logo-item" style={ { height: '35px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '800', fontSize: '2.4rem', color: 'white', letterSpacing: '1px', fontFamily: 'Arial, sans-serif' } }>wipro<span style={ { color: '#00b050', fontSize: '1.5rem', marginLeft: '3px' } }>●</span></span>
                                <span className="logo-item" style={ { color: '#7000cc', fontFamily: 'serif', fontSize: '2.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.9', fontWeight: '600' } }>CAPRI<span style={ { color: '#ff0066', fontFamily: 'sans-serif', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '900', transform: 'translateX(10px)' } }>LOANS</span></span>
                                <span className="logo-item" style={ { color: '#cc0000', fontWeight: '900', fontSize: '2.2rem', fontFamily: 'sans-serif', letterSpacing: '-1px' } }>Muthoot Finance</span>
                                <span className="logo-item" style={ { color: '#a832a8', fontWeight: '900', fontSize: '2.2rem', display: 'flex', flexDirection: 'column', lineHeight: '0.9' } }><span>REBEL</span><span>FOODS</span></span>
                                <span className="logo-item" style={ { color: '#ffffff', fontWeight: '700', fontSize: '2.4rem' } }><span style={ { color: '#f9a826' } }>✦ </span>Yubi</span>
                                <span className="logo-item" style={ { letterSpacing: '4px', fontSize: '1.8rem', fontWeight: '500', color: '#dddddd' } }><span style={ { color: '#ff4444', marginRight: '10px' } }>■</span>C R E D E R A</span>
                                <span className="logo-item" style={ { color: '#00c4cc', fontSize: '2.6rem', fontWeight: '800', fontStyle: 'italic', letterSpacing: '-1px' } }>siply</span>
                            </div>
                            <div className="marquee-group">
                                <span className="logo-item" style={ { color: '#635BFF', fontWeight: '900', fontSize: '2.6rem', fontFamily: 'Arial, sans-serif', letterSpacing: '-1px' } }>stripe</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg" alt="Spotify" className="logo-item" style={ { height: '32px', objectFit: 'contain', filter: 'brightness(0) invert(1)' } } />
                                <span className="logo-item" style={ { color: '#4db8ff', fontWeight: '900', fontSize: '2.6rem', letterSpacing: '2px', fontFamily: 'Arial, sans-serif' } }>TCS</span>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg" alt="Infosys" className="logo-item" style={ { height: '35px', objectFit: 'contain' } } />
                                <span className="logo-item" style={ { fontWeight: '800', fontSize: '2.4rem', color: 'white', letterSpacing: '1px', fontFamily: 'Arial, sans-serif' } }>wipro<span style={ { color: '#00b050', fontSize: '1.5rem', marginLeft: '3px' } }>●</span></span>
                                <span className="logo-item" style={ { color: '#7000cc', fontFamily: 'serif', fontSize: '2.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', lineHeight: '0.9', fontWeight: '600' } }>CAPRI<span style={ { color: '#ff0066', fontFamily: 'sans-serif', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: '900', transform: 'translateX(10px)' } }>LOANS</span></span>
                                <span className="logo-item" style={ { color: '#cc0000', fontWeight: '900', fontSize: '2.2rem', fontFamily: 'sans-serif', letterSpacing: '-1px' } }>Muthoot Finance</span>
                                <span className="logo-item" style={ { color: '#a832a8', fontWeight: '900', fontSize: '2.2rem', display: 'flex', flexDirection: 'column', lineHeight: '0.9' } }><span>REBEL</span><span>FOODS</span></span>
                                <span className="logo-item" style={ { color: '#ffffff', fontWeight: '700', fontSize: '2.4rem' } }><span style={ { color: '#f9a826' } }>✦ </span>Yubi</span>
                                <span className="logo-item" style={ { letterSpacing: '4px', fontSize: '1.8rem', fontWeight: '500', color: '#dddddd' } }><span style={ { color: '#ff4444', marginRight: '10px' } }>■</span>C R E D E R A</span>
                                <span className="logo-item" style={ { color: '#00c4cc', fontSize: '2.6rem', fontWeight: '800', fontStyle: 'italic', letterSpacing: '-1px' } }>siply</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="mentors" className="placements-section-light">
                <div className="light-section-header">
                    <p className="light-pre-title">SUCCESS STORIES</p>
                    <h2 className="light-main-title">
                        Real Students. <span className="text-gradient">Real Results.</span>
                    </h2>
                </div>

                <div className="cards-container-light">
                    {/* Card 1 */ }
                    <div className="student-card-light">
                        <div className="card-image-wrapper">
                            <img src={ student1.src } alt="Neeraj Pawar" />
                            <div className="linkedin-float">in</div>
                            <div className="package-tag-float">21 LPA</div>
                        </div>
                        <div className="card-content-light">
                            <h3 className="student-name-dark">
                                Neeraj Pawar
                                <span className="verified-blue">✔</span>
                            </h3>
                            <p className="student-role">Systems Engineer</p>
                            <div className="company-logo-box">
                                <span className="company-mark">COFORGE</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 2 */ }
                    <div className="student-card-light">
                        <div className="card-image-wrapper">
                            <img src={ student2.src } alt="Mansi Setup" />
                            <div className="linkedin-float">in</div>
                            <div className="package-tag-float">18+ LPA</div>
                        </div>
                        <div className="card-content-light">
                            <h3 className="student-name-dark">
                                Vijay Nemada
                                <span className="verified-blue">✔</span>
                            </h3>
                            <p className="student-role">Backend  Engineer</p>
                            <div className="company-logo-box">
                                <span className="company-mark">MIND RUBY</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 3 */ }
                    <div className="student-card-light">
                        <div className="card-image-wrapper">
                            <img src={ student3.src } alt="Rishita Setup" />
                            <div className="linkedin-float">in</div>
                            <div className="package-tag-float">11+ LPA</div>
                        </div>
                        <div className="card-content-light">
                            <h3 className="student-name-dark">
                                Sunny Ralanarkar
                                <span className="verified-blue">✔</span>
                            </h3>
                            <p className="student-role">Backend Engineer</p>
                            <div className="company-logo-box">
                                <span className="company-mark">ASTRON MICRO</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 4 */ }
                    <div className="student-card-light">
                        <div className="card-image-wrapper">
                            <img src={ student4.src } alt="Shruti Setup" />
                            <div className="linkedin-float">in</div>
                            <div className="package-tag-float">15+ LPA</div>
                        </div>
                        <div className="card-content-light">
                            <h3 className="student-name-dark">
                                Om Javia
                                <span className="verified-blue">✔</span>
                            </h3>
                            <p className="student-role">Meta Developer</p>
                            <div className="company-logo-box">
                                <span className="company-mark">META SHORTS</span>
                            </div>
                        </div>
                    </div>

                    {/* Card 5 */ }
                    <div className="student-card-light">
                        <div className="card-image-wrapper">
                            <img src={ student5.src } alt="Placement student 5" />
                            <div className="linkedin-float">in</div>
                            <div className="package-tag-float">10+ LPA</div>
                        </div>
                        <div className="card-content-light">
                            <h3 className="student-name-dark">
                                Manish Patidar 
                                <span className="verified-blue">✔</span>
                            </h3>
                            <p className="student-role">Full Stack Developer</p>
                            <div className="company-logo-box">
                                <span className="company-mark">INFOSYS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section id="syllabus" className="roadmap-section">
                <div className="roadmap-container">
                    <div className="roadmap-header">
                        <span className="roadmap-pill">THE TRANSFORMATION</span>
                        <h2 className="roadmap-title">
                            How you become <span className="text-highlight-green">Undeniable.</span>
                        </h2>
                        <p className="roadmap-subtitle">
                            We don't teach you to pass exams. We architect you into a 10x Developer who writes production code, leverages AI, and commands premium salaries. Here is your exact evolution.
                        </p>
                    </div>

                    <div className="roadmap-timeline">
                        {/* Phase 1 */ }
                        <div className="timeline-node">
                            <div className="timeline-dot">1</div>
                            <div className="timeline-content">
                                <h3 className="phase-title">Phase 1: The Core Foundation</h3>
                                <p className="phase-desc">
                                    Forget 4 years of theory. In 1 month, you will master the deep internal mechanics of JavaScript, React, and Backend logic. You won't just learn syntax; you'll understand how browsers render data and servers process complex loads.
                                </p>
                                <div className="tech-stack-pills">
                                    <span>React 18</span>
                                    <span>Node.js</span>
                                    <span>Data Structures</span>
                                </div>
                            </div>
                        </div>

                        {/* Phase 2 */ }
                        <div className="timeline-node">
                            <div className="timeline-dot dot-orange">2</div>
                            <div className="timeline-content">
                                <h3 className="phase-title">Phase 2: Agentic AI Orchestration</h3>
                                <p className="phase-desc">
                                    This is where you bypass the competition. We train you to use advanced AI tooling (Cursor, Copilot, LLM APIs) to write boilerplates and debug errors instantly. You transition from a "coder" into an "Architect" who delegates code to AI and builds full startups in a weekend.
                                </p>
                                <div className="tech-stack-pills">
                                    <span>Cursor AI</span>
                                    <span>OpenAI APIs</span>
                                    <span>Prompt Engineering</span>
                                </div>
                            </div>
                        </div>

                        {/* Phase 3 */ }
                        <div className="timeline-node">
                            <div className="timeline-dot dot-green">3</div>
                            <div className="timeline-content">
                                <h3 className="phase-title">Phase 3: Deep Production Architecture</h3>
                                <p className="phase-desc">
                                    No more To-Do lists. You will deploy massive enterprise-grade microservices, real-time WebSockets, and scalable databases. Your GitHub will shift from a "student portfolio" to a "Senior Engineer's production log" that recruiters blindly trust.
                                </p>
                                <div className="tech-stack-pills">
                                    <span>Next.js 14</span>
                                    <span>AWS & Docker</span>
                                    <span>System Design</span>
                                </div>
                            </div>
                        </div>

                        {/* Final Outcome */ }
                        <div className="roadmap-final-outcome">
                            <div className="outcome-glow"></div>
                            <h2>The Final Result</h2>
                            <p>You walk into interviews with a portfolio of live, complex platforms that interviewers can actually test. You don't ask for a job—you demonstrate that you are already overqualified.</p>
                            <button className="outcome-btn" onClick={ openModal }>Claim Your Seat Now ➔</button>
                        </div>
                    </div>
                </div>
            </section>

            {/* A Message to Students Section */ }
            <section className="message-section">
                <div className="message-container">
                    <div className="message-image-col">
                        <div className="message-img-backdrop"></div>
                        <img src={ office8.src } alt="Coding Sharks team" className="message-img" />
                    </div>
                    <div className="message-text-col">
                        <span className="message-pill">AN HONEST MESSAGE</span>
                        <h2 className="message-heading">
                            Stop falling for <span className="text-highlight-solid">fake promises</span> in tech education.
                        </h2>
                        <div className="message-body">
                            <p>Hey there,</p>
                            <p>If you're reading this, you've probably watched countless hours of tutorials, bought cheap generic courses, and built basic "To-Do" app clones. Yet, when you look at an actual enterprise codebase or sit in a tough technical interview, you feel lost.</p>
                            <p className="highlight-strong">That confusion ends here.</p>
                            <p>We built Coding Sharks to create the exact rigorous, no-fluff engineering ground we wished we had. We don't teach you to just 'pass exams'. We train you to wield <strong>Agentic AI</strong>—using Cursor and LLMs to write your complex boilerplate—leaving you free to architect massive-scale systems that MNCs genuinely care about.</p>
                            <p>This bootcamp will demand your ultimate focus, but when you finish, you won't be a beginner anymore. You will be a highly-paid, production-ready software engineer.</p>
                        </div>
                        <div className="signature-block">
                            <h4 className="founder-name">The Coding Sharks Team</h4>
                            <p className="founder-role">Lead Architects & Instructors</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Video Showcase Section */ }
            <section className="video-showcase-section">
                <div className="showcase-container">
                    <div className="section-header center-align">
                        <span className="message-pill">INSIDE THE PLATFORM</span>
                        <h2 className="video-heading">
                            Build interfaces that <span className="text-highlight-solid">command attention.</span>
                        </h2>
                        <p className="video-subtext">
                            See exactly what you'll be architecting by the end of Week 12. No more basic shell tutorials—build lightning-fast, premium real-world products.
                        </p>
                    </div>

                    <div className="video-wrapper">
                        <div className="video-glow-effect"></div>
                        <div className="mac-glass-frame">
                            <div className="mac-top-bar">
                                <span className="mac-dot red"></span>
                                <span className="mac-dot yellow"></span>
                                <span className="mac-dot green"></span>
                            </div>
                            <video
                                src="https://cdn.dribbble.com/userupload/43816397/file/original-07ed345e8cfeaa243c03ba04000757c5.mp4"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="showcase-video"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Success Story Section */ }
            <section id="projects" className="mission-section">
                <div className="mission-container">
                    <div className="mission-header">
                        <p className="mission-eyebrow">OUR TRACK RECORD</p>
                        <h2 className="mission-headline">
                            WE'RE ON A MISSION TO HELP<br />
                            <span className="mission-headline-accent">STUDENTS LIKE YOU SUCCEED...</span>
                        </h2>
                    </div>

                    <div className="mission-photo-grid">
                        <div className="mission-photo tall">
                            <img
                                src="https://www.thecodingsharks.com/_next/image?url=%2Fimages%2Foffice%2Foffice6.jpg&w=640&q=85"
                                alt="Coding Sharks Office"
                            />
                        </div>
                        <div className="mission-photo">
                            <img
                                src="https://www.thecodingsharks.com/_next/image?url=%2Fimages%2Foffice%2Foffice7.jpg&w=640&q=85"
                                alt="Team Session"
                            />
                        </div>
                        <div className="mission-photo">
                            <img
                                src="https://www.thecodingsharks.com/_next/image?url=%2Fimages%2Foffice%2Foffice9.jpg&w=640&q=85"
                                alt="Live Workshop"
                            />
                        </div>
                        <div className="mission-photo wide">
                            <img
                                src="https://www.thecodingsharks.com/_next/image?url=%2Fimages%2Foffice%2Foffice10.jpg&w=640&q=85"
                                alt="Event Crowd"
                            />
                        </div>
                        <div className="mission-photo">
                            <img
                                src="https://www.thecodingsharks.com/_next/image?url=%2Fimages%2Foffice%2Foffice1.jpg&w=640&q=85"
                                alt="Bootcamp Students"
                            />
                        </div>
                    </div>

                    <div className="mission-cta-row">
                        <button className="mission-cta-btn" onClick={ openModal }>JOIN THOUSANDS OF STUDENTS →</button>
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 2: SKILL DNA HELIX (3D CSS)
            ============================================ */}
            <section className="dna-section">
                <div className="dna-bg-glow"></div>
                <div className="dna-container">
                    <p className="dna-eyebrow">THE ARCHITECTURE</p>
                    <h2 className="dna-heading">
                        Your Career DNA.<br />
                        <span className="dna-accent">Engineered to Perfection.</span>
                    </h2>
                    <p className="dna-subtext">Every skill you learn is a strand in your professional identity. We build it systematically, one rung at a time.</p>

                    <div className="dna-scene-wrapper">
                        <div className="dna-helix">
                            { [
                                { label: 'React.js', icon: '⚛️', side: 'left' },
                                { label: 'Node.js', icon: '🟢', side: 'right' },
                                { label: 'TypeScript', icon: '📘', side: 'left' },
                                { label: 'MongoDB', icon: '🍃', side: 'right' },
                                { label: 'OpenAI API', icon: '🤖', side: 'left' },
                                { label: 'Next.js 14', icon: '▲', side: 'right' },
                                { label: 'AWS / Docker', icon: '☁️', side: 'left' },
                                { label: 'System Design', icon: '🏗️', side: 'right' },
                            ].map( ( item, i ) => (
                                <div key={ i } className={ `dna-rung rung-${ i }` }>
                                    <div className={ `dna-node ${ item.side }` }>
                                        <span className="dna-node-icon">{ item.icon }</span>
                                        <span className="dna-node-label">{ item.label }</span>
                                    </div>
                                    <div className="dna-bridge"></div>
                                    <div className={ `dna-node ${ item.side === 'left' ? 'right' : 'left' } mirror` }>
                                        <div className="dna-dot"></div>
                                    </div>
                                </div>
                            ) ) }
                        </div>
                        <div className="dna-strand dna-strand-left"></div>
                        <div className="dna-strand dna-strand-right"></div>
                    </div>

                    <div style={ { textAlign: 'center', marginTop: '3rem' } }>
                        <button className="tl3d-launch-btn" style={ { background: 'linear-gradient(135deg,#a855f7,#7c3aed)' } } onClick={ openModal }>
                            DECODE MY POTENTIAL →
                        </button>
                    </div>
                </div>
            </section>

            {/* ============================================
                SECTION 3: IRON MAN HUD — HOLOGRAPHIC
            ============================================ */}
            <section className="hud-section">
                <div className="hud-scanlines"></div>
                <div className="hud-container">
                    <p className="hud-eyebrow">⚡ SYSTEM INITIALIZING...</p>
                    <h2 className="hud-heading">
                        Your 12-Week<br />
                        <span className="hud-accent">Operating System Upgrade.</span>
                    </h2>

                    <div className="hud-screen-wrapper">
                        <div className="hud-corner tl"></div>
                        <div className="hud-corner tr"></div>
                        <div className="hud-corner bl"></div>
                        <div className="hud-corner br"></div>

                        <div className="hud-screen">
                            <div className="hud-topbar">
                                <span className="hud-tag">CODING_SHARKS_OS v12.0</span>
                                <span className="hud-status">● SYSTEM ONLINE</span>
                            </div>
                            <div className="hud-grid">
                                <div className="hud-panel">
                                    <p className="hud-panel-title">SALARY TRAJECTORY</p>
                                    <div className="hud-bars">
                                        <div className="hud-bar" style={ { height: '30%' } }><span>Pre</span></div>
                                        <div className="hud-bar" style={ { height: '55%' } }><span>Wk4</span></div>
                                        <div className="hud-bar" style={ { height: '75%' } }><span>Wk8</span></div>
                                        <div className="hud-bar" style={ { height: '100%' } }><span>Wk12</span></div>
                                    </div>
                                    <p className="hud-bar-label">↑ 340% Growth Potential</p>
                                </div>

                                <div className="hud-panel center-panel">
                                    <div className="hud-orb">
                                        <div className="hud-orb-ring r1"></div>
                                        <div className="hud-orb-ring r2"></div>
                                        <div className="hud-orb-ring r3"></div>
                                        <span className="hud-orb-text">YOU</span>
                                    </div>
                                    <p className="hud-orb-label">Student Profile: ACTIVE</p>
                                </div>

                                <div className="hud-panel">
                                    <p className="hud-panel-title">SKILLS LOADED</p>
                                    <ul className="hud-skill-list">
                                        <li><span className="hud-check">✓</span> React / Next.js</li>
                                        <li><span className="hud-check">✓</span> Node + MongoDB</li>
                                        <li><span className="hud-check">✓</span> Agentic AI</li>
                                        <li><span className="hud-check">✓</span> AWS + Docker</li>
                                        <li><span className="hud-check">✓</span> System Design</li>
                                    </ul>
                                </div>
                            </div>
                            <div className="hud-footer-bar">
                                <span>PLACEMENT PROBABILITY: <strong>94%</strong></span>
                                <span>BATCH: FULL-STACK AI 12W</span>
                                <span>SEATS REMAINING: <strong className="hud-red">4</strong></span>
                            </div>
                        </div>
                    </div>

                    <div style={ { textAlign: 'center', marginTop: '3rem' } }>
                        <button className="hud-cta-btn" onClick={ openModal }>
                            ⚡ INITIALIZE MY UPGRADE →
                        </button>
                    </div>
                </div>
            </section>

            {/* Final 3D Launch Section */}
            <section id="pricing" className="launch3d-section">
                <canvas ref={ launchCanvasRef } className="launch3d-canvas" aria-hidden="true"></canvas>
                <div className="launch3d-noise" aria-hidden="true"></div>
                <div className="launch3d-container">
                    <div className="launch3d-copy">
                        <p className="launch3d-eyebrow"><span></span> FINAL BUILD / LIVE PREVIEW</p>
                        <h2 className="launch3d-title">Your next chapter<br /><strong>is already compiling.</strong></h2>
                        <p className="launch3d-subtitle">From blank screen to production-grade thinking. Step inside the build room and ship the version of you that companies are looking for.</p>
                        <button className="launch3d-cta" onClick={ openModal }>ENTER THE BUILD ROOM <span>↗</span></button>
                    </div>

                    <div className="launch3d-stage" aria-label="Animated 3D software architecture preview">
                        <div className="launch3d-orbit orbit-one"></div>
                        <div className="launch3d-orbit orbit-two"></div>
                        <div className="launch3d-core">
                            <div className="core-face face-front"><span>12</span><small>WEEKS</small></div>
                            <div className="core-face face-back"></div>
                            <div className="core-face face-right"></div>
                            <div className="core-face face-left"></div>
                            <div className="core-face face-top"></div>
                            <div className="core-face face-bottom"></div>
                        </div>
                        <div className="launch3d-node node-a">REACT</div>
                        <div className="launch3d-node node-b">AI</div>
                        <div className="launch3d-node node-c">SHIP</div>
                    </div>
                </div>
                <div className="launch3d-statusbar">
                    <span>ARCHITECTURE / 01</span><span>● CORE ONLINE</span><span>BUILD STATUS: READY</span>
                </div>
            </section>

            {/* Scroll-Driven 3D Portal */}
            <section ref={ portalSectionRef } className="scroll-portal-section">
                <div className="scroll-portal-sticky">
                    <div className="portal-stars" aria-hidden="true"></div>
                    <div className="portal-copy portal-copy-start">
                        <span>01 / BUILD THE FOUNDATION</span>
                        <h2>Learn the skills<br /><strong>companies hire for.</strong></h2>
                        <p>JavaScript, Git, APIs and problem-solving taught through hands-on practice.</p>
                    </div>
                    <div className="portal-copy portal-copy-mid">
                        <span>02 / BUILD REAL PRODUCTS</span>
                        <h2>Turn your ideas<br /><strong>into working apps.</strong></h2>
                        <p>Build with React, Node.js, databases and AI workflows while mentors guide your next move.</p>
                    </div>
                    <div className="portal-copy portal-copy-end">
                        <span>03 / GET CAREER-READY</span>
                        <h2>Ship your portfolio.<br /><strong>Start getting hired.</strong></h2>
                        <p>Leave with deployed projects, a stronger GitHub and the confidence to crack interviews.</p>
                        <button onClick={ openModal }>START BUILDING NOW <b>↗</b></button>
                    </div>

                    <div className="portal-scene" aria-label="Scroll-driven 3D coding architecture portal">
                        <div className="portal-grid-floor"></div>
                        <div className="portal-ring portal-ring-outer"></div>
                        <div className="portal-ring portal-ring-inner"></div>
                        <div className="portal-tunnel portal-tunnel-back"></div>
                        <div className="portal-tunnel portal-tunnel-mid"></div>
                        <div className="portal-tunnel portal-tunnel-front"></div>
                        <div className="portal-core">
                            <span className="portal-core-number">12</span>
                            <span className="portal-core-label">WEEKS TO SHIP</span>
                            <i></i><i></i><i></i><i></i>
                        </div>
                        <span className="portal-float float-react">REACT</span>
                        <span className="portal-float float-ai">AI WORKFLOWS</span>
                        <span className="portal-float float-cloud">DEPLOYED</span>
                    </div>
                    <div className="portal-scroll-line"><span></span></div>
                </div>
            </section>

            <section className="faq-section" aria-labelledby="faq-title">
                <div className="faq-container">
                    <p className="faq-eyebrow">NEED TO KNOW</p>
                    <h2 id="faq-title" className="faq-title">Frequently Asked Questions</h2>
                    <div className="faq-list">
                        { faqs.map( ( faq, index ) =>
                        {
                            const isOpen = openFaq === index;
                            return (
                                <div className={ `faq-item ${ isOpen ? 'is-open' : '' }` } key={ faq.question }>
                                    <button
                                        className="faq-question"
                                        type="button"
                                        aria-expanded={ isOpen }
                                        onClick={ () => setOpenFaq( isOpen ? -1 : index ) }
                                    >
                                        <span>{ faq.question }</span>
                                        <span className="faq-toggle" aria-hidden="true">{ isOpen ? '−' : '+' }</span>
                                    </button>
                                    { isOpen && <p className="faq-answer">{ faq.answer }</p> }
                                </div>
                            );
                        } ) }
                    </div>
                </div>
            </section>

            <footer className="site-footer">
                <div className="footer-inner">
                    <div className="footer-topline">
                        <div className="footer-brand-block">
                            <div className="footer-brand-mark"><span>&lt;</span><b>/</b><span>&gt;</span></div>
                            <p className="footer-brand-name">CODING<span>SHARKS</span></p>
                            <p className="footer-tagline">Build skills. Ship products.<br />Change your career.</p>
                        </div>

                        <div className="footer-cta-block">
                            <p className="footer-cta-eyebrow">YOUR NEXT CHAPTER STARTS HERE</p>
                            <h2>Ready to build<br /><span>what is next?</span></h2>
                            <button className="footer-cta" onClick={ openModal }>START YOUR JOURNEY <span>↗</span></button>
                        </div>
                    </div>

                    <div className="footer-links-row">
                        <div>
                            <p className="footer-label">EXPLORE</p>
                            <a href="#top">Home</a>
                            <a href="#syllabus">Syllabus</a>
                            <a href="#projects">Projects</a>
                        </div>
                        <div>
                            <p className="footer-label">PROGRAM</p>
                            <a href="#mentors">Mentors</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#faq-title">FAQs</a>
                        </div>
                        <div className="footer-contact">
                            <p className="footer-label">LET'S CONNECT</p>
                            <a href="mailto:hello@codingsharks.com">hello@codingsharks.com</a>
                            <div className="footer-socials">
                                <a href="#linkedin" aria-label="LinkedIn">in</a>
                                <a href="#instagram" aria-label="Instagram">ig</a>
                                <a href="#youtube" aria-label="YouTube">yt</a>
                            </div>
                        </div>
                    </div>

                    <div className="footer-bottom">
                        <span>© 2026 Coding Sharks. All rights reserved.</span>
                        <span className="footer-status"><i></i> BUILDING THE FUTURE</span>
                        <span>Made for ambitious builders.</span>
                    </div>
                </div>
            </footer>

            {/* Lead Capture Modal */ }

            { showModal && (
                <div className="modal-backdrop" onClick={ closeModal }>
                    <div className="modal-box" onClick={ e => e.stopPropagation() }>
                        <button className="modal-close" onClick={ closeModal }>✕</button>

                        { !submitted ? (
                            <>
                                <div className="modal-header">
                                    <span className="modal-pill">🔥 LIMITED SEATS</span>
                                    <h2 className="modal-title">Claim Your Free Spot</h2>
                                    <p className="modal-subtitle">Fill in your details and we'll reach out within 24 hours to confirm your enrollment.</p>
                                </div>
                                <form className="lead-form" onSubmit={ handleSubmit }>
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name</label>
                                        <input
                                            id="name"
                                            type="text"
                                            placeholder="e.g. Rahul Sharma"
                                            required
                                            value={ formData.name }
                                            onChange={ e => setFormData( { ...formData, name: e.target.value } ) }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="e.g. rahul@gmail.com"
                                            required
                                            value={ formData.email }
                                            onChange={ e => setFormData( { ...formData, email: e.target.value } ) }
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">Phone Number</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="e.g. +91 98765 43210"
                                            required
                                            value={ formData.phone }
                                            onChange={ e => setFormData( { ...formData, phone: e.target.value } ) }
                                        />
                                    </div>
                                    <button type="submit" className="form-submit-btn">GET MY FREE SPOT ➔</button>
                                    <p className="form-footer-text">🔒 100% Private. No spam, ever.</p>
                                </form>
                            </>
                        ) : (
                            <div className="success-state">
                                <div className="success-icon">✅</div>
                                <h2>You're on the List!</h2>
                                <p>Thanks, <strong>{ formData.name }</strong>! Our team will reach out to <strong>{ formData.email }</strong> within 24 hours to confirm your free enrollment spot.</p>
                                <button className="form-submit-btn" onClick={ closeModal }>Close</button>
                            </div>
                        ) }
                    </div>
                </div>
            ) }
        </>
    );
}
