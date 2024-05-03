import { useEffect, useState } from "react";
import { JobCard } from "../component/JobCard";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { FilterComponent } from "../component/FilterComponent";
import { fetchJobData } from "../redux/Slices/jobSlice";
import Loader from "../component/Loader";

export const LandingPage = () => {
  const [isBottom, setIsBottom] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const {jobData, status} = useSelector((state) => state.job);
  const dispatch = useDispatch();
  const limit = 6; // Initial limit

  console.log(jobData, status);

  useEffect(() => {
    dispatch(fetchJobData(limit)); // Fetch initial data
  }, [dispatch]);

  useEffect(() => {
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
      if (scrolledToBottom) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isBottom && !isLoading) {
      setIsLoading(true); // Set loading state
      dispatch(fetchJobData(limit + 3))
        .then(() => setIsLoading(false)) // Reset loading state on success
        .catch(() => setIsLoading(false)); // Reset loading state on failure
    }
  }, [isBottom, dispatch, limit, isLoading]);

  return (
    <>
      <FilterComponent />

      <div className="flex flex-wrap gap-5 justify-center">
        {jobData?.map((item) => (
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

      {status == "loading" ? <Loader /> : <></>}
      {isLoading && <Loader />} 
      </div>
    </>
  );
};
