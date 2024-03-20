"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { APP_ROUTES } from "@/utils";

const paths = [
  {
    href: APP_ROUTES.HOME,
    icon: "home",
  },
  {
    href: APP_ROUTES.EXPLORE,
    icon: "explore",
  },
  {
    href: APP_ROUTES.REELS,
    icon: "play_circle",
  },
  {
    href: APP_ROUTES.CREATE,
    icon: "add_box",
  },
  {
    href: APP_ROUTES.MESSAGES,
    icon: "chat",
  },
  {
    href: APP_ROUTES.PROFILE,
    icon: (
      <Image
        className="rounded-full mr-2"
        alt="Profile"
        width={24}
        height={24}
        src="/images/profile.jpeg"
      />
    ),
  },
];

const BottomNav = () => {
  const pathName = usePathname();

  return (
    <div className="border absolute bottom-0 left-0 w-full bg-black h-16 sm:hidden  border-t-[1px] border-gray-800">
      <ul className="h-full flex justify-around items-center">
        {paths.map((path, i) => {
          return (
            <li key={i} className="my-6 flex items-center">
              <Link href={path.href}>
                <span
                  className={`material-symbols-outlined mr-2 ${
                    path.href === pathName && "fill-icon"
                  }`}
                >
                  {path.icon}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default BottomNav;
