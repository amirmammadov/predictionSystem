import s from "../sass/components/_propertyItem.module.scss";

interface IPropertyItem {
  value: string;
}

const PropertyItem = ({ value }: IPropertyItem) => {
  return <div className={s.propertyItem}>{value}</div>;
};

export default PropertyItem;
