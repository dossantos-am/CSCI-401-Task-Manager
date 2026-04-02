import { useEffect, useState } from "react";

const SuccessToast = ({ message, duration = 2000, onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), duration - 300);
    const done = setTimeout(onDone, duration);
    return () => {
      clearTimeout(hide);
      clearTimeout(done);
    };
  }, [duration, onDone]);

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center pointer-events-none transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center gap-3 rounded-2xl bg-green-100 px-6 py-4 shadow-lg ring-1 ring-green-200">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white text-base font-bold">
          ✓
        </span>
        <span className="text-sm font-semibold text-green-800">{message}</span>
      </div>
    </div>
  );
};

export default SuccessToast;
