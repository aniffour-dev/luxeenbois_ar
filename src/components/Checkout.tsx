"use client";
import { useState } from "react";
// import { useCart } from "@/contexts/CartContext";
import * as yup from "yup";
import { ValidationError } from "yup";

interface CheckoutFormProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
}

// Validation schema
const checkoutSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(
      /^(\+\d{1,3}[-.]?)?\d{3}[-.]?\d{3}[-.]?\d{4}$/,
      "Please enter a valid phone number. Format: +1-234-567-8900 or 2345678900"
    ),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must be less than 200 characters"),
});

const CheckoutForm = ({ isOpen, onClose }: CheckoutFormProps) => {
  // const { cartItems, setCustomerInfo, clearCart } = useCart();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof FormData, string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const validateField = async (name: keyof FormData, value: string) => {
    try {
      // Get the schema for this field
      const fieldSchema = yup.reach(checkoutSchema, name) as yup.Schema<string>;
      await fieldSchema.validate(value);
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    } catch (error) {
      if (error instanceof ValidationError) {
        setFormErrors((prev) => ({ ...prev, [name]: error.message }));
      }
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    validateField(name as keyof FormData, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Cart Items:', cartItems); // Debug log
    setIsSubmitting(true);
    setError("");

    // if (cartItems.length === 0) {
    //   console.log('Cart is empty!'); // Debug log
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      // Validate all fields
      await checkoutSchema.validate(formData, { abortEarly: false });

      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerInfo: formData,
          // orderItems: cartItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      // Success
      // setCustomerInfo(formData);
      // clearCart();
      onClose();
      alert(
        "Order placed successfully! You will receive a confirmation email shortly."
      );
    } catch (error) {
      if (error instanceof ValidationError) {
        // Handle validation errors
        const validationErrors: Partial<Record<keyof FormData, string>> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path as keyof FormData] = err.message;
          }
        });
        setFormErrors(validationErrors);
      } else {
        console.error("Checkout error:", error);
        setError(
          error instanceof Error
            ? error.message
            : "An error occurred while placing your order"
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-lg w-full shadow-2xl p-5 border border-slate-200">
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <h4 className="text-md text-black font-semibold mb-3">
          Pour acheter ces articles, veuillez remplir ce formulaire ci-dessous !
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-900 text-[13px] font-semibold mb-1">
              Nom et prénom:
            </label>
            <input
              type="text"
              name="name"
              required
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.name}
              onChange={handleInputChange}
            />
            {formErrors.name && (
              <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-900 text-[13px] font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={formData.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-gray-900 text-[13px] font-semibold mb-1">
            Téléphone:
          </label>
          <input
            type="tel"
            name="phone"
            required
            className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.phone}
            onChange={handleInputChange}
          />
          {formErrors.phone && (
            <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-900 text-[13px] font-semibold mb-1">
            Adresse de livraison:
          </label>
          <textarea
            name="address"
            required
            className="shadow appearance-none border h-20 max-h-20 min-h-20 rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={formData.address}
            onChange={handleInputChange}
            rows={3}
          />
          {formErrors.address && (
            <p className="mt-1 text-sm text-red-600">{formErrors.address}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="submit"
            className="w-full py-3 uppercase font-semibold rounded bg-violet-900 text-violet-50 flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Acheter maintenant..." : "Acheter maintenant"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
