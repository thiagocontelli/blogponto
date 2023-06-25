import Link from "next/link"
import { Button } from "./ui/button"

type Props = {
  previousDisabled: boolean,
  nextDisabled: boolean,
  page: number
}

export function Pagination({ nextDisabled, previousDisabled, page }: Props) {
  return (
    <div className="flex justify-center gap-4">
      <Button variant='outline' asChild={!previousDisabled} disabled>
        <Link href={{ pathname: '/', query: { page: page - 1 < 0 ? 0 : page - 1 } }}>
          Previous
        </Link>
      </Button>

      <Button variant='outline' asChild={!nextDisabled} disabled>
        <Link href={{ pathname: '/', query: { page: page + 1 } }}>
          Next
        </Link>
      </Button>
    </div>
  )
}
