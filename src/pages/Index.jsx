import React, { useEffect, useState } from "react";
import { Container, VStack, Box, Text, Link, Spinner, Flex, Heading, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStoryUrl, setSelectedStoryUrl] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchTopStories = async () => {
      try {
        const response = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
        const storyIds = await response.json();
        const top10StoryIds = storyIds.slice(0, 10);

        const storyPromises = top10StoryIds.map(async (id) => {
          const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
          return storyResponse.json();
        });

        const stories = await Promise.all(storyPromises);
        setStories(stories);
      } catch (error) {
        console.error("Error fetching top stories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopStories();
  }, []);

  const handlePreviewClick = (url) => {
    setSelectedStoryUrl(url);
    onOpen();
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8}>
        <Heading as="h1" size="xl" mb={4}>
          Hacker News Top Stories
        </Heading>
        {loading ? (
          <Spinner size="xl" />
        ) : (
          stories.map((story) => (
            <Box key={story.id} p={4} borderWidth="1px" borderRadius="md" w="100%">
              <Link href={story.url} isExternal fontSize="xl" fontWeight="bold">
                {story.title} <FaExternalLinkAlt mx="2px" />
              </Link>
              <Text fontSize="md">by {story.by}</Text>
              <Button mt={2} colorScheme="teal" onClick={() => handlePreviewClick(story.url)}>
                Preview
              </Button>
            </Box>
          ))
        )}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Article Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <iframe src={selectedStoryUrl} width="100%" height="400px" style={{ border: "none" }}></iframe>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Index;