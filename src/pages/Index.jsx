// Caloria - A simple calorie tracking web application
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Switch, Text, VStack, useToast } from "@chakra-ui/react";
import { FaSave, FaHistory } from "react-icons/fa";

const Index = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("calorieHistory")) || [];
    } catch (error) {
      console.error("Error reading from localStorage", error);
      return [];
    }
  });
  const [caloriesUsed, setCaloriesUsed] = useState(false);
  const [details, setDetails] = useState("");
  const [dailyBalance, setDailyBalance] = useState(150);
  const [accumulatedCalories, setAccumulatedCalories] = useState(0);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    if (caloriesUsed && details === "") {
      toast({
        title: "Details Required",
        description: "Please enter details if calories are marked as used.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const calorieIntake = 150;
    if (dailyBalance - calorieIntake < 0) {
      toast({
        title: "Calorie Limit Exceeded",
        description: "You cannot consume more than your daily balance.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newAccumulatedCalories = accumulatedCalories + (dailyBalance - calorieIntake);
    const newHistory = [...history, { date, details, calories: calorieIntake }];
    if (newHistory.length > 10) newHistory.shift();
    setHistory(newHistory);
    localStorage.setItem("calorieHistory", JSON.stringify(newHistory));
    const maxAccumulation = 1500;
    if (newAccumulatedCalories >= maxAccumulation) {
      toast({
        title: "Accumulation Limit Reached",
        description: "You have reached the maximum accumulation limit.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setAccumulatedCalories(maxAccumulation);
    } else {
      setAccumulatedCalories(newAccumulatedCalories);
    }

    toast({
      title: "Entry Saved",
      description: "Your calorie data has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="dark.900">
      <VStack spacing={10} w="full" maxW="md" p={12} boxShadow="2xl" m={12} bg="dark.800">
        <Heading size="lg">Caloria Tracker</Heading>
        <Text>{date}</Text>
        <FormControl display="flex" alignItems="center">
          <FormLabel htmlFor="calorie-status" mb="0">
            Calories Used Today:
          </FormLabel>
          <Switch id="calorie-status" onChange={() => setCaloriesUsed(!caloriesUsed)} />
        </FormControl>
        {caloriesUsed && (
          <FormControl>
            <FormLabel htmlFor="details">Details of Usage:</FormLabel>
            <Input id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="What were the calories spent on?" />
          </FormControl>
        )}
        {!caloriesUsed && <Text fontSize="xl" fontWeight="bold">{`Accumulated Calories: ${accumulatedCalories}`}</Text>}
        <Button leftIcon={<FaSave />} colorScheme="red" onClick={handleSave}>
          Save
        </Button>
        <Button leftIcon={<FaHistory />} colorScheme="red" variant="ghost" onClick={() => navigate("/history", { state: { history } })}>
          View History
        </Button>
      </VStack>
    </Flex>
  );
};

export default Index;
