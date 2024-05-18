import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PackagePopup = ({ isOpen , setIsOpen  , data , type , seteditData, handleEditSubmit  , handleAddSubmit  }) => {
  const cancelButtonRef = useRef(null);



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    seteditData((prevdata) => ({
      ...prevdata,
      [name]: type === "checkbox" ? checked : value,
    }));
  };


  return (
    <div className="z-50">
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 sm:z-10"
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
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed top-4 sm:top-0 inset-0 sm:z-10 z-50 w-screen overflow-y-auto">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={type=="add" ? handleAddSubmit : handleEditSubmit} className="bg-gray-800">
                    <div className="w-full flex flex-col justify-center  py-2 pl-2 bg-slate-900 rounded-se-md rounded-ss-md ">
                      <span className="flex justify-between pr-5">
                        <h1 className="font-semibold text-2xl text-red-600">{type == "add" ? "Add New Package" : "Edit Package"}</h1>
                        <IoClose
                          className="text-3xl cursor-pointer text-white"
                          onClick={() => setIsOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="px-4 mt-6 space-y-2">
                      <label
                        htmlFor="first-name"
                        className="block text-sm font-medium leading-6 text-white"
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
                        htmlFor="ammount"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Ammount
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="number"
                          placeholder="0.00"
                          name="ammount"
                          id="ammount"
                          value={data.ammount}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          required
                        />
                      </div>




                    <div className="grid grid-cols-2 gap-x-3">
                        <div>
                          <label
                            htmlFor="currency"
                            className="block text-sm font-medium leading-6 text-white"
                          >
                            Currency
                          </label>
                          <div className="mt-2">
                            <select
                              id="currency"
                              name="currency"
                              value={data.currency}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                            >
                              <option selected value="USD">US Dollar</option>
                              <option value="PKR">PaKistan Ruppes</option>
                              <option value="INR">Indian Ruppes</option>
                              <option value="GBP">British Pound</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col justify-end">
                          <div className="flex gap-x-5 items-center">
                            <label
                              htmlFor="active"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Active
                            </label>
                            <input
                              id="active"
                              type="checkbox"
                              name="active"
                              checked={data.active}
                              onChange={handleChange}
                              className="w-4 h-4 mr-3"
                            />
                          </div>
                        </div>
                      </div>

                    <div className="grid grid-cols-2 gap-x-3">
                        <div>
                          <label
                            htmlFor="interval"
                            className="block text-sm font-medium leading-6 text-white "
                          >
                            Interval
                          </label>
                          <div className="mt-2">
                            <select
                              id="interval"
                              name="interval"
                              value={data.interval}
                              onChange={handleChange}
                              required
                              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300  sm:text-sm sm:leading-6"
                            >
                              <option selected value="day">Day</option>
                              <option value="week">Week</option>
                              <option value="month">Month</option>
                              <option value="year">Year</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex flex-col justify-end">
                          <div className="flex gap-x-5 items-center">
                            <label
                              htmlFor="interval_count"
                              className="block text-sm font-medium leading-6 text-white"
                            >
                              Interval Count
                            </label>
                            <input
                                type="number"
                                name="interval_count"
                                id="interval_count"
                                value={data.interval_count}
                                onChange={handleChange}
                                className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                required
                            />
                          </div>
                        </div>
                      </div>

                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        description
                      </label>
                      <div className="mt-2 pb-">
                        <textarea
                          type="text"
                          rows={2}
                          name="description"
                          id="description"
                          value={data.description}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                          required
                        />
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


export default PackagePopup;