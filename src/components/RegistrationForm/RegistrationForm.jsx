import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';
import 'antd/dist/antd.css';
import { SettingFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import s from './RegistrationForm.module.css';

const RegistrationForm = () => {
  const { t } = useTranslation();
  const lang = useTranslation();

  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = values => {
    const { email, name, password } = values;

    dispatch(authOperations.register({ name, email, password }));

    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  const isBtnDisabled = !name || !email || !password;

  const checkLang = lang[1].language;
  const messageName =
    checkLang === 'en'
      ? 'Please input your username!'
      : "Введіть будь-ласка ваше ім'я ...";
  const messageValidEmail =
    checkLang === 'en'
      ? 'The input is not valid E-mail!'
      : "Не забувайте за '@' :)";
  const messageEmail =
    checkLang === 'en'
      ? 'Please input your E-mail!'
      : 'Не забувайте ввести ваш E-mail :)';
  const messagePassword =
    checkLang === 'en'
      ? 'Please input your Password!'
      : 'Не забувайте ввести ваш Пароль :)';

  return (
    <div className={s.loginForm}>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <h2 className={s.title}>{t('registerForm.title')}</h2>
        <Form.Item
          label={t('registerForm.userName')}
          name="name"
          onChange={e => setName(e.target.value)}
          rules={[
            {
              required: true,
              message: messageName,
            },
          ]}
        >
          <Input
            className={s.containerInput}
            placeholder={t('registerForm.namePlaceholder')}
            prefix={<UserOutlined />}
          />
        </Form.Item>

        <Form.Item
          name="email"
          label={t('registerForm.email')}
          onChange={e => setEmail(e.target.value)}
          rules={[
            {
              type: 'email',
              message: messageValidEmail,
            },
            {
              required: true,
              message: messageEmail,
            },
          ]}
        >
          <Input
            className={s.containerInput}
            placeholder={t('registerForm.placeholderEmail')}
            prefix={<SettingFilled />}
          />
        </Form.Item>

        <Form.Item
          label={t('registerForm.password')}
          name="password"
          onChange={e => setPassword(e.target.value)}
          rules={[
            {
              required: true,
              message: messagePassword,
            },
          ]}
        >
          <Input.Password
            className={s.containerInput}
            placeholder={t('registerForm.placeholderPassword')}
            prefix={<LockOutlined />}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button
            className={s.button}
            type="primary"
            htmlType="submit"
            disabled={isBtnDisabled}
          >
            {t('registerForm.buttonRegister')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrationForm;
