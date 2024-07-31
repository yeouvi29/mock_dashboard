"use client";

import clsx from "clsx";

import { useDropTask } from "@/hooks/useDropTask";
import { useIsCursorOnTop, useTaskItems } from "@/store";

import TasksColumn from "./TasksColumn";

const BoardSection = () => {
  const [
    taskItems,
    dragItem,
    dragEnterItem,
    setDragItem,
    setDragEnterItem,
    resetDrag,
    setTaskItems,
  ] = useTaskItems(
    ({ items, drag, setTaskItems, setDragStart, setDragEnter, resetDrag }) => [
      items,
      drag.start,
      drag.enter,
      setDragStart,
      setDragEnter,
      resetDrag,
      setTaskItems,
    ]
  );

  const { handleDrop } = useDropTask();

  console.log("dragEnter", dragEnterItem?.index, "dragstart", dragItem?.item);

  return (
    <ol
      className={clsx("flex mt-4 list-none")}
      onDragOver={(e) => e.preventDefault()}
    >
      {taskItems.map((item) => (
        <TasksColumn
          key={item.id}
          columnId={item.id}
          title={item.title}
          tasks={item.items}
          dragItem={dragItem}
          dragEnterItem={dragEnterItem}
          onDrop={handleDrop}
          onDragStart={setDragItem}
          onDragEnter={setDragEnterItem}
          onDragLeave={resetDrag}
        />
      ))}
    </ol>
  );
};

export default BoardSection;
