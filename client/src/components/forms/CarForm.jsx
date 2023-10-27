import { useState } from "react";
import MainButton from "../buttons/MainButton";
import InputField from "./InputField";
import SelectField from "./SelectField";

const CarForm = ({
  people,
  onSubmit,
  year,
  make,
  model,
  price,
  personId,
  btnTitle,
}) => {
  const [yearValue, setYearValue] = useState(year ?? "");
  const [makeValue, setMakeValue] = useState(make ?? "");
  const [modelValue, setModelValue] = useState(model ?? "");
  const [priceValue, setPriceValue] = useState(price ?? "");
  const [personIdValue, setPersonIdValue] = useState(personId ?? "");

  return (
    <form className="flex justify-center gap-4 flex-wrap" onSubmit={onSubmit}>
      <InputField
        title="Year"
        name="year"
        type="number"
        value={yearValue}
        onChange={(e) => setYearValue(e.target.value)}
        isRequired
      />

      <InputField
        title="Make"
        isRequired
        name="make"
        value={makeValue}
        onChange={(e) => setMakeValue(e.target.value)}
      />

      <InputField
        title="Model"
        isRequired
        name="model"
        value={modelValue}
        onChange={(e) => setModelValue(e.target.value)}
      />

      <InputField
        title="Price"
        isRequired
        name="price"
        type="number"
        value={priceValue}
        onChange={(e) => setPriceValue(e.target.value)}
      />

      <SelectField
        list={people}
        title="Person"
        placeholder="Select a person"
        isRequired
        name="personId"
        value={personIdValue}
        onChange={(e) => setPersonIdValue(e.target.value)}
      />

      <MainButton title={btnTitle ?? "Add Car"} />
    </form>
  );
};

export default CarForm;
