import AuthActions from '@/modules/auth/actions/auth-actions';
import LoginForm from '@/modules/auth/components/login-form';

export default function LoginPage() {
  return (
    <main>
      <LoginForm login={AuthActions.login} loginGoogle={AuthActions.loginGoogle} />
    </main>
  );
}