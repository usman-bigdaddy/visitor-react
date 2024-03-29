import React, { useState, useEffect } from "react";
import { getResidents } from "../../lib/api";
const Owners = () => {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getResidents();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">List of Residents</h6>
      </div>
      <div class="card-body">
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
                <th>Occupation</th>
                <th>House Number</th>
              </tr>
            </thead>
            {users && users.length > 0 ? (
              <tbody>
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.user.firstname} {item.user.lastname}
                    </td>
                    <td>{item.user.email}</td>
                    <td>{item.user.phone.mobile}</td>
                    <td>{item.user.occupation}</td>
                    <td>{item.housenumber}</td>
                    {/* Add more table data as needed */}
                  </tr>
                ))}
              </tbody>
            ) : (
              <p>No users available.</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default Owners;
