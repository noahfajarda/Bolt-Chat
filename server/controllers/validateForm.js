const Yup = require("yup")

// criteria as schema to validate form
const formSchema = Yup.object({
  username: Yup.string()
    .required("Username required")
    .min(6, "Username too short")
    .max(28, "Username too long"),
  password: Yup.string()
    .required("Password required")
    .min(6, "Password too short")
    .max(28, "Password too long"),
})


const validateForm = (req, res) => {
  const formData = req.body;

  // server-side form validation
  formSchema.validate(formData).catch(err => {

    // error handling if form doesn't meet validation
    console.log(err.errors);
    res.status(422).send();
  }).then(valid => {

    // form is validated
    if (valid) {
      console.log("Form is good")
    }
  })
}

module.exports = validateForm