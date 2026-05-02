import { useAuth } from "../../contexts/AuthContext";
import Button from "./Button";
import icon from "../../assets/icon.png";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children?: React.ReactNode;
  title: string;
};

const Layout = ({ children, title }: LayoutProps) => {
  const { isAdmin } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh w-full flex-col items-stretch px-4 pb-[max(3rem,env(safe-area-inset-bottom,0px))] pt-6 sm:items-center sm:px-6 sm:pb-16 sm:pt-8">
      {isAdmin && (
        <div className="mb-4 flex w-full justify-end sm:mb-4">
          <Button type="button" variant="secondary" size="md" onClick={() => navigate('/admin')}>
            Admin
          </Button>
        </div>
      )}

      <div className="mb-4 flex shrink-0 justify-center sm:mb-4">
        <a href="https://thecurve.io/" target="_blank" rel="noreferrer">
          <img src={icon} className="h-14 w-auto sm:h-20" alt="The Curve" />
        </a>
      </div>

      <header className="mb-4 shrink-0 text-center sm:mb-5">
        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h1>
      </header>

      {children}
    </div>
  );
};

export default Layout;