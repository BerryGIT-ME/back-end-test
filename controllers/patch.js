import jsonpatch from "jsonpatch";

export function patch(req, res) {
  const { data, patch } = req.body;
  try {
    const newData = jsonpatch.apply_patch(data, patch);
    res.status(200).send(newData);
  } catch (error) {
    res.status(500).json({
      message:
        error.message || "An unexpected error has occured please try again",
    });
  }
}
