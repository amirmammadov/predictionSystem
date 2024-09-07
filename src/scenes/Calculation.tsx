import { useState, useRef, useEffect } from "react";

import s from "../sass/scenes/_calculation.module.scss";

import PropertyItem from "../components/PropertyItem";
import DropArea from "../components/DropArea";

const data = [
  {
    id: 1,
    value: "Color",
    status: "all",
  },
  {
    id: 2,
    value: "Engine",
    status: "all",
  },
  {
    id: 3,
    value: "Distance",
    status: "all",
  },
  {
    id: 4,
    value: "Year",
    status: "all",
  },
  {
    id: 5,
    value: "Gearbox",
    status: "all",
  },
];

const statuses = ["all", "X", "Y"];

interface IProperty {
  id: number;
  value: string;
  status: string;
}

interface IProcess {
  xValues: IProperty[];
  yValues: IProperty[];
  isAutomatic: boolean;
  automatic: string;
  manualData?: string;
  processName: string;
}

const initialValues = {
  xValues: [],
  yValues: [],
  automatic: "automatic",
  isAutomatic: true,
  manualData: "",
  processName: "",
};

const Calculation = () => {
  const [propertyData, setPropertData] = useState<IProperty[]>(data);
  const [processInfo, setProcessInfo] = useState<IProcess>(initialValues);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [yHas, setyHas] = useState(false);
  const [isAutomatic, setIsAutomatic] = useState(true);

  const yElementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (yElementRef.current) {
      const hasChildren = yElementRef.current.hasChildNodes();
      if (!hasChildren) {
        setyHas(false);
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

    setPropertData(updatedProperties);
  };

  const handleChange = ({
    target,
  }: {
    target: { name: string; value: string };
  }) => {
    setProcessInfo((prevValues) => ({
      ...prevValues,
      [target.name]: target.value,
    }));

    if (target.name === "automatic") {
      setIsAutomatic(target.value === "automatic");
    }
  };

  console.log(processInfo);

  return (
    <div className={s.calc}>
      <div className={s.properties}>
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
      <div className={s.axis}>
        <div className={s.axisItem}>
          <div className={s.axisTitle}>X</div>
          <div className={s.axisBlanks}>
            {propertyData.map(
              (property) =>
                property.status === statuses[1] && (
                  <PropertyItem
                    key={property.id}
                    value={property.value}
                    index={property.id}
                    setActiveCard={setActiveCard}
                  />
                )
            )}
            <DropArea onDrop={() => onDrop(statuses[1], activeCard)} />
          </div>
        </div>
        <div className={s.axisItem}>
          <div className={s.axisTitle}>Y</div>
          <div className={s.axisBlanks} ref={yElementRef}>
            {propertyData.map(
              (property) =>
                property.status === statuses[2] && (
                  <PropertyItem
                    key={property.id}
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
      <div className={s.inputs}>
        <select className={s.options} name="automatic" onChange={handleChange}>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select
          className={s.options}
          name="manualData"
          disabled={isAutomatic}
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
          onChange={handleChange}
        />
        <button className={s.calcBtn}>Calculate</button>
      </div>
    </div>
  );
};

export default Calculation;
