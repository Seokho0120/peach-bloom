import { Session as NextAuthSession } from 'next-auth';
import { useSetRecoilState } from 'recoil';
import { LoginStatusAtom } from '@/atoms/LoginStatusAtom';
import LoginIcon from './ui/LoginIcon';

interface AuthButtonProps {
  session: NextAuthSession | null;
  onSignOut: () => void;
  onSignIn: () => void;
}

const AuthButton = ({ session, onSignOut, onSignIn }: AuthButtonProps) => {
  const setIsLoggedIn = useSetRecoilState(LoginStatusAtom);

  const handleClick = async () => {
    if (session) {
      await onSignOut();
      setIsLoggedIn(false);
    } else {
      onSignIn();
      setIsLoggedIn(true);
    }
  };
  const buttonText = session ? 'LOGOUT' : 'LOGIN';

  return (
    <button
      onClick={handleClick}
      className='flex items-center gap-1'
      aria-label={buttonText}
    >
      <LoginIcon />
      <p className='hidden sm:inline text-xs'>{buttonText}</p>
    </button>
  );
};

export default AuthButton;
