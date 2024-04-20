// Caloria - A simple calorie tracking web application
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Switch, Text, VStack, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from "@chakra-ui/react";
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
    <Flex direction="column" align="center" justify="center" minH="100vh" bg="dark.900">
      <VStack spacing={10} w="full" maxW="md" p={12} boxShadow="2xl" m={12} bg="dark.800" borderRadius="base">
        <Heading size="lg">Caloria Tracker</Heading>
        <Text>{date}</Text>
        <Button colorScheme="red" size="lg" onClick={() => setCaloriesUsed(true)}>
          Create New Record
        </Button>
        <Modal isOpen={caloriesUsed} onClose={() => setCaloriesUsed(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Create New Record</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
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
            </ModalBody>
            <ModalFooter>
              <Button leftIcon={<FaSave />} colorScheme="red" onClick={handleSave}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {!caloriesUsed && <Text fontSize="xl" fontWeight="bold">{`Accumulated Calories: ${accumulatedCalories}`}</Text>}
        <Button leftIcon={<FaHistory />} colorScheme="red" variant="ghost" onClick={() => navigate("/history", { state: { history } })}>
          View History
        </Button>
      </VStack>
    </Flex>
  );
};

export default Index;
