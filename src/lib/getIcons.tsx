import {
    DollarSign,
    Home,
    Scale,
    Hourglass,
    CalendarDays,
    Plus,
    Clock2,
  } from "lucide-react";

  export const GetIcon = (name: string) => {
    if (name.toLowerCase().includes("days") || name.toLowerCase().includes("months")) {
      return <CalendarDays/>; // Calendar icon
    } 
    else if (name.toLowerCase().includes("price")) {
      return <DollarSign/>; // Dollar icon
    } 
    else if (name.toLowerCase().includes("homes")) {
      return <Home/>; // Home icon
    }
    else if (name.toLowerCase().includes("cash")) {
      return <Hourglass/>; // Home icon
    } 
    else if (name.toLowerCase().includes("absorption")) {
      return <Plus/>; // Home icon
    } 
    else if (name.toLowerCase().includes("net")) {
      return <Clock2/>; // Home icon
    } 
    else if (name.toLowerCase().includes("sold")) {
      return <Scale/>; // Home icon
    } 
    else {
      return <DollarSign/>; // Default dot
    }
  };
  