import Appear from 'components/Appear';
import { useTranslation } from 'react-i18next';
import ukrFlagIcon from '../../image/icon-ukraine.png';
import ukFlagIcon from '../../image/icon-united-kingdom.png';
import s from './LanguageSwitcher.module.css'

const languages = {
  en: {
    icon: ukFlagIcon,
    native: "English",
  },
  uk: {
    icon: ukrFlagIcon,
    native: "Українська",
  }
};

const LanguageSwitcher = () => {

  const { i18n } = useTranslation();

  return (
    <Appear time={400}>

    
    <div className={s.container}>
     
      {Object.keys(languages).map(lng => (
        <div
          className={s.containerBtn}
          key={lng}>
          <button
            style={{
              backgroundColor: "rgba(240, 248, 255, 0)",
              marginLeft:"4px"
            }}
            className="i18n.resolvedLanguage === lng?"
            type="submit"
            onClick={()=> i18n.changeLanguage(lng)}
          >
            <img
              className={i18n.language === lng? s.flagActive:s.flag}
              src={languages[lng].icon}
              alt={languages[lng].native}
              width="30px"
              
            />
          </button>
        </div>
      )

      )}
      </div>
      </Appear>
  )
}



export default LanguageSwitcher