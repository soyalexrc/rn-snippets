import {observer} from "mobx-react-lite"
import React, {FC} from "react"
import {
    View,
    ViewStyle,
    Dimensions,
} from "react-native"
import { Screen, Text} from "../../components"
// import { useStores } from "../models"
import {AppStackScreenProps} from "../../navigators"
import {useHeader} from "../../utils/useHeader";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false // optional
};

interface ReactNativeChartKitScreenProps extends AppStackScreenProps<"RnChartKit"> {
}

export const ReactNativeChartKitScreen: FC<ReactNativeChartKitScreenProps> = observer(function ReactNativeChartKitScreen(_props) {
    const {navigation} = _props;
    useHeader({
        title: 'React native chart kit',
        leftIcon: 'back',
        onLeftPress: () => navigation.goBack()
    }, [])


    let handleToolTip: any = {};
    return (
        <Screen
            preset={"auto"}
            style={$container}>
            <View style={{marginVertical: 50}}>
                <Text>Bezier Line Chart</Text>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel="$"
                    yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#ffa726"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>

            <View style={{marginVertical: 50}}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [20, 45, 28, 80, 99, 43],
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                strokeWidth: 2 // optional
                            }
                        ],
                        legend: ["Rainy Days"] // optional
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                />
            </View>

            <View style={{marginVertical: 50}}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [20, 45, 28, 80, 99, 43],
                                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
                                strokeWidth: 2 // optional
                            }
                        ],
                        legend: ["Rainy Days"] // optional
                    }}
                    width={Dimensions.get('window').width}
                    height={256}
                    verticalLabelRotation={30}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>

            <View style={{marginVertical: 50}}>
                <ProgressChart
                    data={{
                        labels: ["Swim", "Bike", "Run"], // optional
                        data: [0.4, 0.6, 0.8]
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    strokeWidth={16}
                    radius={32}
                    chartConfig={chartConfig}
                    hideLegend={false}
                />
            </View>
            <View style={{marginVertical: 50}}>
                <BarChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [20, 45, 28, 80, 99, 43]
                            }
                        ]
                    }}
                    width={Dimensions.get('window').width}
                    height={260}
                    yAxisLabel="$"
                    yAxisSuffix="$"
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>

            <View style={{marginVertical: 50}}>
                <StackedBarChart
                    // style={graphStyle}
                    data={{
                        labels: ["Test1", "Test2"],
                        legend: ["L1", "L2", "L3"],
                        data: [
                            [60, 60, 60],
                            [30, 30, 60]
                        ],
                        barColors: ["#dfe4ea", "#ced6e0", "#a4b0be"]
                    }}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    hideLegend/>
            </View>
            <View style={{marginVertical: 50}}>
                <PieChart
                    data={[
                        {
                            name: "Seoul",
                            population: 21500000,
                            color: "rgba(131, 167, 234, 1)",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Toronto",
                            population: 2800000,
                            color: "#F00",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Beijing",
                            population: 527612,
                            color: "red",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "New York",
                            population: 8538000,
                            color: "#ffffff",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        },
                        {
                            name: "Moscow",
                            population: 11920000,
                            color: "rgb(0, 0, 255)",
                            legendFontColor: "#7F7F7F",
                            legendFontSize: 15
                        }
                    ]}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    accessor={"population"}
                    backgroundColor={"transparent"}
                    center={[10, 10]}
                    absolute
                    paddingLeft={"0"}/>
            </View>
            <View style={{marginVertical: 50}}>
                <ContributionGraph
                    values={[
                        { date: "2017-01-02", count: 1 },
                        { date: "2017-01-03", count: 2 },
                        { date: "2017-01-04", count: 3 },
                        { date: "2017-01-05", count: 4 },
                        { date: "2017-01-06", count: 5 },
                        { date: "2017-01-30", count: 2 },
                        { date: "2017-01-31", count: 3 },
                        { date: "2017-03-01", count: 2 },
                        { date: "2017-04-02", count: 4 },
                        { date: "2017-03-05", count: 2 },
                        { date: "2017-02-30", count: 4 }
                    ]}
                    endDate={new Date("2017-04-01")}
                    numDays={105}
                    width={Dimensions.get('window').width}
                    height={220}
                    chartConfig={chartConfig}
                    tooltipDataAttrs={(value) => handleToolTip}                />
            </View>
        </Screen>
    )
})

const $container: ViewStyle = {
}
