"use client";

import { useRef, DragEvent } from "react";
import clsx from "clsx";

import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";
import AddTask from "./AddTask";

import { DragEnterItem } from "@/types";
import { useIsCursorOnTop } from "@/store";

const TasksColumn = ({
  title,
  tasks,
  columnId,
  onDrop,
  dragItem,
  dragEnterItem,
  onDragStart,
  onDragEnter,
  onDragLeave,
}: {
  title: string;
  tasks: any;
  columnId: string;
  dragItem: any;
  dragEnterItem: any;
  onDragStart: (item: any) => void;
  onDrop: (columnId: string, index: number) => void;
  onDragEnter: (dragEnterItem: DragEnterItem) => void;
  onDragLeave: () => void;
}) => {
  const liRef = useRef<HTMLLIElement>(null);
  const [isCurrentCursorOnTop, setIsCurrentCursorOnTop] = useIsCursorOnTop(
    ({ isCursorOnTop, setIsCursorOnTop }) => [isCursorOnTop, setIsCursorOnTop]
  );
  const handleDrop = (e: DragEvent) => {
    e.stopPropagation();
    onDrop(columnId, tasks.length);
  };

  const handleDragEnter = () => {
    onDragEnter({ columnId, index: tasks.length ? tasks.length - 1 : 0 });
    if (isCurrentCursorOnTop) {
      setIsCurrentCursorOnTop(false);
    }
  };

  const isDraggedOver =
    dragItem &&
    (!dragEnterItem || (dragEnterItem && dragEnterItem.columnId === columnId));
  console.log(dragItem?.columnId, columnId, dragEnterItem?.columnId);
  return (
    <li
      ref={liRef}
      className={clsx("min-h-screen px-2")}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDragEnter={handleDragEnter}
    >
      <div
        className={clsx(
          "p-2 flex flex-col h-fit rounded-lg border-solid border-2  bg-gray-200",
          isDraggedOver ? "border-red-600" : "border-gray-200"
        )}
        onDragOver={(e) => {
          e.preventDefault();
        }}
      >
        <TaskTitle
          title={title}
          columnId={columnId}
          onDragEnter={onDragEnter}
          tasksLength={tasks.length}
        />
        <ol
          className="list-none flex flex-col gap-2 pointer-events-none"
          onDrop={() => {
            console.log("drop, here2");
          }}
        >
          {dragItem &&
            dragEnterItem &&
            dragEnterItem.columnId === columnId &&
            !tasks.length && (
              <div
                className="w-[272px] bg-gray-300 rounded-lg mb-2 pointer-events-none"
                style={{ height: dragItem.item.height ?? 40 }}
                data-draggedover={true}
              ></div>
            )}
          {tasks.map((task: any, i: number) => (
            <TaskCard
              dragItem={dragItem}
              dragEnterItem={dragEnterItem}
              columnId={columnId}
              key={task.id}
              index={i}
              task={task}
              title={title}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragEnter={onDragEnter}
              onDragLeave={onDragLeave}
            />
          ))}
        </ol>
        <AddTask columnId={columnId} tasksLength={tasks.length} />
      </div>
    </li>
  );
};

export default TasksColumn;
