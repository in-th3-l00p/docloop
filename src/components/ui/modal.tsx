import { useEffect, useRef } from "react";
import cn from "classnames";
import Button from "./button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    className?: string;
}

export default function Modal({ 
    isOpen, 
    onClose, 
    title, 
    children, 
    className 
}: ModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        const handleClickOutside = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={cn(
            "fixed inset-0 z-50 flex items-center justify-center p-4",
            "bg-base/80 backdrop-blur-md",
            "animate-in fade-in duration-200"
        )}>
            <div 
                ref={modalRef}
                className={cn(
                    "bg-base border border-primary/20 rounded-xl shadow-2xl",
                    "w-full max-w-md max-h-[90vh] overflow-hidden",
                    "animate-in zoom-in-95 duration-200",
                    className
                )}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-primary/10">
                    <h2 className="text-lg font-medium text-primary">
                        {title}
                    </h2>
                    <Button
                        variant="secondary"
                        onClick={onClose}
                        className="!p-2 !text-sm hover:bg-primary/10"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M12.207 4.207a1 1 0 0 0-1.414-1.414L8 5.586 5.207 2.793a1 1 0 0 0-1.414 1.414L6.586 7l-2.793 2.793a1 1 0 1 0 1.414 1.414L8 8.414l2.793 2.793a1 1 0 0 0 1.414-1.414L9.414 7l2.793-2.793z"/>
                        </svg>
                    </Button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
} 