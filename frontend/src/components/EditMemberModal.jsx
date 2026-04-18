const EditMemberModal = ({ isOpen, setIsOpen, onConfirm, member }) => {
    if(!isOpen) return null;

    return (
        <div className="fixed inset-0 backdrop-blur-xs flex items-center justify-center">
            <div className="bg-white border-solid border-2 border-black-500 rounded-xl px-6 py-6 flex flex-row gap-4 shadow-xl items-center">
                                                                                                                                    {/* If the current members role is editor, return viewer, 
                                                                                                                                        otherwise return editor*/}
                <p className="text-md font-semibold">Are you sure you want to change {member.firstName}'s role from {member.role} to {member.role === "EDITOR" ? "VIEWER" : "EDITOR"}</p>
                <button 
                    className="rounded-xl border border-black-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                >
                    Cancel
                </button>
                <button 
                    className="rounded-xl border border-black-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                    onClick={() => {
                        onConfirm();
                        setIsOpen(false);
                    }}
                >
                    Confirm
                </button>
            </div>
        </div>
    );
}

export default EditMemberModal