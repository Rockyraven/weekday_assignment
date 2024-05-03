import DropDownComponent from "./DropDownComponent";
import DropDownForSingleValue from "./DropDownForSingleValue";

export const FilterComponent = ({ setSelectedCities, selectedCities, selectedRoles, setSelectedRoles, selectedCTC, setSelectedCtc, selectedExperience, setSelectedExperience, setSearchString }) => {
    const dropDownDataForRole = ["backend", "frontend", "ios", "andriod", "tech lead"]
    const dropDownDataForLocation = ["banglore", "pune", "mumbai", "remote", "chennai", "delhi ncr"]
    const dropDownDataForExperience = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    const dropDownDataForTechStack = ["Java", "React", "Python", "Node", "Express"]
    const dropDownDataForBasePay = [10, 20, 30, 40, 50, 60, 70, 80, 90]
    return (
        <>
            <div className="flex justify-center items-center mt-10">
                <h4 className="text-xl font-medium text-gray-600">Filter by </h4>
                <DropDownComponent
                    placeHolder={"Location"}
                    data={dropDownDataForLocation}
                    onSelect={(selectedValue) => setSelectedCities(selectedValue)}
                    values={selectedCities}
                />

                <DropDownComponent
                    placeHolder={"Role"}
                    data={dropDownDataForRole}
                    onSelect={(selectedValue) => setSelectedRoles(selectedValue)}
                    values={selectedRoles}

                />
                <DropDownForSingleValue
                    placeHolder={"Minimum Base Pay"}
                    data={dropDownDataForBasePay}
                    onSelect={(selectedValue) => setSelectedCtc(selectedValue)}
                    value={selectedCTC}
                    optionPostFix="LPA"
                />

                <DropDownForSingleValue
                    placeHolder={"Experience"}
                    data={dropDownDataForExperience}
                    onSelect={(selectedValue) => setSelectedExperience(selectedValue)}
                    value={selectedExperience}
                    optionPostFix="Experience"
                />
                <div class="flex items-center space-x-2">
                    <input onChange={(e) => setSearchString(e.target.value)} id="search" name="search" type="text" className="border border-gray-300 rounded px-3 py-4 focus:outline-none focus:ring-1 focus:ring-blue-500 h-15" placeholder="Search Company" />
                </div>
            </div>
        </>
    );
};
