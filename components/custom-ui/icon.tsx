import Image from "next/image"
import { type ComponentType } from "react"

export type MenuIcon = string | ComponentType<{ className?: string }>

// Renders either a local SVG path or a lucide-react component
export function Icon({ icon, alt, className }: { icon: MenuIcon; alt: string; className?: string }) {
  if (typeof icon === "string") {
    return (
      <div className={`flex items-center justify-center ${className || ""}`}>
        <Image src={icon} alt={alt} width={20} height={20} className="w-5 h-5" />
      </div>
    )
  }

  const LucideIcon = icon
  return (
    <div className={`flex items-center justify-center ${className || ""}`}>
      <LucideIcon className="h-5 w-5" aria-label={alt} />
    </div>
  )
}

