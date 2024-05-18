import React, { Fragment , useRef, useEffect ,useState } from 'react'
import User from '../../../models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import { HiOutlineRefresh } from "react-icons/hi";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from '../../../components/dashboard/Navbar';
import Package from '../../../models/Package';
import PackagePopup from '../../../components/dashboard/PackagePopup';
import { toast } from 'react-toastify';
import Loader from '../../../components/universal/Loader';
const Packages = (props) => {
    const [data, setdata] = useState({_id : "" ,name: "" ,description:"" , active :"" , currency:"" , ammount:"" ,interval:"" , interval_count:""});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [popup, setpopup] = useState(false);
    const [editData, seteditData] = useState({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
    const [type, settype] = useState();
    const [sidebar, setsidebar] = useState(false)
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if(props.packages) 
        setdata(JSON.parse(props.packages))
        setFilteredData(JSON.parse(props.packages));
        setLoading(false);
    }, [props]);


    useEffect(() => {
      if (searchQuery) {
        const filtered = data.filter(datas =>
            datas.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            datas.description.toLowerCase().includes(searchQuery.toLowerCase()) 
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, [searchQuery, data]);

    useEffect(() => {
        if (selectedType ) {
          const filtered = data.filter(user => user.active == selectedType );
          
          setFilteredData(filtered);
        } else {
          setFilteredData(data);
        }
      }, [selectedType, data]);
    

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    const handleTypeChange = (e) => {
      setSelectedType(e.target.value == 0 ? false : e.target.value == 1 ? true : "" );
    };

    const handleUpdate = (data)=>{
      settype("update")
      seteditData(data)
      return setpopup(true);
    }


  const handleRefresh = async () => {
    try {
      setLoading(true);
      const request = await fetch("/api/stripe/packages", {
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
      setLoading(true);
      const request = await fetch("/api/stripe/packages", {
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
          seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
          return setpopup(false);
      }
      else{
        toast.info("Package Not Found", {
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
      setLoading(true);
      const request = await fetch("/api/stripe/packages", {
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
          seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
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
      seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
      setpopup(true);
    }


    const handelDelete = async (id)=>{
      try {
        setLoading(true);
        const request = await fetch("/api/stripe/packages", {
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
          {loading ?<Loader/> :
        <div className='bg-[#191C24] min-h-screen '><Navbar sidebar={sidebar} setsidebar={setsidebar}/>
      <section className={` p-3 sm:p-5  ${sidebar == false ? "ml-0" : "lg:ml-48"}`}>
        <PackagePopup isOpen={popup} setIsOpen={setpopup} data={editData}  seteditData={seteditData} type={type} handleEditSubmit={handleEditSubmit}  handleAddSubmit ={handleAddSubmit}/>
        <h1 className={`text-3xl font-bold  pb-5 text-red-600 ${sidebar == false ? "pl-5" : "pl-20"} `}>Packages</h1>
        <div className="mx-auto max-w-screen-xl px-4 ">
          <div className={`bg-[#1E1E2C]  shadow-md sm:rounded-lg overflow-hidden mx-auto  ${sidebar == false ? "" : "lg:ml-16"}`}>
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="flex justify-between gap-x-6 sm:gap-x-0 sm:grid w-full md:w-1/2">
                    <form onSubmit={(e)=>e.preventDefault()} className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5  text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className=" border   text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-primary-500 focus:border-primary-500" placeholder="Search" value={searchQuery} onChange={handleSearch} required="" />
                        </div>
                    </form>
                    <HiOutlineRefresh  className='w-5 h-5 text-white cursor-pointer mt-2 sm:hidden' onClick={handleRefresh}/>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <HiOutlineRefresh  className='w-5 h-5 text-white cursor-pointer hidden sm:flex' onClick={handleRefresh}/>
                    <button  onClick={handleAdd} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 bg-blue-600">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Packages
                    </button>

                    <div className="flex items-center space-x-3 w-full md:w-auto pt-3 pb-4">
                        <select  onChange={handleTypeChange}  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium  focus:outline-none  rounded-lg border  hover:text-primary-700 focus:z-10 focus:ring-4  focus:ring-gray-700 bg-gray-800 text-gray-400 border-gray-600 hover:text-white hover:bg-gray-700"> 
                          <option  >Select Type ?</option>
                          <option value="1" > Active</option>
                          <option value="0">Not Active</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-400">
                    <thead className="text-xs  uppercase  bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Amount</th>
                            <th scope="col" className="px-4 py-3">Currency</th>
                            <th scope="col" className="px-4 py-3">Interval</th>
                            <th scope="col" className="px-4 py-3">Int. Count</th>
                            <th scope="col" className="px-4 py-3">Active</th>
                            <th scope="col" className="px-4 py-3">Description</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
  {filteredData && filteredData.length > 0 ? (
    filteredData.map((data) => (
      <tr className="border-b border-gray-700" key={data._id}>
        <th scope="row" className="px-4 py-3 font-medium  whitespace-nowraptext-white">{data.name}</th>
        <td className="px-4 py-3">{data.ammount}</td>
        <td className="px-4 py-3">{data.currency}</td>
        <td className="px-4 py-3">{data.interval}</td>
        <td className="px-4 py-3">{data.interval_count}</td>
        <td className="px-4 py-3">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            checked={data.active ? true : false} 
            onChange={() => {}}
          />
        </td>
        <td className="px-4 py-3">{data.description.substring(0, 10)}...</td>
        <td className="px-4 py-3 flex items-center justify-end gap-x-2">
        <FaRegEdit className='w-5 h-5'  id=''    onClick={() => handleUpdate(data)} />

        <MdDelete className='w-5 h-5 text-red-600'     onClick={() =>handelDelete(data._id)} />
        </td>
      </tr>
    ))
  ) : (data&& data.length >0 &&
    data.map((data) => (
        <tr className="border-b border-gray-700" key={data._id}>
        <th scope="row" className="px-4 py-3 font-medium  whitespace-nowrap text-white">{data.name}</th>
        <td className="px-4 py-3">{data.ammount}</td>
        <td className="px-4 py-3">{data.currency}</td>
        <td className="px-4 py-3">{data.interval}</td>
        <td className="px-4 py-3">{data.interval_count}</td>
        <td className="px-4 py-3">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 rounded  focus:ring-blue-600 ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
            checked={data.active ? true : false} 
            onChange={() => {}}
          />
        </td>
        <td className="px-4 py-3">{data.description.substring(0, 10)}...</td>
        <td className="px-4 py-3 flex items-center justify-end gap-x-2">
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
      </div>}
      </div>
    )
  }

  export default Packages

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
            const data = await Package.find()
              return {
                  props: {
                      packages: JSON.stringify(data)
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

