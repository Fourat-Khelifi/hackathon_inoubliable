import { IconTrendingUp, IconBuildingStore, IconUsers, IconCurrencyDollar, IconChartBar } from "@tabler/icons-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {AppSidebar} from "@/components/app-sidebar";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar";
import {SiteHeader} from "@/components/site-header";
import {useEffect, useState} from "react";

export function Ecosystem() {
    const [data,setData]=useState({
        "average_salary": "1300 TND/month",
        "startup_access": "205% growth rate, $241.5 million ecosystem value",
        "sme_growth": "+15.3% annual growth rate",
        "competitors": [
            "ASCII",
            "Expensya",
            "Instadeep",
            "Accent"
        ],
        "average_rent": "3000 TND",
        "average_pricing": "6000 TND",
        "misc": {
            "notable_event": "Expensya revolutionizes business expense ",
            "trend": "startup ecosystem growth, 68% higher success rate for problem-solving startups"
        },
        "tech_talent_availability": "35,000 professionals",
    });
    useEffect(()=>{
        const {city, field} = JSON.parse(localStorage.getItem("startup")!);
      fetch("https://lyndon-nonqualitative-duncan.ngrok-free.dev/summary/"+city+"/"+field,{
          method:"POST",
      }).then( data =>{
          setData(data.json())
      })
    },[])

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="grid grid-cols-3 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                        {/* Average Salary */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Average Salary</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {data.average_salary}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconCurrencyDollar />
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="flex gap-2 font-medium">
                                    Stable income trends <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Reflects middle-tier tech salaries</div>
                            </CardFooter>
                        </Card>

                        {/* Startup Access */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Startup Access</CardDescription>
                                <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                                    {data.startup_access}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconUsers /> Active
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="flex gap-2 font-medium">
                                    {data.misc.trend} <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Reflects startup density in Tunis</div>
                            </CardFooter>
                        </Card>

                        {/* SME Growth */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>SME Growth</CardDescription>
                                <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                                    {data.sme_growth}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingUp /> Growth
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="flex gap-2 font-medium">
                                    Expansion in SME sector <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Sustained upward trajectory</div>
                            </CardFooter>
                        </Card>

                        {/* Competitors */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Key Competitors</CardDescription>
                                <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                                    {data.competitors.length}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconBuildingStore /> Market
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="font-medium line-clamp-1">
                                    {data.competitors.join(", ")}
                                </div>
                                <div className="text-muted-foreground">
                                    Competing regional players
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Misc Info */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Recent Event</CardDescription>
                                <CardTitle className="text-2xl font-semibold @[250px]/card:text-3xl">
                                    {data.misc.notable_event}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconChartBar /> Activity
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="flex gap-2 font-medium">
                                    Strengthening international ties <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Notable collaboration event</div>
                            </CardFooter>
                        </Card>
                        {/* Average Salary */}
                        <Card className="@container/card">
                            <CardHeader>
                                <CardDescription>Tech Talent Availability</CardDescription>
                                <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                    {data.tech_talent_availability}
                                </CardTitle>
                                <CardAction>
                                    <Badge variant="outline">
                                        <IconTrendingUp />
                                    </Badge>
                                </CardAction>
                            </CardHeader>
                            <CardFooter className="flex-col items-start gap-1.5 text-sm">
                                <div className="flex gap-2 font-medium">
                                    Increasing Numbers <IconTrendingUp className="size-4" />
                                </div>
                                <div className="text-muted-foreground">Reflects Jobs' Future</div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>

    )
}
