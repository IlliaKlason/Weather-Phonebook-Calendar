import { createPortal } from 'react-dom';
import { Triangle } from 'react-loader-spinner';
import s from './Loader.module.css';

const loader = document.querySelector('#loader');

function Loader({ loading }) {
  return createPortal(
    <div className={s.wrapLoader}>
      <div className={s.modal}>
        <Triangle
          height="200"
          width="200"
          color="#ffd700"
          ariaLabel="triangle-loading"
          visible={true}
          loading={loading}
        />
      </div>
    </div>,
    loader
  );
}

export default Loader;
