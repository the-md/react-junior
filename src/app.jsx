import React, { useState } from "react";
import Counters from "./components/counters";
import NavBar from "./components/navBar";

function App() {
  const initialstate = [
    { value: 0, id: 1, name: "Ложка" },
    { value: 4, id: 2, name: "Вилка" },
    { value: 0, id: 3, name: "Нож" },
  ];
  const [counters, setCounters] = useState(initialstate);
  const handleDelete = (counterId) => {
    const newCounters = counters.filter((c) => c.id !== counterId);
    setCounters(newCounters);
  };
  const handleIncrement = (counterId) => {
    const newCounters = counters.map((item) => {
      if (item.id === counterId) {
        item.value++;
      }
      return item;
    });
    setCounters(newCounters);
  };
  const handleDecrement = (counterId) => {
    const newCounters = counters.map((item) => {
      if (item.id === counterId) {
        if (item.value > 0) {
          item.value--;
        }
      }
      return item;
    });
    setCounters(newCounters);
  };
  const handleReset = () => setCounters(initialstate);
  return (
    <div className="col-lg-8 mx-auto p-3 py-md-5">
      <main>
        <NavBar totalItems={counters.reduce((a, c) => a + c.value, 0)} />
        <Counters
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          onReset={handleReset}
          onDelete={handleDelete}
          counters={counters}
        />
      </main>
    </div>
  );
}

export default App;
