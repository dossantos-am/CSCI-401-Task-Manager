const ConfirmModal = ({ isOpen, setIsOpen, onConfirm, itemName }) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-white border-solid border-2 border-black-500 rounded-xl px-6 py-6 flex flex-row gap-4 shadow-xl items-center">
                <p className="text-md font-semibold">Are you sure you want to delete this {itemName}?</p>
                <button 
                    className="rounded-xl border border-black-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </button>
                <button 
                    className="rounded-xl border border-black-200 px-5 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    onClick={onConfirm}
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;