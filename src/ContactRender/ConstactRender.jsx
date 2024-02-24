import css from "./ContactRender.module.css";

export const ContactRender = ({ onClick, contacts }) => {
  const handleDelete = (e) => {
    onClick(e.target.name);
  };

  return contacts.map((el) => (
    <li key={el.id}>
      {el.name}: {el.number}
      <button name={el.id} onClick={handleDelete} className={css.delete}>
        Delete
      </button>
    </li>
  ));
};
