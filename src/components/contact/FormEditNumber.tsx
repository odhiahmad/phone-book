import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/client";
import { UPDATE_PHONE_NUMBER_CONTACT_QUERY } from "@/queries";
import { phoneRegExp } from "@/utils/regex";
import { SelectBottomSheet } from "../atoms/bottomsheet";

const createSchema = Yup.object().shape({
  number: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number cannot be empty"),
});

interface Prop {
  isOpen?: boolean;
  onClose?: () => void;
  id: number;
  number: string;
}
function FormEditNumber({
  isOpen = false,
  onClose = () => {},
  id,
  number,
}: Prop) {
  const [loading, setLoading] = useState(false);
  const [mutation] = useMutation(UPDATE_PHONE_NUMBER_CONTACT_QUERY);

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      await mutation({
        variables: {
          pk_columns: {
            number: number,
            contact_id: id,
          },
          new_phone_number: values.number,
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

  const formik = useFormik({
    initialValues: {
      number: number,
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  useEffect(() => {
    formik.setValues({
      number: number,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [number]);

  return (
    <SelectBottomSheet isOpen={isOpen} onClose={onClose}>
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
              id={`number_input`}
              name={`number`}
              colorScheme="grey"
              placeholder="number"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.errors.number !== undefined && formik.touched.number
              }
              errorMsg={formik.errors.number}
              value={formik.values.number}
            />
          </div>

          <Button
            id="create-submit"
            type="submit"
            loading={loading}
            fullWidth
            className="mb-1"
          >
            Update
          </Button>
        </form>
      </div>
    </SelectBottomSheet>
  );
}

export default FormEditNumber;
