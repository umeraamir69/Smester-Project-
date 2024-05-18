import React, { Fragment , useRef, useEffect ,useState } from 'react'
import User from '../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { HiOutlineRefresh } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import LeaguePopup from '../../../components/dashboard/LeaguePopup';
import { MdDelete } from "react-icons/md";
import Navbar from '../../../components/dashboard/Navbar';
import Leagues from '../../../models/Leagues';
import { toast } from 'react-toastify';
import Loader from '../../../components/universal/Loader';
const Users = (props) => {
    const [data, setdata] = useState({_id : "" ,name: "" ,logoLink:""});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [popup, setpopup] = useState(false);
    const [editData, seteditData] = useState({_id : "" ,name: "" ,logoLink:""});
    const [type, settype] = useState();
    const [sidebar, setsidebar] = useState(false)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if(props.leagueData) 
        setdata(JSON.parse(props.leagueData))
      setFilteredData(JSON.parse(props.leagueData));
      setLoading(false);
    }, [props]);

    useEffect(() => {
      if (searchQuery) {
        const filtered = data.filter(league =>
            league.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, [searchQuery, data]);
    
    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    const handleUpdate = (data)=>{
      settype("update")
      seteditData(data)
      return setpopup(true);
    }

    const handleRefresh = async () => {
        try {
          setLoading(true);
        const request = await fetch("/api/leagues", {
            headers: {
            "Content-Type": "application/json",
            },
            method: "GET",
        });
        setLoading(false);
        const resuelt = await request.json();
        if(resuelt.status){
            setdata(resuelt.data);
            setFilteredData(resuelt.data)
            toast.info("Refreshed", {
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
            toast.info("An Error Occurred", {
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
          toast.info("An Error Occurred", {
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
      setLoading(true);
      const request = await fetch("/api/leagues", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(editData)
      });
      setLoading(false);
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
          seteditData({_id : "" ,name: "" ,logoLink:""});

          return setpopup(false);
      }
      else{
        toast.info("League Not Found", {
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
      toast.info("Error Occurred", {
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
      setLoading(true);
      const request = await fetch("/api/leagues", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(editData)
      });
      setLoading(false);
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
          seteditData({_id : "" ,name: "" ,logoLink:""});
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
      toast.info("Error Occurred", {
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
      seteditData({_id : "" ,name: "" ,logoLink:""});
      setpopup(true);
    }


    const handelDelete = async (id)=>{
      try {
        setLoading(true);
        const request = await fetch("/api/leagues", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({id})
        });
        setLoading(false);
        const resuelt = await request.json();
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
        toast.info("An Error Occurred", {
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
        <div>
          { loading ? <Loader/> :
        <div className='bg-[#191C24]'><Navbar  sidebar={sidebar} setsidebar={setsidebar}/>
      <section className={` sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}>
        <LeaguePopup isOpen={popup} setIsOpen={setpopup} data={editData}  seteditData={seteditData} type={type} handleEditSubmit={handleEditSubmit}  handleAddSubmit ={handleAddSubmit}/>
        <h1 className={`text-3xl font-bold  pb-5 text-red-600 ${sidebar == false ? "pl-5" : "pl-20"} `}>Leagues</h1>
        <div className="mx-auto max-w-screen-xl px-4">
          <div className={`bg-[#1E1E2C]  shadow-md sm:rounded-lg overflow-hidden mx-auto  ${sidebar == false ? "" : "lg:ml-16"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex justify-between sm:grid gap-x-6 sm:gap-x-0 w-full md:w-1/2">
                    <form onSubmit={(e)=>e.preventDefault()} className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className=" border text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Search" value={searchQuery} onChange={handleSearch} required="" />
                        </div>
                    </form>
                    <HiOutlineRefresh  className='w-5 h-5 text-white cursor-pointer mt-2 sm:hidden' onClick={handleRefresh}/>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <HiOutlineRefresh  className='w-5 h-5 text-white cursor-pointer hidden sm:flex' onClick={handleRefresh}/>
                    <button  onClick={handleAdd} type="button" className="flex items-center justify-center text-white  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 ">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add League
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs  uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Logo</th>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData && filteredData.length > 0 ? (
                            filteredData.map((data) => (
                            <tr className="border-b border-gray-700" key={data._id}>
                                <td className="px-4 py-3"><img  className="w-10 h-10 rounded-md" src={data.logoLink}/></td>
                                <th scope="row" className="px-4 py-3 font-medium  whitespace-nowrap text-white">{data.name}</th>

                                <td className="px-4 py-5 flex items-center justify-end gap-x-2">
                                <FaRegEdit className='w-5 h-5' onClick={() => handleUpdate(data)} />
                                <MdDelete className='w-5 h-5 text-red-600' onClick={() =>handelDelete(data._id)} />
                                </td>
                            </tr>
                            ))
                        ) : (data&& data.length >0 &&
                            data.map((data) => (
                                <tr className="border-b border-gray-700" key={data._id}>
                                <td className="px-4 py-3"><img  className="w-10 h-10 rounded-md" src={data.logoLink}/></td>
                                <th scope="row" className="px-4 py-3 font-medium  whitespace-nowrap text-white">{data.name}</th>
                                <td className="px-4 py-3 flex items-center justify-end gap-x-2">
                                <FaRegEdit className='w-5 h-5' onClick={() => handleUpdate(data)} />
                                <MdDelete className='w-5 h-5 text-red-600' onClick={() =>handelDelete(data._id)} />
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
                    <span className="font-semibold  text-white"> {filteredData && filteredData.length >0 ? filteredData.length : data ? data.length: '0' }</span>
                </span>
            </div>
          </div>
        </div>
      </section>
      </div>}
      </div>
    )
  }

  export default Users


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
            const data = await Leagues.find()
              return {
                  props: {
                      leagueData: JSON.stringify(data)
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

