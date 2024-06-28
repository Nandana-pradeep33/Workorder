/*
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const Assign = () => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [designationEmployeeMap, setDesignationEmployeeMap] = useState({});

  useEffect(() => {
    // Fetch project types
    axios
      .get("http://localhost/myapp_backend/assign.php?type=project_types")
      .then((response) => {
        setProjectTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project types:", error);
      });

    // Fetch designations
    axios
      .get("http://localhost/myapp_backend/assign.php?type=designations")
      .then((response) => {
        setDesignations(response.data.map((designation) => ({ value: designation.Designation, label: designation.Designation })));
      })
      .catch((error) => {
        console.error("Error fetching designations:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch project names based on selected project type
    if (selectedProjectType) {
      axios
        .get(`http://localhost/myapp_backend/assign.php?type=project_names&project_type=${selectedProjectType}`)
        .then((response) => {
          setProjectNames(response.data);
        })
        .catch((error) => {
          console.error("Error fetching project names:", error);
        });
    }
  }, [selectedProjectType]);

  const handleProjectTypeChange = (e) => {
    setSelectedProjectType(e.target.value);
    setSelectedProjectName(""); // Clear selected project name when project type changes
  };

  const handleProjectNameChange = (e) => {
    setSelectedProjectName(e.target.value);
  };

  const handleDesignationChange = (selectedOptions) => {
    setSelectedDesignations(selectedOptions || []);
    selectedOptions.forEach(option => {
      if (!designationEmployeeMap[option.value]) {
        fetchEmployeeNames(option.value);
      }
    });
  };

  const fetchEmployeeNames = (designation) => {
    axios
      .get(`http://localhost/myapp_backend/assign.php?type=employee_names&designation=${designation}`)
      .then((response) => {
        setEmployeeNames(prev => ({
          ...prev,
          [designation]: response.data.map((employee) => ({ value: employee.Name1, label: employee.Name1 }))
        }));
      })
      .catch((error) => {
        console.error("Error fetching employee names:", error);
      });
  };

  const handleEmployeeNamesChange = (designation, selectedOptions) => {
    setDesignationEmployeeMap(prev => ({
      ...prev,
      [designation]: selectedOptions.map((option) => option.value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentDetails = {
      projectType: selectedProjectType,
      projectName: selectedProjectName,
      employeeAssignments: selectedDesignations.map(designation => ({
        designation: designation.label,
        employees: designationEmployeeMap[designation.value] || []
      }))
    };
    console.log(assignmentDetails);
    // Implement your submission logic here (e.g., sending data to backend)
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Employee Assign</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Project Type
              </label>
              <select
                name="projectType"
                id="projectType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedProjectType}
                onChange={handleProjectTypeChange}
                required
              >
                <option value="">Select</option>
                {projectTypes.map((type, index) => (
                  <option key={index} value={type.Project_type}>
                    {type.Project_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="projectName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Project Name
              </label>
              <select
                name="projectName"
                id="projectName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedProjectName}
                onChange={handleProjectNameChange}
                required
              >
                <option value="">Select</option>
                {projectNames.map((name, index) => (
                  <option key={index} value={name.Project_name}>
                    {name.Project_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="employeeDesignation" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Employee Designation
              </label>
              <Select
                name="employeeDesignation"
                id="employeeDesignation"
                className="basic-multi-select"
                classNamePrefix="select"
                options={designations}
                value={selectedDesignations}
                onChange={handleDesignationChange}
                isMulti
                isClearable
                required
              />
            </div>
            {selectedDesignations.map((designation, index) => (
              <div key={index} className="sm:col-span-2">
                <label htmlFor={`employeeNames_${designation.value}`} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Employee Names for {designation.label}
                </label>
                <Select
                  name={`employeeNames_${designation.value}`}
                  id={`employeeNames_${designation.value}`}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={employeeNames[designation.value] || []}
                  onChange={(selectedOptions) => handleEmployeeNamesChange(designation.value, selectedOptions)}
                  value={(employeeNames[designation.value] || []).filter((option) => (designationEmployeeMap[designation.value] || []).includes(option.value))}
                  isMulti
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-1/3 px-2 py-2.5 mt-4 sm:mt-6 font-bold text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-800"
          >
            Assign
          </button>
        </form>
      </div>
    </section>
  );
};

export default Assign;
*/



import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const Assign = () => {
  const [projectTypes, setProjectTypes] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [employeeNames, setEmployeeNames] = useState([]);
  const [selectedProjectType, setSelectedProjectType] = useState("");
  const [selectedProjectName, setSelectedProjectName] = useState("");
  const [selectedDesignations, setSelectedDesignations] = useState([]);
  const [designationEmployeeMap, setDesignationEmployeeMap] = useState({});
  const [submitSuccess, setSubmitSuccess] = useState(false); // State for showing success message

  useEffect(() => {
    // Fetch project types
    axios
      .get("http://localhost/myapp_backend/assign2.php?type=project_types")
      .then((response) => {
        setProjectTypes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching project types:", error);
      });

    // Fetch designations
    axios
      .get("http://localhost/myapp_backend/assign2.php?type=designations")
      .then((response) => {
        setDesignations(
          response.data.map((designation) => ({
            value: designation.Designation,
            label: designation.Designation,
          }))
        );
      })
      .catch((error) => {
        console.error("Error fetching designations:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch project names based on selected project type
    if (selectedProjectType) {
      axios
        .get(
          `http://localhost/myapp_backend/assign2.php?type=project_names&project_type=${selectedProjectType}`
        )
        .then((response) => {
          setProjectNames(response.data);
        })
        .catch((error) => {
          console.error("Error fetching project names:", error);
        });
    }
  }, [selectedProjectType]);

  const handleProjectTypeChange = (e) => {
    setSelectedProjectType(e.target.value);
    setSelectedProjectName(""); // Clear selected project name when project type changes
  };

  const handleProjectNameChange = (e) => {
    setSelectedProjectName(e.target.value);
  };

  const handleDesignationChange = (selectedOptions) => {
    setSelectedDesignations(selectedOptions || []);
    selectedOptions.forEach((option) => {
      if (!designationEmployeeMap[option.value]) {
        fetchEmployeeNames(option.value);
      }
    });
  };

  const fetchEmployeeNames = (designation) => {
    axios
      .get(
        `http://localhost/myapp_backend/assign.php?type=employee_names&designation=${designation}`
      )
      .then((response) => {
        setEmployeeNames((prev) => ({
          ...prev,
          [designation]: response.data.map((employee) => ({
            value: employee.Name1,
            label: employee.Name1,
          })),
        }));
      })
      .catch((error) => {
        console.error("Error fetching employee names:", error);
      });
  };

  const handleEmployeeNamesChange = (designation, selectedOptions) => {
    setDesignationEmployeeMap((prev) => ({
      ...prev,
      [designation]: selectedOptions.map((option) => option.value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const assignmentDetails = {
      projectType: selectedProjectType,
      projectName: selectedProjectName,
      employeeAssignments: selectedDesignations.map((designation) => ({
        designation: designation.label,
        employees: designationEmployeeMap[designation.value] || [],
      })),
    };
    axios
      .post("http://localhost/myapp_backend/assign2.php", assignmentDetails)
      .then((response) => {
        console.log(response.data);
        setSubmitSuccess(true); // Set success state to true
        setSelectedProjectType(""); // Clear form fields
        setSelectedProjectName("");
        setSelectedDesignations([]);
        setDesignationEmployeeMap({});
      })
      .catch((error) => {
        console.error("Error submitting data:", error);
        if (error.response && error.response.data) {
          console.error("Response data:", error.response.data);
        }
        // Handle error response (e.g., display an error message)
      });
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
        <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
          Employee Assign
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
            <div>
              <label
                htmlFor="projectType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project Type
              </label>
              <select
                name="projectType"
                id="projectType"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedProjectType}
                onChange={handleProjectTypeChange}
                required
              >
                <option value="">Select</option>
                {projectTypes.map((type, index) => (
                  <option key={index} value={type.Project_type}>
                    {type.Project_type}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="projectName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Project Name
              </label>
              <select
                name="projectName"
                id="projectName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                value={selectedProjectName}
                onChange={handleProjectNameChange}
                required
              >
                <option value="">Select</option>
                {projectNames.map((name, index) => (
                  <option key={index} value={name.Project_name}>
                    {name.Project_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="employeeDesignation"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Employee Designation
              </label>
              <Select
                name="employeeDesignation"
                id="employeeDesignation"
                className="basic-multi-select"
                classNamePrefix="select"
                options={designations}
                value={selectedDesignations}
                onChange={handleDesignationChange}
                isMulti
                isClearable
                required
              />
            </div>
            {selectedDesignations.map((designation, index) => (
              <div key={index} className="sm:col-span-2">
                <label
                  htmlFor={`employeeNames_${designation.value}`}
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Employee Names for {designation.label}
                </label>
                <Select
                  name={`employeeNames_${designation.value}`}
                  id={`employeeNames_${designation.value}`}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  options={employeeNames[designation.value] || []}
                  onChange={(selectedOptions) =>
                    handleEmployeeNamesChange(designation.value, selectedOptions)
                  }
                  value={(employeeNames[designation.value] || []).filter((option) =>
                    (designationEmployeeMap[designation.value] || []).includes(option.value)
                  )}
                  isMulti
                  required
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-1/3 px-2 py-2.5 mt-4 sm:mt-6 font-bold text-center text-white bg-green-400 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-green-800"
          >
            Assign
          </button>
        </form>
        {submitSuccess && (
          <div className="mt-4 text-center text-green-600 dark:text-green-400 font-medium">
            Employee Assigned Successfully
          </div>
        )}
      </div>
    </section>
  );
};

export default Assign;
