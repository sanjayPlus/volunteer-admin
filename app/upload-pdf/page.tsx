"use client";
import Sidebar from "@/components/Sidebar";
import SERVER_URL from "@/utils/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function UploadPDF() {
    const [booth, setBooth] = useState("");
    const [boothList, setBoothList] = useState([]);

    const [pdf, setPdf] = useState("");
    //   const [caste, setCaste] = useState("");
    //   const [infavour, setInfavour] = useState("");
    //   const [votingStatus, setVotingStatus] = useState("");
    //   const [gender, setGender] = useState("");
    //   const [infavourList, setInfavourList] = useState([]);
    //   const [casteList, setCasteList] = useState([]);
    const [state, setState] = useState(false);

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
                axios.get(`${SERVER_URL}/volunteer/volunteer-details`,{
                    headers:{
                        "x-access-token": token, 
                    }
                }).then((res) => {
                    setBoothList(res.data.volunteer.boothRule);
             })
            }).catch((err) => {
                router.push("/login");
                localStorage.removeItem("token");
            });
    }, []);


    const handleFileChange = (e: any) => {
        const file = e.target.files[0];
        setPdf(file)
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append("file", pdf);
        //district constituency assembly booth madatory
        formData.append("booth", booth);

        // if(gender){
        //   formData.append("gender", gender);
        // }
        // if(caste){
        //   formData.append("caste", caste);
        // }
        // if(infavour){
        //   formData.append("infavour", infavour);
        // }
        // if(votingStatus){
        //   formData.append("votingStatus", votingStatus);
        // }

        axios
            .post(
                `https://pdftojson.plusitpark.com/api/volunteer-upload-pdf`,
                formData,
                {
                    headers: {
                        "x-access-token": token,
                    },
                }
            )
            .then((res) => {
                if (res.status === 200 || res.status === 201) {
                    setState(!state)
                
                    toast.success("Users added successfully");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <Sidebar>
            <div>
                <h1 className="text-3xl font-bold mx-auto">Add PDF</h1>

  
              
                <div className="max-w-sm mx-auto">
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
                <div className="max-w-sm mx-auto">
                    <label
                        htmlFor="pdf"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                        Upload PDF
                    </label>
                    <input
                        type="file"
                        id="pdf"

                        onChange={handleFileChange}
                        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    />

                </div>
                <div className="max-w-sm mx-auto">
                    {/* Voter Status field */}
                    {/* <label
                        htmlFor="voterStatus"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                    >
                        Voter Status
                    </label>
                    <select
                        id="voterStatus"
                        className="bg-gray-50 mb-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setVotingStatus(e.target.value)}
                    >
                        <option value="">Select an option</option>
                        <option value="native">Alive</option>
                        <option value="nomore">No More</option>
                        <option value="abroad">Abroad</option>
                    </select> */}
                    {/* Gender field */}
                    {/* <label
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
                        <option value="">Select the Gender</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="N">NaN</option>
                    </select> */}
                    {/* Caste field */}
                    {/* <label
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
                        <option value="" >Select an option</option>
                        {casteList?.map((item: any) => (
                            <option key={item._id} value={item.caste}>
                                {item.caste}
                            </option>
                        ))}
                    </select> */}
                    {/* Infavour field */}
                    {/* <label
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
                        <option value="" >Select an option</option>
                        {infavourList?.map((item: any) => (
                            <option key={item._id} value={item.infavour}>
                                {item.infavour}
                            </option>
                        ))}
                    </select> */}

                </div>

                <div className="max-w-sm mx-auto my-5">
                    <button
                        className="bg-primary text-white w-full py-3 rounded-lg bg-blue-500"
                        onClick={handleSubmit}
                    >
                        Add 
                    </button>
                </div>
            </div>
        </Sidebar>
    );
}

export default UploadPDF;
