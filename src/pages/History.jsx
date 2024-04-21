import { Box, Heading, List, ListItem, VStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState(() => {
    const storedHistory = localStorage.getItem("calorieHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        console.log("Fetched history:", parsedHistory);
        return parsedHistory;
      } catch (error) {
        console.error("Error parsing history from localStorage", error);
        return [];
      }
    } else {
      console.log("No history found in localStorage, initializing as empty array. Debugging fetch.");
      return [];
    }
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  const [editDetails, setEditDetails] = useState({ date: "", details: "", calories: 0 });

  const editEntry = (index) => {
    setEditIndex(index);
    setEditDetails({ ...history[index] });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    const updatedHistory = [...history];
    updatedHistory[editIndex] = editDetails;
    localStorage.setItem("calorieHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const updatedHistory = [...history];
    updatedHistory.splice(editIndex, 1);
    localStorage.setItem("calorieHistory", JSON.stringify(updatedHistory));
    setHistory(updatedHistory);
    setIsEditing(false);
  };
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const handleResetHistory = () => {
    setHistory([]);
    localStorage.setItem("calorieHistory", JSON.stringify([]));
    setIsResetConfirmOpen(false);
  };

  return (
    <VStack spacing={4} align="center" justify="center" h="100vh" bg="dark.900">
      <Button variant="ghost" leftIcon={<FaArrowLeft />} onClick={() => navigate("/")} position="absolute" top="4" left="4">
        Back
      </Button>
      <Heading size="lg" color="white" mt={4}>
        Calorie History
      </Heading>
      <Button colorScheme="red" mt="auto" onClick={() => setIsResetConfirmOpen(true)}>
        Reset History
      </Button>
      <Modal isOpen={isResetConfirmOpen} onClose={() => setIsResetConfirmOpen(false)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Reset</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to reset the entire history? This action cannot be undone.</ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleResetHistory}>
              Confirm
            </Button>
            <Button onClick={() => setIsResetConfirmOpen(false)}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {isEditing && (
        <Modal isOpen={isEditing} onClose={() => setIsEditing(false)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Entry</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Date</FormLabel>
                <Input value={editDetails.date} onChange={(e) => setEditDetails({ ...editDetails, date: e.target.value })} />
                <FormLabel>Details</FormLabel>
                <Input value={editDetails.details} onChange={(e) => setEditDetails({ ...editDetails, details: e.target.value })} />
                <FormLabel>Calories</FormLabel>
                <Input type="number" value={editDetails.calories} onChange={(e) => setEditDetails({ ...editDetails, calories: parseInt(e.target.value, 10) })} />
              </FormControl>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleSaveEdit}>
                Save Changes
              </Button>
              <Button colorScheme="red" onClick={handleDelete}>
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      console.log("Rendering history:", history);
      {history.length === 0 ? (
        <Box textAlign="center" fontSize="2xl" mt="8">
          <span role="img" aria-label="muscle">
            💪
          </span>
          <Text fontSize="lg" color="white">
            No calorie records found. Start tracking your intake!
          </Text>
        </Box>
      ) : (
        <List spacing={3}>
          {history.map((entry, index) => (
            <ListItem key={index} bg="dark.800" p={4} boxShadow="xl" display="flex" justifyContent="space-between" borderRadius="base">
              <Box>
                {entry.date}: {entry.details} - {entry.calories} calories
              </Box>
              <Button size="sm" colorScheme="blue" onClick={() => editEntry(index)}>
                Edit
              </Button>
            </ListItem>
          ))}
        </List>
      )}
    </VStack>
  );
};

export default History;
