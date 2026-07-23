"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", details: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! We will reach out shortly.`);
    setFormData({ name: "", email: "", details: "" });
  };

  return (
    <section
      id="contact"
      className="w-full bg-colab-bg text-colab-dark flex flex-col justify-between"
    >
      {/* Header Banner */}
      <div className="p-6 md:p-12 border-b border-colab-dark">
        <span className="text-xs font-mono uppercase tracking-widest text-colab-dark/60 mb-2 block">
          [ CONTACT ]
        </span>
        <p className="text-4xl md:text-7xl font-extrabold tracking-tighter uppercase">
          LET’S COLLABORATE.
        </p>
      </div>

      {/* Main Grid: Direct Contact Info & Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-colab-dark">
        {/* Left Column: Direct Info */}
        <div className="lg:col-span-6 p-6 md:p-12 flex flex-col justify-between gap-8">
          <div>
            <a
              href="mailto:hello@colab.co"
              className="text-2xl md:text-4xl font-bold underline decoration-colab-secondary decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
            >
              hello@colab.co
            </a>
            <p className="mt-6 text-sm font-mono text-colab-dark/80 leading-relaxed">
              Studio Address <br />
              100 Creative Way, Suite 400 <br />
              San Francisco, CA 94103
            </p>
          </div>

          <div className="text-xs font-mono uppercase tracking-wider text-colab-dark/60">
            Available for Q3/Q4 Brand Partnerships
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-6 p-6 md:p-12">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="NAME"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-transparent border border-colab-dark p-4 text-xs font-mono placeholder:text-colab-dark/50 focus:outline-none focus:bg-colab-dark focus:text-colab-bg transition-all"
              />
              <input
                type="email"
                placeholder="EMAIL"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="bg-transparent border border-colab-dark p-4 text-xs font-mono placeholder:text-colab-dark/50 focus:outline-none focus:bg-colab-dark focus:text-colab-bg transition-all"
              />
            </div>
            <textarea
              rows={4}
              placeholder="PROJECT DETAILS"
              value={formData.details}
              onChange={(e) =>
                setFormData({ ...formData, details: e.target.value })
              }
              className="bg-transparent border border-colab-dark p-4 text-xs font-mono placeholder:text-colab-dark/50 focus:outline-none focus:bg-colab-dark focus:text-colab-bg transition-all resize-none"
            />
            <button
              type="submit"
              className="w-full bg-colab-dark text-colab-bg py-4 text-xs font-mono uppercase font-bold tracking-widest hover:bg-colab-dark/80 transition-colors"
            >
              SEND INQUIRY →
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bar */}
      <div className="p-6 md:px-12 py-4 flex justify-between items-center text-[10px] font-mono uppercase text-colab-dark/60">
        <div>© 2026 CO LAB. ALL RIGHTS RESERVED.</div>
        <div>DESIGNED by wWebby</div>
      </div>
    </section>
  );
}