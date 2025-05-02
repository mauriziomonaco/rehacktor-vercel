import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase/supabase-client";
import {
  ConfirmSchema,
  getError,
  getFieldError,
} from "../../lib/validationForm";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchema.safeParse(formState);
    if (error) {
      const errors = getError(error);
      setFormErrors(errors);
    } else {
      let { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            username: data.username,
          },
        },
      });

      if (error) {
        alert("Errore durante la registrazione 👎🏻");
      } else {
        alert("Registrazione completata 👍🏻");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        navigate("/");
      }
    }
  };

  const onBlur = (property) => () => {
    const message = getFieldError(property, formState[property]);
    setFormErrors((prev) => ({ ...prev, [property]: message }));
    setTouchedFields((prev) => ({ ...prev, [property]: true }));
  };

  const isInvalid = (property) => {
    if (formSubmitted || touchedFields[property]) {
      return !!formErrors[property];
    }
    return undefined;
  };

  const setField = (property, valueSelector) => (e) => {
    setFormState((prev) => ({
      ...prev,
      [property]: valueSelector ? valueSelector(e) : e.target.value,
    }));
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={onSubmit}
        noValidate
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Registrati</h2>

        {[
          { id: "email", label: "Email", type: "email" },
          { id: "firstName", label: "Nome", type: "text" },
          { id: "lastName", label: "Cognome", type: "text" },
          { id: "username", label: "Username", type: "text" },
          { id: "password", label: "Password", type: "password" },
        ].map(({ id, label, type }) => (
          <div key={id}>
            <label htmlFor={id} className="block font-medium mb-1">
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              value={formState[id]}
              onChange={setField(id)}
              onBlur={onBlur(id)}
              aria-invalid={isInvalid(id)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
            {formErrors[id] && (
              <small className="text-red-500 text-sm">{formErrors[id]}</small>
            )}
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Crea account
        </button>
      </form>
    </div>
  );
}
