import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Select,
} from "@mui/material";
import React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { FormControlLabel } from "@mui/material";

export default function SelectCheckboxGroup({
  label,
  data,
  onSelect,
  ...rest
}) {
  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id="nested-multiple-checkbox-label">{label}</InputLabel>
      <Select
        sx={{
          backgroundColor: "white",
        }}
        labelId="nested-multiple-checkbox-label"
        id="nested-multiple-checkbox"
        multiple
        value={data}
        onChange={onSelect}
        renderValue={() =>
          data.length === 1 ? data[0] : `${data.length} seçildi`
        }
        {...rest}>
        {data.map((val) => (
          <Box
            key={val}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              margin: "10px 15px",
            }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <FormControlLabel
                value={val}
                control={
                  <Checkbox onChange={(e) => console.log(e.target.value)} />
                }
                label={val}
              />
            </Box>
            <Box
              sx={{
                marginLeft: "1rem",
              }}>
              <FormControlLabel
                value={val}
                control={
                  <Checkbox onChange={(e) => console.log(e.target.value)} />
                }
                label={val}
              />
            </Box>
          </Box>
        ))}
      </Select>
    </FormControl>
  );
}
