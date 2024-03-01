"use client";
import Sidebar from "@/components/Sidebar";
import SERVER_URL from "@/utils/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function AddUser() {
  const [booth, setBooth] = useState("");
  const [caste, setCaste] = useState("");
  const [infavour, setInfavour] = useState("");

  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [voterId, setVoterId] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [voterStatus, setVoterStatus] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [houseName, setHouseName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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
        `${SERVER_URL}/volunteer/add-user`,
        {
          booth,
          caste,
          infavour,
          name,
          gender,
          age,
          voterId,
          whatsappNo,
          voterStatus,
          email,
          address,
          guardianName,
          houseNo,
          houseName,
          phone,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        if(res.status===200){

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
        <h1 className="text-3xl font-bold mx-auto">Add User</h1>

        <div className="max-w-sm mx-auto mt-14 ">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            type="text"
            id="name"
            value={name}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your name"
          />

          {/* Email field */}
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            value={email}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your email"
          />

          {/* Phone field */}
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Phone
          </label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            id="phone"
            value={phone}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your phone number"
          />
          {/* Voter ID field */}
          <label
            htmlFor="voterId"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Voter ID
          </label>
          <input
            onChange={(e) => setVoterId(e.target.value)}
            type="text"
            id="voterId"
            value={voterId}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your voter ID"
          />

          {/* Whatsapp Number field */}
          <label
            htmlFor="whatsappNo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Whatsapp Number
          </label>
          <input
            onChange={(e) => setWhatsappNo(e.target.value)}
            type="tel"
            id="whatsappNo"
            value={whatsappNo}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Whatsapp number"
          />
          {/* Caste field */}
          <label
            htmlFor="caste"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Caste
          </label>
          <select
            id="caste"
            onChange={(e) => setCaste(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Infavour
          </label>
          <select
            id="infavour"
            onChange={(e) => setInfavour(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="">Select an option</option>
            <option value="UDF">UDF</option>
            <option value="LDF">LDF</option>
            <option value="NDA">NDA</option>
            <option value="NILL">NILL</option>
          </select>

          {/* Gender field */}
          <label
            htmlFor="gender"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Gender
          </label>
          <select
            id="gender"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="N">NaN</option>
          </select>

          {/* Age field */}
          <label
            htmlFor="age"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Age
          </label>
          <input
            onChange={(e) => setAge(e.target.value)}
            type="number"
            id="age"
            value={age}
            className="bg-gray-50 border mb-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your age"
          />
          {/* Voter Status field */}
          <label
            htmlFor="voterStatus"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Voter Status
          </label>
          <select
            id="voterStatus"
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setVoterStatus(e.target.value)}
          >
            <option value="">Select an option</option>
            <option value="alive">Alive</option>
            <option value="incorrect">Incorrect</option>
            <option value="abraod">Abroad</option>
          </select>
          {/* Guardian Name field */}
          <label
            htmlFor="guardianName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Guardian Name
          </label>
          <input
            onChange={(e) => setGuardianName(e.target.value)}
            type="text"
            id="guardianName"
            value={guardianName}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your guardian's name"
          />

          {/* House Number field */}
          <label
            htmlFor="houseNo"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            House Number
          </label>
          <input
            onChange={(e) => setHouseNo(e.target.value)}
            type="text"
            id="houseNo"
            value={houseNo}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your house number"
          />

          {/* House Name field */}
          <label
            htmlFor="houseName"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            House Name
          </label>
          <input
            onChange={(e) => setHouseName(e.target.value)}
            type="text"
            id="houseName"
            value={houseName}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your house name"
          />

          {/* Address field */}
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Address
          </label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            id="address"
            value={address}
            className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your address"
          />
        </div>

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
            className="bg-primary text-white w-full py-3 rounded-lg bg-blue-500"
            onClick={handleSubmit}
          >
            Add Volunteer
          </button>
        </div>
      </div>
    </Sidebar>
  );
}

export default AddUser;
