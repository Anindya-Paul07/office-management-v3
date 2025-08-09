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
  getDesignations,
  createDesignation,
  updateDesignation,
  deleteDesignation,
  assignDesignationToEmployee,
} from "../services/designationService";

import { getEmployees } from "../services/employeeService";

const Designations = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Add/Edit modal
  const {
    isOpen: isAssignOpen,
    onOpen: onAssignOpen,
    onClose: onAssignClose,
  } = useDisclosure(); // Assign modal

  // AlertDialog state for delete confirmation
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();
  const cancelRef = useRef();

  const [designations, setDesignations] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedDesig, setSelectedDesig] = useState(null);
  const [showEmployees, setShowEmployees] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Active",
  });
  const [editDesigId, setEditDesigId] = useState(null);
  const [assignData, setAssignData] = useState({
    employeeId: "",
    designationId: "",
  });

  // Track which designation to delete
  const [desigToDelete, setDesigToDelete] = useState(null);

  // Load data
  const loadData = () => {
    getDesignations()
      .then((res) => setDesignations(res.data))
      .catch(() => toast({ title: "Failed to load designations", status: "error" }));

    getEmployees()
      .then((res) => setEmployees(res.data))
      .catch(() => toast({ title: "Failed to load employees", status: "error" }));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openModal = (desig = null) => {
    if (desig) {
      setFormData({
        title: desig.title || "",
        description: desig.description || "",
        status: desig.status || "Active",
      });
      setEditDesigId(desig._id);
    } else {
      setFormData({ title: "", description: "", status: "Active" });
      setEditDesigId(null);
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

  const handleSaveDesignation = () => {
    if (!formData.title.trim()) {
      toast({ title: "Title is required", status: "warning" });
      return;
    }

    if (editDesigId) {
      updateDesignation(editDesigId, formData)
        .then(() => {
          toast({ title: "Designation updated", status: "success" });
          onClose();
          loadData();
        })
        .catch(() => toast({ title: "Failed to update", status: "error" }));
    } else {
      createDesignation(formData)
        .then(() => {
          toast({ title: "Designation created", status: "success" });
          onClose();
          loadData();
        })
        .catch(() => toast({ title: "Failed to create", status: "error" }));
    }
  };

  const confirmDeleteDesignation = (desig) => {
    setDesigToDelete(desig);
    onDeleteOpen();
  };

  const handleDeleteDesignation = () => {
    if (!desigToDelete) return;

    deleteDesignation(desigToDelete._id)
      .then(() => {
        toast({ title: "Designation deleted", status: "info" });
        if (selectedDesig && selectedDesig._id === desigToDelete._id) {
          setSelectedDesig(null);
          setShowEmployees(false);
        }
        setDesigToDelete(null);
        onDeleteClose();
        loadData();
      })
      .catch(() => {
        toast({ title: "Failed to delete", status: "error" });
      });
  };

  const openEmployees = (desig) => {
    setSelectedDesig(desig);
    setShowEmployees(true);
  };

  return (
    <Box p={6}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={6}>
        <Heading size="lg">Designations</Heading>
        <HStack spacing={3}>
          <Button leftIcon={<AddIcon />} colorScheme="blue" onClick={() => openModal()}>
            Add Designation
          </Button>
          <Button colorScheme="teal" onClick={onAssignOpen}>
            Assign Designation
          </Button>
        </HStack>
      </Box>

      <SimpleGrid columns={[1, 2, 3]} spacing={6}>
        {designations.map((desig) => (
          <Box
            key={desig._id}
            borderWidth="1px"
            p={5}
            borderRadius="lg"
            cursor="pointer"
            onClick={() => openEmployees(desig)}
          >
            <Heading size="md" mt={3}>
              {desig.title}
            </Heading>
            <Box mt={2} fontSize="sm" color="gray.600">
              {desig.description}
            </Box>
            <Box mt={3} display="flex" gap={2}>
              <IconButton
                size="sm"
                icon={<EditIcon />}
                aria-label="Edit Designation"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal(desig);
                }}
              />
              <IconButton
                size="sm"
                icon={<DeleteIcon />}
                colorScheme="red"
                aria-label="Delete Designation"
                onClick={(e) => {
                  e.stopPropagation();
                  confirmDeleteDesignation(desig);
                }}
              />
            </Box>
          </Box>
        ))}
      </SimpleGrid>

      {showEmployees && selectedDesig && (
        <Box mt={8}>
          <Heading size="md" mb={4}>
            Employees with {selectedDesig.title}
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Department</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {employees
                .filter((emp) => emp.designation?._id === selectedDesig._id)
                .map((emp) => (
                  <Tr key={emp._id}>
                    <Td>{emp.name}</Td>
                    <Td>{emp.email}</Td>
                    <Td>{emp.department?.name || "N/A"}</Td>
                    <Td>{emp.status}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* Add/Edit Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editDesigId ? "Edit Designation" : "Add Designation"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={3} isRequired>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Designation title"
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
            <Button colorScheme="blue" mr={3} onClick={handleSaveDesignation}>
              {editDesigId ? "Update" : "Save"}
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Assign Modal */}
      <Modal isOpen={isAssignOpen} onClose={onAssignClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Assign Designation to Employee</ModalHeader>
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
              <FormLabel>Designation</FormLabel>
              <Select
                name="designationId"
                value={assignData.designationId}
                onChange={handleAssignChange}
                placeholder="Select designation"
              >
                {designations.map((desig) => (
                  <option key={desig._id} value={desig._id}>
                    {desig.title}
                  </option>
                ))}
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => {
              if (!assignData.employeeId || !assignData.designationId) {
                toast({ title: "Select employee and designation", status: "warning" });
                return;
              }
              assignDesignationToEmployee(assignData.employeeId, assignData.designationId)
                .then(() => {
                  toast({ title: "Designation assigned", status: "success" });
                  setAssignData({ employeeId: "", designationId: "" });
                  onAssignClose();
                  loadData();
                })
                .catch(() => toast({ title: "Failed to assign designation", status: "error" }));
            }}>
              Assign
            </Button>
            <Button onClick={onAssignClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation AlertDialog */}
      <AlertDialog
        isOpen={isDeleteOpen}
        leastDestructiveRef={cancelRef}
        onClose={() => {
          setDesigToDelete(null);
          onDeleteClose();
        }}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Designation
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to delete{" "}
              <strong>{desigToDelete?.title}</strong>? This action cannot be undone.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  setDesigToDelete(null);
                  onDeleteClose();
                }}
              >
                Cancel
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDeleteDesignation();
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default Designations;
