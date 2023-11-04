import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT_QUERY } from "@/queries";
import { useAppContext } from "@/context/AppProvider";
import { phoneRegExp, characterOnly } from "@/utils/regex";
import { CREATE_CONTACT } from "@/context/contact/types";

const createSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(characterOnly, "First Name should doesnt have a special character")
    .required("First Name cannot be empty"),
  last_name: Yup.string().matches(
    characterOnly,
    "Last Name should doesnt have a special character"
  ),

  number: Yup.array().of(
    Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number cannot be empty")
  ),
});

export function FormContact() {
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useAppContext();
  const [mutation] = useMutation(CREATE_CONTACT_QUERY);

  const onSubmit = async (values: any) => {
    setLoading(true);
    const phoneNumber = [];
    for (const key in values.number) {
      phoneNumber.push({
        number: values.number[key],
      });
    }
    const submit = {
      first_name: values.first_name,
      last_name: values.last_name,
      phones: phoneNumber,
    };

    try {
      const { data } = await mutation({
        variables: submit,
      });
      dispatch({ type: CREATE_CONTACT, payload: data.contact });
      setLoading(false);
      toast.success("Berhasil menambahkan kontak", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Tidak bisa input data", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      number: [""],
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const addInput = () => {
    formik.values.number.push("");
    formik.setFieldValue("number", formik.values.number);
  };

  const removeInput = (index: number) => {
    formik.values.number.splice(index, 1);
    formik.setFieldValue("number", formik.values.number);
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div
          className={css`
            margin-horizontal: 20%;
          `}
        >
          <Input
            id="first_name_input"
            name="first_name"
            colorScheme="grey"
            placeholder="First Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.first_name !== undefined &&
              formik.touched.first_name
            }
            errorMsg={formik.errors.first_name}
          />
          <Input
            id="last_name_input"
            name="last_name"
            colorScheme="grey"
            placeholder="Last Name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.errors.last_name !== undefined && formik.touched.last_name
            }
            errorMsg={formik.errors.last_name}
          />
          {formik.values.number.map((_, index) => (
            <div
              className={css`
                display: flex;
                justify-content: space-between;
              `}
              key={index}
            >
              <Input
                id={`number_input[${index}]`}
                name={`number[${index}]`}
                colorScheme="grey"
                placeholder="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.number !== undefined && formik.touched.number
                }
                errorMsg={formik.errors.number && formik.errors.number[index]}
              />
              <Button
                id="create-submit"
                type="submit"
                className="mb-1"
                onClick={() => removeInput(index)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button
            id="create-submit"
            type="submit"
            fullWidth
            className="mb-1"
            onClick={addInput}
          >
            Add Phone Number
          </Button>
        </div>
        <Button
          id="create-submit"
          type="submit"
          loading={loading}
          fullWidth
          className="mb-1"
        >
          Create
        </Button>
      </form>
    </div>
  );
}
