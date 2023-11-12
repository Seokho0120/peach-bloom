import { Session as NextAuthSession } from 'next-auth';
import LoginIcon from './ui/LoginIcon';

interface AuthButtonProps {
  session: NextAuthSession | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

const AuthButton: React.FC<AuthButtonProps> = ({
  session,
  onSignOut,
  onSignIn,
}) => {
  const handleClick = session ? onSignOut : onSignIn;
  const buttonText = session ? 'LOGOUT' : 'LOGIN';

  return (
    <button onClick={handleClick} className='flex items-center gap-1'>
      <LoginIcon />
      <p className='text-xs'>{buttonText}</p>
    </button>
  );
};

export default AuthButton;
