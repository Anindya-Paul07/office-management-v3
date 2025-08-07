import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Input,
  Stack,
  Text,
  Flex,
  useToast,
} from '@chakra-ui/react';
import {
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from '../services/departmentService';

const Department = () => {
  const [departments, setDepartments] = useState([]);
  const [newDepartmentName, setNewDepartmentName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState(null);
  const toast = useToast();

  // Fetch departments on component load
  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await getDepartments();
      setDepartments(res.data);
    } catch (err) {
      console.error(err);
      setDepartments([]); // fallback
      setError('No departments to show.');
    }
  };

  const handleAddDepartment = async () => {
    if (!newDepartmentName.trim()) return;
    try {
      const res = await createDepartment({ name: newDepartmentName });
      setDepartments([...departments, res.data]);
      setNewDepartmentName('');
      toast({
        title: 'Department created.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error creating department.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      setDepartments(departments.filter((dept) => dept._id !== id));
      toast({
        title: 'Department deleted.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error deleting department.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await updateDepartment(editingId, { name: editingName });
      setDepartments(
        departments.map((dept) =>
          dept._id === editingId ? { ...dept, name: res.data.name } : dept
        )
      );
      setEditingId(null);
      setEditingName('');
      toast({
        title: 'Department updated.',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error updating department.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box p={6}>
      <Text fontSize="2xl" mb={4}>
        Department Management
      </Text>

      <Flex mb={4} gap={2}>
        <Input
          placeholder="New Department"
          value={newDepartmentName}
          onChange={(e) => setNewDepartmentName(e.target.value)}
        />
        <Button colorScheme="teal" onClick={handleAddDepartment}>
          Add
        </Button>
      </Flex>

      <Stack spacing={3}>
        {departments.length === 0 ? (
          <Text color="gray.500">{error || 'No departments to show.'}</Text>
        ) : (
          departments.map(({ _id, name }) => (
            <Flex key={_id} align="center" gap={2}>
              {editingId === _id ? (
                <>
                  <Input
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <Button size="sm" colorScheme="green" onClick={handleUpdate}>
                    Save
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      setEditingId(null);
                      setEditingName('');
                    }}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <>
                  <Text flex={1}>{name}</Text>
                  <Button
                    size="sm"
                    colorScheme="blue"
                    onClick={() => {
                      setEditingId(_id);
                      setEditingName(name);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </Flex>
          ))
        )}
      </Stack>
    </Box>
  );
};

export default Department;
