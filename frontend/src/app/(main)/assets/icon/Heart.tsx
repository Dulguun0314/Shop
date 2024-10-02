"use client";

import { useState, useEffect } from "react";
import { useUser } from "../../components/utils/AuthProvider";
import { toast } from "react-toastify";
import { api } from "@/lib/axios";

interface HeartProps {
  productId: string;
}

const Heart: React.FC<HeartProps> = ({ productId }) => {
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useUser();

  // Fetch saved status on component mount
  useEffect(() => {
    const fetchSavedStatus = async () => {
      if (user?.user?.id) {
        try {
          const response = await api.get(
            `/checkSavedProduct/${user.user.id}/${productId}`
          );
          setIsSaved(response.data.isSaved);
        } catch (error) {
          console.error("Failed to check saved product status", error);
        }
      }
    };
    fetchSavedStatus();
  }, [user, productId]);

  const handleHeartClick = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("You need to be logged in to save products.");
      return;
    }

    try {
      // Optimistically update the state
      const newIsSaved = !isSaved;
      setIsSaved(newIsSaved);

      if (newIsSaved) {
        const response = await api.post("/createSavedProduct", {
          userId: user?.user?.id,
          productId,
        });
        toast.success(response.data.message);
      } else {
        const response = await api.post("/removeSavedProduct", {
          userId: user?.user?.id,
          productId,
        });
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update saved product status");
      // Revert state if there was an error
      setIsSaved(isSaved); // Reset to previous state
    }
  };

  return (
    <svg
      onClick={handleHeartClick}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={isSaved ? "black" : "none"} // Change fill based on isSaved state
      className="cursor-pointer"
    >
      <path
        d="M19 14C20.49 12.54 22 10.79 22 8.5C22 7.04131 21.4205 5.64236 20.3891 4.61091C19.3576 3.57946 17.9587 3 16.5 3C14.74 3 13.5 3.5 12 5C10.5 3.5 9.26 3 7.5 3C6.04131 3 4.64236 3.57946 3.61091 4.61091C2.57946 5.64236 2 7.04131 2 8.5C2 10.8 3.5 12.55 5 14L12 21L19 14Z"
        stroke="#09090B"
      />
    </svg>
  );
};

export default Heart;
