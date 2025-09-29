"use client";

import React from "react";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-gray-500/40 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-2xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-600 hover:text-black font-bold text-lg"
          onClick={onClose}
        >
          ✕
        </button>

        {children}
      </div>
    </div>
  );
}
