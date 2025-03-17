import React, { useState } from "react";
import MainLayout from "@/layouts/MainLayout";

const Index = () => {
  const [headers, setHeaders] = useState([
    { id: 1, name: "John Doe", phone: "+1234567890", role: "Owner" },
    { id: 2, name: "Jane Smith", phone: "+0987654321", role: "Manager" },
  ]);

  const [newHeader, setNewHeader] = useState({
    name: "",
    phone: "",
    role: "Owner", // Default role
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHeader((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addHeader = () => {
    if (!newHeader.name || !newHeader.phone) {
      alert("Please fill in all fields!");
      return;
    }

    setHeaders((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newHeader,
      },
    ]);

    // Reset form
    setNewHeader({ name: "", phone: "", role: "Owner" });
    document.getElementById("add_header_modal").close();
  };

  const deleteHeader = (id) => {
    setHeaders(headers.filter((header) => header.id !== id));
  };

  const sendAlert = (header) => {
    // Placeholder for sending alerts via SMS
    alert(`Sending alert to ${header.name} at ${header.phone}`);
  };

  const sendInstructions = (header) => {
    // Placeholder for sending custom instructions via SMS
    alert(`Sending custom instructions to ${header.name} at ${header.phone}`);
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Livestock Headers</h2>
          <button
            className="btn btn-accent btn-soft"
            onClick={() =>
              document.getElementById("add_header_modal").showModal()
            }
          >
            + Add Header
          </button>
        </div>

        {/* Headers List */}
        <ul className="list bg-base-100 p-4">
          {headers.map((header) => (
            <li
              key={header.id}
              className="list-row flex rounded-none items-center justify-between p-4 border-gray-600 border-b"
            >
              <div className="flex space-x-4">
                <div className="list-col-grow">
                  <div className="font-semibold">{header.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {header.role} - {header.phone}
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="btn btn-soft btn-sm"
                  onClick={() => sendAlert(header)}
                >
                  Send Alert
                </button>
                <button
                  className="btn btn-soft btn-sm"
                  onClick={() => sendInstructions(header)}
                >
                  Send Instructions
                </button>
                <button
                  className="btn btn-error btn-soft btn-sm"
                  onClick={() => deleteHeader(header.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Header Modal */}
      <dialog id="add_header_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Header</h3>
          <form method="dialog" className="space-y-4">
            <input
              type="text"
              name="name"
              value={newHeader.name}
              onChange={handleChange}
              placeholder="Name"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="phone"
              value={newHeader.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            <select
              name="role"
              value={newHeader.role}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option value="goat-header">Goat Section</option>
              <option value="cow-header">Cow Section</option>
            </select>
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("add_header_modal").close()
                }
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={addHeader}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </MainLayout>
  );
};

export default Index;
