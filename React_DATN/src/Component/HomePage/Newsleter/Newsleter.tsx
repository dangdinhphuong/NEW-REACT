import { useCreateNewSletterMutation } from "../../../Services/Api_newSletter"
import { CloseCircleOutlined, CheckOutlined } from "@ant-design/icons"
import { notification } from "antd"

const Newsleter = () => {
  const [createNewSletter] = useCreateNewSletterMutation()

  const openNotification = (message: string) => {
    notification.open({
      message: "Thông Báo",
      description: message,
      icon: <CloseCircleOutlined style={{ color: "#a83232" }} />,
      duration: 1,
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()

    // Extract input data from the form
    const email = e.target.elements.email.value

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/

    // Validate the email address
    if (!emailRegex.test(email)) {
      openNotification("Lỗi định dạng email vui lòng nhập lại!")
      return
    }
    createNewSletter({ email })
    notification.open({
      message: "Thông Báo",
      description: "Đăng kí nhận thông tin khuyến mãi thành công",
      icon: <CheckOutlined style={{ color: "#60f542" }} />,
      duration: 1,
    })
  }

  return (
    <div className="w-[90vw] mx-auto">
      <div className="newsleter-area">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="newsleter">
                <h3>Bản tin</h3>
                <p>
                  Đăng ký vào danh sách gửi thư của chúng tôi để nhận thông tin
                  cập nhật về các ưu đãi đặc biệt mới và thông tin giảm giá
                  khác.
                </p>
                <div className="Subscribe">
                  <form onSubmit={handleSubmit}>
                    <input
                      type="string"
                      name="email"
                      placeholder="Nhập email của bạn"
                    />
                    <button className="w-28" type="submit" title="Subscribe">
                      Đăng Kí
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="follow">
                <h3>follow</h3>
                <p>
                  Subscribe to the james mailing list to receive updates on new
                  arrivals, special offers and other discount information.
                </p>
                <ul className="follow-link">
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-facebook" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-rss" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-twitter" />{" "}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {" "}
                      <i className="fa fa-google-plus" />{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Newsleter
