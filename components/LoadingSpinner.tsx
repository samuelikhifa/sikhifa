interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'lime' | 'purple' | 'white';
  className?: string;
}

export default function LoadingSpinner({ 
  size = 'md', 
  color = 'lime', 
  className = '' 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colorClasses = {
    lime: 'border-lime-500',
    purple: 'border-purple-500',
    white: 'border-white'
  };

  return (
    <div className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]} ${className}`}></div>
  );
} 