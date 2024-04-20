"use client";
import Sidebar from "@/components/Sidebar";
import SERVER_URL from "@/utils/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddUserFromExcel() {
  const [booth, setBooth] = useState("");
  const [caste, setCaste] = useState("");
  const [infavour, setInfavour] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [voterStatus, setVoterStatus] = useState("");
  const [excelFile, setExcelFile] = useState<any>(null);
  const [infavourList, setInfavourList] = useState([]);
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
  useEffect(() => {
    axios.get(`${SERVER_URL}/admin/infavour`).then((res) => {
      setInfavourList(res.data.infavour);
    })
  },[])
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("booth", booth);
    formData.append("caste", caste);
    formData.append("infavour", infavour);
    formData.append("gender", gender);
    formData.append("age", age);
    formData.append("voterStatus", voterStatus);
    formData.append("excel", excelFile);

    axios
      .post(`${SERVER_URL}/volunteer/add-user-from-excel`, formData, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        toast.success("User added successfully");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      });
  };

  return (
    <Sidebar>
      <div>
        <h1 className="text-3xl font-bold mx-auto">Add User From Excel</h1>
        <div className="max-w-sm mx-auto my-10">
          <a href="/template.xlsx" target="_blank" download={"template.xlsx"}>
            <button className="bg-primary text-white w-60 py-3 rounded-lg bg-green-500 ">
              Download Template
            </button>
          </a>
        </div>

        {/* Excel file upload */}

        <div className="max-w-sm mx-auto mt-5 ">
          <label
            htmlFor="excel"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Excel File
          </label>
          <input
            type="file"
            id="excel"
            onChange={(e: any) => setExcelFile(e.target.files[0])}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="max-w-sm mx-auto mt-5">
          <label
            htmlFor="booth"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Select Booth
          </label>
          <select
            id="booth"
            onChange={(e) => setBooth(e.target.value)}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option>Select an option</option>
            {boothList?.map((booth: any) => (
              <option key={booth} value={booth}>
                {booth}
              </option>
            ))}
          </select>
        </div>
        <div className="max-w-sm mx-auto mt-5">
          {/* Caste field */}
          <label
            htmlFor="caste"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Caste
          </label>
          <select
            id="caste"
            onChange={(e) => setCaste(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select an option</option>
            <option value="RC">RC</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="Muslium">Muslium</option>
            <option value="Hindu">Hindu</option>
          </select>
          {/* Infavour field */}
          <label
            htmlFor="infavour"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Infavour
          </label>
          <select
            id="infavour"
            onChange={(e) => setInfavour(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select an option</option>
            {infavourList?.map((item: any) => (
                <option key={item._id} value={item.infavour}>
                  {item.infavour}
                </option>
              ))}
          </select>

          {/* Gender field */}
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Gender
          </label>
          <select
            id="gender"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="N">NaN</option>
          </select>
          {/* Age field */}
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Age
          </label>
          <input
            onChange={(e) => setAge(e.target.value)}
            type="number"
            id="age"
            value={age}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your age"
          />
          {/* Voter Status field */}
          <label
            htmlFor="voterStatus"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
          >
            Voter Status
          </label>
          <select
            id="voterStatus"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setVoterStatus(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="native">Alive</option>
              <option value="nomore">No More</option>
              <option value="abroad">Abroad</option>
          </select>
        </div>

        <div className="max-w-sm mx-auto my-5">
          <button
            className="bg-primary text-white w-full py-3 rounded-lg bg-blue-500"
            onClick={handleSubmit}
          >
            Add User
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default AddUserFromExcel;
