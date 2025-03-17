import React, { useState } from "react";
import { PiCowDuotone } from "react-icons/pi";
import MainLayout from "@/layouts/MainLayout";

const MAX_AGE = {
  Cow: 20,
  Goat: 15,
};

const ManageLivestock = () => {
  const [livestock, setLivestock] = useState([
    {
      id: 1,
      type: "Cow",
      tag: "101",
      breed: "Angus",
      age: 3,
      status: "Healthy",
    },
    {
      id: 2,
      type: "Cow",
      tag: "102",
      breed: "Hereford",
      age: 4,
      status: "Sick",
    },
    {
      id: 3,
      type: "Cow",
      tag: "103",
      breed: "Holstein",
      age: 2,
      status: "Healthy",
    },
  ]);

  const [newAnimal, setNewAnimal] = useState({
    type: "Cow",
    tag: "",
    breed: "",
    age: "",
    status: "Healthy",
  });

  const [viewAnimal, setViewAnimal] = useState(null); // State to hold the animal details for viewing

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addLivestock = () => {
    if (!newAnimal.tag || !newAnimal.breed || !newAnimal.age) {
      alert("Please fill in all fields!");
      return;
    }

    const ageLimit = MAX_AGE[newAnimal.type];
    if (parseInt(newAnimal.age) > ageLimit) {
      alert(`${newAnimal.type} age cannot exceed ${ageLimit} years.`);
      return;
    }

    setLivestock((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        ...newAnimal,
        age: parseInt(newAnimal.age),
      },
    ]);

    // Reset form & close modal
    setNewAnimal({
      type: "Cow",
      tag: "",
      breed: "",
      age: "",
      status: "Healthy",
    });
    document.getElementById("add_livestock_modal").close();
  };

  const deleteLivestock = (id) => {
    setLivestock(livestock.filter((animal) => animal.id !== id));
  };

  const openViewModal = (animal) => {
    setViewAnimal(animal);
    document.getElementById("view_livestock_modal").showModal();
  };

  const closeViewModal = () => {
    setViewAnimal(null);
    document.getElementById("view_livestock_modal").close();
  };

  return (
    <MainLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Manage Livestock</h2>
          <button
            className="btn btn-accent btn-soft"
            onClick={() =>
              document.getElementById("add_livestock_modal").showModal()
            }
          >
            + Add Livestock
          </button>
        </div>

        {/* Livestock List */}
        <ul className="list bg-base-100 p-4">
          {livestock.map((animal, index) => (
            <li
              key={animal.id}
              className="list-row flex rounded-none items-center justify-between p-4 border-gray-600 border-b"
            >
              <div className="flex space-x-4">
                <div className="text-4xl font-thin opacity-30">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <PiCowDuotone className="text-4xl text-accent" />
                <div className="list-col-grow">
                  <div className="font-semibold">
                    {animal.type} #{animal.tag}
                  </div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {animal.breed} - {animal.age} yrs - {animal.status}
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="btn btn-soft btn-sm"
                  onClick={() => openViewModal(animal)}
                >
                  View
                </button>
                <button
                  className="btn btn-error btn-soft btn-sm"
                  onClick={() => deleteLivestock(animal.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Livestock Modal */}
      <dialog id="add_livestock_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add New Livestock</h3>
          <form method="dialog" className="space-y-4">
            <select
              name="type"
              value={newAnimal.type}
              onChange={handleChange}
              className="input input-bordered w-full"
            >
              <option value="Cow">Cow</option>
              <option value="Goat">Goat</option>
            </select>
            <input
              type="text"
              name="tag"
              value={newAnimal.tag}
              onChange={handleChange}
              placeholder="Cow Tag (e.g., 201)"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="breed"
              value={newAnimal.breed}
              onChange={handleChange}
              placeholder="Breed"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              name="age"
              value={newAnimal.age}
              onChange={handleChange}
              placeholder="Age (Years)"
              min="0"
              max={MAX_AGE[newAnimal.type]}
              className="input input-bordered w-full"
            />
            <input
              type="text"
              name="status"
              value={newAnimal.status}
              onChange={handleChange}
              placeholder="Health Status"
              className="input input-bordered w-full"
            />
            <div className="modal-action">
              <button
                type="button"
                className="btn"
                onClick={() =>
                  document.getElementById("add_livestock_modal").close()
                }
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={addLivestock}
              >
                Add
              </button>
            </div>
          </form>
        </div>
      </dialog>

      {/* View Livestock Modal */}
      <dialog id="view_livestock_modal" className="modal">
        <div className="modal-box">
          {viewAnimal && (
            <>
              <h3 className="font-bold text-lg">View Livestock Details</h3>
              <div className="space-y-4">
                <div>
                  <strong>Animal Type:</strong> {viewAnimal.type}
                </div>
                <div>
                  <strong>Cow Tag:</strong> {viewAnimal.tag}
                </div>
                <div>
                  <strong>Breed:</strong> {viewAnimal.breed}
                </div>
                <div>
                  <strong>Age:</strong> {viewAnimal.age} years
                </div>
                <div>
                  <strong>Health Status:</strong> {viewAnimal.status}
                </div>
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={closeViewModal}>
                  Close
                </button>
              </div>
            </>
          )}
        </div>
      </dialog>
    </MainLayout>
  );
};

export default ManageLivestock;
