export default function Circle({ className }: { className?: string }) {
    return (
        <svg className={`size-2 ${className}`}>
            <circle cx="4" cy="4" r="2" fill="currentColor" />
        </svg>
    )
}