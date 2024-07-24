import React, { useState } from "react";
import { createPopper } from "@popperjs/core";
import { useUserLogoutMutation } from "features/api/apiSlice";
import Response from "components/Response";

const UserDropdown = () => {
  const [pending, setPending] = useState(false);
  const [logout, logoutResponse] = useUserLogoutMutation();

  const logoutHandler = () => {
    logout({});
  };
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <>
      <Response
        response={logoutResponse}
        setPending={setPending}
        redirectTo="/"
        type="logout"
      />
      <a
        className="text-blueGray-500 block"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <div className="items-center rounded-sm border p-2 gap-2 bg-white flex">
          <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src="./../Default_Profile_Picture.svg"
            />
          </span>
          <svg
            class="w-6 h-6"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 9-7 7-7-7"
            />
          </svg>
        </div>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="/admin/profile"
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
        >
          Profile
        </a>
        <div
          className={
            "text-sm py-2 px-4 cursor-pointer font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={logoutHandler}
        >
          Log Out
        </div>
      </div>
    </>
  );
};

export default UserDropdown;
