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
  const [accumulatedCalories, setAccumulatedCalories] = useState(() => {
    const today = new Date().toLocaleDateString();
    return history.reduce((acc, entry) => {
      if (entry.date === today) {
        return acc - entry.calories;
      }
      return acc;
    }, 150);
  });
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

    const calorieIntake = dailyBalance;
    if (calorieIntake > dailyBalance) {
      toast({
        title: "Calorie Limit Exceeded",
        description: "You cannot consume more than your daily balance.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newAccumulatedCalories = accumulatedCalories + calorieIntake;
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
    setCaloriesUsed(false);

    toast({
      title: "Entry Saved",
      description: "Your calorie data has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right",
      variant: "solid",
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="gray.100" style={{ background: "radial-gradient(circle, rgba(238,238,238,1) 0%, rgba(214,214,214,1) 100%)" }}>
      <VStack spacing={10} w="full" maxW="md" p={12} boxShadow="0 4px 6px rgba(0, 0, 0, 0.1), inset 0 1px 2px rgba(255, 255, 255, 0.6)" m={12} bg="gray.200" borderRadius="lg">
        <Heading size="lg" style={{ textShadow: "1px 1px 2px gray, 0 0 25px pink, 0 0 5px darkgray" }}>
          Caloria Tracker
        </Heading>
        <Text style={{ fontWeight: "bold" }}>{date}</Text>
        <Button colorScheme="pink" size="lg" boxShadow="0 2px 4px rgba(0, 0, 0, 0.2), inset 0 -1px 2px rgba(255, 255, 255, 0.7)" onClick={() => setCaloriesUsed(true)}>
          Log Today’s Calories
        </Button>
        {caloriesUsed && (
          <VStack spacing={4} w="full">
            <FormControl>
              <FormLabel htmlFor="details">What did you eat?</FormLabel>
              <Input id="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Enter food details" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="calories">Calories (max 150):</FormLabel>
              <Input id="calories" type="number" value={dailyBalance} onChange={(e) => setDailyBalance(Math.min(150, parseInt(e.target.value, 10)))} placeholder="Enter calorie amount" />
            </FormControl>
          </VStack>
        )}
        {!caloriesUsed && <Text fontSize="xl" fontWeight="bold">{`Accumulated Calories: ${accumulatedCalories}`}</Text>}
        <Button leftIcon={<FaSave />} colorScheme="blue" boxShadow="0 2px 4px rgba(0, 0, 0, 0.1), inset 0 -1px 1px rgba(255, 255, 255, 0.5)" onClick={handleSave}>
          Save Progress
        </Button>
        <Text fontSize="xl" fontWeight="bold" style={{ boxShadow: "inset 0 1px 2px rgba(0, 0, 0, 0.1)" }}>{`Accumulated Calories: ${accumulatedCalories}`}</Text>
        <Button leftIcon={<FaHistory />} colorScheme="blue" variant="ghost" style={{ textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)" }} onClick={() => navigate("/history", { state: { history } })}>
          Review Past Entries
        </Button>
      </VStack>
    </Flex>
  );
};

export default Index;
