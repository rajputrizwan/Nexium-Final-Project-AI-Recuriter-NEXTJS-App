import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import { Users, Award, Clock } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div>
        {/* <h1 className="text-4xl font-bold">Welcome to Nexium</h1>
      <p>Your AI-powered recruitment solution</p> */}
        <Navbar />
        <Hero />

        {/* Features Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Why Choose AICruiter?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                Our AI-powered platform offers everything you need to prepare
                for your next interview.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Users size={24} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Realistic Simulations
                </h3>
                <p className="mt-2 text-gray-600">
                  Experience interviews that feel real with our advanced AI that
                  adapts to your responses.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Award size={24} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Personalized Feedback
                </h3>
                <p className="mt-2 text-gray-600">
                  Get detailed feedback on your answers, body language, and
                  overall performance.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-600 text-white">
                  <Clock size={24} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">
                  Practice Anytime
                </h3>
                <p className="mt-2 text-gray-600">
                  Practice at your own pace, whenever and wherever you want,
                  with 24/7 availability.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Users Say
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600">
                Join thousands of job seekers who have improved their interview
                skills with AICruiter.
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full object-cover object-center"
                      src="/review1.png"
                      alt="User"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Ibrahim Khan
                    </h3>
                    <p className="text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  "AICruiter helped me prepare for my technical interviews at
                  top tech companies. The AI feedback was spot on and helped me
                  identify areas for improvement."
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white rounded-xl p-8 shadow-md">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full object-cover object-center"
                      src="/review2.png"
                      alt="User"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Michael Scott
                    </h3>
                    <p className="text-gray-500">Product Manager</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  "The behavioral interview practice on AICruiter was incredibly
                  helpful. I felt much more confident going into my interviews
                  after practicing with the AI."
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <Image
                      className="h-12 w-12 rounded-full object-cover object-left"
                      src="/review3.png"
                      alt="User"
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Jack Williams
                    </h3>
                    <p className="text-gray-500">Marketing Specialist</p>
                  </div>
                </div>
                <p className="mt-4 text-gray-700">
                  "I landed my dream job after practicing with AICruiter for
                  just two weeks. The variety of interview questions and
                  detailed feedback made all the difference."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Ready to ace your next interview?
                    <span className="block text-indigo-200">
                      Start practicing today.
                    </span>
                  </h2>
                  <p className="mt-4 text-lg text-indigo-100">
                    Join thousands of job seekers who have improved their
                    interview skills with AICruiter.
                  </p>
                </div>
                <div className="mt-8 lg:mt-0 lg:ml-8">
                  <div className="rounded-md shadow">
                    <Link
                      href="/interview"
                      className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 transition-colors"
                    >
                      Start an Interview
                    </Link>
                  </div>
                  <div className="mt-3 text-center text-indigo-100 text-sm">
                    No credit card required
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
