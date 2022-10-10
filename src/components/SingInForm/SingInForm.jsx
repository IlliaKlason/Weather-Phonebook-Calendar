import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { authOperations } from 'redux/auth';
import 'antd/dist/antd.css';
import { LockOutlined, SettingFilled } from '@ant-design/icons';

import { Button, Form, Input } from 'antd';
import s from './SingInForm.module.css';
import { useTranslation } from 'react-i18next';

const SingInForm = () => {
  const { t } = useTranslation();
  const lang = useTranslation();

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const isBtnDisabled = !email || !password;

  const onFinish = values =>
    dispatch(authOperations.logIn({ email, password }));

  const checkLang = lang[1].language;
  const messageNotValid =
    checkLang === 'en'
      ? 'The input is not valid E-mail!'
      : 'Eлектронна скринька введена в невірному форматі';

  return (
    <Form
      name="normal_login"
      className={s.loginForm}
      initialValues={{
        remember: true,
      }}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      onFinish={onFinish}
    >
      <h2>{t('singInForm.title')}</h2>
      <Form.Item
        className={s.containerInput}
        name="email"
        label={t('singInForm.email')}
        onChange={e => setEmail(e.target.value)}
        rules={[
          {
            type: 'email',
            message: messageNotValid,
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
          placeholder={t('singInForm.placeholderEmail')}
          prefix={<SettingFilled />}
        />
      </Form.Item>

      <Form.Item
        label={t('singInForm.password')}
        name={t('singInForm.password')}
        onChange={e => setPassword(e.target.value)}
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input.Password
          className={s.containerInput}
          prefix={<LockOutlined className={s.siteFormItemIcon} />}
          type="password"
          placeholder={t('singInForm.placeholderPassword')}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className={s.button}
          disabled={isBtnDisabled}
        >
          {t('singInForm.buttonLogIn')}
        </Button>
        <div className={s.textContainer}>
          <p>{t('singInForm.or')} </p>
          <a className={s.link} href="/register">
            {t('singInForm.gooRegisterForm')}
          </a>
        </div>
      </Form.Item>
    </Form>
  );
};

export default SingInForm;
