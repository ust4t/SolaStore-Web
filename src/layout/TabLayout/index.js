import React, { useState } from "react";

import PopularProducts from "../../components/PopularProducts";
import styles from "./TabLayout.module.css";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import NewProducts from "../../components/NewProducts";
import SaleProducts from "../../components/SaleProducts";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function TabLayout() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [popularData, setPopularData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: "100%" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        centered
        aria-label="full width tabs example">
        <Tab label="Çok Satanlar" {...a11yProps(0)} />
        <Tab label="Yeni Ürünler" {...a11yProps(1)} />
        <Tab label="İndirimdeki Ürünler" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"}>
          <PopularProducts
            popularData={popularData}
            setPopularData={setPopularData}
          />
        </SwipeableViews>
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"}>
          <NewProducts />
        </SwipeableViews>
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <SwipeableViews axis={theme.direction === "rtl" ? "x-reverse" : "x"}>
          <SaleProducts
            popularData={popularData}
            setPopularData={setPopularData}
          />
        </SwipeableViews>
      </TabPanel>
    </Box>
  );
}
