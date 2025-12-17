import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from './food.module.css';
import styleBar from '../../components/bar.module.css'
import corner from '/corner.png';
import logo from '/logo.png';
const FoodPage = () => {
    const navigate = useNavigate();
    useEffect(() => {}, []);
  return (
    <div className={style.background}>
        <div className = {styleBar.top}>
            <div className={styleBar.bar}>
                <img src={logo} alt="Logo" className={styleBar.logo} onClick={() => navigate('/')} />
                <div className={styleBar.textbar}>Chào mừng, Uyên Thy</div>
                <div className={styleBar.avatarcontainer}>
                    <img src={corner} alt="Avatar" className={styleBar.avatar} />
                </div>
            </div>
            <div className={style.imgcontainer}>
                <img src={corner} alt="Image Food" className={style.imgfood} />
            </div>
            <div className={style.title}>CÁC LOẠI THỰC PHẨM</div>
            <div className={style.description}>Khám phá các loại thực phẩm tươi ngon và bổ dưỡng để tạo nên những bữa ăn hấp dẫn và lành mạnh cho bạn và gia đình.</div>
            <div className={style.nutrition}>
                <div className={style.nutritionitem}>
                    <span>Khẩu phần:</span>
                    <span className={style.nutritionitemvalue}>4 người</span>
                </div>
                <div className={style.nutritionitem}>
                    <span>Thời gian:</span>
                    <span className={style.nutritionitemvalue}>120'</span>
                </div>
            </div>
        </div>
        <div className={style.bottomSpace}>
            <div className={style.titleIngredients}>Nguyên liệu</div>
            <div className={style.ingredientsList}>
                <ul>
                    <li>Thịt gà</li>
                    <li>Rau xanh</li>
                    <li>Cơm</li>
                </ul>
            </div>
            <div className={style.titleSteps}>Các bước thực hiện</div>
            <div className={style.steps}>Bước 1: Test Bước 2: test</div>
        </div>

    </div>

  );
};

export default FoodPage;
