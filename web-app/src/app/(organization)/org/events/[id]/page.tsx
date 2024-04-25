import { z, ZodType } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@nextui-org/button';
import InputFormText from '@/components/auth/InputFormText/InputFormText';
import Box from "@/components/utils/Box/Box";
import {Link} from "@nextui-org/react";
import {now, getLocalTimeZone} from "@internationalized/date";

type FormValues = {
    title: string;
    description: string;
    duration?: number;
    startDate?: Date;
};

const schema: ZodType<FormValues> = z.object({
    email: z.string().email(),
    password: z.string(),
});

function Page() {
    const someFetchedEvent = {
        title: 'VIP event (No bitches)',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet asperiores aut blanditiis, cum deleniti dicta facere illo, illum inventore maiores mollitia non provident, quisquam sequi sunt suscipit tempore temporibus ullam!',
        startTime: new Date(),
        duration: 120 * 60,
        price: 400,
        location: '221B Baker Street',
        poster: 'https://img.ticketsbox.com/cache/0x0/data/!!!!/duna.jpg_.webp',
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormValues>({ resolver: zodResolver(schema) });

    // TODO: ADD LOGIC
    const submitEditEvent = (data: FormValues) => {
        console.log(data);
    };

    return (
        <Box className={'flex max-h-screen gap-20 p-10'}>
            <form className={'flex max-h-screen gap-20'} >

                <div className={'w-1/3 p-0 '}>
                    <img
                        className={'w-4/5 rounded-lg'}
                        src={someFetchedEvent.poster}
                        alt={'You got 0 bitches'}
                    />
                </div>
                <div className={'flex w-3/5 flex-col gap-4'}>
                    <InputFormText className={'text-3xl font-extrabold text-black'}>
                        {someFetchedEvent.title}
                    </InputFormText>
                    <span className={'text-2xl font-bold text-gray-700'}>
                        {someFetchedEvent.startTime.toDateString()}
                    </span>
                    <div className={'flex flex-row'}>
                        <div className={'flex flex-col gap-1 py-2 pr-10'}>
                            <span className={'text-lg text-gray-700'}>Duration:</span>
                            <span className={'text-lg text-gray-700'}>Price:</span>
                        </div>
                        <div className={'flex flex-col gap-1 py-2'}>
                            <span className={'text-bold text-lg text-black'}>
                                {someFetchedEvent.duration} No I won't fix this
                            </span>
                            <span className={'text-bold text-lg text-black'}>
                                {someFetchedEvent.price} Gryvni suka
                            </span>
                        </div>
                    </div>
                    <span className={'text-xl font-bold text-gray-700'}>Description:</span>
                    <div className={'w-1/2'}>
                        <span className={'w-fit text-lg text-black'}>
                            {someFetchedEvent.description}
                        </span>
                    </div>
                    <div className={'mt-auto ml-auto flex-col flex gap-4'}>
                        <Button className={
                            'h-12 border border-primary bg-accent text-white hover:bg-accent ' +
                            'text-lg font-semibold hover:border-accent hover:text-white'
                        }>
                            Edit event
                        </Button>
                        <Button color={'danger'} className={
                            'h-12 border text-white ' +
                            'text-lg font-semibold'
                        }>
                            Delete event
                        </Button>
                    </div>
                </div>
            </form>
        </Box>
    );
}

export default Page;
