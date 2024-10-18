"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "../components/utils/AuthProvider";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { api } from "@/lib/axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

// Define the initial values interface
interface UserValues {
  lastName: string;
  phone: string;
  address: string;
  username: string;
  email: string;
}

const UserInfo: React.FC = () => {
  const pathname: string = usePathname();
  const { user, logout } = useUser();

  interface Path {
    name: string;
    path: string;
  }

  const paths: Path[] = [
    { name: "Хэрэглэгчийн хэсэг", path: "/userInfo" },
    { name: "Захиалгын түүх", path: "/orderHistory" },
  ];

  const [initialValues, setInitialValues] = useState<UserValues>({
    lastName: "",
    phone: "",
    address: "",
    username: "",
    email: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userData, setUserData] = useState<UserValues | null>(null); // Changed to UserValues | null

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

  // Effect to set initial values from fetched user data
  useEffect(() => {
    if (userData) {
      setInitialValues({
        lastName: userData.lastName || "",
        phone: userData.phone || "",
        address: userData.address || "",
        username: userData.username || "",
        email: userData.email || "",
      });
      setIsSubmitted(!!userData.lastName);
    }
  }, [userData]);

  const validationSchema = Yup.object().shape({
    lastName: Yup.string().required("Овог оруулна уу"),
    username: Yup.string().required("Нэр оруулна уу"),
    phone: Yup.string().required("Утасны дугаар оруулна уу"),
    email: Yup.string()
      .email("Имэйл хаяг буруу байна")
      .required("Имэйл оруулна уу"),
    address: Yup.string().required("Хаяг оруулна уу"),
  });

  const handleSubmit = async (
    values: UserValues,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    try {
      const response = await api.put(`/users/update/${user?.user?.id}`, values);
      console.log("User details updated successfully", response.data);
      toast.success("Мэдээлэл амжилттай шинэчлэгдлээ");
      setIsSubmitted(true);
      setInitialValues(values); // Update initialValues with the submitted values
    } catch (error) {
      console.error("Error updating user details", error);
      toast.error("Error updating user details");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex justify-center bg-[#F7F7F8]">
      <div className="container justify-center h-screen flex gap-5 my-32">
        <div className="grid flex-1 h-fit">
          {paths.map((path, index) => (
            <Link key={index} href={path.path}>
              <div
                className="w-[212px] rounded-[18px]"
                style={{
                  backgroundColor:
                    pathname === path.path ? "white" : "transparent",
                }}
              >
                <p className="font-medium py-2 px-4">{path.name}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="grid w-full h-fit">
          <p className="font-bold text-[18px]">Хэрэглэгчийн хэсэг</p>
          <div className="w-full border my-6"></div>

          {isSubmitted ? (
            <div>
              <p>Овог: {initialValues.lastName}</p>
              <p>Нэр: {initialValues.username}</p>
              <p>Утасны дугаар: {initialValues.phone}</p>
              <p>Имэйл хаяг: {initialValues.email}</p>
              <p>Хаяг: {initialValues.address}</p>
              <div className="flex gap-4 m-4">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="border border-red-500 rounded-2xl text-red-500 hover:bg-red-600 duration-700 hover:text-white"
                >
                  <p className="px-9 py-2">Гарах</p>
                </button>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="border border-[#2563EB] text-[#2563EB] rounded-2xl hover:bg-[#2563EB] hover:text-white duration-1000"
                >
                  <p className="px-9 py-2">Шинэчлэлт хийх</p>
                </button>
              </div>
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
                    <p className="font-medium">Овог:</p>
                    <Field
                      name="lastName"
                      placeholder="Овог"
                      className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
                    />
                    <ErrorMessage name="lastName" component="div" />
                  </div>
                  <div>
                    <p className="font-medium">Нэр:</p>
                    <Field
                      name="username"
                      placeholder="Нэр"
                      className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
                    />
                    <ErrorMessage name="username" component="div" />
                  </div>
                  <div>
                    <p className="font-medium">Утасны дугаар:</p>
                    <Field
                      name="phone"
                      type="text"
                      placeholder="Утасны дугаар"
                      className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
                    />
                    <ErrorMessage name="phone" component="div" />
                  </div>
                  <div>
                    <p className="font-medium">Имэйл хаяг:</p>
                    <Field
                      name="email"
                      type="email"
                      placeholder="Имэйл"
                      className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2"
                    />
                    <ErrorMessage name="email" component="div" />
                  </div>
                  <div>
                    <p className="font-medium">Хаяг:</p>
                    <Field
                      name="address"
                      placeholder="Хаяг"
                      className="border border-[#E4E4E7] rounded-[18px] w-full px-3 py-2 pb-20"
                    />
                    <ErrorMessage name="address" component="div" />
                  </div>
                  <div className="w-full flex justify-between">
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="border border-red-500 rounded-2xl text-red-500 hover:bg-red-600 duration-700 hover:text-white"
                    >
                      <p className="px-9 py-2">Гарах</p>
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="border border-[#2563EB] text-[#2563EB] rounded-2xl hover:bg-[#2563EB] hover:text-white duration-1000"
                    >
                      <p className="px-9 py-2">
                        {isSubmitting ? "Шинэчлэх..." : "Шинэчлэх"}
                      </p>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
