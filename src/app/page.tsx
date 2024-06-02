import Head from "next/head";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Restaurant Reservation Admin SaaS</title>
        <meta
          name="description"
          content="Effortless Restaurant Reservation Management"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-900 text-white py-10">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold">DUALITY RESERVATION SOLUTIONS</h1>
          <p className="mt-4 text-xl">
            Effortless Restaurant Reservation Management
          </p>
          <a
            href="#features"
            className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded"
          >
            Learn More
          </a>
        </div>
      </header>

      <section id="about" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">About Us</h2>
          <p className="mt-4 text-lg">
            Duality provides an intuitive platform to manage restaurant
            reservations seamlessly and efficiently. Enhance your restaurant’s
            service with our comprehensive tools and features designed to
            optimize your reservation process.
          </p>
        </div>
      </section>

      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Features</h2>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl font-semibold">Easy Reservations</h3>
              <p className="mt-4">
                Manage bookings effortlessly with our user-friendly interface.
              </p>
            </div>
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl font-semibold">Real-time Updates</h3>
              <p className="mt-4">
                Receive instant updates and notifications for new reservations.
              </p>
            </div>
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl font-semibold">Customer Insights</h3>
              <p className="mt-4">
                Gain valuable insights into your customers’ preferences.
              </p>
            </div>
            <div className="bg-white p-8 rounded shadow">
              <h3 className="text-2xl font-semibold">Analytics</h3>
              <p className="mt-4">
                Track and analyze reservation data to improve service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="cta" className="py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">Get Started Today</h2>
          <p className="mt-4 text-lg">
            Sign up now and streamline your reservation process with [Your SaaS
            Name].
          </p>
          <a
            href="#signup"
            className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded"
          >
            Sign Up Now
          </a>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 [Your SaaS Name]. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
