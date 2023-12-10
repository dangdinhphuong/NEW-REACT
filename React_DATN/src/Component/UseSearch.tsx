import { useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useSearch = () => {
    // Tạo một tham chiếu đến phần tử input tìm kiếm
    const searchInputRef = useRef<HTMLInputElement | null>(null);
    // Sử dụng hook useNavigate để quản lý điều hướng trong ứng dụng
    const navigate = useNavigate();

    // Hàm thực hiện tìm kiếm, được bao bọc bởi useCallback để tránh việc tạo lại hàm mỗi lần render
    const performSearch = useCallback(() => {
        // Kiểm tra xem phần tử input tìm kiếm có tồn tại hay không
        if (searchInputRef.current) {
            // Lấy giá trị từ input tìm kiếm và sử dụng nó để điều hướng đến trang tìm kiếm
            const searchTerm = searchInputRef.current.value;
            navigate(`/products?search=${searchTerm}`);
        }
    }, [navigate]);

    // Hàm xử lý sự kiện bàn phím, được bao bọc bởi useCallback để tránh việc tạo lại hàm mỗi lần render
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        // Kiểm tra nếu người dùng ấn phím "Enter"
        if (e.key === 'Enter') {
            e.preventDefault();
            // Gọi hàm thực hiện tìm kiếm khi ấn phím "Enter"
            performSearch();
        }
    }, [performSearch]);

    // Sử dụng useEffect để tập trung vào phần tử input tìm kiếm sau khi thành phần được render
    useEffect(() => {
        if (searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, []);

    // Trả về tham chiếu đến input tìm kiếm và hàm xử lý sự kiện bàn phím
    return { searchInputRef, handleKeyDown };
};

export default useSearch 