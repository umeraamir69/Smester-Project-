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

const Packages = (props) => {
    const [data, setdata] = useState({_id : "" ,name: "" ,description:"" , active :"" , currency:"" , ammount:"" ,interval:"" , interval_count:""});
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [popup, setpopup] = useState(false);
    const [editData, seteditData] = useState({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
    const [type, settype] = useState();

    useEffect(() => {
      if(props.packages) 
        setdata(JSON.parse(props.packages))
        setFilteredData(JSON.parse(props.packages));
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
console.log(e.target.value == 0 ? false : e.target.value == 1 ? true : "" )
      setSelectedType(e.target.value == 0 ? false : e.target.value == 1 ? true : "" );
    };

    const handleUpdate = (data)=>{
      settype("update")
      seteditData(data)
      return setpopup(true);
    }


  const handleRefresh = async () => {
    try {
      const request = await fetch("/api/stripe/packages", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const resuelt = await request.json();
      if(resuelt.status){
            setdata(resuelt.data);
            setFilteredData(resuelt.data)
            console.log("refreshed")
        //toast refreshed
      }
      else{
        console.log(resuelt)
        //toast error show error from resulet.message
      }

    } catch (error) {
      //hanlde error here byr toast
    }
  };



  const handleEditSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch("/api/stripe/packages", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(editData)
      });

      const resuelt = await request.json();
      if(resuelt.status){
          handleRefresh();
          //toast data added
          seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
          return setpopup(false);
      }
      else{
        //toast error show error from resulet.message and use 
        console.log(resuelt.error)
        return
      } 

    } catch (error) {
      //hanlde error here byr toast
      console.log(error)
    }
  };


  const handleAddSubmit = async (e) => {
    e.preventDefault()
    try {
      const request = await fetch("/api/stripe/packages", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(editData)
      });

      const resuelt = await request.json();
      if(resuelt.status){
          handleRefresh();
          //toast data added
          seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
          return setpopup(false);
      }
      else{
        //toast error show error from resulet.message and use 
        console.log(resuelt.error)
        return
      } 

    } catch (error) {
      //hanlde error here byr toast
      console.log(error)
    }
  };


    const handleAdd =(e)=>{
      settype("add")
      seteditData({_id : "" ,name: "" ,description:"" , active :false , currency:"USD" , ammount:"" ,interval:"day" , interval_count:1});
      setpopup(true);
    }


    const handelDelete = async (id)=>{
      try {
        console.log(id)
        const request = await fetch("/api/stripe/packages", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "DELETE",
          body: JSON.stringify({id})
        });
  
        const resuelt = await request.json();
        console.log(resuelt)
        if(resuelt.status){
            handleRefresh();
            //toast data added
            console.log("deleted")
            return
        }
        else{
          //toast error show error from resulet.message and use 
          console.log(resuelt.error)
          return
        } 
  
      } catch (error) {
        //hanlde error here byr toast
        console.log(error)
      }
    }



      return (
        <><Navbar/>
      <section className=" p-3 sm:p-5">
        <PackagePopup isOpen={popup} setIsOpen={setpopup} data={editData}  seteditData={seteditData} type={type} handleEditSubmit={handleEditSubmit}  handleAddSubmit ={handleAddSubmit}/>
        <div className="mx-auto max-w-screen-xl px-4 lg:px-12">
          <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form onSubmit={(e)=>e.preventDefault()} className="flex items-center">
                        <label for="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Search" value={searchQuery} onChange={handleSearch} required="" />
                        </div>
                    </form>
                </div>
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                <HiOutlineRefresh  className='w-5 h-5 dark:text-white cursor-pointer' onClick={handleRefresh}/>
                    <button  onClick={handleAdd} type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add Packages
                    </button>

                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <select  onChange={handleTypeChange}  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> 
                          <option selected >Select Type ?</option>
                          <option value="1" > Active</option>
                          <option value="0">Not Active</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Ammount</th>
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
      <tr className="border-b dark:border-gray-700" key={data._id}>
        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.name}</th>
        <td className="px-4 py-3">{data.ammount}</td>
        <td className="px-4 py-3">{data.currency}</td>
        <td className="px-4 py-3">{data.interval}</td>
        <td className="px-4 py-3">{data.interval_count}</td>
        <td className="px-4 py-3">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={data.active ? true : false} 
          />
        </td>
        <td className="px-4 py-3">{data.description.substring(0, 10)}...</td>
        <td className="px-4 py-3 flex items-center justify-end">
        <FaRegEdit className='w-5 h-5'  id=''    onClick={() => handleUpdate(data)} />

        <MdDelete className='w-5 h-5'     onClick={() =>handelDelete(data._id)} />
        </td>
      </tr>
    ))
  ) : (data&& data.length >0 &&
    data.map((data) => (
        <tr className="border-b dark:border-gray-700" key={data._id}>
        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.name}</th>
        <td className="px-4 py-3">{data.ammount}</td>
        <td className="px-4 py-3">{data.currency}</td>
        <td className="px-4 py-3">{data.interval}</td>
        <td className="px-4 py-3">{data.interval_count}</td>
        <td className="px-4 py-3">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={data.active ? true : false} 
          />
        </td>
        <td className="px-4 py-3">{data.description.substring(0, 10)}...</td>
        <td className="px-4 py-3 flex items-center justify-end">
        <FaRegEdit className='w-5 h-5'  id=''    onClick={() => handleUpdate(data)} />

        <MdDelete className='w-5 h-5'     onClick={() =>handelDelete(data._id)} />
        </td>
      </tr>
    ))
  )}
</tbody>

                </table>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4" aria-label="Table navigation">
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {filteredData && filteredData.length >0 ? "Search" : data ? "Total": '0' }
                    <span className="font-semibold text-gray-900 dark:text-white"> {filteredData && filteredData.length >0 ? filteredData.length : data ? data.length: '0' }</span>
                </span>
            </div>
          </div>
        </div>
      </section>
      </>
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
            console.log(data)
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

