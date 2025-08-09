// Employees.jsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Spinner,
  Text,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
  useToast,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { getEmployees, updateEmployee, deleteEmployee } from "../services/employeeService";
import { getDepartments } from "../services/departmentService";
import { getDesignations } from "../services/designationService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [formData, setFormData] = useState({});
  const toast = useToast();

  // For Edit Modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // For Delete Confirmation Dialog
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = React.useRef();

  // Load employees
  const loadEmployees = () => {
    setLoading(true);
    getEmployees()
      .then((res) => {
        setEmployees(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  // Load dropdown data
  const loadDropdowns = () => {
    getDepartments().then((res) => setDepartments(res.data));
    getDesignations().then((res) => setDesignations(res.data));
  };

  React.useEffect(() => {
    loadEmployees();
    loadDropdowns();
  }, []);

  // Open edit modal with employee data
  const handleEditClick = (employee) => {
    setSelectedEmployee(employee);
    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      department: employee.department?._id || "",
      designation: employee.designation?._id || "",
      status: employee.status || "Active",
      joinedAt: employee.joinedAt ? employee.joinedAt.split("T")[0] : "",
      salary: employee.salary || "",
    });
    onOpen();
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update employee info
  const handleUpdate = () => {
    if (!selectedEmployee) return;

    updateEmployee(selectedEmployee._id, formData)
      .then(() => {
        toast({
          title: "Employee updated successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        loadEmployees();
        onClose();
      })
      .catch(() => {
        toast({
          title: "Failed to update employee",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Delete employee (with confirmation)
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const confirmDelete = (employee) => {
    setEmployeeToDelete(employee);
    onDeleteOpen();
  };

  const handleDelete = () => {
    if (!employeeToDelete) return;

    deleteEmployee(employeeToDelete._id)
      .then(() => {
        toast({
          title: "Employee deleted",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        loadEmployees();
        onDeleteClose();
      })
      .catch(() => {
        toast({
          title: "Failed to delete employee",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Box p={6}>
      <Heading mb={6}>Employees</Heading>
      {loading ? (
        <Spinner />
      ) : employees.length === 0 ? (
        <Text>No employees found</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Department</Th>
              <Th>Designation</Th>
              <Th>Status</Th>
              <Th>Joined Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employees.map((emp) => (
              <Tr key={emp._id}>
                <Td>{emp.name}</Td>
                <Td>{emp.email}</Td>
                <Td>{emp.department?.name || "N/A"}</Td>
                <Td>{emp.designation?.title || "N/A"}</Td>
                <Td>{emp.status}</Td>
                <Td>{emp.joinedAt ? new Date(emp.joinedAt).toLocaleDateString() : "N/A"}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button size="sm" colorScheme="blue" onClick={() => handleEditClick(emp)}>
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      onClick={() => confirmDelete(emp)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}

      {/* Edit Employee Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full Name"
              />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email Address"
              />
            </FormControl>

            <FormControl mb={3} isRequired>
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

            <FormControl mb={3} isRequired>
              <FormLabel>Designation</FormLabel>
              <Select
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                placeholder="Select Designation"
              >
                {designations.map((des) => (
                  <option key={des._id} value={des._id}>
                    {des.title}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl mb={3}>
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

            <FormControl mb={3}>
              <FormLabel>Joined Date</FormLabel>
              <Input
                type="date"
                name="joinedAt"
                value={formData.joinedAt}
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Salary</FormLabel>
              <Input
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="Salary Amount"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
              Update
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={onDeleteClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Employee
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <strong>{employeeToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Employees;
