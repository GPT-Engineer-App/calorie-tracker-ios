import { Box, Heading, List, ListItem, VStack } from "@chakra-ui/react";

const History = ({ history }) => {
  return (
    <VStack spacing={4} align="center" justify="center" h="100vh" bg="dark.900">
      <Heading size="lg" color="white">
        Calorie History
      </Heading>
      <List spacing={3}>
        {history.map((entry, index) => (
          <ListItem key={index} bg="dark.800" p={4} boxShadow="xl">
            {entry.date}: {entry.details} - {entry.calories} calories
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};

export default History;
