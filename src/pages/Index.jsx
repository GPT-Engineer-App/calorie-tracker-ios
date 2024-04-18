// Caloria - A simple calorie tracking web application
import { useState } from "react";
import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Switch, Text, VStack, useToast } from "@chakra-ui/react";
import { FaSave, FaHistory } from "react-icons/fa";

const Index = () => {
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("calorieHistory")) || []);
  const [caloriesUsed, setCaloriesUsed] = useState(false);
  const [details, setDetails] = useState("");
  const [accumulatedCalories, setAccumulatedCalories] = useState(0);
  const toast = useToast();

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

    const newAccumulatedCalories = accumulatedCalories + 150;
    const newHistory = [...history, { date, details, calories: newAccumulatedCalories }];
    if (newHistory.length > 10) newHistory.shift();
    setHistory(newHistory);
    localStorage.setItem("calorieHistory", JSON.stringify(newHistory));
    setAccumulatedCalories(newAccumulatedCalories > 1500 ? 1500 : newAccumulatedCalories);

    toast({
      title: "Entry Saved",
      description: "Your calorie data has been saved successfully.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" align="center" justify="center" h="100vh" bg="dark.900">
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
        <Button leftIcon={<FaHistory />} colorScheme="red" variant="ghost" onClick={() => navigate("/history")}>
          View History
        </Button>
      </VStack>
    </Flex>
  );
};

export default Index;
