// Caloria - A simple calorie tracking web application
import React, { useState, useEffect } from "react";
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
  const [dailyCalories, setDailyCalories] = useState(150);
  const calculateBalance = () => {
    const today = new Date().toLocaleDateString();
    const pastDaysLimit = 10;
    const maxBalance = 1500;
    let daysProcessed = 0;
    let totalCalories = 0;

    const sortedHistory = [...history].sort((a, b) => new Date(b.date) - new Date(a.date));
    sortedHistory.forEach((entry) => {
      if (daysProcessed < pastDaysLimit && entry.date !== today) {
        totalCalories += entry.calories;
        daysProcessed++;
      }
    });

    const unloggedDays = pastDaysLimit - daysProcessed;
    const balance = Math.min(maxBalance, unloggedDays * 150 - totalCalories);
    return balance;
  };

  const [accumulatedCalories, setAccumulatedCalories] = useState(calculateBalance);

  useEffect(() => {
    const timer = setTimeout(
      () => {
        const lastEntryDate = history.length > 0 ? new Date(history[history.length - 1].date) : new Date();
        const today = new Date();
        if (lastEntryDate.setHours(0, 0, 0, 0) !== today.setHours(0, 0, 0, 0)) {
          setAccumulatedCalories((prev) => Math.min(1500, prev + 150));
        }
      },
      new Date().setHours(23, 59, 0, 0) - Date.now(),
    );

    return () => clearTimeout(timer);
  }, [history]);

  useEffect(() => {
    const midnightReset = setTimeout(
      () => {
        if (!history.find((entry) => new Date(entry.date).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0))) {
          setAccumulatedCalories((prev) => Math.min(1500, prev + 150));
          setDailyCalories(150);
        }
      },
      new Date().setHours(23, 59, 59, 999) - Date.now(),
    );
    return () => clearTimeout(midnightReset);
  }, [history]);
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

    const calorieIntake = dailyCalories;
    const newAccumulatedCalories = caloriesUsed ? accumulatedCalories - calorieIntake : accumulatedCalories + 150;
    setAccumulatedCalories(newAccumulatedCalories > 1500 ? 1500 : newAccumulatedCalories);
    if (caloriesUsed) {
      setDailyCalories(0);
    }
    const newHistory = [...history, { date, details, calories: calorieIntake }];
    if (newHistory.length > 10) newHistory.shift();
    setHistory(newHistory);
    localStorage.setItem("calorieHistory", JSON.stringify(newHistory));
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
                  <Input id="calories" type="number" value={dailyCalories} onChange={(e) => setDailyCalories(Math.min(150, parseInt(e.target.value, 10)))} placeholder="Enter calorie amount" />
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
