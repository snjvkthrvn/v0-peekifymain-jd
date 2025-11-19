import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-[3px] focus-visible:ring-accent-green/50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default: 
          'bg-gradient-to-br from-accent-green to-accent-green-hover text-bg-deep rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(29,185,84,0.3)] hover:scale-[1.03] transition-all duration-200',
        destructive:
          'bg-error text-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.3)] hover:shadow-[0_0_40px_rgba(239,68,68,0.3)] hover:scale-[1.03] transition-all duration-200',
        outline:
          'border-2 border-text-secondary text-text-secondary rounded-full hover:border-text-primary hover:text-text-primary hover:bg-bg-highlight transition-all duration-200',
        secondary:
          'border-2 border-text-secondary text-text-secondary rounded-full hover:border-text-primary hover:text-text-primary hover:bg-bg-highlight transition-all duration-200',
        ghost:
          'bg-transparent text-text-secondary rounded-full hover:bg-bg-highlight hover:text-text-primary transition-all duration-200',
        icon:
          'bg-transparent text-text-secondary hover:bg-bg-highlight hover:text-text-primary hover:scale-105 transition-all duration-200',
        link: 'text-accent-green underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-12 px-8 text-base',
        sm: 'h-10 px-6 text-sm',
        lg: 'h-14 px-10 text-lg',
        icon: 'size-10 rounded-xl',
        'icon-sm': 'size-9 rounded-lg',
        'icon-lg': 'size-12 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  isLoading = false,
  children,
  disabled,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    isLoading?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          <span className="opacity-70">{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
