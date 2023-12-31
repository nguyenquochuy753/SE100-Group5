import {useEffect, useState} from 'react';
import {RadioGroup} from '@headlessui/react';
import cn from 'classnames';
import Layout from '@components/layout/layout';
import {useTranslation} from 'next-i18next';
import {format, addDays} from 'date-fns';
import {vi} from 'date-fns/locale';

function generateSixDaysArray(): string[] {
    // Lấy ngày hiện tại
    const currentDate = new Date();

    // Tạo mảng chứa 6 ngày tính từ ngày hiện tại
    const sixDaysArray = Array.from({length: 6}, (_, index) => {
        const currentDatePlusIndex = addDays(currentDate, index);
        return format(currentDatePlusIndex, 'EEE, MMM dd, yyyy', {locale: vi});
    });

    return sixDaysArray;
}

const deliveryDateSchedule = generateSixDaysArray();

const deliveryTimeSchedule = ['9am to 10am', '3pm to 5pm', '6pm to 8pm'];

export default function Schedule({setNgay, setGio}) {
    const {t} = useTranslation('common');
    const [dateSchedule, setDateSchedule] = useState(deliveryDateSchedule[0]);
    const [timeSchedule, setTimeSchedule] = useState(deliveryTimeSchedule[0]);

    function getDay(date: string) {
        const day = date.split(',');
        return day[0];
    }

    function getMonth(date: string) {
        const month = date.split(',');
        return month[1];
    }

    useEffect(() => {
        setNgay(deliveryDateSchedule[0]);
        setGio(deliveryTimeSchedule[0]);
    }, [])


    return (
        <div className="w-full">
            <div className="w-full  mx-auto">
                <RadioGroup value={dateSchedule} onChange={(event) => {
                    setDateSchedule(event)
                    setNgay(event);
                }}>
                    <RadioGroup.Label className="sr-only">
                        {t('text-delivery-schedule')}
                    </RadioGroup.Label>
                    <div className="grid gap-4 grid-cols-2 sm:grid-cols-4 lg:grid-cols-6">
                        {deliveryDateSchedule.map((date) => (
                            <RadioGroup.Option
                                key={date}
                                value={date}
                                className={({active, checked}) =>
                                    cn(
                                        'relative rounded-lg shadow-md px-5 py-3 cursor-pointer focus:outline-none',
                                        checked
                                            ? 'bg-skin-primary text-skin-inverted'
                                            : 'bg-gray-100'
                                    )
                                }
                            >
                                {({checked}) => (
                                    <div className="text-center">
                                        <RadioGroup.Label
                                            as="p"
                                            className={`text-base font-semibold  ${
                                                checked ? 'text-skin-inverted' : 'text-gray-900'
                                            }`}
                                        >
                                            {getDay(date)}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                            as="span"
                                            className={`text-15px ${
                                                checked ? 'text-skin-inverted' : 'text-gray-500'
                                            }`}
                                        >
                                            {getMonth(date)}
                                        </RadioGroup.Description>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
                {/* End of date schedule */}

                <RadioGroup
                    className="mt-10"
                    value={timeSchedule}
                    onChange={(event) => {
                        setTimeSchedule(event)
                        setGio(event);
                    }}
                >
                    <RadioGroup.Label className="sr-only">
                        {t('text-delivery-schedule')}
                    </RadioGroup.Label>
                    <div
                        className="flex justify-between flex-wrap lg:grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                        {deliveryTimeSchedule.map((time) => (
                            <RadioGroup.Option
                                key={time}
                                value={time}
                                className="cursor-pointer focus:outline-none"
                            >
                                {({active, checked}) => (
                                    <div className="flex items-center">
                    <span
                        className={cn(
                            'flex w-6 h-6 rounded-full',
                            checked
                                ? 'border-[6px] border-skin-primary'
                                : 'border-2 border-gray-200'
                        )}
                    />
                                        <RadioGroup.Label
                                            as="p"
                                            className="text-sm text-black ms-2"
                                        >
                                            {time}
                                        </RadioGroup.Label>
                                    </div>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
                {/* End of time schedule */}
            </div>
        </div>
    );
}

Schedule.Layout = Layout;
