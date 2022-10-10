import SingInForm from 'components/SingInForm';
import Appear from 'components/Appear';
import './style.css'


const SingInPage = () => {
  return (
    <Appear time={350}>
      <SingInForm />
    </Appear>
  )
}

export default SingInPage;