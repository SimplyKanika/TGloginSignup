const db = require("../../app"); // Ensure this points to your database configuration
const signup = db.signup; // Signup model

// Function to create a new user
exports.create = (req, res) => {
    console.log(req.body);

    // Validate request
    if (!req.body.student_name ||
        !req.body.gender ||
        !req.body.stud_phone_no ||
        !req.body.stud_email ||
        !req.body.Branch ||
        !req.body.Division ||
        !req.body.father_name ||
        !req.body.father_phone_no ||
        !req.body.mother_name ||
        !req.body.mother_phone_no ||
        !req.body.year_of_admission ||
        !req.body.pincode ||
        !req.body.surname ||
        !req.body.student_address) {
        return res.status(400).send({
            message: "Content cannot be empty! Please fill all mandatory fields."
        });
    }

    // Create a user object
    const user = {
        student_name: req.body.student_name,
        surname: req.body.surname,
        gender: req.body.gender,
        stud_phone_no: req.body.stud_phone_no,
        stud_email: req.body.stud_email,
        Branch: req.body.Branch,
        Division: req.body.Division,
        father_name: req.body.father_name,
        father_email: req.body.father_email || null, // Optional field
        father_phone_no: req.body.father_phone_no,
        mother_name: req.body.mother_name,
        mother_email: req.body.mother_email || null, // Optional field
        mother_phone_no: req.body.mother_phone_no,
        year_of_admission: req.body.year_of_admission,
        student_address: req.body.student_address,
        pincode: req.body.pincode
    };

    // Save user to the database
    signup.create(user)
        .then(data => {
            res.status(201).send({
                message: "User created successfully!",
                data: data
            });
        })
        .catch(err => {
            console.error("Error creating user:", err);
            res.status(500).send({
                message: err.message || "Some error occurred while creating the user."
            });
        });
};