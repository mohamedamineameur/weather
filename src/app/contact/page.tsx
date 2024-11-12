'use client'
import emotion from '@emotion/styled';

const Container = emotion.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding-top: 40px;
  min-height: 100vh;
  background: linear-gradient(to bottom, #4A90E2, #187BCD);
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: center;
`;
const Title = emotion.h1`
    font-size: 2.5rem;
    margin-bottom: 20px;
`;

const Info = emotion.p`
    font-size: 1.2rem;
    margin-bottom: 10px;
`;

const Link = emotion.a`
    color: white;
    text-decoration: underline;
    cursor: pointer;
`;

const ContactPage = () => {
    return (
        <Container>
            <Title>Contactez-Nous</Title>
            <Info>Nom: Mohamed Amine Ameur</Info>
            <Info>Email: mohamed.amine.ameur1@gmail.com</Info>
            <Info>Téléphone: +1 613-404-6702</Info>
            <Link href='https://www.linkedin.com/in/ameur-mohamed-amine/?locale=en_US' >LinkedIn</Link>

        </Container>
    );
};

export default ContactPage;

