import { useEffect, useState } from "react";
import Accordion from "../accordion/Accordion";
import { findIndividualsWithMoreThanOnePrize } from "../../utils/fetchData";

const FeaturedCard = () => {

    const [featuredIndividual, setFeaturedIndividual] = useState([]);

    useEffect(() => {
        const fetchDataIndividual = async () => {
          try {
            const res = await findIndividualsWithMoreThanOnePrize();
            setFeaturedIndividual(res);
            console.log(res);
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchDataIndividual();
      }, []);

    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
                <div className="relative max-w-2xl mx-auto sm:text-center">
                    <div className="relative z-10">
                        <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
                            Featured Winners
                        </h3>
                        <p className="mt-3">
                            Here are all the nobel prize winners that won the prize more than once.
                        </p>
                    </div>
                    <div className="absolute inset-0 max-w-xs mx-auto h-44 blur-[118px]" style={{ background: "linear-gradient(152.92deg, rgba(192, 132, 252, 0.2) 4.54%, rgba(232, 121, 249, 0.26) 34.2%, rgba(192, 132, 252, 0.1) 77.55%)" }}></div>
                </div>
                <div className="relative mt-12">
                    <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            featuredIndividual.map((item, idx) => ( item.laureate.surname &&
                                <li key={idx} className="bg-white space-y-3 p-4 border rounded-lg">
                                    <h4 className="text-lg text-gray-700 font-semibold">
                                        {`${item.laureate.firstname} ${item.laureate.surname? item.laureate.surname : ""}`}
                                    </h4>
                                    <Accordion prizes={item.prizes} />
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCard;