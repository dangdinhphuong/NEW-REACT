import {Link, useParams} from 'react-router-dom'
import { MdManageAccounts, MdNotificationsActive  } from "react-icons/md";
import { useGetOneUserQuery } from '../Services/Api_User';

const UserMenu = () => {
  const { id } = useParams<{ id: string }>();
  const { data }: any = useGetOneUserQuery(id!);
  console.log('data:', data);
  
  return (
    <>
      <div className="menu_left">
        <div className="menu_left_head df">
          {!data?.data.imgUrl ? (
             <img className='avt_user' src="../../img/avt_default.jpg" alt="" />
          ) : (
            <img className='avt_user' style={{borderRadius: "999px", height: "55px", width: "55px", marginRight: "15px"}} src={data?.data.imgUrl} alt="" />
          )}
         
          <div className='information_user'>
              <p className='user_name'>{data?.data.username}</p>
              <Link to={`/user/${id}`} className='df'>               
                  <svg width={12} height={12} viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg" style={{marginRight: 4}}><path d="M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.073 3.428L3.46 12l6.21-6.18-3.46-3.48" fill="#9B9B9B" fillRule="evenodd" /></svg>
                Sửa hồ sơ
              </Link>
          </div>
        </div>
        <div className="menu_list">
        <Link to={`/user/${id}`} className='df mb-2'><MdManageAccounts className="icon_profile"/> <span className='menu_list-name'>Hồ sơ</span></Link>
        <Link to="/order/view" className='df mb-2'><img src="https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078" className='menu_list-img' alt="" /> <span className='menu_list-name'>Đơn hàng</span></Link>
        <Link to="/user" className='df mb-2'><MdNotificationsActive className="icon_profile"/> <span className='menu_list-name'>Thông báo</span></Link>
        <Link to="/user" className='df mb-2'><img src="https://down-vn.img.susercontent.com/file/84feaa363ce325071c0a66d3c9a88748" className='menu_list-img' alt="" /> <span className='menu_list-name'>Voucher</span></Link>
        </div>
      </div>
    </>
  )
}

export default UserMenu