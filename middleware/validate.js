import { check, validationResult } from "express-validator";

export const validateLogin = [
  check("username", "Please enter a username")
    .notEmpty()
    .isString()
    .isLength({ min: 1 }),
  check("password", "Please enter a password")
    .notEmpty()
    .isString()
    .isLength({ min: 1 }),
  handleValidation,
];

export const validateThumnailUrl = [
  check("url", "Please input a valid url").isURL(),
  handleValidation,
];

export const validatePatch = [
  check("data", "data must be an object").isObject(),
  check("patch", "patch must be an array").isArray(),
  handleValidation,
];

function handleValidation(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  next();
}
