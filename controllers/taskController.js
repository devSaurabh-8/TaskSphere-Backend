import Task from "../models/taskModel.js";

export const createTask = async (req, res, next) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user.id });
    res.status(201).json(task);
  } catch (e) { next(e); }
};

export const getTasks = async (req, res, next) => {
  try {
    const { q } = req.query;
    const filter = { user: req.user.id };
    if (q) filter.title = { $regex: q, $options: "i" };
    const tasks = await Task.find(filter).sort({ createdAt: -1 });
    res.json(tasks);
  } catch (e) { next(e); }
};

export const updateTask = async (req, res, next) => {
  try {
    const t = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!t) return res.status(404).json({ message: "Task not found" });
    res.json(t);
  } catch (e) { next(e); }
};

export const deleteTask = async (req, res, next) => {
  try {
    const t = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!t) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
};
