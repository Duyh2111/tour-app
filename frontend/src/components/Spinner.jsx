export default function Spinner({ size = 'md', center = false }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-10 h-10', lg: 'w-16 h-16' };
  
  const spinner = (
    <div
      className={`${sizes[size]} border-3 border-gray-200 rounded-full animate-spin`}
      style={{ borderTopColor: '#0f1f3d', borderWidth: '3px' }}
    />
  );

  if (center) {
    return (
      <div className="flex items-center justify-center min-h-96">
        {spinner}
      </div>
    );
  }

  return spinner;
}
