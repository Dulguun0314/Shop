import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { Textarea } from "../components/ui/textarea";
import { useUser } from "../components/utils/AuthProvider";

interface DeliveryValues {
  lastName: string;
  username: string;
  phone: string | number;
  address: string;
}

const AddressDelivery = () => {
  const [initialValues, setInitialValues] = useState<DeliveryValues>({
    lastName: "",
    username: "",
    phone: "",
    address: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const { user } = useUser();
  const [userData, setUserData] = useState<DeliveryValues | null>(null); // Changed to UserValues | null

  // Fetch user data

  // Effect to fetch user data when user changes
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user?.user?.id) return; // Ensure user ID exists
      try {
        const response = await api.get(`/users/getUser/${user.user.id}`); // Fetch user data
        setUserData(response.data.user);
      } catch (error) {
        console.error("Error fetching user data", error);
        toast.error("Error fetching user data");
      }
    };

    fetchUserData();
  }, [user]);

  // API-гаас өгөгдөл татаж авах
  useEffect(() => {
    if (userData) {
      setInitialValues({
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        address: userData.address || "",
        username: userData.username || "",
      });

      // Check if lastName exists and set isSubmitted accordingly
      setIsSubmitted(!!userData.lastName);
    }
  }, [userData]);

  // Хүснэгт баталгаажуулалтын схем
  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required("Овог оруулна уу"),
    username: Yup.string().required("Нэр оруулна уу"),
    phone: Yup.string().required("Утасны дугаар оруулна уу"),
    address: Yup.string().required("Хаяг оруулна уу"),
  });

  // Хүснэгт илгээх функц
  const handleSubmit = async (
    values: DeliveryValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await api.put(`/users/update/${user?.user?.id}`, values);
      console.log("Delivery details updated successfully", response.data);
      toast.success("Хүргэлтийн мэдээлэл амжилттай шинэчлэгдлээ");
      setIsSubmitted(true);
      setInitialValues(values);
    } catch (error) {
      console.error("Error updating delivery details", error);
      toast.error("Хүргэлтийн мэдээлэл шинэчлэхэд алдаа гарлаа");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full grid gap-8">
      <p className="text-[18px] font-semibold text-black h-fit flex items-start">
        2. Хүргэлтийн мэдээлэл оруулах
      </p>
      {isSubmitted ? (
        // Хэрэглэгчийн мэдээллийг харуулах
        <div className="grid h-fit items-start ">
          <p>Овог: {initialValues.lastName}</p>
          <p>Нэр: {initialValues.username}</p>
          <p>Утасны дугаар: {initialValues.phone}</p>
          <p>Хаяг: {initialValues.address}</p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="border border-blue-500 rounded-2xl text-blue-500 hover:bg-blue-600 duration-700 hover:text-white px-4 py-2 w-fit"
          >
            Шинэчлэлт хийх
          </button>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="grid gap-4">
              <div>
                <p>Овог:</p>
                <Field
                  name="lastName"
                  placeholder="Овог"
                  className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border"
                />
                <ErrorMessage name="lastName" component="div" />
              </div>
              <div>
                <p>Нэр:</p>
                <Field
                  name="username"
                  placeholder="Самбуу"
                  className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border"
                />
                <ErrorMessage name="username" component="div" />
              </div>
              <div>
                <p>Утасны дугаар:</p>
                <Field
                  name="phone"
                  type="text"
                  placeholder="Утасны дугаар"
                  className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border"
                />
                <ErrorMessage name="phone" component="div" />
              </div>
              <div>
                <p>Хаяг:</p>
                <Field
                  name="address"
                  as={Textarea}
                  placeholder="Хаяг"
                  className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border max-h-[70px]"
                />
                <ErrorMessage name="address" component="div" />
              </div>
              <div>
                <p>Нэмэлт мэдээлэл:</p>
                <Field
                  name="additionalInfo"
                  as={Textarea}
                  placeholder="Нэмэлт мэдээлэл"
                  className="w-full py-3 px-1 rounded-md outline-none border-[#E4E4E7] border max-h-[50px]"
                />
                <ErrorMessage name="additionalInfo" component="div" />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="border border-[#2563EB] text-[#2563EB] rounded-2xl hover:bg-[#2563EB] hover:text-white duration-1000 px-4 py-2 w-fit"
              >
                Шинэчлэх
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default AddressDelivery;
