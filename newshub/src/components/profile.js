import { Menu, Transition } from '@headlessui/react';
import React, { Fragment, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Profile() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate(); // Move the useNavigate hook outside the LogoutButton component

  const LogoutButton = () => {
    const { logout } = useAuth0();

    const handleLogout = () => {
      logout({ returnTo: window.location.origin });
    };

    const handleDashboardClick = () => {
      navigate('/Dashboard'); // Now navigate is accessible here
    };

    return (
      <div>
        <Menu as="div" className="relative inline-block text-left z-50 bg-gray">
          <div>
            <Menu.Button className="bg-gray">
              <img className='h-10 w-10 rounded-full object-cover'
                src={user.picture}
                alt="down-arrow"
                width={16}
                height={10}
              />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col">
              <div className="py-1 w-full z-50 flex flex-col space-y-3">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleDashboardClick}
                      className={classNames(
                        active ? "bg-whitesmoke text-gray" : "text-gray",
                        "block px-4 py-2 font-audiowide text-sm text-gray no-underline"
                      )}
                    >
                      Dashboard
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout} 
                      className={classNames(
                        active ? "bg-whitesmoke text-gray" : "text-gray",
                        "block px-4 py-2 text-sm font-audiowide text-gray no-underline"
                      )}
                    >
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    );
  };

  return (
    <div>
      <LogoutButton />
    </div>
  );
}

export default Profile;
