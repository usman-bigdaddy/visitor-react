import React, { useState } from "react";
import { updateSecurityStatus } from "../lib/api";
const SecurityTable = ({ jsonData }) => {
  const [data, setData] = useState(jsonData);
  const handleCheckboxChange = (index, id) => {
    const newData = [...data];
    newData[index].onduty = !newData[index].onduty;
    setData(newData);
    update(id, newData[index].onduty);
  };
  const update = async (user, onDuty) => {
    try {
      const response = await updateSecurityStatus(user, onDuty);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div class="table-responsive">
        <table
          class="table table-sm table-hover"
          id="dataTable"
          width="100%"
          cellspacing="0"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Gender</th>
              <th>On Duty</th>
            </tr>
          </thead>
          {data && data.length > 0 ? (
            <tbody>
              {data.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    {item.user.firstname} {item.user.lastname}
                  </td>
                  <td>{item.user.email}</td>
                  <td>{item.user.phone.mobile}</td>
                  <td>{item.user.gender}</td>
                  <td>{item.onduty ? "Yes" : "No"}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={item.onduty}
                      onChange={() => handleCheckboxChange(index, item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <p>No Securities available.</p>
          )}
        </table>
      </div>
    </>
  );
};

export default SecurityTable;
