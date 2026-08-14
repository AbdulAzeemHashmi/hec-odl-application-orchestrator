import { ButtonHTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'

const buttonVariants = cva(
    'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50',
    {
        variants: {
            variant: {
                default: 'bg-blue-600 text-white hover:bg-blue-700',
                destructive: 'bg-red-600 text-white hover:bg-red-700',
                outline: 'border border-gray-300 bg-white hover:bg-gray-50',
                ghost: 'hover:bg-gray-100',
            },
            size: {
                sm: 'px-3 py-1.5 text-sm',
                md: 'px-4 py-2',
                lg: 'px-6 py-3 text-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'md',
        },
    }
)

interface ButtonProps
    extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    children: ReactNode
}

export function Button({ children, variant, size, className, ...props }: ButtonProps) {
    return (
        <button className={buttonVariants({ variant, size, className })} {...props}>
            {children}
        </button>
    )
}