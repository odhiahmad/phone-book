import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/client";
import { UPDATE_CONTACT_QUERY } from "@/queries";
import { characterOnly } from "@/regex";
import { useRouter } from "next/router";
import { SelectBottomSheet } from "../atoms/bottomsheet";

const createSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(characterOnly, "First Name should doesnt have a special character")
    .required("First Name cannot be empty"),
  last_name: Yup.string().matches(
    characterOnly,
    "Last Name should doesnt have a special character"
  ),
});
interface Prop {
  isOpen?: boolean;
  onClose?: () => void;
  id: number;
  firstName: string;
  lastName: string;
}
function FormEditContact({
  isOpen = false,
  onClose = () => {},
  id,
  firstName,
  lastName,
}: Prop) {
  const [loading, setLoading] = useState(false);
  const [mutation] = useMutation(UPDATE_CONTACT_QUERY);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      first_name: firstName,
      last_name: lastName,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firstName, lastName]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    try {
      await mutation({
        variables: {
          id: id,
          _set: {
            first_name: values.first_name,
            last_name: values.last_name,
          },
        },
      });
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

  return (
    <SelectBottomSheet isOpen={isOpen} onClose={onClose}>
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
            value={formik.values.first_name}
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
            value={formik.values.last_name}
          />
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
    </SelectBottomSheet>
  );
}

export default FormEditContact;
