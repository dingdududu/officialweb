
"use client";
import { useRef } from "react";


export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const form = formRef.current;
  if (!form) return;

  const formData = new FormData(form);
  const name = (formData.get("name") as string).trim();
  const email = (formData.get("email") as string).trim();
  const message = (formData.get("message") as string).trim();

  if (!name) {
    alert("Name is required.");
    return;
  }
  if (!email) {
    alert("Email is required.");
    return;
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (!message) {
    alert("Message is required.");
    return;
  }

  form.submit(); // 通过校验后再提交
};
  return (
    <div className="flex flex-col min-h-screen  items-center">
      
      <form
        ref={formRef}
      onSubmit={handleSubmit}
    
      className="w-full max-w-[500px] bg-white rounded-lg p-8 flex flex-col gap-5"
      autoComplete="off"
      >
        <div>
          <label className="block mb-1 font-medium" htmlFor="name">
            Name<span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="email">
            E-mail<span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="company">
            Company name
          </label>
          <input
            id="company"
            name="company"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="address">
            Address
          </label>
          <input
            id="address"
            name="address"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="website">
            Website
          </label>
          <input
            id="website"
            name="website"
            type="url"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium" htmlFor="message">
            Message<span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
