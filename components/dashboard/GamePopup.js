import React, { Fragment, useRef, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";

const GamePopup = ({
  isOpen,
  setIsOpen,
  data,
  type,
  seteditData,
  handleEditSubmit,
  handleAddSubmit,
  Teams,
  Leagues,
  Channels,
}) => {
  const cancelButtonRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [localMatchDate, setLocalMatchDate] = useState("");

  useEffect(() => {
    if (type === "update" && data && data.matchDate) {
      const date = new Date(data.matchDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      setLocalMatchDate(`${year}-${month}-${day}T${hours}:${minutes}`);
    }
  }, []);

  useEffect(() => {
    if (type === "update") {
      seteditData((prevData) => ({
        ...prevData,
        matchDate: localMatchDate,
      }));
    }
  }, [localMatchDate, seteditData, type]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    seteditData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChannelSelect = (channelId) => {
    seteditData((prevData) => {
      const selectedChannels = Array.isArray(prevData.channel) ? [...prevData.channel] : [];
      const index = selectedChannels.findIndex((ch) => ch._id === channelId);

      if (index === -1) {
        const channel = Channels.find((ch) => ch._id === channelId);
        selectedChannels.push(channel);
      } else {
        selectedChannels.splice(index, 1);
      }

      return {
        ...prevData,
        channel: selectedChannels,
      };
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredChannels = Channels.filter((channel) =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <form
                    onSubmit={type === "add" ? handleAddSubmit : handleEditSubmit}
                    className="bg-gray-800"
                  >
                    <div className="w-full flex flex-col justify-center py-2 pl-2 bg-slate-900 rounded-se-md rounded-ss-md">
                      <span className="flex justify-between pr-5">
                        <h1 className="font-semibold text-2xl text-red-600">
                          {type === "add" ? "Add New Game" : "Edit Game"}
                        </h1>
                        <IoClose
                          className="text-3xl cursor-pointer text-white"
                          onClick={() => setIsOpen(false)}
                        />
                      </span>
                    </div>
                    <div className="px-4 mt-6 space-y-2 pb-4 border-slate-300 border-b">
                      <h3 className="text-slate-300 text-center">Teams Data</h3>
                      <div className="mt-2">
                        <select
                          name="teamOne"
                          id="teamOne"
                          value={data.teamOne}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Team One</option>
                          {Teams.map((team) => (
                            <option key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <label className="block text-sm text-center font-medium leading-6 text-white">
                        VS
                      </label>
                      <div className="mt-2">
                        <select
                          name="teamTwo"
                          id="teamTwo"
                          value={data.teamTwo}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        >
                          <option value="">Select Team Two</option>
                          {Teams.map((team) => (
                            <option key={team._id} value={team._id}>
                              {team.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="px-4 mt-6 space-y-2 pb-4 border-slate-300 border-b">
                      <h3 className="text-slate-300 text-center">League Data</h3>
                      <label htmlFor="league" className="block text-sm font-medium leading-6 text-white">
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
                          <option value="">Select League</option>
                          {Leagues &&
                            Leagues.map((league) => (
                              <option key={league._id} value={league._id}>
                                {league.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="px-4 mt-6 space-y-2 pb-4 border-slate-300 border-b">
                      <h3 className="text-slate-300 text-center">Channels</h3>
                      <label
                        htmlFor="channelSearch"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Search Channels
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="channelSearch"
                          id="channelSearch"
                          value={searchTerm}
                          onChange={handleSearchChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="mt-2">
                        <div className="space-y-1">
                          {filteredChannels.map((channel) => {
                            const isSelected = Array.isArray(data.channel) && data.channel.some((ch) => ch._id === channel._id);
                            return (
                              <div
                                key={channel._id}
                                className={`flex justify-between items-center px-3 py-1.5 rounded-md cursor-pointer ${
                                  isSelected ? "bg-green-800 text-green-200" : "text-gray-300"
                                }`}
                                onClick={() => handleChannelSelect(channel._id)}
                              >
                                <span>{channel.name}</span>
                                {isSelected && <IoIosCloseCircle className="text-lg" />}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="px-4 mt-6 space-y-2 pb-4 border-slate-300 border-b">
                      <h3 className="text-slate-300 text-center">Game Data</h3>
                      <label htmlFor="matchDate" className="block text-sm font-medium leading-6 text-white">
                        Date & Time
                      </label>
                      <div className="mt-2">
                        <input
                          type="datetime-local"
                          name="matchDate"
                          id="matchDate"
                          value={type === "update" ? localMatchDate : data.matchDate}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label htmlFor="venue" className="block text-sm font-medium leading-6 text-white">
                        Venue
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="venue"
                          id="venue"
                          value={data.venue}
                          required
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="px-4 mt-6 space-y-2 pb-4 border-slate-300 border-b">
                      <h3 className="text-slate-300 text-center">Links</h3>
                      <label htmlFor="posterLink" className="block text-sm font-medium leading-6 text-white">
                        Poster Link
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="posterLink"
                          id="posterLink"
                          value={data.posterLink}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label htmlFor="additionalLinks" className="block text-sm font-medium leading-6 text-white">
                        Additional Links
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="additionalLinks"
                          id="additionalLinks"
                          value={data.additionalLinks}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <label htmlFor="additionalLinks" className="block text-sm font-medium leading-6 text-white">
                        Additional Links
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="additionalLinks"
                          id="additionalLinks"
                          value={data.additionalLinks}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>

                      <label
                        htmlFor="additionalHeaderLink"
                        className="block text-sm font-medium leading-6 text-white"
                      >
                        Additional Header Link{" "}
                      </label>
                      <div className="mt-2">
                        <textarea
                          type="text"
                          name="additionalHeaderLink"
                          id="additionalHeaderLink"
                          value={data.additionalHeaderLink}
                          onChange={handleChange}
                          className="block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="flex gap-x-4">
                        <div className="flex flex-col justify-end">
                          <div className="flex gap-x-2 items-center">
                            <label htmlFor="isLive" className="block text-sm font-medium leading-6 text-white">
                              Live
                            </label>
                            <input
                              id="isLive"
                              type="checkbox"
                              name="isLive"
                              checked={data.isLive}
                              onChange={handleChange}
                              className="w-4 h-4 mr-3"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center gap-x-4 mt-4 pb-8">
                      <button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded-md">
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

export default GamePopup;
