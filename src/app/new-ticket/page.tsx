"use client";

import { useState, useContext } from "react";
import { FormData } from "@/utils/formData.model";

import SelectInput from "@/components/formFields/SelectInput";
import TextArea from "@/components/formFields/TextArea";
import BackButton from "@/components/ui/BackButton";
import Button from "@/components/ui/Button";
import { TicketContext } from "@/context/ticket.context";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const productOptions = [
  { text: "Select a product", value: "", disabled: true },
  { text: "iPhone", value: "iPhone" },
  { text: "Macbook Pro", value: "Macbook Pro" },
  { text: "iMac", value: "iMac" },
  { text: "iPad", value: "iPad" },
];
export default function NewTicket() {
  const { tickets, addTickets }: any = useContext(TicketContext);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    product: "",
    description: "",
  });

  const router = useRouter();

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.product ||
      !formData.description
    ) {
      toast.error("Please fill out all fields");
      return;
    }
    addTickets({
      ...formData,
      id: new Date().valueOf(),
      createdAt: new Date(),
      status: "open",
    });

    router.push("/tickets");
    setFormData({
      name: "",
      email: "",
      product: "",
      description: "",
    });
  };

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Customer Email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={onChange}
          />
        </div>

        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <SelectInput
              name="product"
              id="product"
              value={formData.product}
              options={productOptions}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <TextArea
              name="description"
              id="description"
              placeholder="Description"
              value={formData.description}
              onChange={onChange}
            />
          </div>

          <div className="form-group">
            <Button className="btn btn-block" text="Submit" />
          </div>
        </form>
      </section>
    </>
  );
}
