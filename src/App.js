import React, { useState, useEffect } from 'react';
import { motion, useViewportScroll, useTransform, AnimatePresence } from 'framer-motion';
import './App.css';

const App = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isLoaded, setIsLoaded] = useState(false);
    const { scrollYProgress } = useViewportScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);

    useEffect(() => {
        setIsLoaded(true);
        const updateMousePosition = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.5,
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 120,
                duration: 0.8
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.02,
            rotateY: 5,
            z: 50,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300
            }
        }
    };

    const skillTagVariants = {
        hidden: { scale: 0, rotate: -180 },
        visible: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 200
            }
        },
        hover: {
            scale: 1.1,
            rotate: 5,
            y: -5,
            transition: {
                type: "spring",
                damping: 10,
                stiffness: 400
            }
        }
    };

    const workExperience = [
        {
            company: "SCHRODINGER INC (D.E SHAW)",
            location: "Hyderabad",
            positions: [
                {
                    title: "Senior Developer I",
                    period: "Dec 2023 - Present",
                    description: "Driving the design and implementation of critical features and services within the LiveDesign Platform, ensuring scalability and performance."
                },
                {
                    title: "Developer II",
                    period: "Dec 2022 - Dec 2023",
                    description: "Expanded ownership across multiple features and services in the LiveDesign Platform, contributing to architecture, optimization, and enhancements. Continued mentoring new interns, serving as the primary POC for guidance and support."
                },
                {
                    title: "Developer I",
                    period: "Dec 2021 - Dec 2022",
                    description: "Developing efficient solutions for LiveDesign: Drug Discovery Platform. Mentored a two-month intern and led a highly successful internship project to completion."
                }
            ]
        },
        {
            company: "D.E SHAW INDIA",
            location: "Hyderabad",
            positions: [
                {
                    title: "Associate Developer I",
                    period: "Aug 2021 - Dec 2021",
                    description: "Worked for the Computational Sciences and Technology Team focused on developing new features for the LiveDesign Platform."
                }
            ]
        },
        {
            company: "AMAZON WEB SERVICES (AWS)",
            location: "Hyderabad",
            positions: [
                {
                    title: "Cloud Associate Intern",
                    period: "Mar 2021 – Jun 2021",
                    description: "Worked on an internal tool that would help new hires to have hands-on experience with AWS services."
                }
            ]
        }
    ];

    const projects = [
        {
            name: "LiveDesign BE Core Services",
            tech: "Java, Spring, PostgreSQL, REST APIs, GCP, Docker, Jenkins",
            highlights: [
                "Engineered an optimized approach to handle user management for a large user base by minimizing expensive LDAP (Lightweight Directory Access Protocol) calls",
                "Led the transition of reaction enumeration from TaskEngine to BBchem, achieving ~65% runtime reduction through a major architectural overhaul",
                "Created a CI/CD pipeline from scratch using Docker and Jenkins to run stress tests against the LiveDesign backend, automating performance regression monitoring",
                "Architected the autosuggest backend, enabling per-column text search suggestions in LiveReport",
                "Authored complex DB migrations to support evolving schemas, ensuring data integrity and minimal downtime"
            ]
        },
        {
            name: "Structure Search Microservice",
            tech: "Java, Spring Boot, Kafka",
            highlights: [
                "Sole owner of the Structure Search Microservice, enabling fast and efficient substructure and similarity searches within LiveDesign",
                "Optimized search performance using multithreading to batch-process results in parallel, with TTL-cached, paginated sessions resumable via search ID",
                "Redesigned the in-memory cache to support richer, larger structures, reducing memory usage by 45% while maintaining high throughput under load"
            ]
        },
        {
            name: "Property Microservice",
            tech: "Flask, Kafka, Debezium, Kubernetes, PostgreSQL, Jenkins",
            highlights: [
                "Designed, developed, and maintained a scalable microservice to manage platform-wide feature flags",
                "Implemented database synchronization with the LiveDesign backend (monolith) using Kafka Connect & Debezium CDC, enabling seamless fallback for reliability during service transition",
                "Created a CI/CD pipeline using Jenkins to streamline development and deployment"
            ]
        },
        {
            name: "LiveDesign Front End",
            tech: "JavaScript, React, HTML, CSS",
            highlights: [
                "Designed and developed a UI for rule-based color and shape assignments to enhance data visualization in various plots",
                "Built the Filters UI, enabling users to apply text, structure, numerical, date, and range-based filters on columns",
                "Implemented UI access controls for Viewer and Designer licenses, enabling a subscription model and expanding the user base through tiered access",
                "Introduced generic, reusable components (Dialogs, Dropdowns, Tooltips, etc.) by unifying existing UI patterns, enhancing code maintainability and ensuring a consistent user experience across the application"
            ]
        }
    ];

    const skills = {
        "Languages": ["Java", "JavaScript", "Python", "SQL", "HTML"],
        "Frameworks/Technologies": ["Spring Boot", "React", "Flask", "Kafka", "Docker", "Kubernetes", "Jenkins", "GCP", "AWS"],
        "Tools/Platforms": ["Git", "CI/CD", "Postgres", "REST APIs"]
    };

    const achievements = [
        "Codeforces Round 710: Rank 230 (top 0.8%) with over 26k participants",
        "Codechef December Long Challenge 2020: Rank 114 (top 0.5%) with over 22k participants",
        "Republic Day Challenge (Codenation): Ranked 75 (top 0.5%) among 15k participants",
        "Travel Transforms 2021 (Expedia): Ranked 83 (top 0.8%) among 10k participants"
    ];

    return (
        <div className="App">
            {/* Animated Background */}
            <div className="animated-bg">
                <div className="floating-shapes">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`shape shape-${i + 1}`}
                            animate={{
                                y: [0, -30, 0],
                                x: [0, 15, 0],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 4 + i,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Mouse Follower */}
            {/* <motion.div
        className="mouse-follower"
        animate={{
          x: mousePosition.x - 10,
          y: mousePosition.y - 10,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
      /> */}

            <AnimatePresence>
                {isLoaded && (
                    <motion.header
                        className="header"
                        initial={{ y: -100, opacity: 0, scale: 0.8 }}
                        animate={{ y: 0, opacity: 1, scale: 1 }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 120,
                            duration: 1.2
                        }}
                    >
                        <motion.div
                            className="header-content"
                            style={{ y: yRange }}
                        >
                            <div className="profile-section">
                                <motion.div
                                    className="profile-avatar"
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{
                                        type: "spring",
                                        damping: 20,
                                        stiffness: 200,
                                        delay: 0.5
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        transition: { duration: 0.6 }
                                    }}
                                >
                                    <div className="avatar-ring">
                                        <img src={`${process.env.PUBLIC_URL}/header_img.jpg`} alt="Shubham Kansal" />
                                    </div>
                                </motion.div>
                                <div className="profile-info">
                                    <motion.h1
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.8, duration: 0.8 }}
                                    >
                                        Shubham Kansal
                                    </motion.h1>
                                    <motion.h2
                                        initial={{ x: -50, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 1, duration: 0.8 }}
                                    >
                                        Senior Software Engineer | Backend Systems | Java, Microservices, Spring, React
                                    </motion.h2>
                                    <motion.div
                                        className="contact-info"
                                        initial={{ y: 30, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 1.2, duration: 0.8 }}
                                    >
                                        <motion.a
                                            href="mailto:kansalshubham75@gmail.com"
                                            className="contact-link"
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            📧 kansalshubham75@gmail.com
                                        </motion.a>
                                        <motion.a
                                            href="tel:+919999577846"
                                            className="contact-link"
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            📱 +91 99995 77846
                                        </motion.a>
                                        <motion.a
                                            href="https://www.linkedin.com/in/shubham-kansal-487698170/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-link"
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            🔗 LinkedIn: shubhamkansal
                                        </motion.a>
                                        <motion.a
                                            href="https://github.com/kansalshubham75"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-link"
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            💻 GitHub: kansalshubham75
                                        </motion.a>
                                        <motion.a
                                            href="https://codeforces.com/profile/kansalshubham75"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="contact-link"
                                            whileHover={{ scale: 1.05, y: -3 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            🏆 Codeforces: kansalshubham75
                                        </motion.a>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.header>
                )}
            </AnimatePresence>

            <motion.main
                className="main-content"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.section className="section" variants={itemVariants}>
                    <motion.h3
                        whileHover={{
                            scale: 1.01,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        Work Experience
                    </motion.h3>
                    <div className="experience-list">
                        {workExperience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="experience-card"
                                variants={cardHoverVariants}
                                whileHover="hover"
                                initial={{ x: -100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.8 }}
                            >
                                <div className="company-header">
                                    <motion.h4
                                        whileHover={{ color: "#2980b9", transform: "translateX(5px)" }}
                                    >
                                        {exp.company}
                                    </motion.h4>
                                    <span className="location">{exp.location}</span>
                                </div>
                                {exp.positions.map((pos, posIndex) => (
                                    <motion.div
                                        key={posIndex}
                                        className="position"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index * 0.2) + (posIndex * 0.1) + 0.3 }}
                                    >
                                        <div className="position-header">
                                            <h5>{pos.title}</h5>
                                            <span className="period">{pos.period}</span>
                                        </div>
                                        <p>{pos.description}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="section" variants={itemVariants}>
                    <motion.h3
                        whileHover={{
                            scale: 1.01,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        Technical Skills
                    </motion.h3>
                    <div className="skills-grid">
                        {Object.entries(skills).map(([category, skillList], index) => (
                            <motion.div
                                key={index}
                                className="skill-category"
                                variants={itemVariants}
                                whileHover={{ scale: 1.02, rotateY: 5 }}
                            >
                                <motion.h4
                                    whileHover={{ scale: 1.1, color: "#3498db" }}
                                >
                                    {category}
                                </motion.h4>
                                <div className="skill-tags">
                                    {skillList.map((skill, skillIndex) => (
                                        <motion.span
                                            key={skillIndex}
                                            className="skill-tag"
                                            variants={skillTagVariants}
                                            whileHover="hover"
                                            initial="hidden"
                                            animate="visible"
                                            transition={{ delay: skillIndex * 0.1 }}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="section" variants={itemVariants}>
                    <motion.h3
                        whileHover={{
                            scale: 1.01,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        Projects
                    </motion.h3>
                    <div className="projects-list">
                        {projects.map((project, index) => (
                            <motion.div
                                key={index}
                                className="project-card"
                                variants={cardHoverVariants}
                                whileHover="hover"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: index * 0.2, duration: 0.6 }}
                            >
                                <div className="project-header">
                                    <motion.h4
                                        whileHover={{ scale: 1.05, color: "#2980b9" }}
                                    >
                                        {project.name}
                                    </motion.h4>
                                    <span className="tech-stack">{project.tech}</span>
                                </div>
                                <ul className="project-highlights">
                                    {project.highlights.map((highlight, highlightIndex) => (
                                        <motion.li
                                            key={highlightIndex}
                                            className="highlight-item"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: (index * 0.2) + (highlightIndex * 0.1) + 0.3 }}
                                            whileHover={{ x: 10, scale: 1.02 }}
                                        >
                                            <span className="highlight-bullet">▶</span>
                                            {highlight}
                                        </motion.li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                <motion.section className="section" variants={itemVariants}>
                    <motion.h3
                        whileHover={{
                            scale: 1.01,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        Education
                    </motion.h3>
                    <motion.div
                        className="education-card"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, rotateY: 3 }}
                    >
                        <motion.div
                            className="education-item"
                            whileHover={{ scale: 1.02, x: 10 }}
                        >
                            <h4>Bhagwan Parshuram Institute of Technology (GGSIPU)</h4>
                            <p>Bachelor of Technology in Computer Science and Engineering</p>
                            <p>CGPA: 8.36/10.0 | Aug 2017 - July 2021 | New Delhi, India</p>
                        </motion.div>
                        <motion.div
                            className="education-item"
                            whileHover={{ scale: 1.02, x: 10 }}
                        >
                            <h4>GD Goenka Public School</h4>
                            <p>Senior Secondary (PCM + CS), 12th CBSE: 81% (aggregate), 95% (CS) | April 2016</p>
                            <p>High School, 10th CBSE, CGPA 9.6 | April 2014 | New Delhi, India</p>
                        </motion.div>
                    </motion.div>
                </motion.section>

                <motion.section className="section" variants={itemVariants}>
                    <motion.h3
                        whileHover={{
                            scale: 1.01,
                            transition: { type: "spring", stiffness: 400, damping: 25 }
                        }}
                    >
                        Achievements
                    </motion.h3>
                    <motion.div className="achievements-list" variants={itemVariants}>
                        {achievements.map((achievement, index) => (
                            <motion.div
                                key={index}
                                className="achievement-item"
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                    delay: index * 0.2,
                                    type: "spring",
                                    damping: 20,
                                    stiffness: 200
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    x: 15,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)"
                                }}
                            >
                                <motion.div
                                    className="achievement-icon achievement-icon-css"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                </motion.div>

                                <p>{achievement}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.section>
            </motion.main>
        </div>
    );
};

export default App;
