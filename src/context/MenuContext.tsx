'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MenuToggleContextType {
    toggle: boolean;
    editToggle: (active: boolean) => void;
}

const MenuToggleContext = createContext<MenuToggleContextType | undefined>(undefined);

export const MenuToggleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [toggle, setToggle] = useState(false);

    const editToggle = (active: boolean) => {
        setToggle(active);
    };

    return (
        <MenuToggleContext.Provider value={{ toggle, editToggle }}>
            {children}
        </MenuToggleContext.Provider>
    );
};

export const useMenuToggle = () => {
    const context = useContext(MenuToggleContext);
    if (!context) {
        throw new Error('useMenuToggle must be used within a MenuToggleProvider');
    }
    return context;
};