const Contact = () => {
  return (
    <div className="w-[90vw] mx-auto mt-36 mb-10">
      <div className="contact-area">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="location">
                <ul>
                  <li>
                    <a href="index.html" title="go to homepage">
                      Home<span>/</span>
                    </a>{" "}
                  </li>
                  <li>
                    <strong> contact</strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="content">
            <h1 className="uppercase font-bold text-3xl text-center mt-0 mb-4">
              Liên Lạc Với Chúng Tôi
            </h1>
            <div className="mainContent flex flex-col md:flex-row justify-between md:space-x-10 ">
              <div className="mapContact w-[100%] md:w-[40%]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8636686990403!2d105.74467967530133!3d21.038140280613558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1698559265571!5m2!1svi!2s"
                  height="460"
                  className="w-[100%]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              <div className="contentContact w-[100%] md:w-[50%] flex justify-center items-center">
                <form className="w-[100%]">
                  <div className="grid grid-cols-2 gap-4 my-auto">
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Họ"
                    />
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Tên"
                    />
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="email"
                      placeholder="Email"
                    />
                    <input
                      className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                      type="text"
                      placeholder="Số Điện Thoại"
                    />
                  </div>
                  <div className="my-4">
                    <textarea
                      placeholder="Nội dung"
                      className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                    ></textarea>
                  </div>
                  <div className="text-center mt-4 w-[100%]">
                    <button
                      type="submit"
                      className="w-1/4 uppercase text-sm font-bold tracking-wide bg-[#2d9d63] text-gray-100 p-3 rounded-lg
                      focus:outline-none focus:shadow-outline"
                    >
                      Gửi
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
