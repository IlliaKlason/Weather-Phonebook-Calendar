import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { authSelectors } from 'redux/auth'
import AuthNav from 'components/AuthNav';
import Navigation from 'components/Navigation';
import UserMenu from 'components/UserMenu';
import Loader from 'components/common/Loader';


import s from './AppBar.module.css'
import Appear from 'components/Appear';



const AppBar = () => {

  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn)

  return (
    <Appear time={200}>

    <header>

      <nav className={s.container}>
        <Suspense fallback={<Loader />}>
          <Navigation />
        </Suspense>
        
        {isLoggedIn ? <UserMenu /> : <Suspense fallback={<Loader />}>
          <AuthNav />
        </Suspense>}
      </nav>
      <hr />
 
      </header>
      </Appear>
  )
};

export default AppBar;
