"use client";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { APP_ROUTES } from "@/utils";
import { usePathname } from "next/navigation";

const paths = [
  {
    href: APP_ROUTES.HOME,
    icon: "home",
    label: "Home",
  },
  {
    href: APP_ROUTES.SEARCH,
    icon: "search",
    label: "Search",
  },
  {
    href: APP_ROUTES.EXPLORE,
    icon: "explore",
    label: "Explore",
  },
  {
    href: APP_ROUTES.REELS,
    icon: "play_circle",
    label: "Reels",
  },
  {
    href: APP_ROUTES.MESSAGES,
    icon: "chat",
    label: "Messages",
  },
  {
    href: APP_ROUTES.NOTIFICATIONS,
    icon: "favorite",
    label: "Notifications",
  },
  {
    href: APP_ROUTES.CREATE,
    icon: "add_box",
    label: "Create",
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
    label: "Profile",
  },
];

const SideNav = () => {
  const pathName = usePathname();

  return (
    <div className="w-72 hidden sm:flex flex-col border-r-[1px] border-gray-800 px-6 py-6 ">
      <div className="font-semibold text-xl">Instagram</div>
      <div className="flex overflow-scroll mt-6  flex-col justify-between h-full">
        <ul>
          {paths.map((path, i) => {
            return (
              <li key={i} className="my-6">
                <Link className="flex items-center" href={path.href}>
                  <span
                    className={`material-symbols-outlined mr-2 ${
                      path.href === pathName && "fill-icon"
                    }`}
                  >
                    {path.icon}
                  </span>
                  {path.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <ul className="mt-6">
          <li className="my-6 flex items-center">
            <span className="material-symbols-outlined mr-2">
              alternate_email
            </span>
            Threads
          </li>
          <li className="my-6 flex items-center">
            <span className="material-symbols-outlined mr-2">menu</span>More
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideNav;
