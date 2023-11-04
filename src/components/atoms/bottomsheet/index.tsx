import Sheet from "react-modal-sheet";
import { css } from "@emotion/css";
import { INode } from "@/utils/types";

interface PropTypes {
  value?: string | number | undefined | null;
  title?: string | undefined;
  isOpen?: boolean;
  onClose?: () => void;
  children: INode;
}

export function SelectBottomSheet({
  isOpen = false,
  onClose = () => {},
  children = null,
}: PropTypes) {
  return (
    <>
      <Sheet
        isOpen={isOpen}
        onClose={onClose}
        snapPoints={[0.5]}
        initialSnap={0}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <div
              className={css`
                padding: 20px 20px;
              `}
            >
              {children}
            </div>
          </Sheet.Content>
        </Sheet.Container>
      </Sheet>
    </>
  );
}
