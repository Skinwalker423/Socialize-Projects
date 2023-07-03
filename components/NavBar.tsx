import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavLinks } from "@/constants";
import AuthProviders from "./AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "./ProfileMenu";

const NavBar = async () => {
  const session = await getCurrentUser();
  console.log("session:", session);
  const userImage = session?.user?.image;

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
        {userImage ? (
          <>
            <ProfileMenu session={session} />
            <Link href={"/create-project"}>Share work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
