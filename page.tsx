





















































































"use client";

import { useState, useEffect } from 'react'
import { useAction } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Users, 
  Bed, 
  Bath, 
  Wifi, 
  Car, 
  Coffee, 
  Tv, 
  Wind, 
  MapPin, 
  Phone, 
  Mail, 
  X,
  Bike,
  Target,
  Zap,
  Waves,
  Dumbbell,
  Castle,
  TreePine,
  Utensils,
  Menu,
  Star,
  Quote
} from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useI18n } from '@/contexts/i18n-context'

export default function Home() {
  const { t, getRaw } = useI18n()
  const [isVisible, setIsVisible] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{[key: number]: number}>({})
  const [galleryModal, setGalleryModal] = useState({ isOpen: false, roomIndex: 0, imageIndex: 0 })
  const [surroundingsModal, setSurroundingsModal] = useState({ isOpen: false, imageIndex: 0 })
  const [selectedRoomType, setSelectedRoomType] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    roomType: '',
    dateFrom: '',
    dateTo: '',
    message: ''
  })

  const sendContactEmail = useAction(api.sendContactEmail.sendContactEmail)

  useEffect(() => {
    setIsVisible(true)
    
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setScrollY(scrolled)
    }
    window.addEventListener('scroll', handleScroll)

    const handleKeyDown = (e: KeyboardEvent) => {
      if (galleryModal.isOpen) {
        if (e.key === 'Escape') {
          closeGallery()
        } else if (e.key === 'ArrowLeft') {
          prevGalleryImage()
        } else if (e.key === 'ArrowRight') {
          nextGalleryImage()
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [galleryModal.isOpen])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  const nextImage = (roomIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomIndex]: ((prev[roomIndex] || 0) + 1) % totalImages
    }))
  }

  const prevImage = (roomIndex: number, totalImages: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [roomIndex]: ((prev[roomIndex] || 0) - 1 + totalImages) % totalImages
    }))
  }

  const roomTypes = [
    {
      name: t('rooms.roomTypes.singleRoom'),
      image: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/8MWOtnhtFhVn8Htx4KPI8/1.jpg",
      capacity: t('rooms.capacity.oneToTwo'),
      beds: t('rooms.roomDetails.singleRoom.beds'),
      price: t('rooms.roomDetails.singleRoom.price'),
      priceNote: t('rooms.roomDetails.singleRoom.priceNote'),
      features: t('rooms.roomDetails.singleRoom.features'),
      description: t('rooms.roomDetails.singleRoom.description'),
      gallery: [
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/IouNmkFstDhclT_4W6ZmF/2.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/4n9oSCZXNKN3rQrgfHW89/3.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/iIYSFIdRKFTp7ylw14h-3/4.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/Z8-YHYaKnrU7TZfCYhLkZ/5.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/0obK-jZYfclJf0Sk6Ceh7/6.jpg"
      ]
    },
    {
      name: t('rooms.roomTypes.doubleRoomNoBalcony'),
      image: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/70nvITBOuN8J_p-oKM1w-/1.jpg",
      capacity: t('rooms.capacity.oneToTwo'),
      beds: t('rooms.roomDetails.doubleRoomNoBalcony.beds'),
      price: t('rooms.roomDetails.doubleRoomNoBalcony.price'),
      priceNote: t('rooms.roomDetails.doubleRoomNoBalcony.priceNote'),
      features: t('rooms.roomDetails.doubleRoomNoBalcony.features'),
      description: t('rooms.roomDetails.doubleRoomNoBalcony.description'),
      gallery: [
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/1wT7_tbPOsaKCz3r3bS69/2.1.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/hQyPfRjG6LNaCQglASdFE/2.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/new-chat/g5v5cAxF9uLaxyDPnvLfl/30a343f4-d5ba-4d71-8a32-b3e7426cf024.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/LIg1Zaq51Xo5tVsUlmgTV/5.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/gDYPgMp9Xt2RYhLM595_c/6.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/4hCx4h1AChxLQXUG4hjwv/7.jpg"
      ]
    },
    {
      name: t('rooms.roomTypes.doubleRoomWithBalcony'),
      image: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/TqBvL6e--YIf4liMDpd5H/1.jpg",
      capacity: t('rooms.capacity.oneToTwo'),
      beds: t('rooms.roomDetails.doubleRoomWithBalcony.beds'),
      price: t('rooms.roomDetails.doubleRoomWithBalcony.price'),
      priceNote: t('rooms.roomDetails.doubleRoomWithBalcony.priceNote'),
      features: t('rooms.roomDetails.doubleRoomWithBalcony.features'),
      description: t('rooms.roomDetails.doubleRoomWithBalcony.description'),
      gallery: [
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/2w7WbmfxqKpOgD5jWHSfx/2.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/_iSkrRqNqUo9CZ6JxSTEk/3.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/HX_gsVBP1es0tY74X3zn8/3.1.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/sJ_gq9rgRJ7XDKKyoM7FG/4.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/UgDB9KMU_9uqMRMpV5GGy/5.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/PAhqgI9SFqiUlYF7OXTSM/6.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/u-n9U6vX5-pfSqpMSxYBB/7.jpg"
      ]
    },
    {
      name: t('rooms.roomTypes.tripleRoom'),
      image: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/OqpPQK-l_KNYTGtOfzsan/triluzkovy-pokoj-i..jpg",
      capacity: t('rooms.capacity.oneToThree'),
      beds: t('rooms.roomDetails.tripleRoom.beds'),
      price: t('rooms.roomDetails.tripleRoom.price'),
      priceNote: t('rooms.roomDetails.tripleRoom.priceNote'),
      features: t('rooms.roomDetails.tripleRoom.features'),
      description: t('rooms.roomDetails.tripleRoom.description'),
      gallery: [
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/1RKtA07w-WEkImoFQvSSl/.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/pHHIWMeI11Dpi0qKwe8X8/triluzkovy-pokoj-ii.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/tRF6rYaf5os-PWFg2cLbg/600132857.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/-UI-U8i580-GHaLpBe20o/12755834.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/t9umZwNb9dEn0qx5K4Odd/12755831.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/x8v-IV0d9EIJOFBQEAlnA/triluzkovy-pokoj-v.jpg"
      ]
    },
    {
      name: t('rooms.roomTypes.apartment'),
      image: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/Xf8qGE-BdQdVsGHptILnv/1.jpg",
      capacity: t('rooms.capacity.twoToFour'),
      beds: t('rooms.roomDetails.apartment.beds'),
      price: t('rooms.roomDetails.apartment.price'),
      priceNote: t('rooms.roomDetails.apartment.priceNote'),
      features: t('rooms.roomDetails.apartment.features'),
      description: t('rooms.roomDetails.apartment.description'),
      gallery: [
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/KWJlY7fvDLOfLTByYAhqW/2.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/k2k5bD-3F_1ZDN2ZONiwO/4.1.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/r3O_1izyFqR1yuPwOk7U2/4.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/fYVGzspaL6Ah3v_aNlcIA/5.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/Ehi-Wo6Z8lJVq1nWepzp7/6.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/ZyI50r7sVI9zlWHtSog0-/7.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/FtTr7otdAETSIrSdblAVg/8.1.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/eOQJymCYx7z6MgYdTMvYj/8.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/4vbwQFKj3mSXaBXHTyJS6/9.1.jpg",
        "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/aqf-GlJnVbU_75xeFHG0v/10.jpg"
      ]
    }
  ]

  const facilities = [
    { icon: <Wifi className="w-6 h-6" />, name: "WiFi zdarma" },
    { icon: <Car className="w-6 h-6" />, name: "Parkování zdarma" },
    { icon: <MapPin className="w-6 h-6" />, name: "Strategická poloha" },
    { icon: <Bath className="w-6 h-6" />, name: "Soukromé sociální zařízení" },
  ]

  const openGallery = (roomIndex: number, imageIndex: number) => {
    setGalleryModal({ isOpen: true, roomIndex, imageIndex })
  }

  const closeGallery = () => {
    setGalleryModal({ isOpen: false, roomIndex: 0, imageIndex: 0 });
  }

  const nextGalleryImage = () => {
    setGalleryModal(prev => {
      const room = roomTypes[prev.roomIndex]
      const images = room.gallery.length > 0 ? [room.image, ...room.gallery] : [room.image]
      return {
        ...prev,
        imageIndex: (prev.imageIndex + 1) % images.length
      }
    })
  }

  const prevGalleryImage = () => {
    setGalleryModal(prev => {
      const room = roomTypes[prev.roomIndex]
      const images = room.gallery.length > 0 ? [room.image, ...room.gallery] : [room.image]
      return {
        ...prev,
        imageIndex: (prev.imageIndex - 1 + images.length) % images.length
      }
    })
  }

  const openSurroundingsGallery = (imageIndex: number) => {
    setSurroundingsModal({ isOpen: true, imageIndex })
  }

  const closeSurroundingsGallery = () => {
    setSurroundingsModal({ isOpen: false, imageIndex: 0 })
  }

  const handleReservation = (roomType?: string) => {
    if (roomType) {
      setFormData(prev => ({ ...prev, roomType }))
    }
    scrollToSection('rezervace')
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        roomType: formData.roomType,
        dateFrom: formData.dateFrom,
        dateTo: formData.dateTo,
        message: formData.message,
      })
      alert(t('reservation.success'))
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        roomType: '',
        dateFrom: '',
        dateTo: '',
        message: ''
      })
    } catch (error) {
      console.error('Error sending email:', error)
      alert(t('reservation.error'))
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 transition-all duration-300 bg-background/95 nav-blur border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/Dtz-oJp-09nb0xDZIA2Ag/snimek-obrazovky-2025-09-27-v-21.43.42.png"
                alt="Nikol Apartment Logo"
                className="h-12 w-auto"
              />
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-6">
              <button 
                onClick={() => scrollToSection('pokoje')} 
                className="transition-colors duration-300 hover:text-primary text-muted-foreground"
              >
                {t('navigation.rooms')}
              </button>
              <button 
                onClick={() => scrollToSection('vybaveni')} 
                className="transition-colors duration-300 hover:text-primary text-muted-foreground"
              >
                {t('navigation.facilities')}
              </button>
              <button 
                onClick={() => scrollToSection('o-penzionu')} 
                className="transition-colors duration-300 hover:text-primary text-muted-foreground"
              >
                {t('navigation.about')}
              </button>
              <button 
                onClick={() => scrollToSection('kontakt')} 
                className="transition-colors duration-300 hover:text-primary text-muted-foreground"
              >
                {t('navigation.contact')}
              </button>
              <Button 
                onClick={() => handleReservation()} 
                className="gradient-warm hover:scale-105 transition-all duration-300 text-white px-4 py-2"
                size="sm"
              >
                {t('navigation.reserve')}
              </Button>
              <LanguageSwitcher />
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? 
                <X className="w-6 h-6 text-primary" /> : 
                <Menu className="w-6 h-6 text-primary" />
              }
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
              <div className="flex flex-col space-y-2 pt-4">
                <button 
                  onClick={() => scrollToSection('pokoje')} 
                  className="text-left py-2 transition-colors hover:text-primary text-primary"
                >
                  {t('navigation.rooms')}
                </button>
                <button 
                  onClick={() => scrollToSection('vybavenen')} 
                  className="text-left py-2 transition-colors hover:text-primary text-primary"
                >
                  {t('navigation.facilities')}
                </button>
                <button 
                  onClick={() => scrollToSection('o-penzionu')} 
                  className="text-left py-2 transition-colors hover:text-primary text-primary"
                >
                  {t('navigation.about')}
                </button>
                <button 
                  onClick={() => scrollToSection('kontakt')} 
                  className="text-left py-2 transition-color-color hover:text-primary text-primary"
                >
                  {t('navigation.contact')}
                </button>
                <Button 
                  onClick={() => handleReservation()} 
                  className="gradient-warm hover:scale-105 transition-all duration-300 text-white mt-1"
                  size="sm"
                >
                  {t('navigation.reserve')}
                </Button>
                <div className="pt-2">
                  <LanguageSwitcher />
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
          style={{
            backgroundImage: `url('https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/veHhqZ6ft_JVAwI88Gl27/dsc-07889.jpg')`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-1">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-glow">
            {t('hero.title')}
          </h1>
          <p className="mb-8 max-w-2xl mx-auto md:text-xl text-xl font-medium">
            {t('hero.subtitle')}
          </p>
          <Button 
            size="lg" 
            className="gradient-warm hover:scale-105 transition-all duration-300 text-white px-8 py-3 text-lg shadow-lg"
            onClick={() => handleReservation()}
          >
            {t('hero.button')}
          </Button>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
          <ChevronDown className="w-8 h-8 text-white/80" />
        </div>
      </section>

      {/* Room Types Section */}
      <section id="pokoje" className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('rooms.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('rooms.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roomTypes.map((room, index) => {
              const images = room.gallery.length > 0 ? [room.image, ...room.gallery] : [room.image]
              const currentIndex = currentImageIndex[index] || 0
              
              return (
                <Card key={index} className="overflow-hidden card-hover group">
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img 
                      src={images[currentIndex]} 
                      alt={`${room.name} - foto ${currentIndex + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 cursor-pointer"
                      onClick={() => openGallery(index, currentIndex)}
                    />
                    
                    {/* Navigation arrows - only show if there are multiple images */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            prevImage(index, images.length)
                          }}
                          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            nextImage(index, images.length)
                          }}
                          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        
                        {/* Image counter */}
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
                          {currentIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                      {room.name}
                    </h3>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {room.capacity}
                      </div>
                      <div className="flex items-center gap-1">
                        <Bed className="w-4 h-4" />
                        {room.beds}
                      </div>
                    </div>
                    
                    {/* Price Display */}
                    <div className="mb-4">
                      <div className="text-lg font-bold text-primary flex items-center gap-2 flex-wrap">
                        {room.price}
                        {room.priceNote && (
                          <span className="text-sm text-muted-foreground font-normal">{room.priceNote}</span>
                        )}
                      </div>
                    </div>

                    <Button 
                      onClick={() => handleReservation(room.name)}
                      className="w-full mb-4 gradient-warm hover:scale-105 transition-all duration-300 text-white"
                    >
                      {t('rooms.reserve')}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between p-2 h-auto"
                      onClick={() => setExpandedRoom(expandedRoom === index ? null : index)}
                    >
                      <span className="text-sm">{t('rooms.moreInfo')}</span>
                      {expandedRoom === index ? 
                        <ChevronUp className="w-4 h-4" /> : 
                        <ChevronDown className="w-4 h-4" />
                      }
                    </Button>

                    {expandedRoom === index && (
                      <div className="mt-4 pt-4 border-t border-border animate-fade-in-up">
                        <p className="text-sm text-muted-foreground mb-3">
                          {room.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className="font-medium text-sm">{t('rooms.completeEquipment')}</h4>
                          <div className="flex flex-wrap gap-1">
                            {(() => {
                              const features = room.features;
                              return Array.isArray(features) ? features.map((feature: string, idx: number) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              )) : null;
                            })()}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Pricing Notes */}
          <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{t('rooms.pricing.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="mb-2">{t('rooms.pricing.items.0')}</p>
                <p className="mb-2">{t('rooms.pricing.items.1')}</p>
                <p>{t('rooms.pricing.items.2')}</p>
              </div>
              <div>
                <p className="mb-2">{t('rooms.pricing.items.3')}</p>
                <p className="mb-2">{t('rooms.pricing.items.4')}</p>
                <p>{t('rooms.pricing.items.5')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section id="vybaveni" className="py-20 relative">
        <div className="absolute inset-0 gradient-cool opacity-5"></div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('facilities.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('facilities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {facilities.map((facility, index) => (
              <div key={index} className="text-center p-6 rounded-lg hover:bg-white hover:shadow-lg transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  {facility.icon}
                </div>
                <h3 className="font-semibold mb-2">{t(`facilities.items.${index}`)}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Pension Section */}
      <section id="o-penzionu" className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('about.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
              {t('about.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">{t('about.roomsCapacity.title')}</h3>
              <p className="text-muted-foreground mb-6 text-center md:text-left">
                {t('about.roomsCapacity.description')}
              </p>
              <ul className="space-y-3 text-muted-foreground text-center md:text-left">
                <li>{t('about.roomsCapacity.items.0')}</li>
                <li>{t('about.roomsCapacity.items.1')}</li>
                <li>{t('about.roomsCapacity.items.2')}</li>
                <li>{t('about.roomsCapacity.items.3')}</li>
              </ul>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">{t('about.services.title')}</h3>
              <p className="text-muted-foreground mb-4 text-center md:text-left">
                {t('about.services.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">{t('about.equipment.title')}</h3>
              <p className="text-muted-foreground mb-4 text-center md:text-left">
                {t('about.equipment.description1')}
              </p>
              <p className="text-muted-foreground mb-4 text-center md:text-left">
                {t('about.equipment.description2')}
              </p>
              <p className="text-muted-foreground text-center md:text-left">
                {t('about.equipment.description3')}
              </p>
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-semibold mb-6 text-center md:text-left">{t('about.surroundings.title')}</h3>
              <p className="text-muted-foreground mb-4 text-center md:text-left">
                {t('about.surroundings.description1')}
              </p>
              <p className="text-muted-foreground mb-8 text-center md:text-left">
                {t('about.surroundings.description2')}
              </p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg mt-8">
            <p className="text-lg font-medium text-primary text-center">
              {t('about.brno.conclusion')}
            </p>
          </div>

          <div className="text-center mt-12">
            <h3 className="text-2xl font-semibold mb-6">{t('about.brno.title')}</h3>
            <p className="text-muted-foreground mb-6 max-w-4xl mx-auto">
              {t('about.brno.description1')}
            </p>
            <p className="text-muted-foreground mb-8 max-w-4xl mx-auto">
              {t('about.brno.description2')}
            </p>
          </div>
        </div>
      </section>

      {/* Guest Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('reviews.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('reviews.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {(() => {
              const reviews = getRaw('reviews.items');
              return Array.isArray(reviews) ? reviews.map((review: any, index: number) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[...Array(parseInt(review.rating))].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-lg font-semibold">{review.rating}/10</span>
                    </div>
                    <div className="relative">
                      <Quote className="w-8 h-8 text-primary/20 absolute -top-2 -left-2" />
                      <p className="text-muted-foreground italic pl-6">
                        {review.text}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )) : null;
            })()}
          </div>

          {/* Certificates Section */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-8">{t('certificates.title')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/new-chat/6zdPdbsblbnPn85RQn9ST/tisk-samolepka.png"
                  alt="Booking.com Traveller Review Awards 2024"
                  className="w-full h-auto object-contain mb-4"
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <img 
                  src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/new-chat/xWEH2MdBTHCPv93nHM0N7/tisk-samolepka.png"
                  alt="MegaUbytko.cz 2024 - Výborné"
                  className="object-contain mb-4 w-full h-3xs"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reservation Form Section */}
      <section id="rezervace" className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('reservation.title')}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {t('reservation.subtitle')}
            </p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="overflow-hidden shadow-lg">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t('reservation.form.name')} *</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        placeholder={t('reservation.form.placeholders.name')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t('reservation.form.email')} *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder={t('reservation.form.placeholders.email')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <Label htmlFor="phone">{t('reservation.form.phone')} *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        placeholder={t('reservation.form.placeholders.phone')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="roomType">{t('reservation.form.roomType')} *</Label>
                      <Select value={formData.roomType} onValueChange={(value) => handleInputChange('roomType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={t('reservation.form.placeholders.roomType')} />
                        </SelectTrigger>
                        <SelectContent>
                          {roomTypes.map((room, index) => (
                            <SelectItem key={index} value={room.name}>
                              {room.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dateFrom">{t('reservation.form.dateFrom')} *</Label>
                      <Input
                        id="dateFrom"
                        type="date"
                        value={formData.dateFrom}
                        onChange={(e) => handleInputChange('dateFrom', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dateTo">{t('reservation.form.dateTo')} *</Label>
                      <Input
                        id="dateTo"
                        type="date"
                        value={formData.dateTo}
                        onChange={(e) => handleInputChange('dateTo', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t('reservation.form.message')}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder={t('reservation.form.placeholders.message')}
                      rows={4}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gradient-warm hover:scale-105 transition-all duration-300 text-white py-3 text-lg"
                    size="lg"
                  >
                    {t('reservation.form.submit')}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section id="kontakt" className="py-20 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('contact.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-start gap-8 max-w-4xl mx-auto">
            <div className="flex-1 max-w-md md:pl-16">
              <h3 className="text-2xl font-semibold mb-6 text-left">{t('contact.info.title')}</h3>
              <div className="space-y-4">
                <div className="flex hover:bg-white/50 transition-colors gap-1.5 items-center rounded-lg py-1">
                  <MapPin className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{t('contact.info.address')}</span>
                </div>
                <div className="flex hover:bg-white/50 transition-colors gap-1.5 items-center rounded-lg py-1">
                  <Phone className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{t('contact.info.phone')}</span>
                </div>
                <div className="flex hover:bg-white/50 transition-colors gap-1.5 items-center rounded-lg py-1">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-muted-foreground">{t('contact.info.email')}</span>
                </div>
              </div>
            </div>

            <div className="flex-1 max-w-md">
              <h3 className="text-2xl font-semibold mb-6 text-left">{t('contact.info.important')}</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {t('contact.info.checkIn')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {t('contact.info.checkOut')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {t('contact.info.payment')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {t('contact.info.smoking')}
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  {t('contact.info.pets')}
                </li>
              </ul>
            </div>
          </div>

          {/* Our Surroundings Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold">{t('contact.surroundings.title')}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div 
                  onClick={() => openSurroundingsGallery(0)}
                  className="block cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/bIC-l2Hh6ZHPVsDWf2Gy7/parking.jpg"
                    alt="Parkování u penzionu"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-center text-gray-700 font-medium">{t('contact.surroundings.parkingCaption')}</p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden shadow-lg">
                <div 
                  onClick={() => openSurroundingsGallery(1)}
                  className="block cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <img 
                    src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/new-chat/VH6EVShRQWifbAjPEZylJ/dsc-07912.jpg"
                    alt="Zvířátka v okolí"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-4 bg-white">
                  <p className="text-center text-gray-700 font-medium">{t('contact.surroundings.animalsCaption')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 bg-gradient-to-b from-white to-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">{t('activities.title')}</h2>
            <p className="text-xl text-muted-foreground">
              {t('activities.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Activities using i18n */}
            {(() => {
              const activities = getRaw('activities.items');
              return Array.isArray(activities) ? activities.map((activity: any, index: number) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => activity.url && window.open(activity.url, '_blank')}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-green-100' :
                        index === 1 ? 'bg-green-100' :
                        index === 2 ? 'bg-orange-100' :
                        index === 3 ? 'bg-blue-100' :
                        index === 4 ? 'bg-red-100' :
                        index === 5 ? 'bg-blue-100' :
                        index === 6 ? 'bg-purple-100' :
                        index === 7 ? 'bg-yellow-100' :
                        index === 8 ? 'bg-blue-100' :
                        index === 9 ? 'bg-green-100' :
                        'bg-red-100'
                      }`}>
                        <span className="text-2xl">
                          {index === 0 && '🚴'}
                          {index === 1 && '⛳'}
                          {index === 2 && '🎪'}
                          {index === 3 && '🌿'}
                          {index === 4 && '🏃'}
                          {index === 5 && '🛷'}
                          {index === 6 && '🛍️'}
                          {index === 7 && '🏰'}
                          {index === 8 && '🏊'}
                          {index === 9 && '🍽️'}
                          {index === 10 && '🏐'}
                          {index === 11 && '🔭'}
                          {index === 12 && '🦁'}
                          {index === 13 && '🎭'}
                          {index === 14 && '🏰'}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold">{activity.name}</h3>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      {activity.description}
                    </p>
                    {activity.url && (
                      <div className="text-sm text-primary font-medium">{t('activities.clickForMore')}</div>
                    )}
                  </CardContent>
                </Card>
              )) : null;
            })()}
          </div>
        </div>
      </section>

      {/* Travel Agency Promotion Section */}
      <section className="py-12 bg-gradient-to-b from-muted/30 to-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-primary text-lg font-bold text-slate-950 mb-8">
              {t('travelAgency.heading')}
            </h2>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg max-w-md mx-auto">
              <p className="text-primary text-base font-semibold mb-4">
                {t('travelAgency.title')}
                <a 
                  href="https://www.topranik.cz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 transition-colors underline"
                >
                  {t('travelAgency.website')}
                </a>
              </p>
              <div className="flex justify-center">
                <a href="https://www.topranik.cz">
                  <img 
                    src="https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/new-chat/xUUaPJxNaNiDxUwn8cR_s/app-koupelna.png" 
                    alt={t('travelAgency.alt')}
                    className="object-contain w-auto h-16"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">{t('footer.brand')}</h3>
            <p className="text-muted-foreground mb-6">{t('footer.subtitle')}</p>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 mb-6">
              <span className="text-sm">{t('footer.phone')}</span>
              <span className="text-sm">{t('footer.email')}</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Gallery Modal */}
      {galleryModal.isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeGallery}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              {(() => {
                const room = roomTypes[galleryModal.roomIndex]
                const images = room.gallery.length > 0 ? [room.image, ...room.gallery] : [room.image]
                return (
                  <>
                    <img
                      src={images[galleryModal.imageIndex]}
                      alt={`${room.name} - ${t('gallery.photo')} ${galleryModal.imageIndex + 1}`}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                    
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={() => setGalleryModal(prev => ({
                            ...prev,
                            imageIndex: prev.imageIndex > 0 ? prev.imageIndex - 1 : images.length - 1
                          }))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => setGalleryModal(prev => ({
                            ...prev,
                            imageIndex: prev.imageIndex < images.length - 1 ? prev.imageIndex + 1 : 0
                          }))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded">
                          {galleryModal.imageIndex + 1} / {images.length}
                        </div>
                      </>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}

      {/* Surroundings Gallery Modal */}
      {surroundingsModal.isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeSurroundingsGallery}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeSurroundingsGallery}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8" />
            </button>
            
            <div className="relative">
              {(() => {
                const surroundingsImages = [
                  {
                    src: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/ARst7o49IN1SmL5rfgz3r/parking.jpg.webp",
                    alt: "Parkování u penzionu"
                  },
                  {
                    src: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/snjoqWcGiSjnWlLdRy51E/dsc-07912.jpg",
                    alt: "Zvířátka v okolí"
                  },
                  {
                    src: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/Nt1jE3z7itrNTsisvzttK/dsc-07954.jpg",
                    alt: "Zvířátka v okolí"
                  },
                  {
                    src: "https://assets.macaly-user-data.dev/cdn-cgi/image/format=webp,width=2000,height=2000,fit=scale-down,quality=90,anim=true/fq3yzmfx3kymk4ktiz95kgsg/znam8c2qnt6sme0m8gpmxj71/FCuqP5M4AJRp8C_c8P6oc/dsc-07940.jpg",
                    alt: "Zvířátka v okolí"
                  }
                ]
                const currentImage = surroundingsImages[surroundingsModal.imageIndex]
                return (
                  <>
                    <img
                      src={currentImage.src}
                      alt={currentImage.alt}
                      className="max-w-full max-h-[80vh] object-contain"
                    />
                    
                    {surroundingsImages.length > 1 && (
                      <>
                        <button
                          onClick={() => setSurroundingsModal(prev => ({
                            ...prev,
                            imageIndex: prev.imageIndex > 0 ? prev.imageIndex - 1 : surroundingsImages.length - 1
                          }))}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={() => setSurroundingsModal(prev => ({
                            ...prev,
                            imageIndex: prev.imageIndex < surroundingsImages.length - 1 ? prev.imageIndex + 1 : 0
                          }))}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>
                        
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded">
                          {surroundingsModal.imageIndex + 1} / {surroundingsImages.length}
                        </div>
                      </>
                    )}
                  </>
                )
              })()}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}





































































