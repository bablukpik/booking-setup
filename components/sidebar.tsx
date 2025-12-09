"use client"

import { ChevronDown } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"
import Image from "next/image"
import { Icon } from "@/components/custom-ui/icon"

const menuItems = [
  { icon: "/business-assets/icons/home.svg", label: "Home", href: "#", id: "home" },
  {
    icon: "/business-assets/icons/sell.svg",
    label: "Sell",
    hasCollapse: true,
    id: "sell",
    subItems: [
      { icon: "/business-assets/icons/products.svg", label: "Products", href: "#", id: "sell-products" },
      { icon: "/business-assets/icons/experiences.svg", label: "Experiences", href: "#", id: "sell-experiences" },
      { icon: "/business-assets/icons/services.svg", label: "Services", href: "#", id: "sell-services" },
      { icon: "/business-assets/icons/bookings.svg", label: "Bookings", href: "#", id: "sell-bookings" },
      { icon: "/business-assets/icons/memberships.svg", label: "Memberships", href: "#", id: "sell-memberships" },
      { icon: "/business-assets/icons/bundles.svg", label: "Bundles", href: "#", id: "sell-bundles" },
      { icon: "/business-assets/icons/custom-offers.svg", label: "Custom offers", href: "#", id: "sell-custom-offers" },
    ],
  },
  { icon: "/business-assets/icons/customers.svg", label: "Customers", href: "#", hasCollapse: true, id: "customers" },
  { icon: "/business-assets/icons/payouts.svg", label: "Payouts", href: "#", hasCollapse: true, id: "payouts" },
  { icon: "/business-assets/icons/analytics.svg", label: "Analytics", href: "#", id: "analytics" },
]

export default function Sidebar() {
  // Check if initial selected item is a submenu item to auto-open parent
  const initialSelected = "sell-bookings"
  const isSubmenuItem = initialSelected.startsWith("sell-")
  const [openSell, setOpenSell] = useState(isSubmenuItem)
  const [selectedItem, setSelectedItem] = useState<string>(initialSelected) // Default to Bookings

  return (
    <div className="max-w-[281px] bg-[#f9fafc] border-r border-border flex flex-col h-screen overflow-y-auto border-box">
      {/* Logo */}
      <div className="mx-[16px] my-[20px]">
        <div className="flex items-center justify-start">
          <Image src="/logo.png" alt="Logo" width={106} height={35} className="h-auto" />
        </div>
      </div>

      {/* Business Info */}
      <div className="mx-[16px] border-border w-[248px] h-[68px] py-[13px] px-[12px] rounded-[10px] border">
        <div className="flex items-center gap-[10px]">
          <Avatar className="h-10 w-10 bg-gray-300">
            <AvatarImage src="/business-assets/logo.png" />
            <AvatarFallback className="bg-gray-400 text-white font-semibold">DP</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-foreground truncate">The Dune Preserve</p>
            <p className="text-xs text-muted-foreground truncate">View store</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-2 pt-[30px] space-y-1">
        {menuItems.map((item, index) => {
          const hasSubItems = item.subItems && item.subItems.length > 0

          if (hasSubItems) {
            return (
              <div key={index} className="mb-[15px]">
                <button
                  onClick={() => setOpenSell(!openSell)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <Icon icon={item.icon} alt={item.label} className="h-5 w-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${openSell ? "rotate-180" : ""}`} />
                </button>
                {openSell && (
                  <div className="mt-1">
                    {item.subItems.map((subItem, subIndex) => {
                      const subItemId = subItem.id || `${item.id}-${subIndex}`
                      const isSelected = selectedItem === subItemId
                      return (
                        <button
                          key={subIndex}
                          onClick={() => {
                            setSelectedItem(subItemId)
                            // Ensure parent menu stays open when selecting submenu item
                            if (!openSell) {
                              setOpenSell(true)
                            }
                          }}
                          className={`mb-[15px] w-full flex items-center justify-between pl-8 px-3 py-2 rounded-4xl transition-colors cursor-pointer ${isSelected
                            ? "bg-[#E8F5FF] text-[#072AC8]"
                            : "text-foreground hover:bg-accent hover:text-accent-foreground"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon icon={subItem.icon} alt={subItem.label} className="h-5 w-5" />
                            <span className="text-sm font-medium">{subItem.label}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          }

          const itemId = item.id || `item-${index}`
          const isSelected = selectedItem === itemId

          return (
            <button
              key={index}
              onClick={() => setSelectedItem(itemId)}
              className={`mb-[15px] w-full flex items-center justify-between px-3 py-2 rounded-4xl transition-colors cursor-pointer ${isSelected
                ? "bg-[#E8F5FF] text-[#072AC8]"
                : "text-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <Icon icon={item.icon} alt={item.label} className="h-5 w-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.hasCollapse && <ChevronDown className="h-4 w-4" />}
            </button>
          )
        })}
      </nav>

      {/* Bottom Menu */}
      <div className="border-t border-border p-2 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
          <Icon icon="/business-assets/icons/settings.svg" alt="Settings" className="h-5 w-5" />
          <span className="text-sm font-medium">Settings</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer">
          <Icon icon="/business-assets/icons/signout.svg" alt="Sign out" className="h-5 w-5" />
          <span className="text-sm font-medium">Sign out</span>
        </button>
      </div>
    </div>
  )
}
