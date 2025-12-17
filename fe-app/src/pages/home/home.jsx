import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import style from './home.module.css';
import corner from '/corner.png';
import logo from '/logo.png';
import styleBar from '../../components/bar.module.css';
import styleHeartIcon from '../../components/hearticon.module.css'
import temp from '/temp.jpg'
import { FaHeart } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();
    useEffect(() => {}, []);
    return ( 
        <div className={style.background}>
            <div className = {styleBar.top}>
            <div className={styleBar.bar}>
                <img src={logo} alt="Logo" className={styleBar.logo} onClick={() => navigate('/')} />
                <div className={styleBar.textbar}>Chào mừng, Uyên Thy</div>
                <div className={styleBar.avatarcontainer}>
                    <img src={temp} alt="Avatar" className={styleBar.avatar} />
                </div>
            </div>
            <img src={corner} alt="Corner Decoration" className={style.imgcorner} />
            <div className={style.imgcontainer}>
                <img src={temp} alt="Corner Decoration" className={style.image} />
            </div>
            <div className={style.randomMeals}>
                <div className={style.titleRandomMeals}>Trưa nay ăn gì?</div>
                <div className={style.titlenamefood}>Bún bò Huế</div>
                <div className={style.descriptionRandomMeals}>is a popular Vietnamese noodle soup originating from the city of Huế in central Vietnam. This dish features a rich and aromatic broth made from beef bones and...</div>
            </div>
            
            <input 
                type="text" 
                className={style.searchBar} 
                placeholder="Tìm kiếm món ăn, công thức..." 
                />
            </div>

            <div className={style.titlefeat}>Món ăn ưa thích</div>
            <div className={style.featfoodcontainer}>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                         <button className={styleHeartIcon.heartBtn}><FaHeart color="red"/></button>
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        <button className={styleHeartIcon.heartBtn}><FaHeart color="red"/></button>
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        <button className={styleHeartIcon.heartBtn}><FaHeart color="red"/></button>
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        <button className={styleHeartIcon.heartBtn}><FaHeart color="red"/></button>
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                </div>
            </div>
            <button className={style.btnmore}>XEM THÊM NHIỀU HƠN</button>

            <div className={style.titlefeat}>Món ăn đã xem gần đây</div>
            <div className={style.featfoodcontainer}>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaEye className={style.iconView} />
                        <span className={style.textfeat}>12 giờ trước</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaEye className={style.iconView} />
                        <span className={style.textfeat}>12 giờ trước</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaEye className={style.iconView} />
                        <span className={style.textfeat}>12 giờ trước</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                    </div>
                    <div className={style.featname}>Bún bò Huế</div> 
                    <div className={style.timefeat}>
                        <FaEye className={style.iconView} />
                        <span className={style.textfeat}>12 giờ trước</span>
                    </div>
                </div>
            </div>
            <button className={style.btnmore}>XEM THÊM NHIỀU HƠN</button>

            <div className={style.titlefeat}>Món ăn phổ biến</div>
            <div className={style.featfoodcontainer}>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaHeart className={style.iconHeart} />
                        <span className={style.textfeat}>1000 lượt thích</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaHeart className={style.iconHeart} />
                        <span className={style.textfeat}>1000 lượt thích</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                        </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaHeart className={style.iconHeart} />
                        <span className={style.textfeat}>1000 lượt thích</span>
                    </div>
                </div>
                <div className={style.eachfeatcontainer}>
                    <div className={style.imgfeat}>
                        <img src={temp}  className={style.image} />
                    </div>
                    <div className={style.featname}>Bún bò Huế</div>
                    <div className={style.timefeat}>
                        <FaHeart className={style.iconHeart} />
                        <span className={style.textfeat}>1000 lượt thích</span>
                    </div>
                </div>
            </div>
            <button className={style.btnmore}>XEM THÊM NHIỀU HƠN</button>
        </div>
    );

};

export default Home;