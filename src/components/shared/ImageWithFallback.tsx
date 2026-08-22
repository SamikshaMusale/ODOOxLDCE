import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIconSize?: number;
  containerClassName?: string;
}

export function ImageWithFallback({ 
  src, 
  alt, 
  className, 
  containerClassName,
  fallbackIconSize = 24,
  ...props 
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);

  return (
    <div className={cn("relative overflow-hidden bg-muted flex items-center justify-center", containerClassName, className)}>
      {!error && src ? (
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover transition-opacity duration-300", className)}
          onError={() => setError(true)}
          {...props}
        />
      ) : (
        <div className="flex flex-col items-center justify-center text-muted-foreground w-full h-full p-4 text-center">
          <ImageIcon size={fallbackIconSize} className="mb-2 opacity-50" />
          {alt && <span className="text-xs font-medium opacity-50 line-clamp-2">{alt}</span>}
        </div>
      )}
    </div>
  );
}
