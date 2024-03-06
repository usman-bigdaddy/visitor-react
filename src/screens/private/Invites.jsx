import React, { useState, useEffect } from "react";
import { getInvites, getResidents, getResidentsInvites } from "../../lib/api";
const Invites = () => {
  const [invites, setInvites] = useState([]);
  const [residents, setResidents] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Ensure leading zero for single digit day and month
    const formattedDay = day < 10 ? "0" + day : day;
    const formattedMonth = month < 10 ? "0" + month : month;

    return formattedDay + "/" + formattedMonth + "/" + year;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const residentsResponse = await getResidents();
        setResidents(residentsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  const handleSelectChange = async (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    setInvites([]);
    if (selectedValue != "") {
      const res = await getResidentsInvites(selectedValue);
      setInvites(res.data);
    }
  };
  return (
    <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">List of Invites</h6>
      </div>
      <div class="card-body">
        <select
          className="form-control"
          value={selectedOption}
          onChange={handleSelectChange}
        >
          <option value={""}>--- Choose Resident --- </option>
          {residents &&
            residents.map((item, index) => (
              <option key={index} value={item.user._id}>
                {item.user.firstname +
                  " " +
                  item.user.lastname +
                  " House number (" +
                  item.housenumber +
                  ")"}
              </option>
            ))}
        </select>
        <div class="table-responsive">
          <table
            class="table table-sm table-hover"
            id="dataTable"
            width="100%"
            cellspacing="0"
          >
            <thead>
              <tr>
                <th>Invite Code</th>
                <th>Guest Name</th>
                <th>Code Type</th>
                <th>Date Expected</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            {invites && invites.length > 0 ? (
              <tbody>
                {invites.map((item) => (
                  <tr key={item._id}>
                    <td>{item.code}</td>
                    <td>{item.guest}</td>
                    <td>{item.codeType}</td>
                    <td>{formatDate(item.dateExpected)}</td>
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
