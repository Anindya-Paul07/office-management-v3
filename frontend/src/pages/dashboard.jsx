import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Icon,
  Text
} from "@chakra-ui/react";
import { FaUsers, FaTasks, FaCalendarCheck, FaMoneyBillWave } from "react-icons/fa";
import { getEmployees } from "../services/employeeService";
import { getTasks } from "../services/taskService";
import { getAttendance } from "../services/attendanceService";
import { getSalaries } from "../services/salaryService";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Employees", value: 0, icon: FaUsers, color: "blue.500" },
    { title: "Tasks Pending", value: 0, icon: FaTasks, color: "yellow.500" },
    { title: "Present Today", value: 0, icon: FaCalendarCheck, color: "green.500" },
    { title: "Salaries Due", value: 0, icon: FaMoneyBillWave, color: "red.500" },
  ]);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [empRes, taskRes, attRes, salRes] = await Promise.all([
        getEmployees(),
        getTasks(),
        getAttendance(),
        getSalaries(),
      ]);

      const employees = empRes.data;
      const tasks = taskRes.data;
      const attendance = attRes.data;
      const salaries = salRes.data;

      const today = new Date().toISOString().split("T")[0];

      const updatedStats = [
        {
          title: "Total Employees",
          value: employees.length,
          icon: FaUsers,
          color: "blue.500",
        },
        {
          title: "Tasks Pending",
          value: tasks.filter((task) => task.status !== "Completed").length,
          icon: FaTasks,
          color: "yellow.500",
        },
        {
          title: "Present Today",
          value: attendance.filter(
            (att) => att.status === "Present" && att.date.startsWith(today)
          ).length,
          icon: FaCalendarCheck,
          color: "green.500",
        },
        {
          title: "Salaries Due",
          value: salaries.filter((sal) => sal.status === "Pending").length,
          icon: FaMoneyBillWave,
          color: "red.500",
        },
      ];

      setStats(updatedStats);
    } catch (error) {
      console.error("Error loading dashboard stats:", error);
    }
  };

  return (
    <Box p={6}>
      <Heading mb={6} fontSize="2xl" color={useColorModeValue("gray.800", "gray.100")}>
        Dashboard
      </Heading>

      <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={6}>
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

const StatCard = ({ title, value, icon, color }) => {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderRadius="xl"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.500" mb={1}>
            {title}
          </Text>
          <Heading fontSize="2xl" fontWeight="bold">
            {value}
          </Heading>
        </Box>
        <Icon as={icon} w={8} h={8} color={color} />
      </Flex>
    </Box>
  );
};

export default Dashboard;
