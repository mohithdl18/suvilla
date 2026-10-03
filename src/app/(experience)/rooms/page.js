"use client";

import { useState } from "react";

import MobileNavbar from "@/components/Navbar/MobileNavbar";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";

import HeroRoom from "@/components/rooms/HeroRoom";
import RoomNav from "@/components/rooms/RoomNav";
import MobileRoomNav from "@/components/rooms/MobileRoomNav";
import RoomDisplay from "@/components/rooms/RoomDisplay";

import { rooms } from "@/data/roomsData";

export default function RoomsPage() {
  const [activeRoom, setActiveRoom] = useState(rooms[0].id);

  const selectedRoom =
    rooms.find((room) => room.id === activeRoom) || rooms[0];

  const handleRoomSelect = (roomId) => {
    setActiveRoom(roomId);

    // Scroll to content after selecting a room
    requestAnimationFrame(() => {
      const section = document.getElementById("room-content");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#f5f5f2] text-black">
      {/* <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="block md:hidden">
        <MobileNavbar />
      </div> */}

      <HeroRoom />

      <RoomNav
        rooms={rooms}
        activeRoom={activeRoom}
        onSelect={handleRoomSelect}
      />

      <MobileRoomNav
        rooms={rooms}
        activeRoom={activeRoom}
        onSelect={handleRoomSelect}
      />

      {/* <RoomNav
        rooms={rooms}
        activeRoom={activeRoom}
        onSelect={handleRoomSelect}
      /> */}

      <div id="room-content">
        <RoomDisplay room={selectedRoom} />
      </div>

      <Footer />
    </main>
  );
}