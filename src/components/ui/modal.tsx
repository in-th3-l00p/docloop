import { useEffect, useRef } from "react";
import cn from "classnames";
import Button from "./button";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title,
  className 
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focus the modal
      modalRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
      
      // Handle escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
        document.body.style.overflow = 'unset';
        
        // Restore focus to the previously focused element
        if (previousActiveElement.current) {
          previousActiveElement.current.focus();
        }
      };
    }
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center p-4",
        "bg-base/80 backdrop-blur-sm",
        "animate-in fade-in duration-200"
      )}
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className={cn(
          "relative w-full max-w-lg mx-auto",
          "bg-base border border-primary/20 rounded-xl shadow-2xl",
          "animate-in zoom-in-95 duration-200",
          "focus:outline-none",
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        {/* Header */}
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-primary/10">
            <h2 
              id="modal-title"
              className="text-lg font-medium text-primary"
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              className={cn(
                "w-8 h-8 rounded-lg transition-all duration-200",
                "hover:bg-primary/10 flex items-center justify-center",
                "text-primary/60 hover:text-primary/80"
              )}
              aria-label="Close modal"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M12.207 4.207a1 1 0 0 0-1.414-1.414L8 5.586 5.207 2.793a1 1 0 0 0-1.414 1.414L6.586 7l-2.793 2.793a1 1 0 1 0 1.414 1.414L8 8.414l2.793 2.793a1 1 0 0 0 1.414-1.414L9.414 7l2.793-2.793z"/>
              </svg>
            </button>
          </div>
        )}

        {/* Content */}
        <div className={cn(
          "p-6",
          title ? "pt-0" : ""
        )}>
          {children}
        </div>
      </div>
    </div>
  );
} 