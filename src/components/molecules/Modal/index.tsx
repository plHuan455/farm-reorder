import ReactModal, { Props } from "react-modal"

import { cn } from "@/utils/className"

export interface BaseModalProps extends Omit<Props, "className"> {
  contentClassName?: string
}

const Modal: React.FC<BaseModalProps> = ({
  isOpen,
  contentClassName,
  overlayClassName,
  children,
  bodyOpenClassName,
  preventScroll = true,
  onRequestClose,
  ...props
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      overlayClassName={cn("fixed inset-0 bg-black/75 z-zDialog flex items-center justify-center", overlayClassName)}
      ariaHideApp={false}
      className={cn("relative bg-background rounded-xl outline-none", contentClassName)}
      onRequestClose={(e) => {
        onRequestClose?.(e)
      }}
      {...props}
    >
      {children}
    </ReactModal>
  )
}

export default Modal
