import { Typography } from "@mui/material";
import React from "react";
import SearchBar from "../SearchBar";

export default function HomePage() {
  return (
    <div className='home-page'>
      <Typography color="primary" variant='h1' component='h1'>
        We love to travel as much as you do
      </Typography>
      <Typography style={{maxWidth:"500px", margin: "auto"}} variant='body1' component='h2'>
        We <strong>Create</strong> unbeatable deals you will not get anywhere
        else -so you can save your money for an unforgettable travel experience
      </Typography>
      <SearchBar />
    </div>
  );
}
