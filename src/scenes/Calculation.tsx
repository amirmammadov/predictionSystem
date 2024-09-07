import s from "../sass/scenes/_calculation.module.scss";

import PropertyItem from "../components/PropertyItem";

const Calculation = () => {
  return (
    <div className={s.calc}>
      <div className={s.properties}>
        <PropertyItem value="Color" />
        <PropertyItem value="Engine" />
        <PropertyItem value="Distance" />
        <PropertyItem value="Year" />
        <PropertyItem value="Gearbox" />
      </div>
      <div className={s.axis}>
        <div className={s.axisX}>
          <div className={s.axisTitle}>X</div>
          <div className={s.axisXBlanks}>
            <PropertyItem value="Distance" />
            <PropertyItem value="Year" />
            <PropertyItem value="Gearbox" />
          </div>
        </div>
        <div className={s.axisY}>
          <div className={s.axisTitle}>Y</div>
          <div className={s.axisYBlanks}>
            <PropertyItem value="Distance" />
          </div>
        </div>
      </div>
      <div className={s.inputs}>
        <select className={s.options}>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select className={s.options}>
          <option value="value_1">Value 1</option>
          <option value="value_2">Value 2</option>
          <option value="value_3">Value 3</option>
        </select>
        <input type="text" placeholder="Name the process" className={s.input} />
        <button className={s.calcBtn}>Calculate</button>
      </div>
    </div>
  );
};

export default Calculation;
