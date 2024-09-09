import { useState, useEffect } from "react";

import s from "../sass/scenes/_prediction.module.scss";

import { allProcesses } from "../data/properties";

const Prediction = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("");
  const [currentXs, setCurrentXs] = useState<string[] | null>(null);

  const handleChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    if (target.value) {
      setSelectedProcess(target.value);
    } else {
      setSelectedProcess("");
    }
  };

  useEffect(() => {
    const selectedX = allProcesses.filter(
      (process) => process.title === selectedProcess
    );

    if (selectedX.length > 0) {
      setCurrentXs(selectedX[0].xValues);
    } else {
      setCurrentXs(null);
    }
  }, [selectedProcess]);

  return (
    <div className={s.prediction}>
      <div className={s.processes}>
        <label htmlFor="process" className={s.processLabel}>
          Choose process:
        </label>
        <select
          id="process"
          className={s.processSelect}
          name="process"
          onChange={handleChange}
        >
          <option value="">Choose an option</option>
          {allProcesses.map((process) => (
            <option key={process.id} value={process.title}>
              {process.title}
            </option>
          ))}
        </select>
      </div>
      {selectedProcess !== "" && (
        <div className={s.content}>
          <div className={s.contentTitle}>All possible X values</div>
          <div className={s.values}>
            {currentXs?.map((value) => (
              <div key={value} className={s.valuesItem}>
                <label htmlFor={value} className={s.label}>
                  {value}:
                </label>
                <input
                  type="text"
                  id={value}
                  placeholder="Enter Engine"
                  className={s.input}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {selectedProcess !== "" && (
        <button className={s.predictBtn}>Predict</button>
      )}
      {selectedProcess === "" && (
        <div className={s.imgContainer}>
          <img src="./assets/predict.jpeg" alt="ds" />
        </div>
      )}
    </div>
  );
};

export default Prediction;
