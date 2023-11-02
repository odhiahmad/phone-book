import { floatingButtonStyle } from "./styles";
import { useRouter } from "next/navigation";

interface PropTypes {
  url: string;
}

function FloatingButton({ url = "" }: PropTypes) {
  const router = useRouter();

  const handleClick = () => {
    router.push(url);
  };

  return (
    <button className={floatingButtonStyle} onClick={handleClick}>
      +
    </button>
  );
}

export default FloatingButton;
