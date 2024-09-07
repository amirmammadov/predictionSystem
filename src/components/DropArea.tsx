import { useState } from "react";

import s from "../sass/components/_dropArea.module.scss";

interface IDropArea {
  onDrop: () => void;
}

const DropArea = ({ onDrop }: IDropArea) => {
  const [activeDrag, setActiveDrag] = useState<boolean>(false);

  return (
    <div
      className={`${activeDrag ? s.dropArea : s.hideDrop}`}
      onDragEnter={() => setActiveDrag(true)}
      onDragLeave={() => setActiveDrag(false)}
      onDrop={() => {
        onDrop();
        setActiveDrag(false);
      }}
      onDragOver={(e) => e.preventDefault()}
    >
      Drop Here
    </div>
  );
};

export default DropArea;
