"use client"

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"

export function AccountOptions() {
    return (
        <Menubar className="mr-2">
            <MenubarMenu>
                <MenubarTrigger>Opções</MenubarTrigger>
                <MenubarContent>
                    <MenubarItem>
                        Conta <MenubarShortcut></MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem>
                        Sair <MenubarShortcut></MenubarShortcut>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}