import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const UserPopup = ({ isOpen , setIsOpen  , data , type , seteditData, handleEditSubmit  , handleAddSubmit  }) => {
  const cancelButtonRef = useRef(null);


  // State for form fields

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    seteditData((prevdata) => ({
      ...prevdata,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  return (
    <div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-blue-300 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={type=="add" ? handleAddSubmit : handleEditSubmit} className="bg-white">
                    <div className="w-full flex flex-col justify-center  py-2 pl-2 bg-blue-900 rounded-se-md rounded-ss-md ">
                      <span className="flex justify-between pr-5">
                        <h1 className="font-semibold text-2xl">{type == "add" ? "Add New User" : "Edit User"}</h1>
                        <IoClose
                          className="text-3xl cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="px-4 mt-6 space-y-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          autoComplete="given-name"
                          value={data.name}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>

                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email
                      </label>
                      <div className="mt-2 pb-">
                        <input
                          type="email"
                          name="email"
                          id="email"
                          autoComplete="email"
                          value={data.email}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>
                    {type == "add" &&<>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Password
                        </label>
                        <div className="mt-2 relative">
                            <input
                            type={passwordVisible ? "text" : "password"}
                            name="password"
                            id="password"
                            autoComplete="new-password"
                            value={data.password}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            required={type="add" ? true : false}
                            />
                            <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
                            >
                            {passwordVisible ? <IoMdEyeOff /> : <IoMdEye />}
                            </button>
                        </div>
                      </>}

                      <div className="grid grid-cols-2 gap-x-3">
                        <div>
                          <label
                            htmlFor="user-type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            User Type
                          </label>
                          <div className="mt-2">
                            <select
                              id="user-type"
                              name="userType"
                              value={data.userType}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                            >
                              <option value="standard">Standard</option>
                              <option value="premium">Premium</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col justify-end">
                          <div className="flex gap-x-5 items-center">
                            <label
                              htmlFor="admin"
                              className="block text-sm font-medium leading-6 text-gray-900"
                            >
                              Admin
                            </label>
                            <input
                              id="admin"
                              type="checkbox"
                              name="isSuperUser"
                              checked={data.isSuperUser}
                              onChange={handleChange}
                              className="w-4 h-4 mr-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-x-4 mt-4 pb-8">
                      <button
                        className="bg-blue-600 text-white px-5 py-2 rounded-md"
                        type="submit"
                      >
                        Submit
                      </button>
              
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
}


export default UserPopup;