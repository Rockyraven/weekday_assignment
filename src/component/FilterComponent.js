import DropDownComponent from "./DropDownComponent";

export const FilterComponent = () => {
    const dropDownDataForRole = ["Backend developer", "Frontend developer", "Fullstack developer", "Data Scientist", "Tester"]
    const dropDownDataForLocation = ["banglore", "pune", "mumbai", "noida", "hyderabad", "gurugram", "remote", "chennai", "delhi ncr"]
    const dropDownDataForExperience = ["1", "2", "3", "4", "5", "6"]
    const dropDownDataForTechStack = ["Java", "React", "Python", "Node", "Express"]
    const dropDownDataForBasePay = ["12LPA", "14LPA", "16LPA", "17LPA", "19LPA"]
    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <h4 className="text-xl font-medium text-gray-600">Filter by </h4>
                <DropDownComponent placeHolder={"experience"} data={dropDownDataForExperience}/>
                <DropDownComponent placeHolder={"Location"} data={dropDownDataForLocation} />
                <DropDownComponent placeHolder={"TechStack"} data={dropDownDataForTechStack} />
                <DropDownComponent placeHolder={"Role"} data={dropDownDataForRole}/>
                <DropDownComponent placeHolder={"Minimum Base Pay"} data={dropDownDataForBasePay}/>
                <div class="flex items-center space-x-2">
                    <input id="search" name="search" type="text" className="border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500 h-15" placeholder="Search Company"/>
                </div>
            </div>
        </>
    );
};
