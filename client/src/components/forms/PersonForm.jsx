import { useState } from "react";
import MainButton from "../buttons/MainButton";
import InputField from "./InputField";

const PersonForm = ({ onSubmit, btnTitle, firstName, lastName }) => {
  const [firstNameInput, setFirstNameInput] = useState(firstName ?? "");
  const [lastNameInput, setLastNameInput] = useState(lastName ?? "");

  return (
    <form className="flex justify-center gap-4 flex-wrap" onSubmit={onSubmit}>
      <InputField
        title="First Name"
        isRequired
        name="firstName"
        value={firstNameInput}
        onChange={(e) => setFirstNameInput(e.target.value)}
      />

      <InputField
        title="Last Name"
        isRequired
        name="lastName"
        value={lastNameInput}
        onChange={(e) => setLastNameInput(e.target.value)}
      />

      <MainButton title={btnTitle ?? "Add Person"} />
    </form>
  );
};

export default PersonForm;
