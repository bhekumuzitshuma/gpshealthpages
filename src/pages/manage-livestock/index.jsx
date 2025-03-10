import React, { useState } from "react";
import { PiCowDuotone } from "react-icons/pi";
import MainLayout from "@/layouts/MainLayout";

const ManageLivestock = () => {
  const [livestock, setLivestock] = useState([
    { id: 1, name: "Cow #101", breed: "Angus", age: 3, status: "Healthy" },
    { id: 2, name: "Cow #102", breed: "Hereford", age: 4, status: "Sick" },
    { id: 3, name: "Cow #103", breed: "Holstein", age: 2, status: "Healthy" },
  ]);

  const deleteLivestock = (id) => {
    setLivestock(livestock.filter((animal) => animal.id !== id));
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
                  <div className="font-semibold">{animal.name}</div>
                  <div className="text-xs uppercase font-semibold opacity-60">
                    {animal.breed} - {animal.age} yrs - {animal.status}
                  </div>
                </div>
              </div>
              <div className="space-x-2">
                <button
                  className="btn btn-soft btn-sm"
                  onClick={() => alert(`Viewing details for ${animal.name}`)}
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
            <input
              type="text"
              placeholder="Animal Type (e.g., Cow)"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Breed"
              className="input input-bordered w-full"
            />
            <input
              type="number"
              placeholder="Age (Years)"
              className="input input-bordered w-full"
            />
            <input
              type="text"
              placeholder="Health Status"
              className="input input-bordered w-full"
            />
            <div className="modal-action">
              <button className="btn">Cancel</button>
              <button className="btn btn-success">Add</button>
            </div>
          </form>
        </div>
      </dialog>
    </MainLayout>
  );
};

export default ManageLivestock;
