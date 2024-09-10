import { useState, useEffect } from "react";

import s from "../sass/scenes/_prediction.module.scss";

import { toastError, toastSuccess } from "../constants";

import { generatePredictionFormInfo, findEmptyPredictionXs } from "../helpers";

import { allProcesses } from "../data/properties";

const Prediction = () => {
  const [selectedProcess, setSelectedProcess] = useState<string>("");
  const [currentXs, setCurrentXs] = useState<string[] | null>(null);
  const [formInfo, setFormInfo] = useState<{ [key: string]: string }>({});

  const handleProcessChange = ({
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

  const handleXChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setFormInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  useEffect(() => {
    const selectedX = allProcesses.filter(
      (process) => process.title === selectedProcess
    );

    if (selectedX.length > 0) {
      setCurrentXs(selectedX[0].xValues);
      const result = generatePredictionFormInfo(selectedX[0].xValues);
      setFormInfo(result);
    } else {
      setCurrentXs(null);
    }
  }, [selectedProcess]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const notFilledInputs = findEmptyPredictionXs(formInfo, currentXs);

    if (notFilledInputs && notFilledInputs?.length > 0) {
      toastError("Fill all X values!");
    } else {
      toastSuccess("Success!");
      const result = generatePredictionFormInfo(currentXs!);
      setFormInfo(result);
    }
  };

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
          onChange={handleProcessChange}
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
          <form className={s.values}>
            {currentXs?.map((value) => (
              <div key={value} className={s.valuesItem}>
                <label htmlFor={value} className={s.label}>
                  {value}:
                </label>
                <input
                  type="text"
                  id={value}
                  name={value}
                  value={formInfo[value]}
                  onChange={handleXChange}
                  placeholder={`Enter ${value}`}
                  className={s.input}
                />
              </div>
            ))}
          </form>
        </div>
      )}
      {selectedProcess !== "" && (
        <button className={s.predictBtn} onClick={handleSubmit}>
          Predict
        </button>
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
