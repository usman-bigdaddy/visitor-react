import React, { useState } from "react";
import { Link } from "react-router-dom";
import { createUser } from "../../lib/api";
const AddResident = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    gender: "",
    dob: "",
    housenumber: "",
    nin: "",
    occupation: "",
    phone: {
      home: "",
      mobile: "",
    },
    email: "",
    role: "user",
    password: "1234",
    // Add other form fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the field is a nested property (e.g., phone.home or phone.mobile)
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      // If the field is not a nested property
      setFormData({ ...formData, [name]: value });
    }
  };
  const onCreateUserClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when submitting
      const res = await createUser(formData);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div class="row">
        <div class="col-xl-12">
          <div class="card mb-4">
            <div class="card-body">
              <Link to="/residents">
                <button className="btn btn-primary">View Residents</button>
              </Link>
              <form onSubmit={onCreateUserClick}>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">First Name</label>
                  <input
                    id="hostelFor"
                    required
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                    placeholder="Enter First Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Last Name</label>
                  <input
                    id="Surname"
                    required
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                    placeholder="Enter Last Name"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Email</label>
                  <input
                    id="Surname"
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Email"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Phone Number (Home)</label>
                  <input
                    id="PhoneNumber"
                    required
                    name="phone.home"
                    value={formData.phone.home}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Phone Number (Mobile)</label>
                  <input
                    id="PhoneNumber"
                    required
                    name="phone.mobile"
                    value={formData.phone.mobile}
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Gender</label>
                  <select
                    id="hostelFor"
                    required
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    placeholder="Enter Gender"
                    className="form-control"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Date of Birth</label>
                  <input
                    id="hostelFor"
                    required
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    type="date"
                    placeholder="Enter Gender"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Occupation</label>
                  <input
                    id="hostelFor"
                    required
                    name="occupation"
                    value={formData.occupation}
                    onChange={handleChange}
                    placeholder="Enter Occupation"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">House Number</label>
                  <input
                    id="hostelFor"
                    required
                    name="housenumber"
                    value={formData.housenumber}
                    onChange={handleChange}
                    placeholder="Enter House Number"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">NIN</label>
                  <input
                    id="hostelFor"
                    required
                    name="nin"
                    value={formData.nin}
                    onChange={handleChange}
                    placeholder="Enter NIN"
                    className="form-control"
                  />
                </div>
                <div className="form-group pt-2">
                  <button
                    className="btn btn-primary"
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddResident;
