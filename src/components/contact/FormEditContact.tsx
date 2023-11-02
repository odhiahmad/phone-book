import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/css";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_CONTACT_DETAIL_QUERY,
  UPDATE_CONTACT_QUERY,
  UPDATE_PHONE_NUMBER_CONTACT_QUERY,
} from "@/queries";
import { useAppContext } from "@/context/AppProvider";
import { phoneRegExp, characterOnly } from "@/regex";
import { useRouter } from "next/router";

const createSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(characterOnly, "First Name should doesnt have a special character")
    .required("First Name cannot be empty"),
  last_name: Yup.string().matches(
    characterOnly,
    "Last Name should doesnt have a special character"
  ),
});

export function FormEditContact() {
  const [loading, setLoading] = useState(false);
  const { dispatch } = useAppContext();
  const [mutation] = useMutation(UPDATE_CONTACT_QUERY);
  const [mutationEditPhone] = useMutation(UPDATE_PHONE_NUMBER_CONTACT_QUERY);
  const router = useRouter();

  const {
    loading: loadingGetDetail,
    error: errorDetail,
    data: dataDetail,
  } = useQuery(GET_CONTACT_DETAIL_QUERY, {
    variables: {
      id: router.query.id,
    },
  });

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

  useEffect(() => {
    if (!loadingGetDetail) {
      const contact = dataDetail?.contact_by_pk;
      const first_name: string = contact?.first_name;
      const last_name: string = contact?.last_name;

      let dataPhone: any = [];
      for (const key in contact.phones) {
        dataPhone.push(contact.phones[key].number);
      }

      console.log(dataPhone);
      formik.setValues({
        first_name: first_name,
        last_name: last_name,
        number: dataPhone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingGetDetail, dataDetail]);

  const onSubmit = async (values: any) => {
    setLoading(true);
    const phoneNumber = [];
    for (const key in values.number) {
      phoneNumber.push({
        number: values.number[key],
      });
    }
    const submit = {
      id: 1,
      _set: {
        first_name: values.first_name,
        last_name: values.last_name,
      },
    };

    if (dataDetail?.contact_by_pk.phone.length !== values.formik.number.lenght)
      try {
        const { data } = await mutation({
          variables: submit,
        });

        console.log(data);
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
          {formik.values.number?.map((_, index) => (
            <div key={index}>
              <Input
                disabled={true}
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
                value={formik.values.number[index]}
              />
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
