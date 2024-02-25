import { useState } from "react";
import css from "./Form.module.css";
import { Input } from "../inputs/Input";
import PropTypes from "prop-types";

export const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleChangeName = (e) => {
    setName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNumber(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit(name, number);

    e.target.reset();
  };

  const { form, submit } = css;
  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={form}>
      <Input
        onChange={handleChangeName}
        type={"text"}
        name={"name"}
        label={"Name"}
        required
      />
      <Input
        onChange={handleChangeNumber}
        type={"tel"}
        name={"number"}
        label={"Number"}
        required
      />
      <button type="submit" className={submit}>
        Add contact
      </button>
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
