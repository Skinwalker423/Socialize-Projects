import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavLinks } from "@/constants";

const NavBar = () => {
  const renderedLinks = NavLinks.map(
    ({ href, text, key }) => {
      return (
        <li key={key}>
          <Link href={href}>{text}</Link>
        </li>
      );
    }
  );

  return (
    <nav className='flexBetween navbar'>
      <div className='flex-1 flexStart gap-10'>
        <Link href={"/"}>
          <Image
            src={"/slogo.svg"}
            width={200}
            height={50}
            alt='Socialize logo'
          />
        </Link>
        <ul className='xl:flex hidden gap-10'>
          {renderedLinks}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
