//import { useSelector } from "react-redux"
import { MdLogout, MdSearch } from "react-icons/md";
import { Input } from "@nextui-org/react";
import stuverse from "../../assets/stuverse.png"
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
export const JobHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  //const authState = useSelector((state) => state.auth)
  return (
    <div className="flex flex-col px-3 mb-6 ">
      <nav className="flex justify-center shadow-lg fixed top-0 left-0 right-0 z-50 bg-gray-900">
        <div className="flex-1"></div>

        <div className="flex-1 flex justify-center">
          <img src={stuverse} alt="logo" className="w-16 h-16" />
        </div>

        <div className="flex-1 flex justify-end">
          <MdLogout
            size={30}
            className="ml-4 mt-4"
            onClick={() => {
              navigate("/login");
              dispatch(logout());
            }}
          />
        </div>
      </nav>
      <div className="flex flex-col text-4xl mt-24 mb-5 font-bold font-mono">
        <h1>Find Your Dream</h1>
        <h1>Job with Us</h1>
      </div>
      <Input
        isClearable
        startContent={<MdSearch size={25} />}
        // onChange={(e) => setSearchTerm(e.target.value)}
        variant="bordered"
        size="lg"
        placeholder="Search jobs here...."
      />
      <h1 className="text-2xl mt-8 font-bold">Featured Jobs</h1>
      {/* {jobState.jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))} */}
    </div>
  )
}


