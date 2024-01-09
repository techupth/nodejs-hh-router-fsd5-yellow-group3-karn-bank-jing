import { Router } from "express";
import { assignments as assignmentsFromFile } from "../data/assignments.js";
import { comments as commentsFromFile } from "../data/comments.js";

const assignments = [...assignmentsFromFile];
const comments = [...commentsFromFile];

const assignmentRouter = Router();

assignmentRouter.get("/assignments", (req, res) => {
  try {
    console.log(assignments);
    return res.json({
      data: assignments,
    });
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
});

assignmentRouter.get("/assignments/:id", (req, res) => {
  const assignmentId = +req.params.id;
  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignment = assignments.filter((assign) => assign.id === assignmentId);

  return res.json({
    data: assignment[0],
  });
});

assignmentRouter.post("/assignments", (req, res) => {
  const newAssignment = req.body;
  const newAssignmentId = assignments[assignments.length - 1].id + 1;

  assignments.push({
    id: newAssignmentId,
    ...newAssignment,
  });

  return res.json({
    message: "New assignment has been created successfully",
  });
});

assignmentRouter.put("/assignments/:id", (req, res) => {
  const updateAssignment = req.body;
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      messsage: `Assignment ${assignmentId} not found`,
    });
  }

  const assignmentIndex = assignments.findIndex((assign) => {
    return assign.id === assignmentId;
  });

  assignments[assignmentIndex] = {
    id: assignmentId,
    ...updateAssignment,
  };

  return res.json({
    message: `Assignment ${assignmentId} has been updated successfully`,
  });
});

assignmentRouter.delete("/assignments/:id", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = assignments.find((assign) => assign.id === assignmentId);

  if (!hasFound) {
    return res.status(404).json({
      message: `Assignment ${assignmentId} not found`,
    });
  }

  assignments = assignments.filter((assign) => {
    return assign.id !== assignmentId;
  });

  return res.json({
    message: `Assignment ${assignmentId} has been deleted successfully`,
  });
});

assignmentRouter.get("/assignments/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const assignmentComments = comments.filter((comment) => {
    return assignmentId == comment.assignmentId;
  });

  return res.json({
    data: assignmentComments,
  });
});

assignmentRouter.post("/assignments/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;
  const newComment = req.body;
  const commentId = comments[comments.length - 1].id + 1;

  comments.push({
    id: commentId,
    assignmentId,
    ...newComment,
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been added to assignment.`,
  });
});

assignmentRouter.delete("/assignments/:id/comments", (req, res) => {
  const assignmentId = +req.params.id;

  const hasFound = comments.find(
    (comment) => comment.assignmentId === assignmentId
  );
  if (!hasFound) {
    return res.status(404).json({
      message: `${assignmentId} not found`,
    });
  }

  comments = comments.filter((comment) => {
    return comment.assignmentId != assignmentId;
  });

  return res.json({
    message: `Comment of assignment ${assignmentId} has been deleted.`,
  });
});
export default assignmentRouter;
