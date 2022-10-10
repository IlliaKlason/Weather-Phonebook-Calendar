import { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import { ThemeContext, themes } from '../context/themeContext';

import AppBar from 'components/AppBar';
import PrivateRoute from 'components/UserMenu/PrivateRoute';
import PublicRoute from 'components/UserMenu/PublicRoute';
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';
import Loader from '../common/Loader';
import HomePage from 'pages/HomePage';

import { loadingSelector } from '../../redux/phoneBook/phonebook-selectors';
import { authSelectors, authOperations } from '../../redux/auth';

import s from './App.module.css';
import ThemeSwitcher from 'components/ThemeSwitcher/ThemeSwitcher';

const SingInPageLazy = lazy(() => import('../../pages/auth/SingInPage'));
const RegisterLazy = lazy(() => import('../../pages/auth/Register'));
const ContactsPageLazy = lazy(() => import('../../pages/ContactsPage'));
const CalendarPageLazy = lazy(() =>
  import('../../pages/CalendarPage/CalendarPage')
);
const NotFoundPageLazy = lazy(() => import('../../pages/NotFoundPage'));

const App = () => {
  let time = new Date().getHours();
  const [theme, setTheme] = useState(time <= 23 ? themes.light : themes.dark);

  const toggleTheme = () =>
    setTheme(prevTheme =>
      prevTheme === themes.light ? themes.dark : themes.light
    );

  const loading = useSelector(loadingSelector);
  const fetchloading = useSelector(authSelectors.loadingFetchSelector);

  const dispatch = useDispatch();

  //GET_CURRENT_USER

  useEffect(() => {
    dispatch(authOperations.fetchUser());
  }, [dispatch]);

  return (
    <div className={theme === themes.light ? s.appLight : s.appDark}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {loading && <Loader loading={loading} />}

        {!fetchloading && (
          <>
            <AppBar />
            <div className={s.themeWrap}>
              <Suspense fallback={<Loader />}>
                <LanguageSwitcher />
              </Suspense>
              <ThemeSwitcher />
            </div>

            <Routes>
              <Route
                exact
                path="/"
                element={
                  <Suspense fallback={<Loader />}>
                    <HomePage />
                  </Suspense>
                }
              ></Route>
              {/* //////////////////////// */}
              <Route element={<PublicRoute />}>
                <Route
                  exact
                  path="/register"
                  element={
                    <Suspense fallback={<Loader />}>
                      <RegisterLazy />
                    </Suspense>
                  }
                />

                <Route
                  exact
                  path="/sing_in"
                  element={
                    <Suspense fallback={<Loader />}>
                      <SingInPageLazy />
                    </Suspense>
                  }
                />
                <Route
                  path="*"
                  element={
                    <Suspense fallback={<Loader />}>
                      <NotFoundPageLazy />
                    </Suspense>
                  }
                />
              </Route>

              {/* //////////////////////// */}
              <Route element={<PrivateRoute />}>
                <Route
                  path="/phonebook"
                  element={
                    <Suspense fallback={<Loader />}>
                      <ContactsPageLazy />
                    </Suspense>
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <Suspense fallback={<Loader />}>
                      <CalendarPageLazy />
                    </Suspense>
                  }
                />
              </Route>
            </Routes>
          </>
        )}
      </ThemeContext.Provider>
    </div>
  );
};

export default App;
