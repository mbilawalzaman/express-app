export const validateIdParam = (req, res, next) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ message: "id must be a positive integer" });
  }

  req.resourceId = id;
  next();
};

export const validateNameBody = (req, res, next) => {
  const { name } = req.body;

  if (typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "name is required" });
  }

  req.body.name = name.trim();
  next();
};
