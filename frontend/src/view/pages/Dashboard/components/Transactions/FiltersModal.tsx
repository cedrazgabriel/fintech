import { Modal } from "../../../../components/Modal";

interface FiltersModalProps{
    open: boolean
    onClose(): void
}
export function FiltersModal({open, onClose}: FiltersModalProps){
    return (
        <Modal open={open} onClose={onClose} title="Filtros">
            <div>
            <span className="text-lg tracking-[-1px] font-bold ">
              Conta
            </span>
            </div>
       
       </Modal>
    )
}