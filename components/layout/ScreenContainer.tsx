import { ReactNode } from "react"

interface Props {
  children: ReactNode
  className?: string
}

export default function ScreenContainer({
  children,
  className = "",
}: Props) {
  return (
    <main
      className={`
        min-h-screen
        w-full
        max-w-[480px]
        mx-auto
        px-5
        py-6
        ${className}
      `}
    >
      {children}
    </main>
  )
}