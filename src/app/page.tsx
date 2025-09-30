"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { useAuth } from "./context/authContext";
import Modal from "./component/modal";

export default function Home() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventName, setEventName] = useState("");
  const [events, setEvents] = useState<{ [date: string]: string[] }>({});
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const yearPickerRef = useRef<HTMLDivElement | null>(null);
  const monthPickerRef = useRef<HTMLDivElement | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // Close year picker when clicking outside
  useEffect(() => {
    function handleYearClickOutside(event: MouseEvent) {
      if (
        yearPickerRef.current &&
        !yearPickerRef.current.contains(event.target as Node)
      ) {
        setShowYearPicker(false);
      }
    }
    if (showYearPicker) {
      document.addEventListener("mousedown", handleYearClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleYearClickOutside);
    };
  }, [showYearPicker]);

  // Close month picker when clicking outside
  useEffect(() => {
    function handleMonthClickOutside(event: MouseEvent) {
      if (
        monthPickerRef.current &&
        !monthPickerRef.current.contains(event.target as Node)
      ) {
        setShowMonthPicker(false);
      }
    }
    if (showMonthPicker) {
      document.addEventListener("mousedown", handleMonthClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleMonthClickOutside);
    };
  }, [showMonthPicker]);

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return <p>Loading...</p>;

  const years = Array.from({ length: 301 }, (_, i) => 1900 + i);

  return (
    <main
      className="p-8"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/premium-vector/free-vector-abstract-floral-background_946129-214.jpg?semt=ais_hybrid&w=740&q=80')",
      }}
    >
      <h1 className="text-5xl md:text-4xl font-bold mb-10 text-center text-black bg-opacity-10">
        My Calendar
      </h1>

      {/* Logout button */}
      <button
        onClick={async () => {
          await logout();
          router.push("/login");
        }}
        className="absolute top-4 right-4 bg-black hover:bg-red-600 text-white px-4 py-2 rounded shadow font-medium"
      >
        Logout
      </button>

      <div className="p-8 md:p-12 mx-auto bg-[#F28D8C] rounded-2xl text-black relative">
        {/* Month + Year */}
        <div className="flex items-center justify-between px-4 mb-6 gap-10 text-xl md:text-2xl font-semibold">
          <button
            className="px-4 py-2 bg-purple-200 rounded-lg hover:bg-white"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() - 1,
                  1
                )
              )
            }
          >
            &#60;
          </button>

          <h1 className="text-3xl md:text-5xl font-mono text-center">
            <span
              onClick={() => {
                setShowMonthPicker(!showMonthPicker);
                setShowYearPicker(false);
              }}
              className="cursor-pointer underline hover:text-white"
            >
              {currentDate.toLocaleString("default", { month: "long" })}
            </span>{" "}
            <span
              onClick={() => {
                setShowYearPicker(!showYearPicker);
                setShowMonthPicker(false);
              }}
              className="cursor-pointer underline hover:text-white"
            >
              {currentDate.getFullYear()}
            </span>
          </h1>

          <button
            className="px-4 py-2 bg-purple-200 rounded-lg hover:bg-white"
            onClick={() =>
              setCurrentDate(
                new Date(
                  currentDate.getFullYear(),
                  currentDate.getMonth() + 1,
                  1
                )
              )
            }
          >
            &#62;
          </button>
        </div>

        {/* Year Picker */}
        {showYearPicker && (
          <div
            ref={yearPickerRef}
            className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-lg shadow-lg p-4 grid grid-cols-5 gap-2 max-h-[300px] overflow-y-auto z-10"
          >
            {years.map((year) => (
              <div
                key={year}
                className={`p-2 text-center rounded cursor-pointer hover:bg-[#F28D8C] ${
                  year === currentDate.getFullYear()
                    ? "bg-[#F28D8C] font-bold text-white"
                    : ""
                }`}
                onClick={() => {
                  setCurrentDate(new Date(year, currentDate.getMonth(), 1));
                  setShowYearPicker(false);
                }}
              >
                {year}
              </div>
            ))}
          </div>
        )}

        {/* Month Picker */}
        {showMonthPicker && (
          <div
            ref={monthPickerRef}
            className="absolute left-1/2 transform -translate-x-1/2 bg-white text-black rounded-lg shadow-lg p-4 grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto z-10"
          >
            {Array.from({ length: 12 }, (_, i) => i).map((month) => (
              <div
                key={month}
                className={`p-2 text-center rounded cursor-pointer hover:bg-[#F28D8C] ${
                  month === currentDate.getMonth()
                    ? "bg-[#F28D8C] font-bold text-white"
                    : ""
                }`}
                onClick={() => {
                  setCurrentDate(new Date(currentDate.getFullYear(), month, 1));
                  setShowMonthPicker(false);
                }}
              >
                {new Date(0, month).toLocaleString("default", {
                  month: "long",
                })}
              </div>
            ))}
          </div>
        )}

        {/* Weekdays */}
        <div className="grid grid-cols-7 text-center mb-4 text-lg md:text-xl font-semibold">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, idx) => (
            <div key={`${day}-${idx}`} className="py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Days */}
        <div className="grid grid-cols-7 gap-4 text-center text-lg md:text-xl auto-rows-[60px]">
          {/* Empty cells before 1st */}
          {Array.from({
            length: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              1
            ).getDay(),
          }).map((_, idx) => (
            <div
              key={`empty-${idx}`}
              className="flex items-center justify-center"
            />
          ))}

          {/* Days */}
          {Array.from({
            length: new Date(
              currentDate.getFullYear(),
              currentDate.getMonth() + 1,
              0
            ).getDate(),
          }).map((_, idx) => {
            const dateNum = idx + 1;
            const today = new Date();
            const isToday =
              dateNum === today.getDate() &&
              currentDate.getMonth() === today.getMonth() &&
              currentDate.getFullYear() === today.getFullYear();

            const dateKey = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              dateNum
            ).toDateString();

            return (
              <div
                key={dateNum}
                className={`relative flex flex-col items-center justify-center rounded-lg text-lg md:text-xl p-1 cursor-pointer ${
                  isToday ? "border-4 border-white" : ""
                } hover:bg-white hover:text-black`}
                onClick={() => {
                  setSelectedDate(
                    new Date(
                      currentDate.getFullYear(),
                      currentDate.getMonth(),
                      dateNum
                    )
                  );
                  setShowModal(true);
                }}
              >
                {/* Date Number */}
                <span>{dateNum}</span>

                {/* Event Badge */}
                {events[dateKey] && events[dateKey].length > 0 && (
                  <span className="absolute top-1 right-1 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {events[dateKey].length}
                  </span>
                )}
              </div>
            );
          })}

          {/* Modal */}
          {showModal && selectedDate && (
            <Modal onClose={() => setShowModal(false)}>
              <h2 className="text-xl font-bold mb-4">
                Events for {selectedDate.toDateString()}
              </h2>

              {/* Events List */}
              <div className="space-y-3 mb-6">
                {events[selectedDate.toDateString()] &&
                events[selectedDate.toDateString()].length > 0 ? (
                  events[selectedDate.toDateString()].map((event, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center bg-[#f4a5a4] p-2 rounded"
                    >
                      <span className="flex-1">{event}</span>

                      <div className="flex gap-2">
                        {/* Edit button */}
                        <button
                          onClick={() => {
                            const newName = prompt("Edit event:", event);
                            if (newName && newName.trim()) {
                              const updated = [
                                ...events[selectedDate.toDateString()],
                              ];
                              updated[idx] = newName.trim();
                              setEvents((prev) => ({
                                ...prev,
                                [selectedDate.toDateString()]: updated,
                              }));
                            }
                          }}
                          className="text-blue-500"
                        >
                          ✏️
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this event?"
                              )
                            ) {
                              const filtered = events[
                                selectedDate.toDateString()
                              ].filter((_, i) => i !== idx);
                              setEvents((prev) => ({
                                ...prev,
                                [selectedDate.toDateString()]: filtered,
                              }));
                            }
                          }}
                          className="text-black font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 italic">No events yet.</p>
                )}
              </div>

              {/* Add new event */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="New event"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="border p-2 flex-1 rounded"
                />
                <button
                  className="bg-[#f87472] text-black px-4 py-2 rounded"
                  onClick={() => {
                    if (!eventName.trim()) return;
                    const key = selectedDate.toDateString();
                    setEvents((prev) => ({
                      ...prev,
                      [key]: [...(prev[key] || []), eventName],
                    }));
                    setEventName("");
                  }}
                >
                  ➕ Add
                </button>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </main>
  );
}
