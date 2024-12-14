"use client";

import { navItems } from "@/constants";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { getCatImage } from "@/lib/getCatImage";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  // catImageUrlを取得するためのコード
  // const [catImageUrl, setCatImageUrl] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchCatImage = async () => {
  //     try {
  //       const imageUrl = await getCatImage();
  //       setCatImageUrl(imageUrl);
  //     } catch (error) {
  //       console.error("Error fetching cat image", error);
  //     }
  //   };

  //   fetchCatImage();
  // }, []);

  return (
    <aside className="sidebar">
      <Link href={"/"} className="">
        <div className="flex items-center font-semibold gap-4   ">
          <img
            src={"/favicon_io/favicon.ico"}
            alt="logo"
            width={40}
            height={40}
            className="h-auto"
          />
          <h1 className="text-2xl text-dark-200 hidden lg:block">
            {" "}
            FILE Storage
          </h1>
        </div>
      </Link>

      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6">
          {navItems.map(({ url, name, icon }) => (
            <Link key={name} href={url} className="lg:w-full">
              <li
                className={cn(
                  "sidebar-nav-item",
                  pathname === url && "shad-active"
                )}
              >
                <Image
                  src={icon}
                  alt={name}
                  width={24}
                  height={24}
                  className={cn(
                    "nav-icon ",
                    pathname === url && "nav-icon-active"
                  )}
                />
                <p className="hidden lg:block">{name}</p>
              </li>
            </Link>
          ))}
        </ul>
      </nav>

      <Image
        src={"/storage_illust.png"}
        alt="logo"
        width={506}
        height={418}
        className="w-full rounded-full"
      />

      <div className="sidebar-user-info">
        <Image
          src={avatar}
          alt="avatar"
          width={44}
          height={44}
          className="sidebar-user-avatar"
        />

        <div className="hidden lg:block">
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
