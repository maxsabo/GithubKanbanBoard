import { Box, HStack, Link, Text } from "@chakra-ui/react";
import { FC } from "react";

interface RepositoryInfoProps {
  owner: string;
  name: string;
  stars: number;
}

export const RepositoryInfo: FC<RepositoryInfoProps> = ({ owner, name, stars }) => {
  return <Box w="100%" textAlign="left">
    <HStack gap={2}>
      <Link
        href={`https://github.com/${owner}`}
        target="_blank"
        rel="noopener noreferrer"
        color="blue.500"
        fontWeight="bold"
      >
        {owner}
      </Link>
      <Text color={"blue.500"} fontWeight="bold">
        {">"}
      </Text>
      <Link
        href={`https://github.com/${owner}/${name}`}
        target="_blank"
        rel="noopener noreferrer"
        color="blue.500"
        fontWeight="bold"
      >
        {name}
      </Link>
      <Text pl={4}>⭐ {stars} stars</Text>
    </HStack>
  </Box>;
};
