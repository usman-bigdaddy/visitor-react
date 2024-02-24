import React, { useState } from "react";
import { Link } from "react-router-dom";
import { verifyInvite, updateInvitationCode } from "../../lib/api";
import Swal from "sweetalert";
const VerifyInvite = () => {
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const onVerifyCodeClick = async (e) => {
    e.preventDefault();
    try {
      setLoading(true); // Set loading to true when submitting
      const res = await verifyInvite(formData.code);
      if (res.data.success === true) {
        const guest = res.data.data.guest;
        const resident =
          res.data.data.creator.firstname +
          " " +
          res.data.data.creator.lastname;
        Swal({
          title: "Confirm Guest!",
          text: ` ${guest} has been invited to visit  ${resident}`,
          icon: "info",
          buttons: {
            confirm: {
              text: "Confirm",
              value: true,
              className: "swal-button swal-button--confirm",
            },
            reject: {
              text: "Reject",
              value: false,
              className: "swal-button swal-button--reject",
              dangerMode: true, // Apply danger mode only to reject button
            },
          }, // Make Confirm button red to indicate danger
        }).then(async (value) => {
          if (value) {
            // User clicked Confirm button
            const res = await updateInvitationCode(formData.code, true);
            if (res.data.success === true) {
              Swal("Success!", "Guest has been allowed access!", "success");
            } else {
              Swal("Ooops", "Error occured, Kindly try again", "error");
            }
          } else {
            // User clicked Reject or Cancel button
            Swal("Cancelled", "Guest has been denied access", "error");
          }
        });
      } else {
        Swal({
          title: "Error!",
          text: res.data.message,
          icon: "error",
        });
      }
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
              <form onSubmit={onVerifyCodeClick}>
                <div className="form-group pt-2">
                  <label htmlFor="hostelFor">Code</label>
                  <input
                    id="hostelFor"
                    required
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    placeholder="Enter Invite code"
                    className="form-control"
                  />
                </div>
                <div>
                  {showAlert && (
                    <div
                      className="alert alert-success alert-dismissible fade show"
                      role="alert"
                    >
                      Added Sucesfully!
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowAlert(false)}
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                  )}
                </div>
                <div className="form-group pt-2">
                  <button
                    className="btn btn-primary"
                    type="Verify"
                    disabled={loading}
                  >
                    {loading ? "Please wait..." : "Verify"}
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

export default VerifyInvite;
