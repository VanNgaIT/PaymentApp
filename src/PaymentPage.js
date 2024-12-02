import React, { useState } from 'react';
import { QRCodeCanvas} from 'qrcode.react';
import { FaTrash } from 'react-icons/fa';


const PaymentPage = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  
  const products = [
    {id: 1, name: 'Chuột máy tính không dây', price: 5.0, image: 'https://th.bing.com/th/id/OIP.JaLRA0PIYdUUaVYBp7zTwwHaIi?w=142&h=180&c=7&r=0&o=5&pid=1.7', description: 'Chuột không dây giá rẻ'},
    {id: 2, name: 'Bàn phím', price: 8.0, image: 'https://th.bing.com/th/id/OIP.W1cDZBC2fwOJ2yJonZfQ4wHaDU?w=350&h=156&c=7&r=0&o=5&pid=1.7', description: 'Bàn phím cơ, đổi màu'},
    {id: 3, name: 'Màn hình', price: 15.0, image: 'http://ts4.mm.bing.net/th?id=OIP.xe7lqZ6Wa0gd79F6MhDE_gHaFg&pid=15.1', description: '23inch, siêu mỏng'},
    {id: 4, name: 'iPad Mini', price: 500.0, image: 'https://th.bing.com/th/id/OIP.Ql-Ove3CyNSlLHdYcAzFUAHaHa?w=176&h=180&c=7&r=0&o=5&pid=1.7', description: '1TB, màu Đen tuyền'},
    {id: 5, name: 'iPhone 15 Promax', price: 600.0, image: 'https://th.bing.com/th/id/OIP.f0TxVuQRnOhEoQq9JCmlzwHaHa?w=185&h=185&c=7&r=0&o=5&pid=1.7', description: '256GB, màu Titan'},
    {id: 6, name: 'Macbook Pro', price: 1500.0, image: 'https://th.bing.com/th/id/OIP.ohmnPhkbtA_4dkwgbyhTUQHaEK?w=301&h=180&c=7&r=0&o=5&pid=1.7', description: 'Màu trắng, hàng nhập khẩu'},
    {id: 7, name: 'Apple Watch Series 8', price: 250.0, image: 'https://th.bing.com/th/id/OIP.K0EFfFHC2n8V3M6rttQoAAHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7', description: 'Màu trắng, hàng nhập khẩu'},
    {id: 8, name: 'Apple Airpod 3rd ', price: 125.0, image: 'https://th.bing.com/th?id=OPAC.8Asv5S01rgQP%2bA474C474&w=172&h=167&rs=1&pid=21.1', description: 'Màu trắng, hàng nhập khẩu'},
    { id: 9, name: 'Máy chơi game GPD WIN 4', price: 50.0, image: 'https://th.bing.com/th/id/OIP.It-N6-E9-fS9EK7b-iNj8gHaFp?w=200&h=180&c=7&r=0&o=5&pid=1.7', description: 'Máy chơi game đời mới' },
    { id: 10, name: 'Tai nghe Gaming', price: 35.0, image: 'https://th.bing.com/th/id/OIP.ZfLsB0e3_m6IvsOTZCIx4wHaHa?w=187&h=187&c=7&r=0&o=5&pid=1.7', description: 'Tai nghe Gaming cho game thủ' },
    { id: 11, name: 'Camera hành trình Xiaomi', price: 90.0, image: 'https://th.bing.com/th/id/OIP.eHzwewAMFkKECTWW_Ox5qwHaHa?w=200&h=200&c=7&r=0&o=5&pid=1.7', description: 'Ghi hình Full HD' },
    { id: 12, name: 'Pin sạc dự phòng Anker', price: 20.0, image: 'https://www.bing.com/th/id/OIP.bhQUvUEq63f7riNx0srfDgHaHa?w=182&h=182&c=7&r=0&o=5&pid=1.7', description: '10,000mAh' },
    { id: 13, name: 'Lót chuột Gaming', price: 2.0, image: 'https://th.bing.com/th/id/OIP.aOfl1nbCm80-Rbg0DcJazAHaHa?w=175&h=180&c=7&r=0&o=5&pid=1.7', description: 'Lót chuột chơi game, LED VIỀN RGB' },
    { id: 14, name: 'Samsung Galaxy S23 Ultra', price: 1000.0, image: 'https://th.bing.com/th/id/OIP.d_37IJDKLPKPUiaivYkUiQHaHk?w=160&h=180&c=7&r=0&o=5&pid=1.7', description: 'Điện thoại hệ điều hành Android' },
    { id: 15, name: 'Máy in Laser', price: 200.0, image: 'https://th.bing.com/th/id/OIP.ShI92qFq2kYvlJkWtevGugHaHa?w=187&h=188&c=7&r=0&o=5&pid=1.7', description: 'Máy in rõ nét, công nghệ cao, có mạng LAN' },
    { id: 16, name: 'OPPO Reno10 5G', price: 120.0, image: 'https://th.bing.com/th/id/OIP.hWyHvuE1M2v7s_NxCtn8SgHaGM?w=205&h=180&c=7&r=0&o=5&pid=1.7', description: 'Điện thoại siêu nét' }
  ];

  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);
    if (productInCart) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;
    setCart(cart.map((item) =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const paymentMethods = [
    'Thẻ tín dụng',
    'Ví điện tử',
    'Tiền mặt khi nhận hàng',
    'VNPay',
    'SPay Later',
    'Chuyển khoản qua QR Code'
];  

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Vui lòng chọn phương thức thanh toán!');
    } else {
      setPaymentSuccess(true);
      if (paymentMethod === 'VNPay' || paymentMethod === 'Chuyển khoản qua QR Code') {
        setShowModal(true);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={styles.container}>
      <h2>Danh Sách Sản Phẩm</h2>
      <div style={styles.productSelection}>
        <h3>Chọn sản phẩm</h3>
        <div style={styles.productList}>
          {currentProducts.map((product) => (
            <div
              key={product.id}
              style={styles.productCard}
              onClick={() => addToCart(product)}
              onMouseEnter={() => setHoveredProductId(product.id)} // Khi chuột vào
              onMouseLeave={() => setHoveredProductId(null)} // Khi chuột ra
            >
              <img src={product.image} alt={product.name} style={styles.productImage} />
              <p>{product.name}</p>
              <p>{`Giá: $${product.price.toFixed(2)}`}</p>

            {hoveredProductId === product.id && (
              <div style={styles.productDetails}>
                <p>Mô tả: {product.description}</p>
                <p>Giá gốc: ${((product.price.toFixed(2))*2).toFixed(2)}</p>
              </div>
            )}
            </div>
          ))}
        </div>
        <div style={styles.pagination}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            style={currentPage === index + 1 ? styles.activePage : null}
          >
            {index + 1}
          </button>
        ))}
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      </div>
      {cart.length > 0 && (
        <div style={styles.cart}>
          <h3>Giỏ hàng</h3>
          <div style={styles.cartItems}>
            {cart.map((item) => (
              <div key={item.id} style={styles.cartItem}>
                <img src={item.image} alt={item.name} style={styles.productImage} />
                <p>{item.name}</p>
                <p>{`Giá: $${item.price.toFixed(2)}`}</p>
                <div>
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <p>{`Tổng: $${(item.price * item.quantity).toFixed(2)}`}</p>
                <button onClick={() => removeFromCart(item.id)} style={styles.removeButton}>
                  <FaTrash /> 
                </button>
              </div>
            ))}
          </div>
          <p><strong>Tổng: $</strong>{getTotalAmount().toFixed(2)}</p>
        </div>
      )}
      {cart.length > 0 && (
        <div style={styles.dropdownContainer}>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            style={styles.dropdown}
          >
            <option value="">Chọn phương thức thanh toán</option>
            {paymentMethods.map((method, index) => (
              <option key={index} value={method}>
                {method}
              </option>
            ))}
          </select>
        </div>
      )}
      <button onClick={handlePayment} style={styles.paymentButton}>Thanh toán</button>
      {paymentSuccess && !showModal && (
        <div style={styles.successMessage}>
          <p>Giao dịch thanh toán thành công với phương thức: {paymentMethod}</p>
        </div>
      )}
      {showModal && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <span onClick={closeModal} style={styles.closeButton}>×</span>
            <h3>Mã QR thanh toán</h3>
            {paymentMethod === 'VNPay' ? (
              <p><strong>Mã VNPAY của bạn: </strong><span style={{ fontWeight: 'bold' }}>VNPAY-123456789</span></p>
            ) : (
              <QRCodeCanvas value={`https://payment.example.com?amount=${getTotalAmount().toFixed(2)}`} size={256} />
            )}
            <p>Quét mã để thanh toán hoặc thanh toán qua ứng dụng.</p>
            <button onClick={closeModal} style={styles.modalCloseButton}>x</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
    pagination: { marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '10px' },
    activePage: { backgroundColor: '#55CBCD', color: '#fff', fontWeight: 'bold' },
    container: { maxWidth: '800px', margin: '20px auto', padding: '20px', textAlign: 'center', borderRadius: '12px', backgroundColor: '#ffffff', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', color: '#55CBCD'},
    header: { marginBottom: '20px', color: '#FFC5BF'},
    productSelection: { marginBottom: '30px'},
    productList: { display: 'flex', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap'},
    productCard: { width: '150px', padding: '15px', border: '1px solid #ddd', borderRadius: '8px', textAlign: 'center', transition: 'transform 0.3s, box-shadow 0.3s', cursor: 'pointer', backgroundColor: '#f9f9f9', position: 'relative' },
    productCardHover: { transform: 'translateY(-5px)', boxShadow: '0 6px 15px rgba(0, 0, 0, 0.1)' },
    productImage: { width: '100px', height: '100px', objectFit: 'cover', borderRadius: '8px', marginBottom: '10px' },
    cart: { marginTop: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fefefe', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' },
    cartItems: { marginBottom: '20px' },
    cartItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
    cartItemDetails: { display: 'flex', alignItems: 'center', gap: '15px' },
    cartTotal: { fontWeight: 'bold', fontSize: '18px', color: '#333', marginTop: '10px' },
    dropdownContainer: { marginBottom: '20px', textAlign: 'center' },
    dropdown: { padding: '12px', fontSize: '16px', width: '100%', border: '1px solid #ddd', borderRadius: '8px', backgroundColor: '#fff', outline: 'none' },
    paymentButton: { padding: '12px 20px', backgroundColor: '#55CBCD', color: '#fff', fontSize: '18px', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px', transition: 'background-color 0.3s' },
    paymentButtonHover: { backgroundColor: '#45a049' },
    successMessage: { marginTop: '20px', padding: '15px', backgroundColor: '#dff0d8', border: '1px solid #c3e6cb', borderRadius: '8px', color: '#3c763d', fontWeight: 'bold', textAlign: 'center' },
    modal: { position: 'fixed', top: '0', left: '0', width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center' },
    modalContent: { backgroundColor: '#ffffff', padding: '25px', borderRadius: '12px', textAlign: 'center', width: '350px', boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)', position: 'relative' },
    closeButton: { position: 'absolute', top: '15px', right: '15px', fontSize: '20px', cursor: 'pointer', backgroundColor: 'transparent', color: '#888', border: 'none', outline: 'none' },
  };
  
export default PaymentPage;
