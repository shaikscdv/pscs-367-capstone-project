import React from "react";

export default function TableCardViewAttendance({
  index,
  subjectName,
  subjectNumber,
  attendanced,
  Date,
}) {
  console.log(Date);
  return (
    <tr
      className={`text-dark border-b-2 bg-white font-semibold hover:bg-gray-50`}
    >
      <td className={`w-4 p-4`}>
        <div className="flex items-center">{index + 1}</div>
      </td>
      <th
        scope="row"
        className={`whitespace-nowrap px-6 py-4 text-lg font-bold text-darkPrimary`}
      >
        {subjectName}
      </th>
      <td className={`px-6 py-4 text-lg`}>{subjectNumber}</td>
      <td className={`px-6 py-4 text-lg`}>
        <h1 className={`rounded-lg p-1 text-lg`}>{Date}</h1>
      </td>
      <td className={`px-6 py-4`}>
        <div className="flex space-x-5">
          <button
            className={`rounded-md p-1 text-xl font-semibold duration-200  hover:text-white dark:text-white ${attendanced === 1 ? "bg-green-600" : "bg-red-600"}`}
          >
            {attendanced === 1 ? "Present" : "Absent"}
          </button>
        </div>
      </td>
    </tr>
  );
}
