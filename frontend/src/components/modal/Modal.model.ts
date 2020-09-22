export interface ModalProps {
    shown: boolean;
    onClose?: () => void;
    header: string;
}