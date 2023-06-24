import Link from "next/link";

export function Footer() {
  return (
    <div className="py-10 text-center border-t-2 mt-10">
      <Link
        href={`https://www.linkedin.com/in/thiagocontelli/`}
        target='_blank'
        className="text-sm text-gray-500 dark:text-gray-300 hover:underline cursor-pointer"
      >
        Created by Thiago Contelli ● 2023
      </Link>
    </div>
  )
}