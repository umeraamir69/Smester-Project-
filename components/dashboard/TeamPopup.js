
import React, { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";


const TeamPopup = ({ isOpen , setIsOpen  , data , type , seteditData, handleEditSubmit  , handleAddSubmit  }) => {
  const cancelButtonRef = useRef(null);
  const [Leagues, setLeagues] = useState([]);

  useEffect(() => {
    async function fetchLeagues() {
        try {
            const response = await fetch("/api/leagues", {
                headers: {
                "Content-Type": "application/json",
                },
                method: "GET"
            });
            const data = await response.json();
            data.status ? setLeagues(data.data) : 'toast here that failed to load leagues';
        }
        catch (error)
        {
            //toast of error
            console.error("Error fetching leagues:", error);
        }
    }

    fetchLeagues();
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditData({
      ...data,
      [name]: value
    });
  };


  return (
    <div className="z-50 ">
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
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg  text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form onSubmit={type=="add" ? handleAddSubmit : handleEditSubmit} className="bg-gray-800">
                    <div className="w-full flex flex-col justify-center  py-2 pl-2 bg-slate-900 rounded-se-md rounded-ss-md ">
                      <span className="flex justify-between pr-5">
                        <h1 className="font-semibold text-2xl text-red-600">{type == "add" ? "Add New Team" : "Edit Team"}</h1>
                        <IoClose
                          className="text-3xl cursor-pointer text-white"
                          onClick={() => setIsOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="px-4 mt-6 space-y-2">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Name
                      </label>
                      <div className="mt-2 ">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          value={data.name}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <label
                        htmlFor="logoLink"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Logo Link
                      </label>
                      <div className="mt-2 pb-">
                        <input
                          type="text"
                          name="logoLink"
                          id="logoLink"
                          value={data.logoLink}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <label
                        htmlFor="league"
                        className="block text-sm font-medium leading-6 text-white"
                        >
                        League
                    </label>
                    <div className="mt-2">
                        <select
                            name="league"
                            id="league"
                            value={data.league}
                            onChange={handleChange}
                            className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        >
                            <option value="">Select a league</option>
                            {Leagues.map((league) => (
                            <option key={league._id} value={league._id}>
                                {league.name}
                            </option>
                            ))}
                        </select>
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
export default TeamPopup