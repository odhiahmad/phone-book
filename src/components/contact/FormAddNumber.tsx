import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { Input } from "@/components/atoms/input";
import { Button } from "@/components/atoms/button";
import "react-toastify/dist/ReactToastify.css";
import { css } from "@emotion/css";
import { useMutation } from "@apollo/client";
import { ADD_NUMBER_TO_CONTACT } from "@/queries";
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
}
function FormAddNumber({ isOpen = false, onClose = () => {}, id }: Prop) {
  const [loading, setLoading] = useState(false);
  const [mutation] = useMutation(ADD_NUMBER_TO_CONTACT);

  const onSubmit = async (values: any) => {
    setLoading(true);

    try {
      await mutation({
        variables: {
          contact_id: id,
          phone_number: values.number,
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
      number: "",
    },
    validationSchema: createSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

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
      </div>
    </SelectBottomSheet>
  );
}

export default FormAddNumber;
