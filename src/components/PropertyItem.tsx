import s from "../sass/components/_propertyItem.module.scss";

import { IPropertyItem } from "../types";

const PropertyItem = ({
  value,
  index,
  setActiveCard,
  dataID,
}: IPropertyItem) => {
  return (
    <div
      className={s.propertyItem}
      data-id={dataID}
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      {value}
    </div>
  );
};

export default PropertyItem;
