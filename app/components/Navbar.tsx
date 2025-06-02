'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, ChevronDown, X, Menu, User, LogIn, LogOut, Settings, Search, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const [isShopDropdownOpen, setIsShopDropdownOpen] = useState(false)
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false)
    const [isSportsDropdownOpen, setIsSportsDropdownOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const { cartCount } = useCart()
    const pathname = usePathname()
    const shopDropdownRef = useRef<HTMLDivElement>(null)
    const accountDropdownRef = useRef<HTMLDivElement>(null)
    const sportsDropdownRef = useRef<HTMLDivElement>(null)

    // Mock authentication state - replace with your actual auth logic
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userName, setUserName] = useState('John Doe')

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shopDropdownRef.current && !shopDropdownRef.current.contains(event.target as Node)) {
                setIsShopDropdownOpen(false)
            }
            if (accountDropdownRef.current && !accountDropdownRef.current.contains(event.target as Node)) {
                setIsAccountDropdownOpen(false)
            }
            if (sportsDropdownRef.current && !sportsDropdownRef.current.contains(event.target as Node)) {
                setIsSportsDropdownOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Close mobile menu when route changes
    useEffect(() => {
        setIsOpen(false)
    }, [pathname])

    const shopLinks = [
        { href: '/shop/clothing', label: 'Clothing' },
        { href: '/shop/shoes', label: 'Shoes' },
        { href: '/shop/accessories', label: 'Accessories' },
        { href: '/shop/all', label: 'View All' },
    ]

    const navLinks = [
        { href: '/', label: 'Home' },
    ]

    const categoryLinks = [
        { href: '/women', label: 'Women' },
        { href: '/men', label: 'Men' },
        { href: '/kids', label: 'Kids' },
        { href: '/new', label: 'New' },
        { href: '/sale', label: 'Sale' },
    ]

    const accountLinks = isAuthenticated
        ? [
            { href: '/account', label: 'My Account', icon: <User className="w-4 h-4" /> },
            { href: '/account/settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
            { href: '/logout', label: 'Sign Out', icon: <LogOut className="w-4 h-4" /> },
        ]
        : [
            { href: '/login', label: 'Sign In', icon: <LogIn className="w-4 h-4" /> },
            { href: '/register', label: 'Create Account', icon: <User className="w-4 h-4" /> },
        ]

    const handleLogout = () => {
        setIsAuthenticated(false)
        setIsAccountDropdownOpen(false)
    }

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle search logic here
        console.log('Searching for:', searchQuery)
    }

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 shadow-md backdrop-blur-sm' : 'bg-white/90'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Search Bar Section */}
                <div className="flex items-center justify-between py-2 border-b border-gray-200">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-2xl font-bold text-gray-800 hover:text-primary transition-colors"
                        aria-label="Home"
                    >
                        BW.X
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </form>

                    {/* Right Icons */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/favorites"
                            className="p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Favorites"
                        >
                            <Heart className="w-5 h-5 text-gray-700 hover:text-black" />
                        </Link>

                        <Link
                            href="/cart"
                            className="relative p-1 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Shopping Cart"
                        >
                            <ShoppingCart className="w-5 h-5 text-gray-700 hover:text-black" />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        <div className="relative" ref={accountDropdownRef}>
                            <button
                                className="flex items-center space-x-1 text-gray-700 hover:text-black transition-colors focus:outline-none"
                                onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                                aria-expanded={isAccountDropdownOpen}
                                aria-haspopup="true"
                            >
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                            </button>

                            <AnimatePresence>
                                {isAccountDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-100"
                                    >
                                        {isAuthenticated && (
                                            <div className="px-4 py-3 border-b border-gray-100">
                                                <p className="text-sm font-medium text-gray-900">{userName}</p>
                                                <p className="text-xs text-gray-500">Premium Member</p>
                                            </div>
                                        )}
                                        {accountLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`flex items-center px-4 py-2 text-sm ${pathname === link.href
                                                        ? 'bg-gray-50 text-black font-medium'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    } transition-colors first:rounded-t-md last:rounded-b-md`}
                                                onClick={link.label === 'Sign Out' ? handleLogout : undefined}
                                            >
                                                <span className="mr-2">{link.icon}</span>
                                                {link.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* Main Navigation Section */}
                <div className="flex justify-between items-center h-12">
                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-gray-700 hover:text-black transition-colors ${pathname === link.href ? 'font-medium text-black' : ''
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="activeNavLink"
                                        className="absolute left-0 bottom-0 w-full h-0.5 bg-black"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}

                        {categoryLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative text-gray-700 hover:text-black transition-colors ${pathname === link.href ? 'font-medium text-black' : ''
                                    }`}
                            >
                                {link.label}
                                {pathname === link.href && (
                                    <motion.span
                                        layoutId="activeNavLink"
                                        className="absolute left-0 bottom-0 w-full h-0.5 bg-black"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </Link>
                        ))}

                        {/* Sports Dropdown */}
                        <div
                            className="relative group"
                            ref={sportsDropdownRef}
                            onMouseEnter={() => setIsSportsDropdownOpen(true)}
                            onMouseLeave={() => setIsSportsDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center text-gray-700 hover:text-black transition-colors ${
                                    pathname.startsWith('/sports') ? 'font-medium text-black' : ''
                                }`}
                                aria-expanded={isSportsDropdownOpen}
                                aria-haspopup="true"
                            >
                                Sports
                                <ChevronDown
                                    className={`ml-1 h-4 w-4 transition-transform ${isSportsDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {isSportsDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-4 w-[900px] bg-white shadow-xl rounded-lg z-20 border border-gray-100 p-6 grid grid-cols-4 gap-6"
                                    >
                                        <div>
                                            <h4 className="font-semibold mb-2 text-black">Women</h4>
                                            <ul className="space-y-1 text-sm text-black">
                                                <li><Link href="/sports/women/running" className="hover:text-black">Running</Link></li>
                                                <li><Link href="/sports/women/gym" className="hover:text-black">Training & Gym</Link></li>
                                                <li><Link href="/sports/women/tennis" className="hover:text-black">Tennis & Pickleball</Link></li>
                                                <li><Link href="/sports/women/hiking" className="hover:text-black">Hiking</Link></li>
                                                <li><Link href="/sports/women/golf" className="hover:text-black">Golf</Link></li>
                                                <li><Link href="/sports/women/walking" className="hover:text-black">Walking</Link></li>
                                                <li><Link href="/sports/women/cleats" className="hover:text-black">All Sports Cleats</Link></li>
                                                <li><Link href="/sports/women/yoga" className="hover:text-black">Yoga</Link></li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-black">Men</h4>
                                            <ul className="space-y-1 text-sm text-black">
                                                <li><Link href="/sports/men/running" className="hover:text-black">Running</Link></li>
                                                <li><Link href="/sports/men/gym" className="hover:text-black">Training & Gym</Link></li>
                                                <li><Link href="/sports/men/tennis" className="hover:text-black">Tennis & Pickleball</Link></li>
                                                <li><Link href="/sports/men/hiking" className="hover:text-black">Hiking</Link></li>
                                                <li><Link href="/sports/men/golf" className="hover:text-black">Golf</Link></li>
                                                <li><Link href="/sports/men/walking" className="hover:text-black">Walking</Link></li>
                                                <li><Link href="/sports/men/cleats" className="hover:text-black">All Sports Cleats</Link></li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-black">Kids</h4>
                                            <ul className="space-y-1 text-sm text-black">
                                                <li><Link href="/sports/kids/running" className="hover:text-black">Running</Link></li>
                                                <li><Link href="/sports/kids/gym" className="hover:text-black">Gym Class</Link></li>
                                                <li><Link href="/sports/kids/cleats" className="hover:text-black">All Sports Cleats</Link></li>
                                                <li><Link href="/sports/kids/swimming" className="hover:text-black">Swimming</Link></li>
                                                <li><Link href="/sports/kids/activewear" className="hover:text-black">Active Clothing</Link></li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold mb-2 text-black">Trending Brands</h4>
                                            <ul className="space-y-1 text-sm text-black">
                                                <li><Link href="/brands/adidas" className="hover:text-black">adidas Cleats</Link></li>
                                                <li><Link href="/brands/asics" className="hover:text-black">ASICS</Link></li>
                                                <li><Link href="/brands/beyond-yoga" className="hover:text-black">Beyond Yoga</Link></li>
                                                <li><Link href="/brands/brooks" className="hover:text-black">Brooks</Link></li>
                                                <li><Link href="/brands/keen" className="hover:text-black">KEEN</Link></li>
                                                <li><Link href="/brands/new-balance" className="hover:text-black">New Balance Golf</Link></li>
                                                <li><Link href="/brands/nike" className="hover:text-black">Nike</Link></li>
                                                <li><Link href="/brands/on" className="hover:text-black">On</Link></li>
                                                <li><Link href="/brands/under-armour" className="hover:text-black">Under Armour</Link></li>
                                            </ul>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Shop Dropdown */}
                        <div
                            className="relative group"
                            ref={shopDropdownRef}
                            onMouseEnter={() => setIsShopDropdownOpen(true)}
                            onMouseLeave={() => setIsShopDropdownOpen(false)}
                        >
                            <button
                                className={`flex items-center text-gray-700 hover:text-black transition-colors ${pathname.startsWith('/shop') ? 'font-medium text-black' : ''
                                    }`}
                                aria-expanded={isShopDropdownOpen}
                                aria-haspopup="true"
                                onClick={() => setIsShopDropdownOpen(!isShopDropdownOpen)}
                            >
                                Shop
                                <ChevronDown
                                    className={`ml-1 h-4 w-4 transition-transform ${isShopDropdownOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <AnimatePresence>
                                {isShopDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-10 border border-gray-100"
                                    >
                                        {shopLinks.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={link.href}
                                                className={`block px-4 py-2 text-sm ${pathname === link.href
                                                        ? 'bg-gray-50 text-black font-medium'
                                                        : 'text-gray-700 hover:bg-gray-50'
                                                    } transition-colors first:rounded-t-md last:rounded-b-md`}
                                            >
                                                {link.label}
                                            </Link>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden p-1 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    >
                        {isOpen ? (
                            <X className="w-5 h-5 text-gray-700" />
                        ) : (
                            <Menu className="w-5 h-5 text-gray-700" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden overflow-hidden"
                    >
                        <div className="px-4 pb-4 space-y-3">
                            {/* Mobile Search */}
                            <form onSubmit={handleSearch} className="pt-2">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search"
                                        className="w-full py-2 px-4 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                                    >
                                        <Search className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>

                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block py-2 px-3 rounded-md ${pathname === link.href
                                            ? 'bg-gray-100 text-black font-medium'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        } transition-colors`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {/* Mobile Category Links */}
                            <div className="pt-2 border-t border-gray-100">
                                <p className="px-3 py-2 text-sm font-medium text-gray-500">
                                    Categories
                                </p>
                                <div className="space-y-1">
                                    {categoryLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`block py-2 px-3 rounded-md text-sm ${pathname === link.href
                                                    ? 'bg-gray-100 text-black font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                } transition-colors`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Mobile Sports Links */}
                            <div className="pt-2 border-t border-gray-100">
                                <p className="px-3 py-2 text-sm font-medium text-gray-500">
                                    Sports
                                </p>
                                <div className="space-y-1">
                                    <Link href="/sports/women" className="block py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                        Women's Sports
                                    </Link>
                                    <Link href="/sports/men" className="block py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                        Men's Sports
                                    </Link>
                                    <Link href="/sports/kids" className="block py-2 px-3 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                                        Kids' Sports
                                    </Link>
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <p className="px-3 py-2 text-sm font-medium text-gray-500">
                                    Shop Categories
                                </p>
                                <div className="space-y-1">
                                    {shopLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`block py-2 px-3 rounded-md text-sm ${pathname === link.href
                                                    ? 'bg-gray-100 text-black font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'
                                                } transition-colors`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-2 border-t border-gray-100">
                                <p className="px-3 py-2 text-sm font-medium black">
                                    Account
                                </p>
                                <div className="space-y-1">
                                    {accountLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className={`flex items-center py-2 px-3 rounded-md text-sm ${pathname === link.href
                                                    ? 'bg-gray-100 text-black font-medium'
                                                    : 'text-black hover:bg-gray-50'
                                                } transition-colors`}
                                            onClick={link.label === 'Sign Out' ? handleLogout : undefined}
                                        >
                                            <span className="mr-2">{link.icon}</span>
                                            {link.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}