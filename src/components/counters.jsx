import React, { useState } from "react";
import Counter from "./counter";
const Counters = () => {
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
    <div>
      <button onClick={handleReset} className="btn btn-primary btn-sm m-2">
        Сброс
      </button>
      {counters.map((counter) => (
        <Counter
          key={counter.id}
          onDelete={handleDelete}
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          {...counter}
        />
      ))}
    </div>
  );
};

export default Counters;
