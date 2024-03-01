"use client";
import Sidebar from "@/components/Sidebar";
import SERVER_URL from "@/utils/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function DeleteUsers() {
  const [booth, setBooth] = useState("");
  const [boothList, setBoothList] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    axios
      .get(`${SERVER_URL}/volunteer/protected`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        axios
          .get(`${SERVER_URL}/volunteer/volunteer-details`, {
            headers: {
              "x-access-token": token,
            },
          })
          .then((res) => {
            setBoothList(res.data.volunteer.boothRule);
          });
      })
      .catch((err) => {
        router.push("/login");
        localStorage.removeItem("token");
      });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        `${SERVER_URL}/volunteer/delete-bulk-user`,
        {
          booth,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          toast.success("User added successfully");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };
  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">Delete User</h1>

        <div className="max-w-sm mx-auto">
          <label
            htmlFor="booth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Booth
          </label>
          <select
            id="booth"
            onChange={(e) => setBooth(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
            {boothList?.map((booth: any) => (
              <option key={booth} value={booth}>
                {booth}
              </option>
            ))}
          </select>
        </div>

        <div className="max-w-sm mx-auto my-5">
          <button
            className="bg-primary text-white w-full py-3 rounded-lg bg-red-600 hover:bg-red-700"
            onClick={handleSubmit}
          >
          Delete Bulk user
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default DeleteUsers;
