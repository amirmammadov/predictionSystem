import { useState } from "react";

import s from "../sass/pages/_home.module.scss";

import Calculation from "../scenes/Calculation";
import Prediction from "../scenes/Prediction";

const procVals = ["calculate", "predict"];

const Home = () => {
  const [process, setProcess] = useState(procVals[0]);

  const handleSwitch = () => {
    setProcess((prev) => (prev === procVals[0] ? procVals[1] : procVals[0]));
  };

  return (
    <div className={s.home}>
      <div className={s.title}>Calculation and Prediction System</div>
      <div className={s.buttons}>
        <button
          className={`${s.calculate} ${process === procVals[0] && s.active}`}
          disabled={process === procVals[0]}
          onClick={handleSwitch}
        >
          Calculate
        </button>
        <button
          className={`${s.predict} ${process === procVals[1] && s.active}`}
          disabled={process === procVals[1]}
          onClick={handleSwitch}
        >
          Predict
        </button>
      </div>
      <div className={s.content}>
        {process === procVals[0] && <Calculation />}
        {process === procVals[1] && <Prediction />}
      </div>
    </div>
  );
};

export default Home;
