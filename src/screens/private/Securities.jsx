import React, { useState, useEffect } from "react";
import { getSecurities, updateSecurityStatus } from "../../lib/api";
import SecurityTable from "../../components/SecurityTable";
const Securities = () => {
  const [data, setData] = useState(null);
  const fetchData = async () => {
    try {
      const response = await getSecurities();
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleCheckboxChange = (index, id) => {
    const newData = [...data];
    update(id, !newData[index].onDuty);
  };
  const update = async (user, onDuty) => {
    try {
      const response = await updateSecurityStatus(user, onDuty);
      fetchData();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">List of Securities</h6>
      </div>
      <div class="card-body">
        <div class="table-responsive">
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
                        <td>{item.onDuty ? "Yes" : "No"}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={item.onDuty}
                            onChange={() =>
                              handleCheckboxChange(index, item.user._id)
                            }
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
        </div>
      </div>
    </div>
  );
};

export default Securities;
