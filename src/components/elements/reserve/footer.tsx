const Footer: React.FC = () => {
  return (
    <footer className=" bg-white bg-opacity-0 text-black text-opacity-70 py-8  w-full">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center">
        <div className="text-center lg:text-left mb-4 lg:mb-0 text-xs">
          <h2 className="text-lg font-semibold">Contact Us</h2>
          <p className="mt-2">123 Main Street, City, State, Zip</p>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@example.com</p>
        </div>
        <div className="text-center">
          <h2 className="text font-semibold">Opening Hours</h2>
          <p className="mt-2 text-xs">Monday - Friday: 11:00 AM - 10:00 PM</p>
          <p className="text-xs">Saturday - Sunday: 10:00 AM - 11:00 PM</p>
        </div>
        <div className="text-center lg:text-right mt-6 lg:mt-0">
          <h2 className="text font-semibold">Follow Us</h2>
          <div className="flex justify-center lg:justify-end mt-2">
            <a href="#" className="mr-4 hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 21v-2a2 2 0 012-2h8a2 2 0 012 2v2M9 9a3 3 0 100-6 3 3 0 000 6z"
                />
              </svg>
            </a>
            <a href="#" className="mr-4 hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
            <a href="#" className="hover:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-xs mt-8">
        <p>&copy; 2024 DUALITY RESTAURANT. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
