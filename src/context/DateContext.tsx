'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import moment from 'moment';

interface Entry {
    dtini: Date;
    dtend: Date;
}

interface DateContextType {
    date: Entry;
    editDateIni: (dtini: Date) => void;
    editDateEnd: (dtend: Date) => void;
}

const DateContext = createContext<DateContextType | undefined>(undefined);

export const DateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const dtini = moment().startOf('month').toDate();
    const dtend = moment().endOf('month').toDate();

    const [date, setDate] = useState<Entry>({
        dtini: dtini,
        dtend: dtend,
    });

    const editDateIni = (newDate: Date) => {
        setDate((prevDate) => ({
            ...prevDate,
            dtini: newDate,
        }));
    };

    const editDateEnd = (newDate: Date) => {
        setDate((prevDate) => ({
            ...prevDate,
            dtend: newDate,
        }));
    };

    return (
        <DateContext.Provider value={{ date, editDateIni, editDateEnd }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => {
    const context = useContext(DateContext);
    if (!context) {
        throw new Error('useDate must be used within a DateProvider');
    }
    return context;
};
