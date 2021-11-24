import { check, validationResult } from "express-validator";

export const validateLogin = [
  check("username", "Please enter a username").notEmpty().isString(),
  check("password", "Please enter a password").notEmpty().isString(),
  handleValidation,
];

export const validateThumnailUrl = [
  check("url", "Please input a valid url").isURL(),
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
