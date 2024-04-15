import Slider from "@/components/core/Slider/Slider";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardHeader, Link, Image} from "@nextui-org/react";

export default function Home() {
    return (
        <main className="">
            <div className={'w-full h-unit-9xl' }>
                <Slider/>
            </div>
            <div className={'mt-12 px-2 max-w-screen-xl m-auto'}>
                <h2 className={'text-black text-3xl font-bold'}>TOP EVENTS</h2>

                <div className={'mt-5 flex flex-wrap gap-10 justify-center'}>
                    {[1,2,3,4,5,6,7,8,9].map(() => (
                        <Card className="py-4 max-w-lg">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <p className="text-tiny uppercase font-bold">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="font-bold text-large">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="object-cover rounded-xl"
                                    src="/images/hero-card-complete.jpeg"
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    ))}

                </div>
                <div className={'mt-12 w-full grid place-items-center'}>
                    <Button as={Link} href={"/events"} className={"w-52 h-12 text-xl bg-accent text-white"}>All Events</Button>
                </div>
            </div>
        </main>
    );
}
