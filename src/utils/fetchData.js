import axios from "axios";

const url = "https://api.nobelprize.org/v1/prize.json";


export const fetchDataFromApi = async () => {
    try {
        const {data} = await axios.get(url);
        const filteredData = data.prizes.filter(prizes => parseInt(prizes.year) >= 1918 && parseInt(prizes.year) <= 2018);
        return filteredData;
    } catch (error) {
        console.log(error);
    }
}


export const filterDataBasedOnYear =  async (range, category) => {
    const data = await fetchDataFromApi();
    if(category !== "All"){
        const rawData = data.filter(prizes => prizes.category === category);
        const [startYear, endYear] = range.toString().split("-");
        const filteredData = rawData.filter(prizes => parseInt(prizes.year) >= startYear && parseInt(prizes.year) <= endYear);
        return filteredData;
    }
    else{
        const [startYear, endYear] = range.toString().split("-");
        const filteredData = data.filter(prizes => parseInt(prizes.year) >= startYear && parseInt(prizes.year) <= endYear);
        return filteredData;
    }
};

export const findIndividualsWithMoreThanOnePrize = async () => {
    try {
      const res = await axios.get(url);
      const data = [...res.data.prizes];
      const laureatesMap = new Map();
  
      data.forEach((prize) => {
        if (prize.laureates && Array.isArray(prize.laureates)) {
          prize.laureates.forEach((laureate) => {
            const id = laureate.id;
            if (!laureatesMap.has(id)) {
              laureatesMap.set(id, {
                laureate,
                prizes: [{category: prize.category, year: prize.year, motivation: laureate.motivation }],
              });
            } else {
              laureatesMap.get(id).prizes.push({category: prize.category, year: prize.year, motivation: laureate.motivation });
            }
          });
        }
      });
  
      // Filter laureates with more than one prize
      const laureatesWithMoreThanOnePrize = Array.from(laureatesMap.values()).filter(
        ({ prizes }) => prizes.length > 1
      );

      return laureatesWithMoreThanOnePrize;
    } catch (error) {
      console.error("Error fetching and processing data:", error);
      return []; 
    }
  };
  