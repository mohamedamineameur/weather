'use client'
import emotion from '@emotion/styled';


const Container = emotion.div`
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(to bottom, #4A90E2, #187BCD);
    color: white;
    font-family: Arial, sans-serif;
`;

const Title = emotion.h1`
    font-size: 2.5rem;
    color: white;
    margin-bottom: 1rem;
`;

const Paragraph = emotion.p`
    font-size: 1.2rem;
    color: white;
    text-align: center;
    max-width: 600px;
    text-indent: 2rem;
    text-align: justify;
`;

const AboutPage = () => {
    return (
        <Container>
            <Title>About This Application</Title>
            <Paragraph>
                This application is developed to showcase my web development skills. I am Mohemed Amine AMEUR, a Full Stack Web Developer with a passion for creating dynamic and responsive web applications. My expertise includes working with modern web technologies such as React, Node.js, and TypeScript. I strive to write clean, efficient, and maintainable code. Through this application, I aim to demonstrate my ability to solve complex problems, implement best practices, and deliver high-quality software solutions.
            </Paragraph>
        </Container>
    );
};

export default AboutPage;