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
  useEffect(() => {
    const resetCredit = setInterval(() => {
      const today = new Date();
      if (today.getHours() === 0 && today.getMinutes() === 1) {
        const newHistory = history.filter((entry) => {
          const entryDate = new Date(entry.date);
          const tenDaysAgo = new Date();
          tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
          return entryDate >= tenDaysAgo;
        });
        const totalCalories = newHistory.reduce((acc, entry) => acc + entry.calories, 0);
        const daysPast = new Date().getDate() % 10;
        const newCredit = daysPast * 150 - totalCalories;
        setCalorieCredit(newCredit);
      }
    }, 60000);

    return () => clearInterval(resetCredit);
  }, [history]);

  const [calorieCredit, setCalorieCredit] = useState(() => {
    const lastUpdate = localStorage.getItem("lastUpdate");
    const currentDate = new Date();
    const lastCredit = parseInt(localStorage.getItem("calorieCredit"), 10) || 0;
    const daysDifference = lastUpdate ? Math.floor((currentDate - new Date(lastUpdate)) / (1000 * 3600 * 24)) : 0;
    let newCredit = lastCredit - daysDifference * 150;
    newCredit = Math.max(newCredit, 0);
    localStorage.setItem("calorieCredit", newCredit.toString());
    localStorage.setItem("lastUpdate", currentDate.toISOString());
    return newCredit;
  });

  useEffect(() => {
    const dailyUpdate = setInterval(() => {
      const today = new Date();
      if (today.getHours() === 0 && today.getMinutes() === 1) {
        const lastUpdate = localStorage.getItem("lastUpdate");
        const currentDate = new Date();
        const daysDifference = Math.floor((currentDate - new Date(lastUpdate)) / (1000 * 3600 * 24));
        if (daysDifference > 0) {
          let newCredit = parseInt(localStorage.getItem("calorieCredit"), 10) || 0;
          for (let i = 0; i < daysDifference; i++) {
            newCredit += 150;
          }
          newCredit = Math.min(newCredit, 1500);
          localStorage.setItem("calorieCredit", newCredit.toString());
          localStorage.setItem("lastUpdate", currentDate.toISOString());
          setCalorieCredit(newCredit);
        }
      }
    }, 60000);
    return () => clearInterval(dailyUpdate);
  }, [history]);

  useEffect(() => {
    const updateCredit = () => {
      const lastUpdate = localStorage.getItem("lastUpdate");
      const currentDate = new Date();
      const daysDifference = Math.floor((currentDate - new Date(lastUpdate)) / (1000 * 3600 * 24));
      if (daysDifference > 0) {
        let newCredit = parseInt(localStorage.getItem("calorieCredit"), 10) || 0;
        for (let i = 0; i < daysDifference; i++) {
          newCredit += 150;
        }
        newCredit = Math.min(newCredit, 1500);
        localStorage.setItem("calorieCredit", newCredit.toString());
        localStorage.setItem("lastUpdate", currentDate.toISOString());
        setCalorieCredit(newCredit);
      }
    };
    const periodicCheck = setInterval(updateCredit, 3600000);
    return () => clearInterval(periodicCheck);
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
    if (calorieIntake > dailyCalories) {
      toast({
        title: "Calorie Limit Exceeded",
        description: "You cannot consume more than your daily balance.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    const newCalorieCredit = calorieCredit - dailyCalories;
    setCalorieCredit(newCalorieCredit > 1500 ? 1500 : newCalorieCredit);
    if (caloriesUsed) {
      setDailyCalories(0);
    }
    const newHistory = [...history, { date, details, calories: calorieIntake }];
    if (newHistory.length > 10) newHistory.shift();
    setHistory(newHistory);
    localStorage.setItem("calorieHistory", JSON.stringify(newHistory));
    const maxAccumulation = 1500;
    if (newCalorieCredit >= maxAccumulation) {
      toast({
        title: "Accumulation Limit Reached",
        description: "You have reached the maximum accumulation limit.",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      setCalorieCredit(maxAccumulation);
    } else {
      setCalorieCredit(newCalorieCredit);
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
      <VStack spacing={10} w="full" maxW="md" p={12} boxShadow="0px 8px 26px rgba(0, 0, 0, 0.2)" m={12} bg="dark.800" borderRadius="lg">
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
        {!caloriesUsed && <Text fontSize="xl" fontWeight="bold">{`Calorie Credit: ${calorieCredit}`}</Text>}
        <Button leftIcon={<FaHistory />} colorScheme="red" variant="ghost" onClick={() => navigate("/history", { state: { history } })}>
          View History
        </Button>
      </VStack>
    </Flex>
  );
};

export default Index;
