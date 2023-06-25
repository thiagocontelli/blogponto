import { Github, Linkedin } from 'lucide-react';
import Link from "next/link";
import { Button } from "./ui/button";

export function Footer() {
  const linkedin = 'https://www.linkedin.com/in/thiagocontelli/'
  const github = 'https://github.com/thiagocontelli/blog'

  return (
    <div className="py-10 text-center border-t-2 mt-10 flex justify-between items-center px-16">
      <Button variant='link' asChild>
        <Link target="_blank" href={linkedin}>
          Created by Thiago Contelli ● 2023
        </Link>
      </Button>

      <div className="flex gap-4">
        <Button variant='outline' size='icon' asChild>
          <Link target="_blank" href={github}>
            <Github />
          </Link>
        </Button>

        <Button variant='outline' size='icon' asChild>
          <Link target="_blank" href={linkedin}>
            <Linkedin />
          </Link>
        </Button>
      </div>
    </div>
  )
}
