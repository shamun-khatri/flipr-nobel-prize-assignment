import { useEffect, useState } from "react";
import { fetchDataFromApi, filterDataBasedOnYear } from "./utils/fetchData";
import "./App.css";
import MainComponent from "./components/mainComponent/MainComponent";
import FeaturedCard from "./components/featuredCard/FeaturedCard";

function App() {
  const options = [
    "All",
    "Chemistry",
    "Economics",
    "Literature",
    "Peace",
    "Physics",
    "Medicine",
  ];

  const [data, setData] = useState([]);

  const handleYearData = async (year, category) => {
    const filteredData = await filterDataBasedOnYear(year, category);
    setData(filteredData);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resData = await fetchDataFromApi();
        setData(resData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <FeaturedCard />
      <MainComponent
        handleYearData={handleYearData}
        options={options}
        data={data}
      />
    </>
  );
}

export default App;
