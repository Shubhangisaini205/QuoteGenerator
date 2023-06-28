import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  Button,
  Text,
  Container,
  Grid,
  GridItem,
} from "@chakra-ui/react";
const QuoteGenerator = () => {
  const [quote, setQuote] = useState('');
  const [userInput, setUserInput] = useState('');

  const generateQuote = () => {
    fetch('https://quote-generator-xuh9.onrender.com/quote',
      {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ keyword: `on ${userInput}` }),
      }
    ).then((res) => res.json())
      .then((res) => {
        console.log(res)
        setQuote(res)
      })
  };

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  return (
    <Box bg="purple.400" minHeight="100vh" py={8}>
    <Container maxW="xl">
      <Box
        bg="white"
        borderRadius="lg"
        p={8}
        boxShadow="md"
        textAlign="center"
      >
        <Heading as="h2" mb={8} color="purple.500">
          Random Quote Generator
        </Heading>
        <Grid templateColumns="1fr" gap={4}>
          <GridItem>
            <Input
              placeholder="Enter your input..."
              value={userInput}
              onChange={handleUserInput}
              bg="gray.200"
              color="gray.800"
              borderRadius="md"
              p={4}
              _placeholder={{ color: "gray.400" }}
            />
          </GridItem>
          <GridItem>
            <Button
              colorScheme="purple"
              onClick={generateQuote}
              w="100%"
              _hover={{ bg: "purple.600" }}
            >
              Generate Quote
            </Button>
          </GridItem>
          {quote && (
            <GridItem>
              <Box bg="gray.200" borderRadius="md" p={4}>
                <Text fontSize="lg" fontWeight="bold" mb={2}>
                  Generated Quote:
                </Text>
                <Text fontSize="lg">{quote}</Text>
              </Box>
            </GridItem>
          )}
        </Grid>
      </Box>
    </Container>
  </Box>
  );
};

export default QuoteGenerator;
