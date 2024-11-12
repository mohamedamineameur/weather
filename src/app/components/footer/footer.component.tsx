'use client'
import translation from './footer.component.json'
import emotion from '@emotion/styled';

const Footer = emotion.footer`
    background-color: #333;
    color: #fff;
    padding: 10px 0;
    text-align: center;
    `;

const Nav = emotion.nav`
    display: flex;
    justify-content: center;
    `;
const NavLink = emotion.a`
    color: #fff;
    margin: 0 10px;
    text-decoration: none;
    `;


interface FooterComponentProps {
    locale: "fr" | "en";
}

export default function FooterComponent({locale}: FooterComponentProps) {
    return (
        <Footer>
            <p>{translation[locale].about}</p>
            <p>{translation[locale].copyright.text} {translation[locale].copyright.year}</p>
            <Nav>
                <NavLink href="/contact">{translation[locale].contact}</NavLink>
            </Nav>

        </Footer>
    );
}
