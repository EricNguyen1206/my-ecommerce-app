import { useEffect, useMemo, useState } from "react";

import "./home.css";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { userRequest } from "../../api";

export default function Home() {
    const [userStats, setUserStats] = useState([]);

    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );

    useEffect(() => {
        const getStats = async () => {
            try {
                const res = await userRequest.get("/users/stats");
                res.data.map((item) =>
                    setUserStats((prev) => [
                        ...prev,
                        {
                            name: MONTHS[item._id - 1],
                            "Active User": item.total,
                        },
                    ])
                );
            } catch {}
        };
        getStats();
    }, [MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo />
            <Chart
                data={userStats}
                title="User Analytics"
                grid
                dataKey="Active User"
            />
            <div className="homeWidgets">
                <WidgetSm />
                <WidgetLg />
            </div>
        </div>
    );
}
