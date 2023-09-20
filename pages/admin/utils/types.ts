

export type UserType = {
    _id: string
    username: string
    email: string
    firstname: string
    lastname: string
    country: string
    img: string
    city: string
    phone: string
    imgId: string
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
}

export type BookingType = {
    _id: string
    hotelId: string
    totalNights: number
    totalPrice: number
    prices: number[]
    payment_method: string
    currency: string
    userId: string
    bookedRoomsInfo: [
      { roomNumber: number, title: string, price: number },      
      { roomNumber: number, title: string, price: number }        
    ],
    bookedDates: string[]
    totalBookedRooms: number
    createdAt: Date
    updatedAt: Date
    
  }

  export type RoomType =  {
    _id: string
    title: string
    price: number
    maxPeople: number
    desc: string
    roomNumbers: [{number: number; unavailableDates: Date[]}
    ]
    createdAt: Date
    updatedAt: Date
}

export type HotelType =  {
    _id: string
    name: string
    type: string
    city: string
    address: string
    distance: string
    photos: string[]
    title: string
    desc: string
    totalBookings: number
    totalBookPrice: number
    rooms: string[]
    cheapestPrice: number
    featured: boolean
    
  }

export type BookingExtType = {
    user:UserType
    hotel:HotelType
    booking: BookingType
  
  }
  
  
export type ListDataType = {
  columns: any[]
  hotel?: boolean
  where?: string
 }
 
export type SixMothsDataType = {
 _id: number,
 total:number
 }
 