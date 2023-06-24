import Link from "next/link"

type Props = {
  previousDisabled: boolean,
  nextDisabled: boolean,
  page: number
}

export function Pagination({ nextDisabled, previousDisabled, page }: Props) {
  const baseStyle: string = [
    'active:scale-95',
    'transition-transform',
    'px-4',
    'py-2',
    'text-sm',
    'font-medium',
    'text-gray-500',
    'border',
    'rounded',
    'hover:bg-gray-100',
    'hover:text-gray-700',
    'dark:text-gray-400',
    'dark:hover:bg-gray-700',
    'dark:hover:text-white'
  ].join().replaceAll(',', ' ')
  
  const disabledStyle: string = [
    'opacity-70',
    'hover:opacity-70',
    'cursor-not-allowed',
  ].join().replaceAll(',', ' ')
  
  return (
    <div className="flex justify-center gap-4">
      {previousDisabled ? (
        <span className={baseStyle + ' ' + disabledStyle}>
          Previous
        </span>
      ): (
        <Link className={baseStyle} href={{ pathname: '/', query: { page: page - 1 < 0 ? 0 : page - 1 } }}>
          Previous
        </Link>
      )}

      {nextDisabled ? (
        <span className={baseStyle + ' ' + disabledStyle}>
          Next
        </span>
      ): (
        <Link className={baseStyle} href={{ pathname: '/', query: { page: page + 1 } }}>
          Next
        </Link>
      )}
    </div>
  )
}
