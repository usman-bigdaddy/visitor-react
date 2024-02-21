import React, { useState, useEffect } from "react";
import { getInvites } from "../../lib/api";
const Invites = () => {
  const [invites, setInvites] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInvites();
        setInvites(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">List of Invites</h6>
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
                <th>Guest Name</th>
              </tr>
            </thead>
            {invites && invites.length > 0 ? (
              <tbody>
                {invites.map((item) => (
                  <tr key={item._id}>
                    <td>
                      {item.creator.firstname} {item.creator.lastname}
                    </td>
                    <td>{item.creator.email}</td>
                    <td>{item.creator.phone.mobile}</td>
                    <td>{item.guest}</td>
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

export default Invites;
