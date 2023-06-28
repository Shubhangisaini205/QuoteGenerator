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
  Divider,
  Select,
} from "@chakra-ui/react";
const QuoteGenerator = () => {
  const [type, setType] = useState("Quote")
  const [quote, setQuote] = useState("");
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false)
  console.log(type)
  const generateQuote = () => {
    setLoading(true)
    fetch(`http://localhost:8080/generate?type=${type}`,
      {
        method: 'POST',
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ keyword: `on ${userInput}` }),
      }
    ).then((res) => res.json())
      .then((res) => {
        setLoading(false)
        console.log(res)
        setQuote(res)
      })
  };

  console.log("U", type)
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
            {type} Generator
          </Heading>
          <Grid templateColumns="1fr" gap={4}>
            <Select onChange={(e) => setType(e.target.value)}>
              <option value="Quote">Quote</option>
              <option value="Shayari">Shayari</option>
              <option value="Joke">Joke</option>
              <option value="Story">Story</option>
            </Select>
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
                Generate {type}
              </Button>
            </GridItem>
            {quote && (
              <GridItem>
                <Box bg="gray.200" borderRadius="md" p={4}>
                  <Text fontSize="lg" fontWeight="bold" mb={2}>
                    Generated {type}:
                  </Text>
                  {
                    loading ? <Text>Loading........</Text> : typeof (quote) == Object ?
                      quote.map((el, i) => {

                        return (<Box key={i}>
                          <Text fontSize="lg">{el}</Text>
                        </Box>)


                      }) : <Text fontSize="lg">{quote}</Text>
                  }


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
