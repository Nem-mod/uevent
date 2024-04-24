'use client'
import InputEventPoster from "@/components/organization/InputEventPoster/InputEventPoster";
import React, {useState} from "react";
import {Input, Textarea} from "@nextui-org/input";
import {DatePicker} from "@nextui-org/date-picker";
import {now, getLocalTimeZone, today} from "@internationalized/date";
import {Select, SelectItem} from "@nextui-org/react";
import {Button} from "@nextui-org/button";

const formats = ['Concert', 'Gallery']

function Page() {
    const [posterImg, setPosterImg] = useState<File>();
    const uploadFile = async () => {
        if (!posterImg)
            return
        let formData = new FormData();
        const timestamp = Date.now();

        formData.append("image", posterImg, `${timestamp}.webp`);

        const requestOptions: RequestInit = {
            method: "POST",
            body: formData,
        };

        try {
            const response = await fetch("/api/upload", requestOptions);
            if (!response.ok) throw new Error("Failed to upload");
            const data = await response.json();
            console.log("Upload successful:", data);
        } catch (error) {
            console.error("Error uploading audio:", error);
        }
    }

    return (
        <div>
            <h1 className={'text-black text-4xl'}>Create event</h1>
            <div className={'mt-10 flex gap-10 text-black'}>
                <InputEventPoster value={posterImg} onChange={setPosterImg} className={'w-2/5'}/>
                <form className={'w-2/5'}>
                    <Input
                        isRequired
                        type={'text'}
                        label={'Title'}
                        size={'lg'}
                        radius={'sm'}
                        variant={'underlined'}
                        color={'primary'}
                    />
                    <Textarea
                        isRequired
                        type={'text'}
                        label={'Description'}
                        size={'lg'}
                        radius={'sm'}
                        variant={'underlined'}
                        color={'primary'}
                    />
                    <DatePicker
                        isRequired
                        label={"Event Date"}
                        variant={"underlined"}
                        hideTimeZone
                        size={'lg'}
                        color={'primary'}
                        showMonthAndYearPickers
                        minValue={today(getLocalTimeZone())}
                        defaultValue={now(getLocalTimeZone())}
                    />

                    <Input
                        type={'text'}
                        label={'Estimate duration in minutes'}
                        size={'lg'}
                        radius={'sm'}
                        variant={'underlined'}
                        color={'primary'}
                    />

                    <Select
                        label={'Format'}
                        placeholder={"Select event formats"}
                        variant={'underlined'}
                        color={'primary'}
                        size={'lg'}
                    >
                        {formats &&
                            formats.map((format) => (
                                <SelectItem className={'text-black'} key={format} value={format}>
                                    {format}
                                </SelectItem>
                            ))}
                    </Select>
                    <Button className={'bg-accent text-white mt-5'} size={'lg'} onClick={uploadFile}>Submit</Button>
                </form>
            </div>
        </div>
    );
}

export default Page;