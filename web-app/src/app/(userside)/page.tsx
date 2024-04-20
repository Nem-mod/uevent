import Slider from '@/components/core/Slider/Slider';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader, Link, Image } from '@nextui-org/react';
import EventCard from '@/components/core/EventCard/EventCard';

export default function Home() {
    return (
        <div className={'h-full'}>
            <div className={'h-unit-9xl w-full'}>
                <Slider />
            </div>
            <div className={'m-auto mt-12 max-w-screen-xl px-2'}>
                <h2 className={'text-3xl font-bold text-black'}>TOP EVENTS</h2>

                <div className={'mt-5 flex flex-wrap justify-center gap-10'}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => (
                        <Card className="max-w-lg py-4">
                            <CardHeader className="flex-col items-start px-4 pb-0 pt-2">
                                <p className="text-tiny font-bold uppercase">Daily Mix</p>
                                <small className="text-default-500">12 Tracks</small>
                                <h4 className="text-large font-bold">Frontend Radio</h4>
                            </CardHeader>
                            <CardBody className="overflow-visible py-2">
                                <Image
                                    alt="Card background"
                                    className="rounded-xl object-cover"
                                    src="/images/hero-card-complete.jpeg"
                                    width={270}
                                />
                            </CardBody>
                        </Card>
                    ))}
                    <EventCard
                        title={'Funky event'}
                        start={new Date()}
                        price={'400'}
                        tag={'Bitch nigga'}
                        address={'221B Baker St.'}
                        img={'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp'}
                    />
                </div>
                <div className={'mt-12 grid w-full place-items-center'}>
                    <Button
                        as={Link}
                        href={'/events'}
                        className={'h-12 w-52 bg-accent text-xl text-white'}
                    >
                        All Events
                    </Button>
                </div>
            </div>
        </div>
    );
}
