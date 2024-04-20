import { Box, Heading, List, ListItem, VStack, Button } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const history = state?.history || [];

  const editEntry = (index) => {
   
    console.log("Edit entry at index:", index);
  };
  return (
    <VStack spacing={4} align="center" justify="center" h="100vh" bg="dark.900">
      <Button colorScheme="red" onClick={() => navigate("/")}>
        Back to Main
      </Button>
      <Heading size="lg" color="white" mt={4}>
        Calorie History
      </Heading>
      <List spacing={3}>
        {history.map((entry, index) => (
          <ListItem key={index} bg="dark.800" p={4} boxShadow="xl" display="flex" justifyContent="space-between">
            <Box>
              {entry.date}: {entry.details} - {entry.calories} calories
            </Box>
            <Button size="sm" colorScheme="blue" onClick={() => editEntry(index)}>
              Edit
            </Button>
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default History;
