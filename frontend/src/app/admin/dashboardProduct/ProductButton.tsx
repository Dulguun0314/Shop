"use client";

import Trangle from "@/app/(main)/assets/icon/Trangle";
import { FaRegCalendar } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdOutlineAttachMoney } from "react-icons/md";
import Image from "next/image";
import { FiTrash } from "react-icons/fi";
import { BiPencil } from "react-icons/bi";
import { api } from "@/lib/axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductTitle } from "./mockData";

interface ProductType {
  _id: string;
  productName: string;
  price: number;
  qty: number;
  images: string[];
  productType: string;
  size: string[];
  productCode: string;
  createdAt: string;
}

const ProductButton = () => {
  const [products, setProducts] = useState<ProductType[]>([]);

  const getProducts = async () => {
    try {
      const response = await api.get("/getProducts");
      setProducts(response.data as ProductType[]);
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      await api.delete(`/deleteProduct/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
      toast.success("Амжилттай устгагдлаа.");
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between my-6 mx-4">
        <div className="flex gap-4">
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <Trangle />
            <p>Ангилал</p>
            <IoChevronDownOutline />
          </button>
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <MdOutlineAttachMoney />
            <p>Үнэ</p>
            <IoChevronDownOutline />
          </button>
          <button className="text-black font-semibold px-3 py-1.5 bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2">
            <FaRegCalendar />
            <p>Сараар</p>
            <IoChevronDownOutline />
          </button>
        </div>
        <div>
          <div className="bg-white rounded-lg border border-[#ECEDF0] flex items-center gap-2 p-2">
            <IoIosSearch className="w-[24px] h-[24px]" />
            <input
              type="search"
              placeholder="Бүтээгдэхүүний нэр, SKU, UPC"
              className="outline-none w-[240px]"
            />
          </div>
        </div>
      </div>

      {/* Title Section */}
      <div className="bg-white border rounded-xl p-4 mx-4">
        <Table>
          <TableCaption>Бүтээгдэхүүний жагсаалт</TableCaption>
          <TableHeader>
            <TableRow>
              {ProductTitle.map((product, index) => {
                return <TableHead key={index}>{product.name}</TableHead>;
              })}
              <TableHead className="text-center">Үйлдэл</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id} className="items-center">
                <TableCell>
                  <div className="flex items-center gap-2">
                    {product.images.length > 0 ? (
                      <div className="relative w-10 h-10 ">
                        <Image
                          src={product.images[0]}
                          alt={`Image of ${product.productName}`}
                          fill
                          className=" object-fill rounded-full"
                        />
                      </div>
                    ) : (
                      <div className="bg-gray-200 w-10 h-10 rounded flex items-center justify-center">
                        <span>No Image</span>
                      </div>
                    )}
                    <div>
                      <p className="font-semibold">{product.productName}</p>
                      <p className="text-xs text-gray-500">
                        {product.productCode}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.productType}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.qty}</TableCell>
                <TableCell>{product.qty}</TableCell>

                <TableCell>
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex gap-2 mt-2  justify-center">
                  <div
                    onClick={() => handleDeleteProduct(product._id)}
                    className="text-red-500 hover:text-red-700 "
                  >
                    <FiTrash className="h-5 w-5" />
                  </div>
                  <div className="text-blue-500 hover:text-blue-700">
                    <BiPencil className="h-5 w-5" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ProductButton;
