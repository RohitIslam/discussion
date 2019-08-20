const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateEducationInput(data) {
  let errors = {};

  data.school = !isEmpty(data.school) ? data.school : "";
  data.degree = !isEmpty(data.degree) ? data.degree : "";
  data.feildOfStudy = !isEmpty(data.feildOfStudy) ? data.feildOfStudy : "";
  data.from = !isEmpty(data.from) ? data.from : "";

  if (validator.isEmpty(data.school)) {
    errors.school = "School is required";
  }

  if (validator.isEmpty(data.degree)) {
    errors.degree = "Degree is required";
  }

  if (validator.isEmpty(data.feildOfStudy)) {
    errors.feildOfStudy = "Field of study is required";
  }

  if (validator.isEmpty(data.from)) {
    errors.from = "From data field is required";
  }

  return { errors, isValid: isEmpty(errors) };
};
