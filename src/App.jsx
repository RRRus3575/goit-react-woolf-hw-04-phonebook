import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { Form } from "./Form/Form";
import { Input } from "./inputs/Input";
import { ContactRender } from "./ContactRender/ConstactRender";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    const contacts = localStorage.getItem("contacts");

    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      return parsedContacts;
    }
    return [];
  });

  const [filter, setFilter] = useState("");

  const handleDelete = (nameEl) => {
    setContacts((prev) => prev.filter(({ id }) => id !== nameEl));
  };
  const handleSubmit = (name, number) => {
    if (contacts.find((el) => el.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is alredy in contacts`);
      return;
    }

    setContacts((prev) =>
      prev.concat({
        name: name,
        number: number,
        id: uniqid(),
      })
    );
  };

  const handleSearch = ({ target: { value: filter } }) => {
    setFilter(filter);
  };

  const contactFilter = () => {
    const cont = contacts.filter((el) =>
      el.name.toLowerCase().includes(filter.toLowerCase())
    );
    return cont;
  };

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        margin: 50,
      }}
    >
      <div>
        <h1>Phonebook</h1>
        <Form onSubmit={handleSubmit} />
      </div>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2>Contacts</h2>
          <Input
            onChange={handleSearch}
            value={filter}
            type={"text"}
            name={"filter"}
            label={"Find contacts by name"}
          />
          <ul>
            <ContactRender contacts={contactFilter()} onClick={handleDelete} />
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
