import { RootState } from "@/redux/store";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { Column } from "./Column";
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import { setIssues } from "@/redux/slices/issuesSlice";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { Issue } from "@/redux/types";
import { IssueCard } from "./IssueCard";

export const Board = () => {
  const dispatch = useDispatch();
  const { repos, currentRepo } = useSelector((state: RootState) => state.issues);
  const columns = repos[currentRepo] || { todo: [], inProgress: [], done: [] };
  const { todo, inProgress, done } = columns;
  const [draggedIssue, setDraggedIssue] = useState<Issue | null>(null);
  const [highlightedColumn, setHighlightedColumn] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const issue = [...todo, ...inProgress, ...done].find((i) => i?.id === event.active.id);
    setDraggedIssue(issue || null);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { over } = event;
    if (!over) {
      setHighlightedColumn(null);
      return;
    }

    const toColumn = (over.data.current?.column || over.id) as "todo" | "inProgress" | "done";
    setHighlightedColumn(toColumn);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setDraggedIssue(null);
    setHighlightedColumn(null);
    if (!over || !currentRepo) return;

    const issueId = active.id as number;
    const fromColumn = active.data.current?.column as "todo" | "inProgress" | "done";
    const toColumn = (over.data.current?.column || over.id) as "todo" | "inProgress" | "done";

    const sourceIssues = columns[fromColumn];
    const targetIssues = columns[toColumn];

    const issue = sourceIssues.find((i) => i?.id === issueId);
    if (!issue) return;

    if (fromColumn === toColumn) {
      const oldIndex = sourceIssues.findIndex((i) => i?.id === issueId);
      const newIndex = over.data.current?.sortable
        ? targetIssues.findIndex((i) => i?.id === over.id)
        : oldIndex;
      if (oldIndex !== newIndex && newIndex !== -1) {
        const reorderedIssues = arrayMove(sourceIssues, oldIndex, newIndex);
        dispatch(
          setIssues({
            repoKey: currentRepo,
            columns: { ...columns, [toColumn]: reorderedIssues },
          }),
        );
      }
    } else {
      const newSourceIssues = sourceIssues.filter((i) => i?.id !== issueId);
      const overIndex = over.data.current?.sortable
        ? targetIssues.findIndex((i) => i?.id === over.id)
        : targetIssues.length;
      const newTargetIssues =
        overIndex >= 0
          ? arrayMove([...targetIssues], targetIssues.length, overIndex)
          : [...targetIssues];
      newTargetIssues.splice(overIndex >= 0 ? overIndex : targetIssues.length, 0, issue);

      dispatch(
        setIssues({
          repoKey: currentRepo,
          columns: {
            ...columns,
            [fromColumn]: newSourceIssues,
            [toColumn]: newTargetIssues,
          },
        }),
      );
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragOver={handleDragOver} onDragEnd={handleDragEnd}>
      <HStack alignItems="flex-start" gap={4} p={4} overflowX="auto">
        <VStack gap={2}>
          <Text fontSize="md" fontWeight="bold" textAlign="center">
            ToDo 🔥
          </Text>
          <Column issues={todo} id="todo" isHighlighted={highlightedColumn === "todo"} />
        </VStack>
        <VStack gap={2}>
          <Text fontSize="md" fontWeight="bold" textAlign="center">
            In Progress ⏳
          </Text>
          <Column
            issues={inProgress}
            id="inProgress"
            isHighlighted={highlightedColumn === "inProgress"}
          />
        </VStack>
        <VStack gap={2}>
          <Text fontSize="md" fontWeight="bold" textAlign="center">
            Done ✅
          </Text>
          <Column issues={done} id="done" isHighlighted={highlightedColumn === "done"} />
        </VStack>
      </HStack>
      <DragOverlay>
        {draggedIssue ? <IssueCard issue={draggedIssue} columnId="overlay" /> : null}
      </DragOverlay>
    </DndContext>
  );
};
