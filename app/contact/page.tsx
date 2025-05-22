'use client';
import { useState } from "react";
import { Mail, Phone, Instagram } from "lucide-react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields.");
      return;
    }

    setTimeout(() => {
      setSuccess("Thank you for reaching out! We'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Let’s Talk</h1>
          <p className="text-lg text-gray-600">
            Reach out to <span className="font-semibold text-black">Baywoods</span> — we’re here to help with all your streetwear and sneaker needs.
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Email */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Mail className="mx-auto text-blue-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-1 text-center">Email</h3>
            <p className="text-center">
              <a href="mailto:baywoods317@gmail.com" className="text-blue-600 hover:underline">
                baywoods317@gmail.com
              </a>
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Phone className="mx-auto text-green-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-1 text-center">Phone</h3>
            <p className="text-center">
              <a href="tel:+254116724251" className="text-green-600 hover:underline">
                +254 116 724 251
              </a>
            </p>
          </div>

          {/* Instagram */}
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <Instagram className="mx-auto text-pink-600 mb-4" size={32} />
            <h3 className="text-lg font-semibold mb-1 text-center">Instagram</h3>
            <p className="text-center">
              <a href="https://instagram.com/bayw_oods" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline">
                @bayw_oods
              </a>
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-2xl p-8 max-w-3xl mx-auto grid gap-6"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Your Message"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 rounded-full hover:bg-gray-900 transition"
          >
            Send Message
          </button>

          {success && (
            <p className="text-green-600 font-medium text-center mt-4">{success}</p>
          )}
        </form>
      </div>
    </div>
  );
}
