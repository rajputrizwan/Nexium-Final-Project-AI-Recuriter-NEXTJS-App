import Link from "next/link";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import ContactButton from "@/components/ui/contact-button";

export default function Contact() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Header */}
      <section className="pt-32 pb-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl text-gray-900">
            Contact Us
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-600">
            Have questions or need help? We're here for you.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border">
              <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="mt-1 block p-3 w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="mt-1 block p-3 w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    className="mt-1 block p-3 w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="How can we help you?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="mt-1 block p-3 w-full rounded-md bg-white border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Your message..."
                  />
                </div>

                <ContactButton />
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border">
                <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Email</p>
                      <p className="text-base text-gray-900">
                        mrizwan2702@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">Phone</p>
                      <p className="text-base text-gray-900">+92 3118200769</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        Address
                      </p>
                      <p className="text-base text-gray-900">
                        Park Road
                        <br />
                        Islamabad, Pakistan
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-6 w-6 text-blue-500" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-700">
                        Business Hours
                      </p>
                      <p className="text-base text-gray-900">
                        Monday - Friday: 9am - 5pm PST
                        <br />
                        Saturday - Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-gray-50 rounded-2xl shadow-xl p-8 border">
                <h2 className="text-2xl font-bold mb-6">
                  Frequently Asked Questions
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      How does AICruiter work?
                    </h3>
                    <p className="mt-2 text-gray-600">
                      AIcruiter uses advanced AI to simulate real interview
                      scenarios. You can practice answering questions, receive
                      feedback, and improve your interview skills.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Is there a free trial?
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Yes, our Basic plan is free and includes 3 mock interviews
                      per month. You can upgrade to a paid plan anytime for more
                      features.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Can I cancel my subscription?
                    </h3>
                    <p className="mt-2 text-gray-600">
                      Yes, you can cancel your subscription at any time. Your
                      access will continue until the end of your billing period.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
