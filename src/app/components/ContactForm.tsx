
"use client";
import { useRef } from "react";


export default function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const form = formRef.current;
  if (!form) return;

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const name = (data.name as string)?.trim();
  const email = (data.email as string)?.trim();
  const message = (data.message as string)?.trim();
  const website = (data.website as string)?.trim();

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
  if (website && !/^((https?:\/\/)?[\w.-]+\.[a-z]{2,})$/i.test(website)) {
  alert("Please enter a valid website address.");
  return;
}

  // ...校验通过后
const res = await fetch("/api/contact", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data),
});

if (res.ok) {
  alert("Submitted successfully!");
  form.reset();
} else {
  alert("Submission failed.");
}
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
            type="text"
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
