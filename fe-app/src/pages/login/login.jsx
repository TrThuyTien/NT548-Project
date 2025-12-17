import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from './login.module.css';
import logo from '/logo.png';

const Login = () => {
    const navigate = useNavigate();
    useEffect(() => {}, []);
    return ( 
        <div className={style.background}>
            <div className={style.left}>
                <img src={logo} alt="KitchenWhiz Logo" className={style.logo} />
                <div className={style.textpreview}>
                    <p>Không cần phải là MasterChef, chỉ cần KitchenWhiz.</p>
                    <p>Bạn chỉ việc chọn nguyên liệu, còn lại để KitchenWhiz lo.</p>
                    <p>Dù bạn ‘gà mờ’ trong bếp hay đam mê nấu nướng,</p>
                    <p>KitchenWhiz sẽ biến mỗi bữa ăn thành một ‘show diễn’ cực chill!</p>
                </div>
                <div className={style.buttonContainer}>
                    <button className={style.button} onClick={() => navigate('/signup')}>Đăng ký</button>
                    <button className={style.button}>Tìm hiểu</button>
                </div>
            </div>
            <div className={style.right}>
                <div className={style.container}>
                    <div className={style.title}>ĐĂNG NHẬP</div>
                   <input
                   type="text"
                   placeholder="Email or Username"
                   className={style.inputField} /> 
                   <input
                   type="password"
                   placeholder="Password"
                   className={style.inputField} />
                   <div className={style.forgotpassword} onClick={() => navigate('/forgot_password')}>Quên mật khẩu?</div>
                   <div  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <button className={style.button}>Đăng nhập</button>
                   </div>
                   
                </div>
            </div>
         </div>
    );
};

export default Login;