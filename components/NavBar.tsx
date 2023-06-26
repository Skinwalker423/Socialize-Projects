import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const links = [
    { path: "/", label: "Home" },
    { path: "/", label: "About" },
    { path: "/", label: "Projects" },
    { path: "/", label: "Privacy" },
  ];

  const renderedLinks = links.map(({ path, label }) => {
    return <Link href={path}>{label}</Link>;
  });

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
      </div>
    </nav>
  );
};

export default NavBar;