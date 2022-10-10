import { Link } from 'react-router-dom';
import ReplyAllRoundedIcon from '@mui/icons-material/ReplyAllRounded';
import s from './NotFoundPage.module.css'


 const NotFound = () => {
  return (
    <div className={s.container}>
      
      <p className={s.text}>Opsss! This page doesn&apos;t exist</p>

      <Link to="/sing_in" className={s.linkContainer}>
        <span className={s.link}><ReplyAllRoundedIcon/></span>
       <strong>Open login page</strong> 
      </Link>
    </div>
  );
 };
export default NotFound;
