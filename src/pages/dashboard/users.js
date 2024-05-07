  import React, { useEffect ,useState } from 'react'
  import User from '../../../models/User';
  import { getServerSession } from 'next-auth';
  import { authOptions } from '../api/auth/[...nextauth]';
  import { HiOutlineRefresh } from "react-icons/hi";

  const Users = (props) => {
    const [data, setdata] = useState();
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
      if(props.userData) 
        setdata(JSON.parse(props.userData))
    }, [props]);


    useEffect(() => {
      if (searchQuery) {
        const filtered = data.filter(user =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, [searchQuery, data]);


    useEffect(() => {
      if (selectedType ) {
        const filtered = data.filter(user => user.userType === selectedType );
        
        setFilteredData(filtered);
      } else {
        setFilteredData(data);
      }
    }, [selectedType, data]);
    

    const handleSearch = (e) => {
      setSearchQuery(e.target.value);
    };

    const handleTypeChange = (e) => {
      setSelectedType(e.target.value);
    };


  const handleRefresh = async () => {
    try {
      const request = await fetch("/api/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "GET",
      });

      const resuelt = await request.json();
      if(request.res){
        setdata(resuelt.data);
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

    return (
      <section className=" p-3 sm:p-5">
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
                    <button type="button" className="flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                        <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path clip-rule="evenodd" fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                        </svg>
                        Add User
                    </button>

                    <div className="flex items-center space-x-3 w-full md:w-auto">
                        <select  onChange={handleTypeChange}  className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"> 
                          <option selected >Select Type</option>
                          <option value="standard">Standard</option>
                          <option value="premium">Premium</option>
                        </select>
                    </div>

                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-4 py-3">Name</th>
                            <th scope="col" className="px-4 py-3">Email</th>
                            <th scope="col" className="px-4 py-3">Type</th>
                            <th scope="col" className="px-4 py-3">Admin</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData&&
                        filteredData.map((data)=>(
                          <tr className="border-b dark:border-gray-700" key={data._id}>
                          <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">{data.name}</th>
                          <td className="px-4 py-3">{data.email}</td>
                          <td className="px-4 py-3">{data.userType}</td>
                          <td className="px-4 py-3">
                          <input 
                          type="checkbox" 
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          checked={data.isSuperUser ? true : false} 
                          />
                          </td>
                          <td className="px-4 py-3 flex items-center justify-end">
                              <button id="apple-imac-27-dropdown-button" data-dropdown-toggle="apple-imac-27-dropdown" className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100" type="button">
                                  <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                  </svg>
                              </button>
                              <div id="apple-imac-27-dropdown" className="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                  <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="apple-imac-27-dropdown-button">
                                      <li>
                                          <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Show</a>
                                      </li>
                                      <li>
                                          <a href="#" className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                      </li>
                                  </ul>
                                  <div className="py-1">
                                      <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</a>
                                  </div>
                              </div>
                          </td>
                      </tr>))}
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
            const userData = await User.find();
              return {
                  props: {
                      userData: JSON.stringify(userData)
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

