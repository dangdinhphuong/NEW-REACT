import React, { useEffect, useState, ChangeEvent } from 'react'
import UserMenu from '../Component/UserMenu'
import '../../css/user.css'
import { useParams } from 'react-router-dom';
import { useGetOneUserQuery, useUpdateUserMutation } from '../Services/Api_User';
import { IUser } from '../Models/interfaces';
import { Button, message } from 'antd';
import { Modal } from 'antd';


const User = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);
  const { data, isLoading, error }: any = useGetOneUserQuery(id!);
  const [updateUser] = useUpdateUserMutation();

  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [gender, setGender] = useState('');

  const [isModalVisible, setIsModalVisible] = useState(false);

  // useEffect để cập nhật state khi dữ liệu từ API được tải về
  useEffect(() => {
    if (data) {
      setName(data?.data.username || '');
      setEmail(data?.data.email || '');
      setPassword(data?.data.password || '');
      setPhone(data?.data.phone || '');
      setAddress(data?.data.address || '');
      setImgUrl(data?.data.imgUrl || '');
      setGender(data?.data.gender || '');
      console.log('Data from API:', data?.data);
    }
  }, [data]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    handleSave();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSave = () => {
    const updatedUserData: IUser = {
      _id: data?.data._id,
      username,
      email,
      password,
      phone,
      address,
      imgUrl,
      gender,
    };

    updateUser(updatedUserData)
      .unwrap()
      .then(() => {
        message.success('Cập nhật thành công');
      })
      .catch((error) => {
        console.log(error);
        message.error('Cập nhật thất bại. Vui lòng thử lại.');
      });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImgUrl(reader.result as string);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };


  return (
    <div className='container_u'>
      <UserMenu />
      <div className='user_profile'>
        <div className="user_profile-head">
          <p>Hồ Sơ Của Tôi</p>
          <p>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
        </div>
        <div className="form">
          <form action="">
            <div className="user_form">
              <div className='form_left'>
                <div className='df'>
                  <label htmlFor="">Tên đăng nhập</label>
                  <p className='m-0' style={{color: "#333"}}>{data?.data.username}</p>
                </div>
                <div className='df'>
                  <label htmlFor="">Tên</label>
                  <input className='inp_name' type="text" value={username} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='df'>
                  <label htmlFor="">Email</label>
                  <input className='inp_name' type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='df'>
                  <label htmlFor="">Pass</label>
                  <input className='inp_name' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='df'>
                  <label htmlFor="">Số điện thoại</label>
                  <input className='inp_name' type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className='df'>
                  <label htmlFor="">Địa chỉ</label>
                  <input className='inp_name' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
                </div>
                <div className='df'>
                  <label htmlFor="">Giới tính</label>
                  <input className='mr-2' type="radio" value="male" checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Nam
                  <input className='ml-6 mr-2' type="radio" value="female" checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Nữ
                  <input className='ml-6 mr-2' type="radio" value="other" checked={gender === 'other'} onChange={(e) => setGender(e.target.value)} /> Khác
                </div>
              </div>
              <div className="form_right">
                <div className="avt">
                  <img src={imgUrl} alt='' />                 
                  <label className='btn btn-warning'>Chọn ảnh
                  <input type='file' onChange={handleImageChange}  hidden/>
                  </label>
                  <p>Dung lượng file tối đa 1 MB <br/>
                    Định dạng:.JPEG, .PNG</p>
                </div>
              </div>
            </div>
          </form>
          <button type='button' className='ml-20 btn_u' onClick={showModal}>Lưu</button>
          <Modal title='Xác nhận' visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} okButtonProps={{ style: { backgroundColor: "red" } }}>
            <p>Bạn có chắc chắn muốn lưu thay đổi không?</p>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default User