import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <div className="relative w-full">
      <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5" />

      <Input type="search" placeholder="Search for a song..." className="pl-9 h-12" />
    </div>
  )
}
