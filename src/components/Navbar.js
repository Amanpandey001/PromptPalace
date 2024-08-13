"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { GrClose } from "react-icons/gr";
import { CgMenu } from "react-icons/cg";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [navOpen, setNavOpen] = useState(false);
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  const toggleNav = () => setNavOpen((prev) => !prev);

  return (
    <nav className="p-3 items-center flex justify-between">
      <Link href="/" className="cursor-default flex flex-col items-center selection:bg-none">
        <Image src="/logo.webp" alt="logo" className="logo" width={60} height={60} />
        <h1 className="text-xs hidden sm:block font-bold ppalace">PromptPalace</h1>
      </Link>
      <ul className="sm:flex hidden items-center gap-5">
        <li>
          <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/">
            Home
          </Link>
        </li>
        {session?.user ? (
          <>
            <li>
              <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/create-prompt">
                Create Prompt
              </Link>
            </li>
            <li>
              <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/profile">
                My Profile
              </Link>
            </li>
            <li>
              <button className="px-3 py-[2px] bg-teal-300 rounded-lg" onClick={() => signOut()}>
                Logout
              </button>
            </li>
            <li>
              <Link className="px-3 py-1" href="/profile">
                <Image src={session?.user?.image} alt="profile" width={40} height={40} className="border rounded-full" />
              </Link>
            </li>
          </>
        ) : (
          providers &&
          Object.values(providers).map((provider) => (
            <li key={provider.name}>
              <button className="px-3 py-1 bg-teal-300 rounded-lg" onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </li>
          ))
        )}
      </ul>
      <button onClick={toggleNav} className="sm:hidden" aria-label="Toggle Navigation Menu">
        <CgMenu size={30} />
      </button>
      {navOpen && (
        <div className="z-50 bg-slate-500 absolute left-0 w-full top-0 h-[100vh]">
          <div className="p-4 flex justify-end"><GrClose onClick={toggleNav} className="text-white font-bold" size={30} /></div>
          <ul className="flex my-5 items-center h-full flex-col gap-5 w-full">
            {session?.user && (
              <li onClick={toggleNav} className="">
                <Link className="px-3 py-1" href="/profile">
                  <Image src={session?.user?.image} alt="profile" width={60} height={60} className="border rounded-full" />
                </Link>
              </li>
            )}
            <li onClick={toggleNav}>
              <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/">
                Home
              </Link>
            </li>
            {session?.user ? (
              <>
                <li onClick={toggleNav}>
                  <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/create-prompt">
                    Create Prompt
                  </Link>
                </li>
                <li onClick={toggleNav}>
                  <Link className="px-3 py-1 bg-teal-300 rounded-lg" href="/profile">
                    My Profile
                  </Link>
                </li>
                <li onClick={toggleNav}>
                  <button className="px-3 py-1 bg-teal-300 rounded-lg" onClick={() => signOut()}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              providers &&
              Object.values(providers).map((provider) => (
                <li onClick={toggleNav} key={provider.name}>
                  <button className="px-3 py-1 bg-teal-300 rounded-lg" onClick={() => signIn(provider.id)}>
                    Sign in with {provider.name}
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
