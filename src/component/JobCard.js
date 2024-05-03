import React from "react"
import logo from "../assets/joblogo.jpg"
import BoltIcon from '@mui/icons-material/Bolt';

export const JobCard = ({companyName, jdLink, jdUid, jobDetailsFromCompany, jobRole, location, logoUrl, maxExp, maxJdSalary, minExp, salaryCurrencyCode, minJdSalary}) => {
    return (
        <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm m-4">
                <div className="p-4">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-400 mr-2">
                        Posted 14 days ago
                    </span>

                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7"> <img src={logoUrl} alt="job-logo"/></div>
                    <div className="mt-2">
                        <p className="text-gray-500 font-medium">{companyName}</p>
                        <p className="text-gray-700">{jobRole}</p>
                        <p className="text-gray-500 text-xs">{location}</p>
                    </div>
                    </div>
                    
                    <div className="mt-4">
                        <span className="text-sm text-gray-500">Estimated Salary: {salaryCurrencyCode} {minJdSalary} - {maxJdSalary} LPA  ✅</span>
                    </div>
                </div>
                <div className="p-4 border-t border-gray-200 text-sm text-gray-500 ">
                    <div>
                        <h6 className="font-medium">About Company</h6>
                        <p className="mb-4">
                            {jobDetailsFromCompany}
                        </p>
                    </div>
                    <span className=" text-gray-500  font-medium">Experience: </span>
                    <br/>
                    <span className=" text-gray-500  ">{minExp} years - {maxExp} years</span>
                    <div className="mt-4 ">
                        <button  className="inline-flex items-center px-4 py-2 bg-green-400  rounded-md w-full justify-center hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700">
                        <BoltIcon className="text-yellow-600"/> 
                        <span className="font-medium">Easy Apply</span> 
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}