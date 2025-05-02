import { useState } from "react";
import { useNavigate } from "react-router";
import { supabase } from "../../supabase/supabase-client";
import {
  FormSchemaLogin,
  ConfirmSchemaLogin,
  getError,
  getFieldError,
} from "../../lib/validationForm";

export default function LoginPage() {
  const navigate = useNavigate();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const { error, data } = ConfirmSchemaLogin.safeParse(formState);
if (error) {
  const errors = getError(error);
  setFormErrors(errors);
} else {
  // ✅ DEBUG: logga i dati normalizzati prima del login
  console.log("LOGIN with:", data.email.trim().toLowerCase(), data.password.trim());

  let { error } = await supabase.auth.signInWithPassword({
    email: data.email.trim().toLowerCase(),
    password: data.password.trim(),
  });

  if (error) {
    console.error("Login error:", error.message);
    alert(`Errore login: ${error.message}`);
  } else {
    alert("Login riuscito 👍");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    navigate("/");
  }
}
  };

  const onBlur = (property) => () => {
    const message = getFieldError(FormSchemaLogin, property, formState[property]);
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
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Accedi</h2>

        <div>
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={setField("email")}
            onBlur={onBlur("email")}
            aria-invalid={isInvalid("email")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.email && (
            <small className="text-red-500 text-sm">{formErrors.email}</small>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formState.password}
            onChange={setField("password")}
            onBlur={onBlur("password")}
            aria-invalid={isInvalid("password")}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-300"
          />
          {formErrors.password && (
            <small className="text-red-500 text-sm">{formErrors.password}</small>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Accedi
        </button>
      </form>
    </div>
  );
}
