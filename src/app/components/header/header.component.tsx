'use client'
import emotion from '@emotion/styled';
import translation from './header.component.json'


const Header = emotion.header`
  background-color: #333;
  color: #fff;
  padding: 10px 0;
  text-align: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const Title = emotion.h1`
    font-size: 1.5em;
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


interface HeaderComponentProps {
    locale: "fr" | "en";
    setLocale: React.Dispatch<React.SetStateAction<"fr" | "en">>;}

export default function HeaderComponent({locale, setLocale}: HeaderComponentProps) {
    return (
        <Header>
        <Title>{translation[locale].title}</Title>
        <Nav>
            <NavLink href="/">{translation[locale].home}</NavLink>
            <NavLink href="/about">{translation[locale].about}</NavLink>
            <NavLink onClick={()=>{
                if(locale === "fr") {
                    setLocale("en");
                } else {
                    setLocale("fr");
                }
            }}>{
                locale === "fr" ? "English" : "Français"
            }</NavLink>
        </Nav>
        </Header>
    );
    }

