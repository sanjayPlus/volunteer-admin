"use client";
import Sidebar from "@/components/Sidebar";
import SERVER_URL from "@/utils/SERVER_URL";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as XLSX from "xlsx";

function AllUser() {
  const [user, setUser] = useState<{ _id: string }[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [search, setSearch] = useState("");
  const [booth, setBooth] = useState("");
  const [boothList, setBoothList] = useState([]);
  const [gender, setGender] = useState("");
  const [caste, setCaste] = useState("");
  const [infavour, setInfavour] = useState("");
  const [votingStatus, setVotingStatus] = useState("");
  const [age, setAge] = useState("");
  const [query, setQuery] = useState("");
  const router = useRouter();
  const [infavourList, setInfavourList] = useState([]);
  const [sNo, setSNo] = useState<any>(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      axios
        .get(SERVER_URL + "/volunteer/protected", {
          headers: {
            "x-access-token": token,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            axios
              .get(`${SERVER_URL}/volunteer/volunteer-details`, {
                headers: {
                  "x-access-token": token,
                },
              })
              .then((res) => {
                setBoothList(res.data.volunteer.boothRule);
              })
              .catch((err) => {
                console.log(err);
              });
            axios
              .get(SERVER_URL + "/volunteer/users?page=1&perPage=10" + query, {
                headers: {
                  "x-access-token": token,
                },
              })
              .then((res) => {
                setUser(res.data.data);
                setPage(res.data.currentPage);
                setTotalPage(res.data.totalPages);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            router.push("/login");
            localStorage.removeItem("token");
          }
        })
        .catch((error) => {
          router.push("/login");
          localStorage.removeItem("token");
        });
    }
  }, [router]);
  useEffect(() => {
    axios.get(SERVER_URL + "/admin/infavour").then((res) => {
      setInfavourList(res.data.infavour);
    });
  }, []);
  const handleSearch = () => {
    const token = localStorage.getItem("token");
    if (page > 0 && page <= totalPage) {
      axios
        .get(
          SERVER_URL +
            "/volunteer/users?page=1&perPage=10&search=" +
            search +
            query,
          {
            headers: {
              "x-access-token": token,
            },
          }
        )
        .then((res) => {
          setUser(res.data.data);
          setPage(res.data.currentPage);
          setTotalPage(res.data.totalPages);
          setSearch("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get(
        SERVER_URL + "/volunteer/users?page=" + page + "&perPage=10" + query,
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((res) => {
        setUser(res.data.data);
        setTotalPage(res.data.totalPages);
        if (res.data.data.length === 0) {
          setPage(1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
    axios
      .delete(SERVER_URL + "/volunteer/delete-user/" + id, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUser(user.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFilteredSearch = () => {
    const token = localStorage.getItem("token");
    let query1 = "";
    if (booth) {
      query1 += `&booth=${booth}`;
    }
    if (search) {
      query1 += `&search=${search}`;
    }
    if (gender) {
      query1 += `&gender=${gender}`;
    }
    if (caste) {
      query1 += `&caste=${caste}`;
    }
    if (infavour) {
      query1 += `&infavour=${infavour}`;
    }
    if (votingStatus) {
      query1 += `&voterStatus=${votingStatus}`;
    }
    if (age) {
      query1 += `&age=${age}`;
    }
    if (sNo) {
      query1 += `&sNo=${sNo}`;
    }
    setQuery(query1);
    axios
      .get(`${SERVER_URL}/volunteer/users?page=1&perPage=10${query1}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        setUser(res.data.data);
        setTotalPage(res.data.totalPages);
        if (res.data.data.length === 0) {
          setPage(1);
        }
      })
      .catch((err) => {
       toast.error("No User Found");
       //make emplty filter
        setQuery("");
        setBooth("");
        setSearch("");
        setGender("");
        setCaste("");
        setInfavour("");
        setVotingStatus("");
        setAge("");
        setSNo("");
        setPage(1);
        setTotalPage(1);
      });
  };
  const handlePageChange = (value: number) => {
    // Ensure that the value is within the valid range
    const newPage = Math.max(1, Math.min(value, totalPage));

    // Update the page state
    setPage(newPage);
  };
  const handleReset = () => {
    setBooth("");
    setSearch("");
    setGender("");
    setCaste("");
    setInfavour("");
    setVotingStatus("");
    setAge("");
    setQuery("");
  };

  const handleExcelDownload = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${SERVER_URL}/volunteer/users?${query}`, {
        headers: {
          "x-access-token": token,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.data;
          const newData = data.map((item: any) => {
            return {
              Name: item.name,
              VoterId: item.voterId,
              Gender: item.gender,
              Age: item.age,
              Caste: item.caste,
              Infavour: item.infavour,
              Booth: item.booth,
              VoterStatus: item.voterStatus,
              Email: item.email,
              Phone: item.phone,
              GuardianName: item.guardianName,
              HouseNo: item.houseNo,
              HouseName: item.houseName,
              Address: item.address,
              whatsAppNo: item.whatsappNo,
              Profession: item.profession,
            };
          });
          const ws = XLSX.utils.json_to_sheet(newData);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          XLSX.writeFile(wb, "data.xlsx");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSNo = () => {
    if (booth) {
      setSNo(!sNo);
    } else {
      toast.error("Please select booth first");
    }
  };

  return (
    <>
      <Sidebar>
        <div>
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search Mockups, Logos..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>
        <div className="filters-user-con flex flex-row justify-between flex-wrap items-center mt-6 gap-5">
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="booth"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Booth
            </label>
            <select
              id="booth"
              value={booth}
              onChange={(e) => setBooth(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an option</option>
              {boothList.map((booth: any) => (
                <option key={booth} value={booth}>
                  {booth}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Gender
            </label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an option</option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="N">NaN</option>
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="votingStatus"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Status
            </label>
            <select
              id="votingStatus"
              value={votingStatus}
              onChange={(e) => setVotingStatus(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an option</option>
              <option value="alive">Alive</option>
              <option value="incorrect">Incorrect</option>
              <option value="abraod">Abroad</option>
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="infavour"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Infavour
            </label>
            <select
              id="infavour"
              value={infavour}
              onChange={(e) => setInfavour(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="">Select an option</option>
              {infavourList?.map((item: any) => (
                <option key={item._id} value={item.infavour}>
                  {item.infavour}
                </option>
              ))}
            </select>
          </div>
          <div className="max-w-sm mx-auto">
            <label
              htmlFor="caste"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Select Caste
            </label>
            <select
              id="caste"
              value={caste}
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
          </div>
          <div className="max-w-sm mx-auto">
      <div className="flex items-center" onClick={()=>(!booth&&toast.error("Please select booth first"))}>
        <input
          id="checked-checkbox"
          type="checkbox"
          checked={sNo}
          onChange={handleSNo}
          disabled={!booth}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor="checked-checkbox"
          className={`ms-2 text-sm font-medium ${!booth ? 'text-gray-500 dark:text-gray-600' : 'text-gray-900 dark:text-gray-300'}`}
        >
          Serial No
        </label>
      </div>
    </div>

          <div className="max-w-sm mx-auto">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Enter Age
            </label>
            <input
              type="number"
              id="age"
              value={age}
              className="block w-50 p-2 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>

          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleFilteredSearch}
          >
            Search
          </button>
          <button
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleReset}
          >
            Reset
          </button>
          <button
            className="text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={handleExcelDownload}
          >
            Download As Excel
          </button>
        </div>
        <h1 className="text-3xl font-bold my-5">All User</h1>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  SNo
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Voter ID
                </th>
                <th scope="col" className="px-6 py-3">
                  View
                </th>
                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
                <th scope="col" className="px-6 py-3">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {user.map((user: any) => (
                <>
                  <tr>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.sNo}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {user.name}
                    </th>
                    <td className="px-6 py-4">{user.gender}</td>
                    <td className="px-6 py-4">{user.voterId}</td>
                    <td className="px-6 py-4">
                      <p
                        className="font-medium text-green-700 dark:text-green-400 hover:underline"
                        onClick={() => router.push(`/single-user/${user._id}`)}
                      >
                        View
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="font-medium text-blue-700 dark:text-blue-400 hover:underline"
                        onClick={() => router.push(`/update-user/${user._id}`)}
                      >
                        Edit
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p
                        className="font-medium text-red-500 dark:text-red-400 hover:underline"
                        onClick={() => handleDelete(user._id)}
                      >
                        Delete
                      </p>
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
          <div></div>
        </div>

        <div className="flex flex-col items-center mt-5">
          {/* Help text */}
          <span className="text-sm text-gray-700 dark:text-gray-400">
            Page{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {page}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {totalPage}
            </span>{" "}
            Total Page
          </span>
          <div className="inline-flex mt-2 xs:mt-0">
            {/* Buttons */}
            <button
              onClick={() => handlePageChange(page - 1)}
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <svg
                className="w-3.5 h-3.5 me-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={() => handlePageChange(page + 1)}
            >
              Next
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </Sidebar>
    </>
  );
}

export default AllUser;
