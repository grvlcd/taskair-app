import React, { useEffect, useRef, useState } from "react";
import { Transition } from "@headlessui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";

type Props = {
  authenticated: boolean;
};

const ssoUrl =
  `${process.env.NEXT_PUBLIC_BACKEND_URL}/redirect?client_id=${process.env.NEXT_PUBLIC_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_REDIRECT_URI}` as const;

const Navbar: NextPage<Props> = ({ authenticated }: Props) => {
  const navigate = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [access_token, setAccessToken] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token")!;
      if (typeof token === "undefined") {
        navigate.push("/auth/login");
        return;
      } else {
        setAccessToken(token);
      }
    }
  }, []);

  const onLogoutHandler = async () => {
    await fetch("/api/logout", {
      method: "POST",
      body: JSON.stringify({ access_token }),
    });
    router.replace("/auth/login");
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt="Workflow"
              />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {/* <a
                  href="#"
                  className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Dashboard
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Team
                </a>

                <a
                  href="#"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Projects
                </a> */}
              </div>
            </div>
          </div>
          <div className="-mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="-mr-2 hidden md:block">
            {authenticated ? (
              <button
                type="button"
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                onClick={onLogoutHandler}
              >
                Logout
              </button>
            ) : (
              <a
                href={ssoUrl}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <div className="md:hidden" id="mobile-menu">
          <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Dashboard
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Team
            </a>

            <a
              href="#"
              className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            >
              Projects
            </a>

            {authenticated ? (
              <button
                type="button"
                className="text-gray-300 bg-red-800 hover:bg-red-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full"
                onClick={onLogoutHandler}
              >
                Logout
              </button>
            ) : (
              <a
                href={ssoUrl}
                className="text-gray-300 bg-blue-800 hover:bg-blue-400 hover:text-white block px-3 py-2 rounded-md text-base font-medium text-center"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </Transition>
    </nav>
  );
};

export default Navbar;
