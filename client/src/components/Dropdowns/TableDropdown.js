import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useUpdateMutation } from "features/api/apiSlice";
import { useDeleteMutation } from "features/api/apiSlice";
import Response from "components/Response";

const NotificationDropdown = ({ id, type, status }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const [statusData, statusResponse] = useUpdateMutation();
  const [deleteData, deleteResponse] = useDeleteMutation();
  const [deletePending, setDeletePending] = useState(false);
  const [statusPending, setStatusPending] = useState(false);

  const statusHandler = (value) => {
    statusData({
      url: `/user/${type}?id=${id}`,
      tag: [`${type}`],
      visible: value,
    });
  };

  const deleteHandler = () => {
    deleteData({
      url: `/user/${type}?id=${id}`,
      tag: [`${type}`],
    });
  };

  useEffect(() => {
    if (deleteResponse?.status === "fulfilled") {
      setDropdownPopoverShow(false);
    }
  }, [deleteResponse]);

  useEffect(() => {
    if (statusResponse?.status === "fulfilled") {
      setDropdownPopoverShow(false);
    }
  }, [statusResponse]);

  return (
    <>
      <Response response={statusResponse} setPending={setStatusPending} />
      <Response response={deleteResponse} setPending={setDeletePending} />
      <a
        className="text-blueGray-500 py-1 px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        {!status ? (
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={(e) => statusHandler(true)}
          >
            Visible
          </button>
        ) : (
          <button
            className={
              "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
            }
            onClick={(e) => statusHandler(false)}
          >
            Hide
          </button>
        )}

        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={() => deleteHandler()}
        >
          Delete
        </button>
      </div>
    </>
  );
};

export default NotificationDropdown;
