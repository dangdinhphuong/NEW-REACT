// Dữ liệu về các tỉnh thành phố và quận/huyện trong Việt Nam
const vietnamData = [
    {
      label: 'Hà Nội',
      value: 'hanoi',
      districts: [
        { value: 'hn1', label: 'Quận Ba Đình' },
        { value: 'hn2', label: 'Quận Hoàn Kiếm' },
        { value: 'hn3', label: 'Quận Hai Bà Trưng' },
        { value: 'hn4', label: 'Quận Đống Đa' },
        { value: 'hn5', label: 'Quận Tây Hồ' },
        { value: 'hn6', label: 'Quận Cầu Giấy' },
        { value: 'hn7', label: 'Quận Thanh Xuân' },
        { value: 'hn8', label: 'Quận Hoàng Mai' },
        { value: 'hn9', label: 'Quận Long Biên' },
        { value: 'hn10', label: 'Quận Nam Từ Liêm' },
        { value: 'hn11', label: 'Quận Bắc Từ Liêm' },
        { value: 'hn12', label: 'Huyện Thanh Trì' },
        { value: 'hn13', label: 'Huyện Gia Lâm' },
        { value: 'hn14', label: 'Huyện Đông Anh' },
        { value: 'hn15', label: 'Huyện Sóc Sơn' },
        { value: 'hn16', label: 'Huyện Ba Vì' },
        { value: 'hn17', label: 'Huyện Phúc Thọ' },
        { value: 'hn18', label: 'Huyện Thạch Thất' },
        { value: 'hn19', label: 'Huyện Quốc Oai' },
        { value: 'hn20', label: 'Huyện Chương Mỹ' },
        { value: 'hn21', label: 'Huyện Đan Phượng' },
        { value: 'hn22', label: 'Huyện Hoài Đức' },
        { value: 'hn23', label: 'Huyện Thanh Oai' },
        { value: 'hn24', label: 'Huyện Mỹ Đức' },
        { value: 'hn25', label: 'Huyện Ứng Hòa' },
        { value: 'hn26', label: 'Huyện Thường Tín' },
        { value: 'hn27', label: 'Huyện Phú Xuyên' },
        { value: 'hn28', label: 'Huyện Mê Linh' }
      ]
    },
    {
      label: 'Hồ Chí Minh',
      value: 'hochiminh',
      districts: [
        { value: 'hcm1', label: 'Quận 1' },
        { value: 'hcm2', label: 'Quận 2' },
        { value: 'hcm3', label: 'Quận 3' },
        { value: 'hcm4', label: 'Quận 4' },
        { value: 'hcm5', label: 'Quận 5' },
        { value: 'hcm6', label: 'Quận 6' },
        { value: 'hcm7', label: 'Quận 7' },
        { value: 'hcm8', label: 'Quận 8' },
        { value: 'hcm9', label: 'Quận 9' },
        { value: 'hcm10', label: 'Quận 10' },
        { value: 'hcm11', label: 'Quận 11' },
        { value: 'hcm12', label: 'Quận 12' },
        { value: 'hcm13', label: 'Quận Thủ Đức' },
        { value: 'hcm14', label: 'Quận Gò Vấp' },
        { value: 'hcm15', label: 'Quận Bình Thạnh' },
        { value: 'hcm16', label: 'Quận Tân Bình' },
        { value: 'hcm17', label: 'Quận Tân Phú' },
        { value: 'hcm18', label: 'Quận Phú Nhuận' },
        { value: 'hcm19', label: 'Quận Bình Tân' },
        { value: 'hcm20', label: 'Quận Củ Chi' },
        { value: 'hcm21', label: 'Quận Hóc Môn' },
        { value: 'hcm22', label: 'Quận Nhà Bè' },
        { value: 'hcm23', label: 'Quận Cần Giờ' },
        { value: 'hcm24', label: 'Huyện Bình Chánh' },
        { value: 'hcm25', label: 'Huyện Củ Chi' },
        { value: 'hcm26', label: 'Huyện Hóc Môn' },
        { value: 'hcm27', label: 'Huyện Nhà Bè' },
        { value: 'hcm28', label: 'Huyện Cần Giờ' }
      ]
    },
    {
      label: 'Đà Nẵng',
      value: 'danang',
      districts: [
        { value: 'dn1', label: 'Quận Sơn Trà' },
        { value: 'dn2', label: 'Quận Ngũ Hành Sơn' },
        { value: 'dn3', label: 'Quận Hải Châu' },
        { value: 'dn4', label: 'Quận Cẩm Lệ' },
        { value: 'dn5', label: 'Quận Liên Chiểu' },
        { value: 'dn6', label: 'Quận Thanh Khê' },
        { value: 'dn7', label: 'Huyện Hòa Vang' },
        { value: 'dn8', label: 'Huyện Hoàng Sa' }
      ]
    },
    {
      label: 'Phan Thiết',
      value: 'phanthiet',
      districts: [
        { value: 'pt1', label: 'Quận Phan Thiết' },
        { value: 'pt2', label: 'Huyện Tuy Phong' },
        { value: 'pt3', label: 'Huyện Bắc Bình' },
        { value: 'pt4', label: 'Huyện Hàm Thuận Bắc' },
        { value: 'pt5', label: 'Huyện Hàm Thuận Nam' },
        { value: 'pt6', label: 'Huyện Tánh Linh' },
        { value: 'pt7', label: 'Huyện Đức Linh' },
        { value: 'pt8', label: 'Huyện Hàm Tân' },
        { value: 'pt9', label: 'Huyện Phú Quí' }
      ]
    },
    {
      label: 'Hà Nam',
      value: 'hanam',
      districts: [
        { value: 'hnq1', label: 'Thành phố Phủ Lý' },
        { value: 'hnq2', label: 'Huyện Duy Tiên' },
        { value: 'hnq3', label: 'Huyện Kim Bảng' },
        { value: 'hnq4', label: 'Huyện Lý Nhân' },
        { value: 'hnq5', label: 'Huyện Thanh Liêm' },
        { value: 'hnq6', label: 'Huyện Bình Lục' },
        { value: 'hnq7', label: 'Huyện Hà Nam' }
      ]
    },
    {
      label: 'Hòa Bình',
      value: 'hoabinh',
      districts: [
        { value: 'hb1', label: 'Thành phố Hòa Bình' },
        { value: 'hb2', label: 'Huyện Đà Bắc' },
        { value: 'hb3', label: 'Huyện Lương Sơn' },
        { value: 'hb4', label: 'Huyện Kim Bôi' },
        { value: 'hb5', label: 'Huyện Cao Phong' },
        { value: 'hb6', label: 'Huyện Tân Lạc' },
        { value: 'hb7', label: 'Huyện Mai Châu' },
        { value: 'hb8', label: 'Huyện Lạc Sơn' },
        { value: 'hb9', label: 'Huyện Yên Thủy' },
        { value: 'hb10', label: 'Huyện Lạc Thủy' }
      ]
    },
    {
      label: 'Hưng Yên',
      value: 'hy',
      districts: [
        { value: 'hy1', label: 'Thành phố Hưng Yên' },
        { value: 'hy2', label: 'Huyện Văn Lâm' },
        { value: 'hy3', label: 'Huyện Văn Giang' },
        { value: 'hy4', label: 'Huyện Yên Mỹ' },
        { value: 'hy5', label: 'Huyện Mỹ Hào' },
        { value: 'hy6', label: 'Huyện Ân Thi' },
        { value: 'hy7', label: 'Huyện Khoái Châu' },
        { value: 'hy8', label: 'Huyện Kim Động' },
        { value: 'hy9', label: 'Huyện Tiên Lữ' },
        { value: 'hy10', label: 'Huyện Phù Cừ' },
        { value: 'hy11', label: 'Huyện Trần Cao' }
      ]
    },
    {
      label: 'Huế',
      value: 'hue',
      districts: [
        { value: 'hue1', label: 'Thành phố Huế' },
        { value: 'hue2', label: 'Huyện Phong Điền' },
        { value: 'hue3', label: 'Huyện Quảng Điền' },
        { value: 'hue4', label: 'Huyện Phú Vang' },
        { value: 'hue5', label: 'Huyện Hương Thủy' },
        { value: 'hue6', label: 'Huyện Hương Trà' },
        { value: 'hue7', label: 'Huyện A Lưới' },
        { value: 'hue8', label: 'Thị xã Hương Trà' }
      ]
    },
    {
      label: 'Kiên Giang',
      value: 'kiengiang',
      districts: [
        { value: 'kg1', label: 'Thành phố Rạch Giá' },
        { value: 'kg2', label: 'Thị xã Hà Tiên' },
        { value: 'kg3', label: 'Huyện Kiên Lương' },
        { value: 'kg4', label: 'Huyện Hòn Đất' },
        { value: 'kg5', label: 'Huyện Tân Hiệp' },
        { value: 'kg6', label: 'Huyện Châu Thành' },
        { value: 'kg7', label: 'Huyện Giồng Riềng' },
        { value: 'kg8', label: 'Huyện Gò Quao' },
        { value: 'kg9', label: 'Huyện An Biên' },
        { value: 'kg10', label: 'Huyện An Minh' },
        { value: 'kg11', label: 'Huyện Vĩnh Thuận' },
        { value: 'kg12', label: 'Huyện Phú Quốc' },
        { value: 'kg13', label: 'Huyện Kiên Hải' },
        { value: 'kg14', label: 'Huyện U Minh Thượng' },
        { value: 'kg15', label: 'Huyện Giang Thành' }
      ]
    },
    {
      label: 'Lào Cai',
      value: 'laocai',
      districts: [
        { value: 'lc1', label: 'Thành phố Lào Cai' },
        { value: 'lc2', label: 'Huyện Bát Xát' },
        { value: 'lc3', label: 'Huyện Mường Khương' },
        { value: 'lc4', label: 'Huyện Si Ma Cai' },
        { value: 'lc5', label: 'Huyện Bắc Hà' },
        { value: 'lc6', label: 'Huyện Bảo Thắng' },
        { value: 'lc7', label: 'Huyện Bảo Yên' },
        { value: 'lc8', label: 'Huyện Sa Pa' },
        { value: 'lc9', label: 'Huyện Văn Bàn' }
      ]
    },
    {
      label: 'Long Điền',
      value: 'longdien',
      districts: [
        { value: 'ld1', label: 'Xã Long Điền' },
        { value: 'ld2', label: 'Xã Long Hải' },
        { value: 'ld3', label: 'Xã An Ngãi' },
        { value: 'ld4', label: 'Xã Phước Hưng' },
        { value: 'ld5', label: 'Xã An Nhứt' },
        { value: 'ld6', label: 'Xã Long Sơn' }
      ]
    },
    {
      label: 'Long An',
      value: 'longan',
      districts: [
        { value: 'la1', label: 'Thành phố Tân An' },
        { value: 'la2', label: 'Thị xã Kiến Tường' },
        { value: 'la3', label: 'Huyện Vĩnh Hưng' },
        { value: 'la4', label: 'Huyện Mộc Hóa' },
        { value: 'la5', label: 'Huyện Tân Thạnh' },
        { value: 'la6', label: 'Huyện Thạnh Hóa' },
        { value: 'la7', label: 'Huyện Đức Huệ' },
        { value: 'la8', label: 'Huyện Đức Hòa' },
        { value: 'la9', label: 'Huyện Bến Lức' },
        { value: 'la10', label: 'Huyện Thủ Thừa' },
        { value: 'la11', label: 'Huyện Châu Thành' },
        { value: 'la12', label: 'Huyện Tân Trụ' },
        { value: 'la13', label: 'Huyện Cần Đước' },
        { value: 'la14', label: 'Huyện Cần Giuộc' },
        { value: 'la15', label: 'Huyện Tân Hưng' },
        { value: 'la16', label: 'Huyện Cần Thạnh' }
      ]
    },
    {
      label: 'Nam Định',
      value: 'namdinh',
      districts: [
        { value: 'nd1', label: 'Thành phố Nam Định' },
        { value: 'nd2', label: 'Huyện Mỹ Lộc' },
        { value: 'nd3', label: 'Huyện Vụ Bản' },
        { value: 'nd4', label: 'Huyện Ý Yên' },
        { value: 'nd5', label: 'Huyện Nghĩa Hưng' },
        { value: 'nd6', label: 'Huyện Nam Trực' },
        { value: 'nd7', label: 'Huyện Trực Ninh' },
        { value: 'nd8', label: 'Huyện Xuân Trường' },
        { value: 'nd9', label: 'Huyện Giao Thủy' },
        { value: 'nd10', label: 'Huyện Hải Hậu' }
      ]
    },
    {
      label: 'Ninh Bình',
      value: 'ninhbinh',
      districts: [
        { value: 'nb1', label: 'Thành phố Ninh Bình' },
        { value: 'nb2', label: 'Thành phố Tam Điệp' },
        { value: 'nb3', label: 'Huyện Nho Quan' },
        { value: 'nb4', label: 'Huyện Gia Viễn' },
        { value: 'nb5', label: 'Huyện Hoa Lư' },
        { value: 'nb6', label: 'Huyện Yên Khánh' },
        { value: 'nb7', label: 'Huyện Kim Sơn' },
        { value: 'nb8', label: 'Huyện Yên Mô' },
        { value: 'nb9', label: 'Huyện Trường Yên' }
      ]
    },
    {
      label: 'Ninh Thuận',
      value: 'ninhthuan',
      districts: [
        { value: 'nt1', label: 'Thành phố Phan Rang-Tháp Chàm' },
        { value: 'nt2', label: 'Thị xã Ninh Hải' },
        { value: 'nt3', label: 'Huyện Bác Ái' },
        { value: 'nt4', label: 'Huyện Ninh Sơn' },
        { value: 'nt5', label: 'Huyện Ninh Phước' },
        { value: 'nt6', label: 'Huyện Ninh Hải' },
       { value: 'nt7', label: 'Huyện Thuận Bắc' },
        { value: 'nt8', label: 'Huyện Thuận Nam' }
      ]
    },
    {
      label: 'Phú Thọ',
      value: 'phutho',
      districts: [
        { value: 'pt1', label: 'Thành phố Việt Trì' },
        { value: 'pt2', label: 'Thị xã Phú Thọ' },
        { value: 'pt3', label: 'Huyện Đoan Hùng' },
        { value: 'pt4', label: 'Huyện Hạ Hoà' },
        { value: 'pt5', label: 'Huyện Thanh Ba' },
        { value: 'pt6', label: 'Huyện Phù Ninh' },
        { value: 'pt7', label: 'Huyện Yên Lập' },
        { value: 'pt8', label: 'Huyện Cẩm Khê' },
        { value: 'pt9', label: 'Huyện Tam Nông' },
        { value: 'pt10', label: 'Huyện Lâm Thao' },
        { value: 'pt11', label: 'Huyện Thanh Sơn' },
        { value: 'pt12', label: 'Huyện Thanh Thuỷ' },
        { value: 'pt13', label: 'Huyện Tân Sơn' }
      ]
    },
    {
      label: 'Phú Yên',
      value: 'phuyen',
      districts: [
        { value: 'py1', label: 'Thành phố Tuy Hòa' },
        { value: 'py2', label: 'Thị xã Sông Cầu' },
        { value: 'py3', label: 'Huyện Đồng Xuân' },
        { value: 'py4', label: 'Huyện Tuy An' },
        { value: 'py5', label: 'Huyện Sơn Hòa' },
        { value: 'py6', label: 'Huyện Sông Hinh' },
        { value: 'py7', label: 'Huyện Phú Hoà' },
        { value: 'py8', label: 'Huyện Đông Hòa' },
        { value: 'py9', label: 'Huyện Tây Hòa' },
        { value: 'py10', label: 'Huyện Phú Yên' }
      ]
    },
    {
      label: 'Quảng Bình',
      value: 'quangbinh',
      districts: [
        { value: 'qb1', label: 'Thành phố Đồng Hới' },
        { value: 'qb2', label: 'Huyện Minh Hoá' },
        { value: 'qb3', label: 'Huyện Tuyên Hóa' },
        { value: 'qb4', label: 'Huyện Quảng Trạch' },
        { value: 'qb5', label: 'Huyện Bố Trạch' },
        { value: 'qb6', label: 'Huyện Quảng Ninh' },
        { value: 'qb7', label: 'Huyện Lệ Thủy' },
      ]
    },
    {
      label: 'Quảng Đông',
      value: 'quangdong',
      districts: [
        { value: 'qd1', label: 'Thành phố Quảng Yên' },
        { value: 'qd2', label: 'Huyện Hạ Long' },
        { value: 'qd3', label: 'Huyện Cẩm Phả' },
        { value: 'qd4', label: 'Huyện Uông Bí' },
        { value: 'qd5', label: 'Huyện Vân Đồn' },
        { value: 'qd6', label: 'Thị xã Đông Triều' },
        { value: 'qd7', label: 'Thị xã Quảng Hà' },
        { value: 'qd8', label: 'Huyện Tiên Yên' },
        { value: 'qd9', label: 'Huyện Ba Chẽ' },
        { value: 'qd10', label: 'Huyện Hoành Bồ' },
        { value: 'qd11', label: 'Huyện Đầm Hà' }
      ]
    },
    {
      label: 'Quảng Lâm',
      value: 'quanglam',
      districts: [
        { value: 'ql1', label: 'Thị xã Quảng Trị' },
        { value: 'ql2', label: 'Huyện Vĩnh Linh' },
        { value: 'ql3', label: 'Huyện Gio Linh' },
        { value: 'ql4', label: 'Huyện Cam Lộ' },
        { value: 'ql5', label: 'Huyện Triệu Phong' },
        { value: 'ql6', label: 'Huyện Hải Lăng' },
        { value: 'ql7', label: 'Huyện Hướng Hóa' },
        { value: 'ql8', label: 'Huyện Đa Krông' },
        { value: 'ql9', label: 'Huyện Đakrông' },
        { value: 'ql10', label: 'Huyện Hướng Hoá' },
        { value: 'ql11', label: 'Huyện Quảng Trị' }
      ]
    },
    {
      label: 'Quảng Ninh',
      value: 'quangninh',
      districts: [
        { value: 'qn1', label: 'Thành phố Hạ Long' },
        { value: 'qn2', label: 'Thành phố Móng Cái' },
        { value: 'qn3', label: 'Thị xã Cẩm Phả' },
        { value: 'qn4', label: 'Thị xã Uông Bí' },
        { value: 'qn5', label: 'Huyện Bình Liêu' },
        { value: 'qn6', label: 'Huyện Tiên Yên' },
        { value: 'qn7', label: 'Huyện Đầm Hà' },
        { value: 'qn8', label: 'Huyện Hải Hà' },
        { value: 'qn9', label: 'Huyện Ba Chẽ' },
        { value: 'qn10', label: 'Huyện Vân Đồn' },
        { value: 'qn11', label: 'Huyện Hoành Bồ' },
        { value: 'qn12', label: 'Huyện Đông Triều' },
        { value: 'qn13', label: 'Huyện Cô Tô' }
      ]
    },
    {
      label: 'Quảng Ngãi',
      value: 'quangngai',
      districts: [
        { value: 'qng1', label: 'Thành phố Quảng Ngãi' },
        { value: 'qng2', label: 'Huyện Lý Sơn' },
        { value: 'qng3', label: 'Huyện Bình Sơn' },
        { value: 'qng4', label: 'Huyện Trà Bồng' },
        { value: 'qng5', label: 'Huyện Sơn Tịnh' },
        { value: 'qng6', label: 'Huyện Sơn Hà' },
        { value: 'qng7', label: 'Huyện Sơn Tây' },
        { value: 'qng8', label: 'Huyện Tư Nghĩa' },
        { value: 'qng9', label: 'Huyện Nghĩa Hành' },
        { value: 'qng10', label: 'Huyện Minh Long' },
        { value: 'qng11', label: 'Huyện Mộ Đức' },
        { value: 'qng12', label: 'Huyện Đức Phổ' },
        { value: 'qng13', label: 'Huyện Ba Tơ' },
        { value: 'qng14', label: 'Huyện Sơn Hà' },
        { value: 'qng15', label: 'Huyện Sơn Tây' }
      ]
    },
    {
      label: 'Quảng Nam',
      value: 'quangnam',
      districts: [
        { value: 'qnm1', label: 'Thành phố Tam Kỳ' },
        { value: 'qnm2', label: 'Thành phố Hội An' },
        { value: 'qnm3', label: 'Huyện Tây Giang' },
        { value: 'qnm4', label: 'Huyện Đông Giang' },
        { value: 'qnm5', label: 'Huyện Đại Lộc' },
        { value: 'qnm6', label: 'Huyện Điện Bàn' },
        { value: 'qnm7', label: 'Huyện Duy Xuyên' },
        { value: 'qnm8', label: 'Huyện Quế Sơn' },
        { value: 'qnm9', label: 'Huyện Nam Giang' },
        { value: 'qnm10', label: 'Huyện Phước Sơn' },
        { value: 'qnm11', label: 'Huyện Hiệp Đức' },
        { value: 'qnm12', label: 'Huyện Thăng Bình' },
        { value: 'qnm13', label: 'Huyện Tiên Phước' },
        { value: 'qnm14', label: 'Huyện Nông Sơn' }
      ]
    },
    {
      label: 'Quảng Trị',
      value: 'quangtri',
      districts: [
        { value: 'qtr1', label: 'Thành phố Đông Hà' },
        { value: 'qtr2', label: 'Thị xã Quảng Trị' },
        { value: 'qtr3', label: 'Huyện Vĩnh Linh' },
        { value: 'qtr4', label: 'Huyện Gio Linh' },
        { value: 'qtr5', label: 'Huyện Cam Lộ' },
        { value: 'qtr6', label: 'Huyện Triệu Phong' },
        { value: 'qtr7', label: 'Huyện Hải Lăng' },
        { value: 'qtr8', label: 'Huyện Hướng Hóa' },
        { value: 'qtr9', label: 'Huyện Đa Krông' },
        { value: 'qtr10', label: 'Huyện Hướng Hoá' },
        { value: 'qtr11', label: 'Huyện Đa Krông' }
      ]
    },
    {
      label: 'Sóc Trăng',
      value: 'soctrang',
      districts: [
        { value: 'st1', label: 'Thành phố Sóc Trăng' },
        { value: 'st2', label: 'Huyện Châu Thành' },
        { value: 'st3', label: 'Huyện Kế Sách' },
        { value: 'st4', label: 'Huyện Mỹ Tú' },
        { value: 'st5', label: 'Huyện Long Phú' },
        { value: 'st6', label: 'Huyện Mỹ Xuyên' },
        { value: 'st7', label: 'Huyện Thạnh Trị' },
        { value: 'st8', label: 'Huyện Vĩnh Châu' },
        { value: 'st9', label: 'Huyện Ngã Năm' },
        { value: 'st10', label: 'Huyện Trần Đề' }
      ]
    },
    {
      label: 'Thái Nguyên',
      value: 'thainguyen',
      districts: [
        { value: 'tn1', label: 'Thành phố Thái Nguyên' },
        { value: 'tn2', label: 'Thành phố Sông Công' },
        { value: 'tn3', label: 'Huyện Định Hóa' },
        { value: 'tn4', label: 'Huyện Phú Lương' },
        { value: 'tn5', label: 'Huyện Đại Từ' },
        { value: 'tn6', label: 'Huyện Đồng Hỷ' },
        { value: 'tn7', label: 'Huyện Võ Nhai' },
        { value: 'tn8', label: 'Huyện Phú Bình' },
        { value: 'tn9', label: 'Huyện Phổ Yên' },
        { value: 'tn10', label: 'Thị xã Phổ Yên' }
      ]
    },
    {
      label: 'Thanh Hóa',
      value: 'thanhhoa',
      districts: [
        { value: 'th1', label: 'Thành phố Thanh Hóa' },
        { value: 'th2', label: 'Thị xã Bỉm Sơn' },
        { value: 'th3', label: 'Huyện Quan Hóa' },
        { value: 'th4', label: 'Huyện Quan Sơn' },
        { value: 'th5', label: 'Huyện Mường Lát' },
        { value: 'th6', label: 'Huyện Bá Thước' },
        { value: 'th7', label: 'Huyện Thường Xuân' },
        { value: 'th8', label: 'Huyện Như Xuân' },
        { value: 'th9', label: 'Huyện Như Thanh' },
        { value: 'th10', label: 'Huyện Lang Chánh' },
        { value: 'th11', label: 'Huyện Ngọc Lặc' },
        { value: 'th12', label: 'Huyện Cẩm Thủy' },
        { value: 'th13', label: 'Huyện Thạch Thành' },
        { value: 'th14', label: 'Huyện Hà Trung' },
        { value: 'th15', label: 'Huyện Vĩnh Lộc' },
        { value: 'th16', label: 'Huyện Yên Định' },
        { value: 'th17', label: 'Huyện Thọ Xuân' },
        { value: 'th18', label: 'Huyện Thường Xuân' },
        { value: 'th19', label: 'Huyện Triệu Sơn' },
        { value: 'th20', label: 'Huyện Thiệu Hóa' },
        { value: 'th21', label: 'Huyện Hoằng Hoá' },
        { value: 'th22', label: 'Huyện Hậu Lộc' },
        { value: 'th23', label: 'Huyện Nga Sơn' },
        { value: 'th24', label: 'Huyện Đông Sơn' },
        { value: 'th25', label: 'Huyện Quảng Xương' },
        { value: 'th26', label: 'Huyện Tĩnh Gia' }
      ]
    },
    {
      label: 'Tiền Giang',
      value: 'tiengiang',
      districts: [
        { value: 'tg1', label: 'Thành phố Mỹ Tho' },
        { value: 'tg2', label: 'Thị xã Gò Công' },
        { value: 'tg3', label: 'Huyện Cai Lậy' },
        { value: 'tg4', label: 'Huyện Cái Bè' },
        { value: 'tg5', label: 'Huyện Châu Thành' },
        { value: 'tg6', label: 'Huyện Chợ Gạo' },
        { value: 'tg7', label: 'Huyện Gò Công Đông' },
        { value: 'tg8', label: 'Huyện Gò Công Tây' },
        { value: 'tg9', label: 'Huyện Tân Phước' },
        { value: 'tg10', label: 'Huyện Tân Phú Đông' }
      ]
    },
    {
      label: 'Tuyên Quang',
      value: 'tuyenquang',
      districts: [
        { value: 'tnq1', label: 'Thành phố Tuyên Quang' },
        { value: 'tnq2', label: 'Huyện Lâm Bình' },
        { value: 'tnq3', label: 'Huyện Na Hang' },
        { value: 'tnq4', label: 'Huyện Chiêm Hóa' },
        { value: 'tnq5', label: 'Huyện Hàm Yên' },
        { value: 'tnq6', label: 'Huyện Yên Sơn' },
        { value: 'tnq7', label: 'Huyện Sơn Dương' }
      ]
    },
    {
      label: 'Trà Vinh',
      value: 'travinh',
      districts: [
        { value: 'tv1', label: 'Thành phố Trà Vinh' },
        { value: 'tv2', label: 'Huyện Càng Long' },
        { value: 'tv3', label: 'Huyện Cầu Kè' },
        { value: 'tv4', label: 'Huyện Tiểu Cần' },
        { value: 'tv5', label: 'Huyện Châu Thành' },
        { value: 'tv6', label: 'Huyện Cầu Ngang' },
        { value: 'tv7', label: 'Huyện Trà Cú' },
        { value: 'tv8', label: 'Huyện Duyên Hải' }
      ]
    },
    {
      label: 'Vĩnh Long',
      value: 'vinhlong',
      districts: [
        { value: 'vl1', label: 'Thành phố Vĩnh Long' },
        { value: 'vl2', label: 'Huyện Long Hồ' },
        { value: 'vl3', label: 'Huyện Mang Thít' },
        { value: 'vl4', label: 'Huyện Vũng Liêm' },
        { value: 'vl5', label: 'Huyện Tam Bình' },
        { value: 'vl6', label: 'Huyện Trà Ôn' },
        { value: 'vl7', label: 'Huyện Bình Minh' },
        { value: 'vl8', label: 'Huyện Bình Tân' }
      ]
    },
    {
      label: 'Vũng Tàu',
      value: 'vungtau',
      districts: [
        { value: 'vt1', label: 'Thành phố Vũng Tàu' },
        { value: 'vt2', label: 'Huyện Bà Rịa' },
        { value: 'vt3', label: 'Huyện Xuyên Mộc' },
        { value: 'vt4', label: 'Huyện Long Điền' },
        { value: 'vt5', label: 'Huyện Đất Đỏ' },
        { value: 'vt6', label: 'Huyện Châu Đức' },
        { value: 'vt7', label: 'Huyện Côn Đảo' }
      ]
    },
    {
      label: 'Yên Bái',
      value: 'yenbai',
      districts: [
        { value: 'yb1', label: 'Thành phố Yên Bái' },
        { value: 'yb2', label: 'Huyện Văn Yên' },
        { value: 'yb3', label: 'Huyện Yên Bình' },
        { value: 'yb4', label: 'Huyện Lục Yên' },
        { value: 'yb5', label: 'Huyện Mù Cang Chải' },
        { value: 'yb6', label: 'Huyện Trấn Yên' },
        { value: 'yb7', label: 'Huyện Văn Chấn' },
        { value: 'yb8', label: 'Huyện Trạm Tấu' },
        { value: 'yb9', label: 'Huyện Nghĩa Lộ' }
      ]
    },
  ];
  export default vietnamData;