// AddEmployee.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  useToast,
  HStack,
} from "@chakra-ui/react";

import { getDepartments } from "../services/departmentService";
import { getDesignations } from "../services/designationService";
import { createEmployee } from "../services/employeeService";

const AddEmployee = () => {
  const toast = useToast();

  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    designation: "",
    status: "Active",
    joinedDate: "",
    salary: "",
  });

  // Load departments and designations
  useEffect(() => {
    getDepartments()
      .then((res) => setDepartments(res.data))
      .catch(() => toast({ title: "Failed to load departments", status: "error" }));

    getDesignations()
      .then((res) => setDesignations(res.data))
      .catch(() => toast({ title: "Failed to load designations", status: "error" }));
  }, [toast]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload — convert joinedDate to joinedAt for backend if needed
    const payload = {
      ...formData,
      joinedAt: formData.joinedDate || undefined,
    };
    delete payload.joinedDate;

    createEmployee(payload)
      .then(() => {
        toast({ title: "Employee added successfully", status: "success" });
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
          department: "",
          designation: "",
          status: "Active",
          joinedDate: "",
          salary: "",
        });
      })
      .catch(() => {
        toast({ title: "Failed to add employee", status: "error" });
      });
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Add New Employee</Heading>
      <form onSubmit={handleSubmit}>
        <HStack spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email Address"
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} mb={3}>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone Number"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Address</FormLabel>
            <Input
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Residential Address"
            />
          </FormControl>
        </HStack>

        <HStack spacing={4} mb={3}>
          <FormControl isRequired>
            <FormLabel>Department</FormLabel>
            <Select
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="Select Department"
            >
              {departments.map((dep) => (
                <option key={dep._id} value={dep._id}>
                  {dep.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Designation</FormLabel>
            <Select
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              placeholder="Select Designation"
            >
              {designations.map((des) => (
                <option key={des._id} value={des._id}>
                  {des.title /* Use 'title' instead of 'name' */}
                </option>
              ))}
            </Select>
          </FormControl>
        </HStack>

        <HStack spacing={4} mb={3}>
          <FormControl>
            <FormLabel>Status</FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Joined Date</FormLabel>
            <Input
              type="date"
              name="joinedDate"
              value={formData.joinedDate}
              onChange={handleInputChange}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Salary</FormLabel>
            <Input
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="Salary Amount"
            />
          </FormControl>
        </HStack>

        <Button type="submit" colorScheme="blue">
          Add Employee
        </Button>
      </form>
    </Box>
  );
};

export default AddEmployee;
