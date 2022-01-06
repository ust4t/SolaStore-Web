import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { FormControlLabel } from "@mui/material";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export default function FilterSearch() {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  return (
    <div className="container justify-content-space-evenly">
      <div className="row bg-warning">
        <div className="col-lg-3">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              sx={{
                backgroundColor: "white",
              }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              renderValue={() =>
                personName.length === 1
                  ? personName[0]
                  : `${personName.length} selected`
              }>
              {names.map((name) => (
                <Box
                  key={name}
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
                      value={name}
                      control={
                        <Checkbox
                          onChange={(e) => console.log(e.target.value)}
                        />
                      }
                      label={name}
                    />
                  </Box>
                  <Box
                    sx={{
                      marginLeft: "1rem",
                    }}>
                    <FormControlLabel
                      value={name}
                      control={
                        <Checkbox
                          onChange={(e) => console.log(e.target.value)}
                        />
                      }
                      label={name}
                    />
                  </Box>
                </Box>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-4">
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
            <Select
              sx={{
                backgroundColor: "white",
              }}
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={personName}
              onChange={handleChange}
              renderValue={() =>
                personName.length === 1
                  ? personName[0]
                  : `${personName.length} selected`
              }>
              {names.map((name) => (
                <Box
                  key={name}
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
                      value={name}
                      control={
                        <Checkbox
                          onChange={(e) => console.log(e.target.value)}
                        />
                      }
                      label={name}
                    />
                  </Box>
                </Box>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="col-lg-3"></div>
        <div className="col-lg-3"></div>
      </div>
    </div>
  );
}
