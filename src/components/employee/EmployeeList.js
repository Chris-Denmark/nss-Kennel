import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./Employee"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"

export const EmployeeList = () => {
  const { employees, getEmployees, searchTerms } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  const [ filteredEmployees, setFiltered ] = useState([])
  const history = useHistory()

  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getLocations()
    .then(getEmployees)
  }, [])

  useEffect(() => {
    if (searchTerms !== "") {
      // If the search field is not blank, display matching animals
      const subset = employees.filter(employee => employee.name.toLowerCase().includes(searchTerms))
      setFiltered(subset)
    } else {
      // If the search field is blank, display all animals
      setFiltered(employees)
    }
  }, [searchTerms, employees])


  return (
    <div className="employees">
      <h2>Employees</h2>
      <button onClick={() => {history.push("/employees/create")}}>
        Add Employee
      </button>
      {
  filteredEmployees.map(employee => {
    const location = locations.find(l => l.id === employee.locationId)

    return <EmployeeCard key={employee.id}
                location={location}
                employee={employee} />
        })
      }
    </div>
  )}