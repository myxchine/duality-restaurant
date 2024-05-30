const Footer = () => {
  return (
    <footer className="footer w-full flex justify-center items-center p-8">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <p className="text-center text-muted">
              &copy; {new Date().getFullYear()} Duality Reservation System. All
              rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
