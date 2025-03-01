import { Issue } from "@/redux/types";
import { FC } from "react";
import { useDroppable } from "@dnd-kit/core";
import { Box } from "@chakra-ui/react";
import { IssueCard } from "./IssueCard";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface ColumnProps {
  issues: Issue[];
  id: string;
  isHighlighted?: boolean;
}

export const Column: FC<ColumnProps> = ({ issues, id, isHighlighted }) => {
  const { setNodeRef } = useDroppable({ id, data: { column: id } });

  const validIssues = issues.filter(
    (issue): issue is Issue => issue !== null && issue !== undefined,
  );

  return (
    <Box
      ref={setNodeRef}
      p={4}
      bg={isHighlighted ? "gray.200" : "gray.100"}
      borderRadius="md"
      w="360px"
      minH="100px"
      maxH="100vh"
      overflowY="scroll"
      css={{
        "&": {
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE/Edge
        },
        "&::-webkit-scrollbar": {
          display: "none", // Chrome/Safari
        },
      }}
      transition="background-color 0.2s ease"
    >
      <SortableContext
        items={validIssues.map((issue) => issue.id)}
        strategy={verticalListSortingStrategy}
      >
        {validIssues.map((issue) => (
          <IssueCard key={issue.id} issue={issue} columnId={id}></IssueCard>
        ))}
      </SortableContext>
    </Box>
  );
};
