import React from "react";
import { footerLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";

type ColumnProps = {
  title: string;
  links: Array<string>;
};

const FooterColumn = ({ title, links }: ColumnProps) => (
  <div className='flex flex-col' key={title}>
    <h3 className='font-bold'>{title}</h3>
    <ul className='flex flex-col gap-2'>
      {links.map((link) => {
        return (
          <li key={link}>
            <Link
              className='hover:text-slate-900 text-slate-500'
              href={"/"}
            >
              {link}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

const Footer = () => {
  return (
    <footer className='footerStart footer'>
      <div className='flex flex-col gap-12 w-full'>
        <div className='flex flex-col items-start'>
          <Image
            src={"/logo-purple.svg"}
            alt={"logo"}
            width={200}
            height={50}
          />
          <p className='text-start text-sm font-normal my-5 max-w-xs'>
            The largest community to share projects
          </p>
        </div>
        <div className='flex flex-wrap gap-12'>
          {footerLinks.map(({ title, links }) => {
            return (
              <FooterColumn
                key={title}
                title={title}
                links={links}
              />
            );
          })}
        </div>
        <div className='flexBetween footer_copyright'>
          <p>
            @2023 Socialize Projects. All rights reserved
          </p>
          <p className='text-gray'>
            <span className='text-black font-semibold'>
              23,000
            </span>
            Projects submitted
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
