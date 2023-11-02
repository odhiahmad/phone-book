import ButtonStyles from "./styles";
import { INode } from "@/types";

export interface PropTypes {
  id: string;
  children?: INode;
  type?: "button" | "submit";
  buttonType?: "main" | "no-bg";
  onClick?: () => any;
  fullWidth?: boolean;
  className?: string;
  loading?: boolean;
}

export function Button({
  children = "",
  onClick = () => {},
  fullWidth = false,
  buttonType = "main",
  className = "",
  type = "button",
  id = "",
  loading = false,
}: PropTypes) {
  return (
    <>
      <ButtonStyles
        id={id}
        type={type}
        className={className}
        buttonType={buttonType}
        onClick={onClick}
        fullWidth={fullWidth}
      >
        {loading ? (
          <>
            <p>...</p>
          </>
        ) : (
          children
        )}
      </ButtonStyles>
    </>
  );
}
