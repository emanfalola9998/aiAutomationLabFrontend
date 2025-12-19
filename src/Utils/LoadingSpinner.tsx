export default function LoadingSpinner({ size = "md", fullScreen = false }) {
    const sizeClasses = {
        sm: "w-8 h-8 border-2",
        md: "w-12 h-12 border-3",
        lg: "w-16 h-16 border-4"
    };

    const spinner = (
        <div className={`${sizeClasses[size]} border-blue-600 border-t-transparent rounded-full animate-spin`} />
    );

    if (fullScreen) {
        return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
            {spinner}
        </div>
        );
    }

    return (
        <div className="flex items-center justify-center p-8">
        {spinner}
        </div>
    );
}