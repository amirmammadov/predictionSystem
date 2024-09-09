import { useState, useRef, useEffect } from "react";

import s from "../sass/scenes/_calculation.module.scss";

import { toastSuccess, toastError } from "../constants";

import PropertyItem from "../components/PropertyItem";
import DropArea from "../components/DropArea";

import { FormValues, IProperty } from "../types";
import { properties } from "../data/properties";
import { optionOneVals, statuses } from "../constants";

const initialValues = {
  optionOne: optionOneVals[0],
  optionTwo: "",
  processName: "",
};

const Calculation = () => {
  const [propertyData, setPropertData] = useState<IProperty[]>(properties);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [yHas, setyHas] = useState(false);
  const [xHas, setxHas] = useState(false);
  const [formInfo, setFormInfo] = useState<FormValues>(initialValues);
  const [optionOneAuto, setOptionOneAuto] = useState(true);

  const yElementRef = useRef<HTMLDivElement>(null);
  const xElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (yElementRef.current) {
      const yProperties = yElementRef.current.querySelectorAll(
        '[data-id="property-item"]'
      );
      const hasYProperties = yProperties.length > 0;
      if (!hasYProperties) {
        setyHas(false);
      }
    }

    if (xElementRef.current) {
      const xProperties = xElementRef.current.querySelectorAll(
        '[data-id="property-item"]'
      );
      const hasXProperties = xProperties.length > 0;
      if (!hasXProperties) {
        setxHas(false);
      }
    }
  }, [propertyData]);

  const onDrop = (status: string, index: number | null) => {
    if (activeCard === null || index === null) return;

    const propertyToMove = propertyData.find((data) => data.id === index);
    if (!propertyToMove) return;

    const updatedProperties = propertyData.map((data) =>
      data.id === index ? { ...data, status: status } : data
    );

    if (status === statuses[2]) {
      setyHas(true);
    }

    if (status === statuses[1]) {
      setxHas(true);
    }

    setPropertData(updatedProperties);
    setActiveCard(null);
  };

  const handleChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    if (target.name === "optionOne") {
      setOptionOneAuto(target.value === optionOneVals[0]);
    }

    setFormInfo((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ xHas, yHas });

    if (!xHas || !yHas) {
      toastError("Fill X and Y!");
      return;
    }

    if (formInfo.optionOne !== optionOneVals[0] && formInfo.optionTwo === "") {
      toastError("Choose a manual option!");
      return;
    }

    if (formInfo.processName.length === 0) {
      toastError("Enter the process name!");
      return;
    }

    toastSuccess("Success!");
  };

  return (
    <div className={s.calc}>
      <div className={s.propertyArea}>
        <div className={s.propertyTitle}>Common properties</div>
        <div className={s.propertyContent}>
          {propertyData.map(
            (property) =>
              property.status === statuses[0] && (
                <PropertyItem
                  key={property.id}
                  value={property.value}
                  index={property.id}
                  setActiveCard={setActiveCard}
                />
              )
          )}
          <DropArea onDrop={() => onDrop(statuses[0], activeCard)} />
        </div>
      </div>
      <div className={s.axis}>
        <div className={s.propertyArea}>
          <div className={s.propertyTitle}>X</div>
          <div className={s.propertyContent} ref={xElementRef}>
            {propertyData.map(
              (property) =>
                property.status === statuses[1] && (
                  <PropertyItem
                    key={property.id}
                    dataID="property-item"
                    value={property.value}
                    index={property.id}
                    setActiveCard={setActiveCard}
                  />
                )
            )}
            <DropArea onDrop={() => onDrop(statuses[1], activeCard)} />
          </div>
        </div>
        <div className={s.propertyArea}>
          <div className={s.propertyTitle}>Y</div>
          <div className={s.propertyContent} ref={yElementRef}>
            {propertyData.map(
              (property) =>
                property.status === statuses[2] && (
                  <PropertyItem
                    key={property.id}
                    dataID="property-item"
                    value={property.value}
                    index={property.id}
                    setActiveCard={setActiveCard}
                  />
                )
            )}
            {!yHas && (
              <DropArea onDrop={() => onDrop(statuses[2], activeCard)} />
            )}
          </div>
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit}>
        <select
          className={s.options}
          name="optionOne"
          value={formInfo.optionOne}
          onChange={handleChange}
        >
          <option value={optionOneVals[0]}>Automatic</option>
          <option value={optionOneVals[1]}>Manual</option>
        </select>
        <select
          className={s.options}
          disabled={optionOneAuto}
          name="optionTwo"
          value={formInfo.optionTwo}
          onChange={handleChange}
        >
          <option value="">Choose Manual</option>
          <option value="value_1">Value 1</option>
          <option value="value_2">Value 2</option>
          <option value="value_3">Value 3</option>
        </select>
        <input
          type="text"
          placeholder="Name the process"
          className={s.input}
          name="processName"
          value={formInfo.processName}
          onChange={handleChange}
        />
        <button type="submit" className={s.calcBtn}>
          Calculate
        </button>
      </form>
    </div>
  );
};

export default Calculation;
