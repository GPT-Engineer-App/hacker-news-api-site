import React, { useEffect, useState } from "react";
import { Container, VStack, Box, Text, Link, Spinner, Flex, Heading } from "@chakra-ui/react";
import { ExternalLinkIcon } from "react-icons/fa";

const Index = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

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
                {story.title} <ExternalLinkIcon mx="2px" />
              </Link>
              <Text fontSize="md">by {story.by}</Text>
            </Box>
          ))
        )}
      </VStack>
    </Container>
  );
};

export default Index;