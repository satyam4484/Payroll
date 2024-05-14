import React, { useEffect, useState } from 'react'
import { getCompanyById, getUserList, getUserProfile } from '../../api/apiUrl'
import { Filter, SearchIcon2 } from '../../ui/Icons'
import default_image from '../../assets/images/default_image.svg'
import MarkAttendance from './MarkAttendance'
import ViewPayroll from './ViewPayroll'
import Profile from './Profile'

const UsersList = () => {

  const [employees, setEmployees] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  const [companyDetails, setCompanyDetails] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [filteredSupervisors, setFilteredSupervisors] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showMarkAttendance, setShowMarkAttendance] = useState(false);
  const [showViewPayroll, setShowViewPayroll] = useState(false);

  const fetchEmployeeData = () => {
    getUserList().then((response) => {
      if (response.error === false) {
        // console.log(response.users)
        const { users } = response;
        // Filter employees and supervisors based on user_role
        const employees = users.filter(user => user.user_role === 'Employee');
        const supervisors = users.filter(user => user.user_role === 'Supervisor');
        setEmployees(employees);
        setSupervisors(supervisors);
      }
    });
  };

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  // Function to filter employees based on search query
  useEffect(() => {
    const filtered = employees.filter((employee) => {

      const { user_id, contact, company, name, email, date_of_birth, category, user_role } = employee;

      // Check if any field matches the search query
      return (
        user_role?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user_id?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        category?.category_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        contact?.includes(searchQuery) ||
        date_of_birth?.includes(searchQuery)
      );
    });

    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  // Function to filter supervisors based on search query
  useEffect(() => {
    const filtered = supervisors.filter((supervisor) => {

      const { user_id, contact, company, name, email, date_of_birth, category, user_role } = supervisor;

      // Check if any field matches the search query
      return (
        user_role?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        user_id?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        name?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        category?.category_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        email?.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
        contact?.includes(searchQuery) ||
        date_of_birth?.includes(searchQuery)
      );
    });

    setFilteredSupervisors(filtered);
  }, [searchQuery, supervisors]);

  // Function to handle user card click and set the selected user
  const handleUserCardClick = (user) => {
    if (!showProfile && !showMarkAttendance && !showViewPayroll) {
      const userId = user.user_id

      getUserProfile(userId).then((response) => {
        if (response.error === false) {
          // console.log(response.user)
          setSelectedUser(response.user);

          // Fetch company details
          const companyId = response.user?.company._id
          if (companyId) {
            getCompanyById(companyId).then((companyResponse) => {
              if (companyResponse.error === false) {
                // console.log(companyResponse.company)
                setCompanyDetails(companyResponse.company);
              }
            });
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    }
    // setSelectedUser(user);
  };

  // Close employee details
  const handleBackToEmployeeList = () => {
    setSelectedUser(null);
    setShowProfile(false);
    setShowMarkAttendance(false);
    setShowViewPayroll(false);
    // fetchEmployeeData();
  };

  // Function to format date of birth
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    date.setMinutes(date.getMinutes() - 5.5 * 60);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return dateString ? `${day}/${month}/${year}` : '-';
  };

  useEffect(() => {
    if (selectedUser === null) {
      // Update employees when going back to the employee list
      fetchEmployeeData();
    }
  }, [selectedUser]);

  return (
    <div>
      {selectedUser ? (
        <>
          {showProfile && <Profile user={selectedUser} companyDetails={companyDetails} onBack={handleBackToEmployeeList} formatDate={formatDate} />}
          {showMarkAttendance && <MarkAttendance user={selectedUser} />}
          {showViewPayroll && <ViewPayroll />}
        </>
      ) : (
        <>
          <h1 className='text-center uppercase font-semibold text-2xl pb-4 poppins'>Employee Details</h1>

          <div className='flex justify-between'>

            {/* Search input */}
            <div className="flex items-center w-full relative">
              <div className='ml-3 mr-2 absolute'>
                <SearchIcon2 />
              </div>
              <input
                type="search"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-black rounded-lg  w-[69.25rem] outline-none bg-transparent focus:border-blue-500 plusJakartaSans placeholder:text-black placeholder:text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

          </div>

          <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1'>
            <p className='text-2xl font-bold plusJakartaSans capitalize mt-4'>
              Employees
            </p>

            {filteredEmployees.length === 0 && (
              <div className='flex justify-center my-4'>
                <p className='text-red-500 font-semibold capitalize poppins'>Employee Not Found!</p>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 my-8 gap-x-8 gap-y-4 place-items-center'>

              {
                filteredEmployees.map((item, index) => {
                  {/* console.log(item) */ }
                  const { _id, user_id, name, email, profile_pic, user_role, contact, company, category, date_of_birth } = item
                  const profilePic = profile_pic === 'profile_pic_url' || profile_pic === '' ? default_image : profile_pic

                  return (
                    <div
                      key={_id}
                      className='border border-[#2F80EF] rounded-[2.5rem] px-6 py-4 mb-4 w-full h-full text-xs bg-white shadow-lg cursor-pointer'
                      onClick={() => { handleUserCardClick(item); }}
                    >

                      <div className='flex justify-between items-center pb-2'>
                        <p className='mr-2'>
                          <span className='text-lg uppercase font-bold plusJakartaSans'>{name}</span>{" "}
                          <span className='font-medium plusJakartaSans'>({user_role ? user_role : 'Guest'})</span>
                        </p>
                        <img src={profilePic} alt="profile" className='rounded-[3.75rem] ring-1 ring-[#2F80EF] ring-offset-2 w-14 h-14 object-cover drop-shadow-md text-xs' />
                      </div>
                      <div className='leading-relaxed'>
                        <p className='inter'> <span className='font-bold inter'>User ID : </span> {user_id}</p>
                        <p className='inter'> <span className='font-bold inter'>DOB : </span>
                          {formatDate(date_of_birth) || '-'}
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Contact No : </span>
                          {contact || '-'}
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Email ID : </span>
                          <span className='lowercase '>{email || '-'}</span>
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Company : </span>
                          <span className='capitalize'>{company || '-'}</span>
                        </p>
                        <p className='inter'> <span className='font-bold inter'>Category : </span>
                          <span className='capitalize'>{category?.category_name || '-'}</span>
                        </p>
                      </div>
                      <div className='flex justify-between mt-2'>
                        <button className='p-1 rounded-lg text-xs font-medium border border-lime-500 outline-none text-lime-800 hover:bg-lime-500 hover:text-white' onClick={() => setShowProfile(true)}>View Profile</button>

                        <button className='p-1 rounded-lg text-xs font-medium plus-jkrt border border-deep-orange-400 outline-none text-deep-orange-400 hover:bg-deep-orange-400 hover:text-white' onClick={() => setShowMarkAttendance(true)}>Mark attendance</button>

                        <button className='p-1 rounded-lg text-xs font-medium plus-jkrt border border-indigo-400 outline-none text-indigo-400 hover:bg-indigo-400 hover:text-white' onClick={() => setShowViewPayroll(true)}>View Payroll</button>
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <p className='text-2xl font-bold plusJakartaSans capitalize'>
              Supervisors
            </p>

            {filteredSupervisors.length === 0 && (
              <div className='flex justify-center my-4'>
                <p className='text-red-500 font-semibold capitalize poppins'>Supervisor Not Found!</p>
              </div>
            )}

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 my-8 gap-x-8 gap-y-4 place-items-center'>

              {
                filteredSupervisors.map((item, index) => {
                  {/* console.log(item) */ }
                  const { _id, user_id, name, email, profile_pic, user_role, contact, company, category, date_of_birth } = item
                  const profilePic = profile_pic === '' || profile_pic === 'profile_pic_url' ? default_image : profile_pic;

                  return (
                    <div
                      key={_id}
                      className='border border-[#2F80EF] rounded-[2.5rem] px-6 py-4 mb-4 w-full h-full text-xs bg-white shadow-lg cursor-pointer'
                      onClick={() => handleUserCardClick(item)}
                    >

                      <div className='flex justify-between items-center pb-2 space-x-4'>
                        <p>
                          <span className='text-lg uppercase font-bold plusJakartaSans'>{name}</span>{" "}
                          <span className='font-medium plusJakartaSans'>({user_role === 'Employee' ? 'Supervisor' : user_role})</span>
                        </p>
                        <img src={profilePic} alt="profile" className='rounded-[3.75rem] ring-1 ring-[#2F80EF] ring-offset-2 w-14 h-14 object-cover drop-shadow-md text-xs' />
                      </div>
                      <div className='leading-relaxed'>
                        <p className='inter'> <span className='font-bold inter'>User ID - </span> {user_id}</p>
                        <p className='inter'> <span className='font-bold inter'>DOB - </span>{formatDate(date_of_birth) || '-'}</p>
                        <p className='inter'> <span className='font-bold inter'>Contact No - </span> {contact || '-'}</p>
                        <p className='inter'> <span className='font-bold inter'>Email ID - </span><span className='lowercase '>{email || '-'}</span> </p>
                        <p className='inter'> <span className='font-bold inter'>Company - </span><span className='capitalize'>{company || '-'}</span> </p>
                        <p className='inter'> <span className='font-bold inter'>Category : </span>
                          <span className='capitalize'>{category?.category_name || '-'}</span>
                        </p>
                      </div>
                    </div>
                  )
                })
              }
            </div>

          </div>
        </>
      )}

    </div>
  )
}

export default UsersList
