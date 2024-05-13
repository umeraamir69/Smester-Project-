import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";


const Password = ({ isOpen , setIsOpen  , data  , setdata  , type , handleadd }) => {
  const cancelButtonRef = useRef(null);

 
  const handleChange = (e) => {
    const { name, value} = e.target;
    setdata({
      ...data,
      [name]:  value
    });
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
                  <form onSubmit={handleadd} className="bg-white">
                    <div className="w-full flex flex-col justify-center  py-2 pl-2 bg-blue-900 rounded-se-md rounded-ss-md ">
                      <span className="flex justify-between pr-5">
                        <h1 className="font-semibold text-2xl">{type == "add" ? "Add Password" : "Change Password"}</h1>
                        <IoClose
                          className="text-3xl cursor-pointer"
                          onClick={() => setIsOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="px-4 mt-6 space-y-2">

                    {type=="change" &&
                      <>
                         <label
                        htmlFor="oldpass"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Old Password
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="password"
                          name="oldpass"
                          id="oldpass"
                          value={data.oldpass}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      </>
                      }



                      <label
                        htmlFor="newpass"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        New Password
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="password"
                          name="newpass"
                          id="newpass"
                          value={data.newpass}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <label
                        htmlFor="cnfrmpass"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="password"
                          name="cnfrmpass"
                          id="cnfrmpass"
                          value={data.cnfrmpass}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                  

        


          
                    </div>
                    <div className="flex justify-center gap-x-4 mt-4 pb-8">
                      <button type="submit"
                        className="bg-blue-600 text-white px-5 py-2 rounded-md">
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
};
export default Password;