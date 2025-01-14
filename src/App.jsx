import { FaArchive } from "react-icons/fa";
import "./App.css";
import AddAppointment from "./components/AddAppointment";
import Search from "./components/Search";
import AppointmentInfo from "./components/AppointmentInfo";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [appointmentList, setAppointmentList] = useState([]);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("petName");
  const [orderBy, setOrderBy] = useState("asc");

  const filteredAppointments = appointmentList
    .filter((item) => {
      return (
        item.petName.toLowerCase().includes(query.toLowerCase()) ||
        item.ownerName.toLowerCase().includes(query.toLowerCase()) ||
        item.aptNotes.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((node, next) => {
      let order = orderBy === "asc" ? 1 : -1;
      return node[sortBy].toLowerCase() < next[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  const fetchData = useCallback(() => {
    fetch("./data.json")
      .then((response) => response.json())
      .then((data) => {
        setAppointmentList(data);
      });
  }, []);

  useEffect(() => {
    console.log("useEffect");
    fetchData();
  }, [fetchData]);

  return (
    <>
      <div className="App container mx-auto mt-3 font-thin">
        <h1 className="text-5xl mb-3">
          <FaArchive className="inline-block text-red-400 align-top" />
          Your Appointments
        </h1>
        <AddAppointment
          onSendAppointment={(myAppointment) =>
            setAppointmentList([...appointmentList, myAppointment])
          }
          lastId={appointmentList.reduce(
            (max, item) => (Number(item.id) > max ? Number(item.id) : max),
            0
          )}
        />
        <Search
          query={query}
          onQueryChange={(myQuery) => setQuery(myQuery)}
          sortBy={sortBy}
          onSortByChange={(mySort) => setSortBy(mySort)}
          orderBy={orderBy}
          onOrderByChange={(myOrder) => setOrderBy(myOrder)}
        />
        <ul className="divide-y divide-gray-200">
          {filteredAppointments.map((appointment) => (
            <AppointmentInfo
              key={appointment.id}
              appointment={appointment}
              onDeleteAppointment={(appointmentId) =>
                setAppointmentList(
                  appointmentList.filter(
                    (appointment) => appointment.id !== appointmentId
                  )
                )
              }
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
