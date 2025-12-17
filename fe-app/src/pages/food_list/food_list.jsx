import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import corner from '/corner.png';
import logo from '/logo.png';
import styleBar from '../../components/bar.module.css';
import styleHeartIcon from '../../components/hearticon.module.css'
import temp from '/temp.jpg'

export default function FoodList() {
    const navigate = useNavigate();
    useEffect(() => {
        document.title = "KitchenWhiz - Food List";
    }, []);

    return (
        <div>
            {/* Component code goes here */}
        </div>
    );
}