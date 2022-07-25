import {
  Autocomplete,
  Box,
  Button,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller, useWatch } from "react-hook-form";
import queryString from "query-string";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import MapIcon from "@mui/icons-material/Map";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";

export default function SearchBar({ currentSearch }) {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [isGuestsMenuOpen, setIsGuestsMenuOpen] = useState(false);

  const { control, getValues } = useForm({
    defaultValues: currentSearch || {
      destination: "",
      startDate: new Date(),
      endDate: new Date(),
      numberOfAdultGuests: 0,
      numberOfChildrenGuests: 0,
      numberOfRooms: 1,
    },
  });

  const destinationSearchTerm = useWatch({
    control,
    name: "destination",
  });

  useEffect(() => {
    fetch(`http://localhost:5500/destinations?search=${destinationSearchTerm}`)
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  }, [destinationSearchTerm]);

  // I used usedWatch here just for the purpose of demonstrating, we can use getValues
  const numberOfAdultGuests = useWatch({
    control,
    name: "numberOfAdultGuests",
  });
  const numberOfChildrenGuests = useWatch({
    control,
    name: "numberOfChildrenGuests",
  });
  const numberOfRooms = useWatch({
    control,
    name: "numberOfRooms",
  });
  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const updateDestinations = (searchTerm) => {
    fetch(`http://localhost:5500/destinations?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setDestinations(data));
  };

  const guestsValue = `Guests: ${
    parseInt(numberOfAdultGuests) + parseInt(numberOfChildrenGuests)
  }\nRooms: ${numberOfRooms}`;
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Box
        sx={{
          marginTop: "20px",
          maxWidth: "100%",
          display: "flex",
          flexWrap: "nowrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Controller
          name='destination'
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              onChange={(event, item) => {
                onChange(item);
              }}
              value={value}
              id='destination'
              disableClearable
              options={destinations}
              onInputChange={(event, newInputValue) =>
                updateDestinations(newInputValue)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='What is your destination?'
                  sx={{ m: 1, width: "270px" }}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                    startAdornment: (
                      <InputAdornment position='start'>
                        <MapIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <>
                        <InputAdornment position='end'>
                          <SearchIcon />
                        </InputAdornment>
                        {params.InputProps.endAdornment}
                      </>
                    ),
                  }}
                />
              )}
            />
          )}
        />
        <Box
          sx={{
            width: "200px",
            display: "flex",
            flexWrap: "nowrap",
            paddingLeft: "2px",
          }}
        >
          <Controller
            name='startDate'
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                disablePast
                defaultValue={Date.now()}
                label='Arriving at'
                renderInput={(params) => {
                  const { value } = params.inputProps;
                  const valueAsDate = value
                    ? new Date(params.inputProps.value)
                    : "";
                  return (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: !value
                          ? ""
                          : `${valueAsDate.getDate()}.${
                              valueAsDate.getMonth() + 1
                            }`,
                      }}
                    />
                  );
                }}
              />
            )}
          />
          <Controller
            name='endDate'
            control={control}
            render={({ field }) => (
              <DatePicker
                {...field}
                disablePast
                minDate={startDate}
                label='Leaving at'
                renderInput={(params) => {
                  const { value } = params.inputProps;
                  const valueAsDate = value
                    ? new Date(params.inputProps.value)
                    : "";
                  return (
                    <TextField
                      {...params}
                      inputProps={{
                        ...params.inputProps,
                        value: !value
                          ? ""
                          : `${valueAsDate.getDate()}.${
                              valueAsDate.getMonth() + 1
                            }`,
                      }}
                    />
                  );
                }}
              />
            )}
          />
        </Box>
        <Box
          sx={{
            position: "relative",
            textAlign: "left",
            paddingLeft: "10px !important",
          }}
        >
          <TextField
            onClick={() => setIsGuestsMenuOpen(!isGuestsMenuOpen)}
            value={guestsValue}
            multiline
            size='small'
            sx={{
              width: "200px",
            }}
            inputProps={{
              sx: {
                fontSize: "12px",
                lineHeight: "1.6",
              },
            }}
          />
          <Box
            sx={{
              bgcolor: "background.paper",
              overflow: "hidden",
              borderRadius: "0 0 12px 12px",
              zIndex: 4,
              boxShadow: 1,
              width: "200px",
              display: isGuestsMenuOpen ? "flex" : "none",
              flexDirection: "column",
              flexWrap: "nowrap",
              position: "absolute",
            }}
          >
            <Controller
              name='numberOfAdultGuests'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label='Adults'
                  type='number'
                  sx={{ m: 1, width: "180px" }}
                />
              )}
            />
            <Controller
              name='numberOfChildrenGuests'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Children'
                  sx={{ m: 1, width: "180px" }}
                />
              )}
            />
            <Controller
              name='numberOfRooms'
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type='number'
                  label='Rooms'
                  sx={{ m: 1, width: "180px" }}
                />
              )}
            />
          </Box>
        </Box>
        <Button
          sx={{ padding: "16px", marginLeft: "10px" }}
          onClick={() =>
            navigate(`/search?${queryString.stringify(getValues())}`)
          }
          variant='contained'
        >
          Search
        </Button>
      </Box>
    </LocalizationProvider>
  );
}
