import React from "react";
import useQuery from "../../hooks/useQuery";
import HotelItem from "../HotelItem";
import { Box } from "@mui/system";
import SearchBar from "../SearchBar";
import useHotels from "../../hooks/useHotels";

export default function HotelsList() {
  const query = useQuery();
  const { hotels, error, loading } = useHotels(query);
  if (loading) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Sorry we are facing some errors</h1>;
  }
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <SearchBar currentSearch={query} />
      {hotels.map((hotel) => (
        <HotelItem key={hotel.id} {...hotel} />
      ))}
    </Box>
  );
}
