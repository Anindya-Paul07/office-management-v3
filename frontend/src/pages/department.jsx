import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  Button,
  IconButton,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  HStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { AddIcon, EditIcon, DeleteIcon } from "@chakra-ui/icons";

import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  assignDepartmentToEmployee,
} from "../services/departmentService";

import { getEmployees } from "../services/employeeService";

const Departments = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Add/Edit modal
  const {
    isOpen: isAssignOpen,
    onOpen: onAssignOpen,
    onClose: onAssignClose,
  } = useDisclosure(); // Assign modal

  // New: Delete dialog state
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDept, setSelectedDept] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [editDeptId, setEditDeptId] = useState(null);
  const [assignData, setAssignData] = useState({
    employeeId: "",
    departmentId: "",
  });

  // New: department selected for deletion
  const [deptToDelete, setDeptToDelete] = useState(null);

  const loadData = () => {
    getDepartments()
      .then((res) => setDepartments(res.data))
      .catch(() => toast({ title: "Failed to load departments", status: "error" }));

    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => toast({ title: "Failed to load employees", status: "error" }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (dept = null) => {
    if (dept) {
      setFormData({
        name: dept.name || "",
        description: dept.description || "",
        status: dept.status || "Active",
      });
      setEditDeptId(dept._id);
    } else {
      setFormData({ name: "", description: "", status: "Active" });
      setEditDeptId(null);
    }
    onOpen();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAssignChange = (e) => {
    const { name, value } = e.target;
    setAssignData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDepartment = () => {
    if (editDeptId) {
      updateDepartment(editDeptId, formData)
        .then(() => {
          toast({ title: "Department updated", status: "success" });
          onClose();
          loadData();
        })
        .catch(() => toast({ title: "Failed to update department", status: "error" }));
    } else {
      createDepartment(formData)
        .then(() => {
          toast({ title: "Department created", status: "success" });
          onClose();
          loadData();
        })
        .catch(() => toast({ title: "Failed to create department", status: "error" }));
    }
  };

  // Open delete confirmation dialog
  const confirmDeleteDepartment = (dept) => {
    setDeptToDelete(dept);
    onDeleteOpen();
  };

  // Delete after confirmation
  const handleDeleteDepartment = () => {
    if (!deptToDelete) return;

    deleteDepartment(deptToDelete._id)
      .then(() => {
        toast({ title: "Department deleted", status: "info" });
        if (selectedDept && selectedDept._id === deptToDelete._id) {
          setSelectedDept(null);
          setShowEmployees(false);
        }
        setDeptToDelete(null);
        onDeleteClose();
        loadData();
      })
      .catch(() => {
        toast({ title: "Failed to delete department", status: "error" });
      });
  };

  // Assign department to employee
  const handleAssignDepartment = () => {
    if (!assignData.employeeId || !assignData.departmentId) {
      toast({ title: "Select employee and department", status: "warning" });
      return;
    }

    assignDepartmentToEmployee(assignData.employeeId, assignData.departmentId)
      .then(() => {
        toast({ title: "Department assigned to employee", status: "success" });
        setAssignData({ employeeId: "", departmentId: "" });
        onAssignClose();
        loadData();
      })
      .catch(() => toast({ title: "Failed to assign department", status: "error" }));
  };

  const openEmployees = (dept) => {
    setSelectedDept(dept);
    setShowEmployees(true);
  };

  return (
    <Box p={6}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Departments</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => openModal()}>
            Add Department
          </Button>
          <Button colorScheme="teal" onClick={onAssignOpen}>
            Assign Department
          </Button>
        </HStack>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {departments.map((dept) => (
          <Box
            key={dept._id}
            borderWidth="1px"
            p={5}
            borderRadius="lg"
            cursor="pointer"
            onClick={() => openEmployees(dept)}
          >
            <Heading size="md" mt={3}>
              {dept.name}
            </Heading>
            <Box mt={2} fontSize="sm" color="gray.600">
              {dept.description}
            </Box>
            <Box mt={3} display="flex" gap={2}>
              <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label="Edit Department"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(dept);
                }}
              />
              <IconButton
                size="sm"
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Delete Department"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDeleteDepartment(dept);
                }}
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {showEmployees && selectedDept && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Employees in {selectedDept.name}
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Designation</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees
                .filter((emp) => emp.department?._id === selectedDept._id)
                .map((emp) => (
                  <Tr key={emp._id}>
                    <Td>{emp.name}</Td>
                    <Td>{emp.email}</Td>
                    <Td>{emp.designation?.title || "N/A"}</Td>
                    <Td>{emp.status}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Modal for add/edit */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editDeptId ? "Edit Department" : "Add Department"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Department name"
              />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description (optional)"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                placeholder="Select status"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveDepartment}>
              {editDeptId ? "Update" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal for assign */}
      <Modal isOpen={isAssignOpen} onClose={onAssignClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Department to Employee</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3}>
              <FormLabel>Employee</FormLabel>
              <Select
                name="employeeId"
                value={assignData.employeeId}
                onChange={handleAssignChange}
                placeholder="Select employee"
              >
                {employees.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.name} ({emp.email})
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mb={3}>
              <FormLabel>Department</FormLabel>
              <Select
                name="departmentId"
                value={assignData.departmentId}
                onChange={handleAssignChange}
                placeholder="Select department"
              >
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAssignDepartment}>
              Assign
            </Button>
            <Button onClick={onAssignClose}>Cancel</Button>
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
              Delete Department
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <strong>{deptToDelete?.name}</strong>? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onDeleteClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteDepartment} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Departments;
