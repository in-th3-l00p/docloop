export default function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-3xl space-y-12">
                {children}
            </div>
        </div>
    )
}