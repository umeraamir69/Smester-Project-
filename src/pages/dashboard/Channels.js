    import React, { Fragment , useRef, useEffect ,useState } from 'react'
    import User from '../../../models/User';
    import { getServerSession } from 'next-auth';
    import { authOptions } from '../api/auth/[...nextauth]';
    import { HiOutlineRefresh } from "react-icons/hi";
    import ChannelPopup from '../../../components/dashboard/ChannelPopup';
    import { FaRegEdit } from "react-icons/fa";
    import { HiUserAdd } from "react-icons/hi";
    import { MdDelete } from "react-icons/md";
    import Navbar from '../../../components/dashboard/Navbar';
    import Channel from '../../../models/Channel';
    import { toast } from 'react-toastify';

    const Channels = (props) => {
        const [data, setdata] = useState({_id : "" ,name: "" ,liveStreamLink:"" ,logoLink:"" , isAllowFree :false , isLive:false , otherHeaderLink:""}); 
        const [searchQuery, setSearchQuery] = useState('');
        const [filteredData, setFilteredData] = useState([]);
        const [popup, setpopup] = useState(false);
        const [editData, seteditData] = useState({_id : "" ,name: "" ,liveStreamLink:"" ,logoLink:"" , isAllowFree :false , isLive:false , otherHeaderLink:""}); 
        const [type, settype] = useState();
        const [isLive, setIsLive] = useState('true');
        const [allowFree, setAllowFree] = useState('true');
        const [sidebar, setsidebar] = useState(false)

        useEffect(() => {
        if(props.chanelData) 
            setdata(JSON.parse(props.chanelData))
            setFilteredData(JSON.parse(props.chanelData));
        }, []);

        useEffect(() => {
            if(data.length >0){
                if (isLive !== '' && allowFree !== '') {
                    // Filter data based on isLive and allowFree values
                    const filtered = data.filter(channel =>
                        channel.isLive == isLive && channel.isAllowFree == allowFree
                    );
                    setFilteredData(filtered);
                } else {
                    // Reset filtered data to original data if isLive and allowFree are empty
                    //toast here not found
                    setFilteredData(data);
                }
            }
        }, [isLive, allowFree, data]);

        useEffect(() => {
            if (searchQuery) {
                const filtered = data.filter(user =>
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) 
                );
                setFilteredData(filtered);
            } else {
                setFilteredData(data); // Set filtered data to original data when search query is empty
            }
        }, [searchQuery, data]);



        const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        };

        const handleIsLiveChange = (e) => {
            setIsLive(e.target.value);
        };
    
        const handleAllowFreeChange = (e) => {
            console.log(e.target.value)
            setAllowFree(e.target.value);
        };



        const handleUpdate = (data)=>{
        settype("update")
        seteditData(data)
        return setpopup(true);
        }


    const handleRefresh = async () => {
        try {
        const request = await fetch("/api/channel", {
            headers: {
            "Content-Type": "application/json",
            },
            method: "GET",
        });

        const resuelt = await request.json();
        if(resuelt.status){
            setdata(resuelt.data);
            setFilteredData(resuelt.data)
            setdata(resuelt.data);
            setFilteredData(resuelt.data)
            return toast.info("Refreshed", {
              position: "top-right",
              type:"success",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
          });
            
        }
        else{
            return toast.info("An Error Occurred", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }

        } catch (error) {
            return toast.info("An Error Occurred", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            });
        }
    };




    const handleEditSubmit = async (e) => {
        e.preventDefault()
        try {
        const request = await fetch("/api/channel", {
            headers: {
            "Content-Type": "application/json",
            },
            method: "PUT",
            body: JSON.stringify(editData)
        });

        const resuelt = await request.json();
        if(resuelt.status){
            toast.info("Edit Successfully", {
                position: "top-right",
                type:"success",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }); 
            handleRefresh();
            seteditData({_id : "" ,name: "",email: "",password: "",userType: "standard",isSuperUser: false}); 
            return setpopup(false);
        }
        else{
            toast.info("User Not Found", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }); 
            return
        } 

        } catch (error) {
            return toast.info("Error Occurred", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }); 
        }
    };


    const handleAddSubmit = async (e) => {
        e.preventDefault()
        try {
        const request = await fetch("/api/channel", {
            headers: {
            "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(editData)
        });

        const resuelt = await request.json();

        if(resuelt.status){
            toast.info("Added Successfully ", {
                position: "top-right",
                type:"success",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            })
            handleRefresh();
            seteditData({_id : "" ,name: "" ,liveStreamLink:"" ,logoLink:"" , isAllowFree :false , isLive:false , otherHeaderLink:""}); 
            return setpopup(false);
        }
        else{
            toast.info(resuelt.error, {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }) 
            return
        } 

        } catch (error) {
            return toast.info("Error Occurred", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }) 
        }
    };


        const handleAdd =(e)=>{
        settype("add")
        seteditData({_id : "" ,name: "" ,liveStreamLink:"" ,logoLink:"" , isAllowFree :false , isLive:false , otherHeaderLink:""}); 
        return setpopup(true);
        }


        const handelDelete = async (id)=>{
        try {
            const request = await fetch("/api/channel", {
            headers: {
                "Content-Type": "application/json",
            },
            method: "DELETE",
            body: JSON.stringify({id})
            });
    
            const resuelt = await request.json();
            console.log(resuelt)
            if(resuelt.status){
                toast.info("Deleted Successfully", {
                    position: "top-right",
                    type:"success",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                });
                handleRefresh();
                return
            }
            else{
                toast.info(resuelt.message, {
                    position: "top-right",
                    type:"error",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "dark",
                }); 
            return
            } 
    
        } catch (error) {
            return toast.info("An Error Occurred", {
                position: "top-right",
                type:"error",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "dark",
            }); 
        }
        }
        return (
            <div className='bg-[#191C24] h-screen'><Navbar sidebar={sidebar} setsidebar={setsidebar}/>
        <section  className={` p-3 sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}>
            <ChannelPopup isOpen={popup} setIsOpen={setpopup} data={editData}  seteditData={seteditData} type={type} handleEditSubmit={handleEditSubmit}  handleAddSubmit ={handleAddSubmit}/>
            <h1 className={`text-3xl font-bold  pb-5 text-red-600 ${sidebar == false ? "pl-5" : "pl-20"} `}>Channels</h1>
            <div className="mx-auto max-w-screen-xl px-4 ">
            <div className={`bg-[#1E1E2C]  shadow-md sm:rounded-lg overflow-hidden mx-auto  ${sidebar == false ? "" : "lg:ml-16"}`}>
                <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                    <div className="w-full md:w-1/2">
                        <form onSubmit={(e)=>e.preventDefault()} className="flex items-center text-gray-400">
                            <label for="simple-search" className="sr-only">Search</label>
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" className="w-5 h-5 " fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                    </svg>
                                </div>
                                <input type="text" id="simple-search" className="  text-sm rounded-lg  block w-full pl-10 p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white " placeholder="Search" value={searchQuery} onChange={handleSearch} required="" />
                            </div>
                        </form>
                    </div>
                    <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                    <HiOutlineRefresh  className='w-5 h-5 text-white cursor-pointer' onClick={handleRefresh}/>
                        <button  onClick={handleAdd} type="button" className="flex items-center justify-center text-white bg-blue-600 font-medium rounded-lg text-sm px-4 py-2  ">
                            <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                            </svg>
                            Add Channel
                        </button>

                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select onChange={handleIsLiveChange} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium  focus:outline-none rounded-lg border hover:text-primary-700 focus:z-10 focus:ring-4  bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"> 
                                <option selected disabled>Is Live?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-3 w-full md:w-auto">
                            <select onChange={handleAllowFreeChange} className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium  focus:outline-none rounded-lg border hover:text-primary-700    bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"> 
                                <option selected disabled>Allow Free?</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </select>
                        </div>

                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-400">
                        <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
                            <tr>
                                <th scope="col" className="px-4 py-3">Logo</th>
                                <th scope="col" className="px-4 py-3">Name</th>
                                <th scope="col" className="px-4 py-3">Stream Link</th>
                                <th scope="col" className="px-4 py-3">Headers</th>
                                <th scope="col" className="px-4 py-3">Allow Free</th>
                                <th scope="col" className="px-4 py-3">Live</th>
                                <th scope="col" className="px-4 py-3">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
    {filteredData.length > 0 ? (
        filteredData.map((data) => (
        <tr className="border-b border-gray-700" key={data._id}>
            <td className="px-4 py-3"><img  className=' rounded-full w-10 h-10' src={data.logoLink} alt="Logo Link" /></td>
            <th scope="row" className="px-4 py-3 font-medium whitespace-nowrap text-white">{data.name}</th>
            <td className="px-4 py-3">{data.liveStreamLink}</td>
            <td className="px-4 py-3">{data.otherHeaderLink.substring(0,20)}...</td>
            <td className="px-4 py-3">
            <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                checked={data.isAllowFree ? true : false} 
            />
            </td>
            <td className="px-4 py-3">
            <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                checked={data.isLive ? true : false} 
            />
            </td>
            <td className="px-4 py-5 flex items-center justify-end gap-x-2">
            <FaRegEdit className='w-5 h-5'  id=''    onClick={() => handleUpdate(data)} />

            <MdDelete className='w-5 h-5 text-red-600' onClick={() =>handelDelete(data._id)} />
            </td>
        </tr>
        ))
    ) : (data&& data.length >0 &&
        data.map((data) => (
            <tr className="border-b border-gray-700" key={data._id}>
            <td className="px-4 py-3"><img  className=' rounded-full w-10 h-10' src={data.logoLink} alt="Logo Link" /></td>
            <th scope="row" className="px-4 py-3 font-medium  whitespace-nowrap text-white">{data.name}</th>
            <td className="px-4 py-3">{data.liveStreamLink}</td>
            <td className="px-4 py-3">{data.otherHeaderLink.substring(0,20)}...</td>
            <td className="px-4 py-3">
            <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                checked={data.isAllowFree ? true : false} 
            />
            </td>
            <td className="px-4 py-3">
            <input 
                type="checkbox" 
                className="w-4 h-4 text-blue-600  rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                checked={data.isLive ? true : false} 
            />
            </td>
            <td className="px-4 py-5 flex items-center justify-end gap-x-2">
            <FaRegEdit className='w-5 h-5'  id=''    onClick={() => handleUpdate(data)} />

            <MdDelete className='w-5 h-5 text-red-600'     onClick={() =>handelDelete(data._id)} />
            </td>
        </tr>
        ))
    )}
    </tbody>

                    </table>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                    <span className="text-sm font-normal text-gray-400">
                        {filteredData && filteredData.length >0 ? "Search" : data ? "Total": '0' }
                        <span className="font-semibold text-white"> {filteredData && filteredData.length >0 ? filteredData.length : data ? data.length: '0' }</span>
                    </span>
                </div>
            </div>
            </div>
        </section>
        </div>
        )
    }

    export default Channels


    export async function getServerSideProps(context) {
        const session = await getServerSession(context.req, context.res, authOptions);
        if (!session) {
            return {
                redirect: {
                    destination: '/auth/Login',
                    permanent: false,
                },
            };
        } else {
            const user = await User.findOne({ "email": session.user.email });
            if (user && user.isSuperUser) {
                const chanels = await Channel.find()
                return {
                    props: {
                        chanelData: JSON.stringify(chanels)
                    },
                };
            }
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            };
        }
    }

