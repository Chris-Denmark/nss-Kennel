import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { EmployeeContext } from "./EmployeeProvider"
import { EmployeeCard } from "./Employee"
import { LocationContext } from "../location/LocationProvider"
import "./Employee.css"

export const EmployeeList = () => {
  const { employees, getEmployees } = useContext(EmployeeContext)
  const { locations, getLocations } = useContext(LocationContext)

  const history = useHistory()

  useEffect(() => {
    console.log("EmployeeList: useEffect - getEmployees")
    getLocations()
    .then(getEmployees)
  }, [])


  return (
    <div className="employees">
      <h2>Employees</h2>
      <button onClick={() => {history.push("/employees/create")}}>
        Add Employee
      </button>
      {
  employees.map(employee => {
    const location = locations.find(l => l.id === employee.locationId)

    return <EmployeeCard key={employee.id}
                location={location}
                employee={employee} />
        })
      }
    </div>
  )}