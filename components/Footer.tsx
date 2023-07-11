const Footer = () => {
  const year = new Date();
  const getCurrentYear = year.getFullYear();

  return (
    <footer>
      <div className="container px-5 py-24 mx-auto flex justify-center items-center md:items-center lg:items-center md:flex-row md:flex-nowrap flex-wrap flex-col">
        <div className="flex-grow flex flex-wrap -mb-10 text-center order-first">
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-medium opacity-[54%] hover:opacity-[100%] transition tracking-widest text-sm mb-3 cursor-pointer">
              Contact Us
            </h2>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-medium opacity-[54%] hover:opacity-[100%] transition tracking-widest text-sm mb-3 cursor-pointer">
              FAQ
            </h2>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-medium opacity-[54%] hover:opacity-[100%] transition tracking-widest text-sm mb-3 cursor-pointer">
              Terms and Conditions
            </h2>
          </div>
          <div className="lg:w-1/4 md:w-1/2 w-full px-4">
            <h2 className="font-medium opacity-[54%] hover:opacity-[100%] transition tracking-widest text-sm mb-3 cursor-pointer">
              Credits
            </h2>
          </div>
        </div>
      </div>
      <div>
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-sm text-center sm:text-left opacity-[54%] hover:opacity-[100%] transition">
            © {getCurrentYear} —
            <a
              href="https://portfolio-paulius.netlify.app/"
              rel="noopener noreferrer"
              className="ml-1"
              target="_blank"
            >
              @Paulius Taraškevičius
            </a>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start cursor-pointer">
            <a
              href="https://www.facebook.com/paulius.taraskevicius"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 opacity-[54%] hover:opacity-[100%] transition"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>

            <a
              className="ml-3"
              href="https://www.instagram.com/paulius_taraskevicius"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5 opacity-[54%] hover:opacity-[100%] transition"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              className="ml-3"
              href="https://www.linkedin.com/in/paulius-tara%C5%A1kevi%C4%8Dius-916b83234/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5 opacity-[54%] hover:opacity-[100%] transition"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
