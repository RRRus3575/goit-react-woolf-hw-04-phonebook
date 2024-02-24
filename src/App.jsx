import React, { useEffect, useState } from "react";
import uniqid from "uniqid";
import { Form } from "./Form/Form";
import { Input } from "./inputs/Input";
import { ContactRender } from "./ContactRender/ConstactRender";

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);

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

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  //   }
  // }

  useEffect(() => {
    const contacts = localStorage.getItem("contacts");
    const parsedContacts = JSON.parse(contacts);
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
  }, []);

  // componentDidMount() {
  //   const contacts = localStorage.getItem("contacts");
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({
  //       contacts: parsedContacts,
  //     });
  //   }
  // }

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
