import { Issue } from "@/redux/types";
import { Box, HStack, Text } from "@chakra-ui/react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { FC } from "react";

interface IssueCardProps {
  issue: Issue;
  columnId: string;
}

export const IssueCard: FC<IssueCardProps> = ({ issue, columnId }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: issue.id,
    data: { column: columnId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  const timeAgo = (date: string) => {
    const now = new Date();
    const created = new Date(date);
    const diffInMs = now.getTime() - created.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "today";
    if (diffInDays === 1) return "yesterday";
    return `${diffInDays} days ago`;
  };

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      p={4}
      marginBlock={4}
      borderRadius="md"
      boxShadow="md"
      bg="white"
      cursor="grab"
      _hover={{ boxShadow: "lg" }}
    >
      <Text fontWeight="bold" fontSize="md" color="gray.900" mb={1}>{issue.title}</Text>
      <Text fontSize="sm" color="gray.500" mb={2}>
        #{issue.number} opened {timeAgo(issue.created_at)}
      </Text>
      <Box borderTop="1px solid" borderColor="gray.200" mb={2} />
      <HStack justify="space-between" fontSize="sm" color="gray.600">
        <Text>🧑 {issue.user.login}</Text>
        <Text>💬 Comments: {issue.comments}</Text>
      </HStack>
    </Box>
  );
};
