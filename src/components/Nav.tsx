"use client";

import Link from "next/link";
import Image from "next/image";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { BuiltInProviderType } from "next-auth/providers";
const Nav = () => {
  const { data: session } = useSession();

  const [provider, setProvider] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProvider(response);
    };
    setProviders();
  }, []);
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href={"/"} className="flex gap-2 flex-center">
        <Image
          src={"/assets/images/logo.svg"}
          alt="log"
          width={30}
          height={30}
          className="object-contain"
        />
        <p className="logo_text">Promptopia</p>
      </Link>

      {/* Desktop */}
      <div className="sm:flex hidden">
        {session?.user ? (
          <div className="flex gap-3 md:gap-5">
            <Link href={"/create-prompt"} className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={() => {
                signOut;
              }}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href={"/profile"}>
              <Image
                src={`${session.user.image}`}
                width={37}
                height={37}
                className="rounded-full"
                alt="profile"
              />
            </Link>
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => {
                    signIn(prov.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
      {/* Mobile */}

      <div className="sm:hidden flex relative">
        {session?.user ? (
          <div className="flex">
            <Image
              src={`${session.user.image}`}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => { setToggleDropdown((prev) => !prev) }}
            />
            {toggleDropdown && (
              <>
                <div className="dropdown">
                  <Link
                    href={"/profile"}
                    className="dropdown_link"
                    onClick={() => { setToggleDropdown(false) }}>
                    My Profile
                  </Link>
                  <Link
                    href={"/create-prompt"}
                    className="dropdown_link"
                    onClick={() => { setToggleDropdown(false) }}>
                    Create Prompt
                  </Link>
                  <button type="button" onClick={() => {
                    setToggleDropdown(false)
                    signOut()
                  }}
                    className="mt-5 w-full black_btn">
                    Sign Out
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <>
            {provider &&
              Object.values(provider).map((prov) => (
                <button
                  type="button"
                  key={prov.name}
                  onClick={() => {
                    signIn(prov.id);
                  }}
                  className="black_btn"
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
