import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";

const NavBar = () => {
  const session = false;

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
      <div className='flexStart gap-10'>
        <Link href={"/"}>
          <Image
            src={"/slogo.svg"}
            width={250}
            height={50}
            priority
            alt='Socialize logo'
          />
        </Link>
        <ul className='xl:flex hidden gap-10'>
          {renderedLinks}
        </ul>
      </div>
      <div className='flex-1 flexCenter gap-4'>
        {session ? (
          <>
            <Image
              src={"/vercel.svg"}
              alt='user avatar'
              width={50}
              height={50}
            />
            <button>Share work</button>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
