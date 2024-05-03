import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { JobCard } from "../component/JobCard";
import { FilterComponent } from "../component/FilterComponent";
import { fetchJobData } from "../redux/Slices/jobSlice";
import Loader from "../component/Loader";

export const LandingPage = () => {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [selectedCTC, setSelectedCtc] = useState("");
  const [selectedExperience, setSelectedExperience] = useState("");
  const [searchString, setSearchString] = useState("")
  const [isBottom, setIsBottom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { jobData, status } = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(6) 
  console.log(selectedExperience, 'selected roles')
  // Initialize updatedData with jobData
  //   const [updatedData, setUpdatedData] = useState(jobData);

  useEffect(() => {
    dispatch(fetchJobData(limit));
  }, [dispatch, limit]);

    // useEffect(() => {
    //   // Update updatedData when jobData changes
    //   setUpdatedData(jobData);
    // }, [jobData]);
    // console.log(updatedData);

  useEffect(() => {
    // Scroll event listener
    const handleScroll = () => {
      const scrollTop =
        (document.documentElement && document.documentElement.scrollTop) ||
        document.body.scrollTop;
      const scrollHeight =
        (document.documentElement && document.documentElement.scrollHeight) ||
        document.body.scrollHeight;
      const clientHeight =
        document.documentElement.clientHeight || window.innerHeight;
      const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;
      setIsBottom(scrolledToBottom);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // Fetch more data when scrolled to bottom
    if (isBottom && !isLoading) {
      setIsLoading(true);
      dispatch(fetchJobData(limit + 3))
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [isBottom, dispatch, limit, isLoading]);


  function filterJobs(jobs) {
    let filteredJobs = [...jobs];

    // Filter by cities
    if (selectedCities.length > 0) {
      filteredJobs = filteredJobs.filter(job => selectedCities.includes(job.location));
    }

    // Filter by Roles
    if (selectedRoles.length > 0) {
      filteredJobs = filteredJobs.filter(job => selectedRoles.includes(job.jobRole));
    }

    //filter by ctc 
    if (selectedCTC) {
      filteredJobs = filteredJobs.filter(job => selectedCTC <= job?.minJdSalary)
    }

    //filter by ctc 
    if (selectedExperience) {
      filteredJobs = filteredJobs.filter(job => job?.minExp <= selectedExperience && job?.maxExp >= selectedExperience)
    }

    //searching 
    if (searchString) {
      filteredJobs = filteredJobs.filter(job => job?.companyName?.toLowerCase()?.includes(searchString?.toLowerCase()))
    }
    return filteredJobs;
  }


  return (
    <>
      <FilterComponent
        setSelectedCities={setSelectedCities}
        selectedCities={selectedCities}
        selectedRoles={selectedRoles}
        setSelectedRoles={setSelectedRoles}
        selectedCTC={selectedCTC}
        setSelectedCtc={setSelectedCtc}
        selectedExperience={selectedExperience}
        setSelectedExperience={setSelectedExperience}
        setSearchString={setSearchString}
      />

      <div className="flex flex-wrap gap-5 justify-center">
        {filterJobs(jobData)?.map((item) => (
          <JobCard
            companyName={item?.companyName}
            key={item?.jdUid}
            jobDetailsFromCompany={item?.jobDetailsFromCompany}
            jobRole={item?.jobRole}
            location={item?.location}
            logoUrl={item?.logoUrl}
            maxExp={item?.maxExp}
            minExp={item?.minExp}
            maxJdSalary={item?.maxJdSalary}
            minJdSalary={item?.minJdSalary}
            salaryCurrencyCode={item?.salaryCurrencyCode}
          />
        ))}
      </div>
      <div className="flex align-center justify-center">
        {status === "loading" || isLoading ? <Loader /> : null}
      </div>
    </>
  );
};
